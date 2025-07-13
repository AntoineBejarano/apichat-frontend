"use client"

import * as React from "react"
import {
  Clock,
  Play,
  Pause,
  Settings,
  Trash2,
  Calendar,
  Activity,
  CheckCircle,
  XCircle,
  RotateCcw,
  Eye,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useLanguage } from "@/contexts/language-context"
import { useScheduler, type ScheduledStrategy } from "@/contexts/scheduler-context"
import { ScheduleConfigModal } from "./schedule-config-modal"
import { ExecutionLogsModal } from "./execution-logs-modal"
import { useToast } from "@/hooks/use-toast"

export function SchedulerDashboard() {
  const { t } = useLanguage()
  const { scheduledStrategies, isLoading, pauseSchedule, resumeSchedule, deleteSchedule, executeNow } = useScheduler()
  const { toast } = useToast()

  const [selectedStrategy, setSelectedStrategy] = React.useState<ScheduledStrategy | null>(null)
  const [showConfigModal, setShowConfigModal] = React.useState(false)
  const [showLogsModal, setShowLogsModal] = React.useState(false)
  const [showCreateModal, setShowCreateModal] = React.useState(false)

  const formatNextExecution = (date: Date) => {
    const now = new Date()
    const diff = date.getTime() - now.getTime()

    if (diff < 0) return "Overdue"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 24) {
      const days = Math.floor(hours / 24)
      return `in ${days} day${days > 1 ? "s" : ""}`
    }

    if (hours > 0) {
      return `in ${hours}h ${minutes}m`
    }

    return `in ${minutes}m`
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-apichat-accent" />
      case "paused":
        return <Pause className="h-4 w-4 text-yellow-400" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-400" />
      default:
        return <Clock className="h-4 w-4 text-slate-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-apichat-accent/20 text-apichat-accent border-apichat-accent/30"
      case "paused":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
      case "error":
        return "bg-red-400/20 text-red-400 border-red-400/30"
      default:
        return "bg-slate-600/50 text-slate-400"
    }
  }

  const handleToggleStatus = async (strategy: ScheduledStrategy) => {
    try {
      if (strategy.status === "active") {
        await pauseSchedule(strategy.id)
        toast({
          title: t("common.success"),
          description: "Schedule paused successfully",
        })
      } else {
        await resumeSchedule(strategy.id)
        toast({
          title: t("common.success"),
          description: "Schedule resumed successfully",
        })
      }
    } catch (error) {
      toast({
        title: t("common.error"),
        description: "Failed to update schedule status",
        variant: "destructive",
      })
    }
  }

  const handleExecuteNow = async (strategy: ScheduledStrategy) => {
    try {
      await executeNow(strategy.id)
      toast({
        title: t("common.success"),
        description: "Strategy executed successfully",
      })
    } catch (error) {
      toast({
        title: t("common.error"),
        description: "Failed to execute strategy",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (strategy: ScheduledStrategy) => {
    try {
      await deleteSchedule(strategy.id)
      toast({
        title: t("common.success"),
        description: "Schedule deleted successfully",
      })
    } catch (error) {
      toast({
        title: t("common.error"),
        description: "Failed to delete schedule",
        variant: "destructive",
      })
    }
  }

  const activeSchedules = scheduledStrategies.filter((s) => s.status === "active").length
  const totalExecutions = scheduledStrategies.reduce((sum, s) => sum + s.executionCount, 0)
  const successRate =
    totalExecutions > 0
      ? Math.round((scheduledStrategies.reduce((sum, s) => sum + s.successCount, 0) / totalExecutions) * 100)
      : 0

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-700/50 backdrop-blur-sm border-slate-600/30 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-apichat-accent to-emerald-500 flex items-center justify-center">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{scheduledStrategies.length}</p>
                <p className="text-xs text-slate-400">Total Schedules</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-700/50 backdrop-blur-sm border-slate-600/30 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-apichat-lime to-apichat-accent flex items-center justify-center">
                <Activity className="h-5 w-5 text-slate-900" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{activeSchedules}</p>
                <p className="text-xs text-slate-400">Active Schedules</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-700/50 backdrop-blur-sm border-slate-600/30 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-apichat-blue-metallic to-blue-500 flex items-center justify-center">
                <RotateCcw className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{totalExecutions}</p>
                <p className="text-xs text-slate-400">Total Executions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-700/50 backdrop-blur-sm border-slate-600/30 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{successRate}%</p>
                <p className="text-xs text-slate-400">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scheduled Strategies List */}
      <Card className="bg-slate-700/50 backdrop-blur-sm border-slate-600/30 rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-apichat-accent to-emerald-500 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              Scheduled Strategies
            </CardTitle>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-br from-apichat-lime to-apichat-accent hover:from-apichat-lime-light hover:to-apichat-accent text-slate-900 rounded-xl"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Schedule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduledStrategies.map((strategy) => (
              <Card
                key={strategy.id}
                className="bg-slate-600/50 border-slate-500/50 rounded-xl hover:bg-slate-600/70 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-apichat-lime to-apichat-accent shadow-lg">
                        <Clock className="h-6 w-6 text-slate-900" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{strategy.strategyName}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1">
                            {getStatusIcon(strategy.status)}
                            <Badge
                              variant="outline"
                              className={`text-xs rounded-lg ${getStatusColor(strategy.status)}`}
                            >
                              {strategy.status}
                            </Badge>
                          </div>
                          <span className="text-slate-400 text-sm">
                            Next: {formatNextExecution(strategy.nextExecution)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                      {/* Stats */}
                      <div className="flex gap-6 text-sm">
                        <div className="text-center">
                          <div className="text-white font-semibold">{strategy.executionCount}</div>
                          <div className="text-slate-400 text-xs">Executions</div>
                        </div>
                        <div className="text-center">
                          <div className="text-apichat-accent font-semibold">{strategy.successCount}</div>
                          <div className="text-slate-400 text-xs">Success</div>
                        </div>
                        <div className="text-center">
                          <div className="text-red-400 font-semibold">{strategy.errorCount}</div>
                          <div className="text-slate-400 text-xs">Errors</div>
                        </div>
                      </div>

                      {/* Success Rate Progress */}
                      <div className="w-24">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-400">Success</span>
                          <span className="text-xs text-white">
                            {strategy.executionCount > 0
                              ? Math.round((strategy.successCount / strategy.executionCount) * 100)
                              : 0}
                            %
                          </span>
                        </div>
                        <Progress
                          value={
                            strategy.executionCount > 0 ? (strategy.successCount / strategy.executionCount) * 100 : 0
                          }
                          className="h-2 bg-slate-700"
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleExecuteNow(strategy)}
                          disabled={isLoading}
                          className="border-slate-600/50 text-slate-300 hover:text-white bg-transparent hover:bg-slate-600/30 rounded-lg"
                        >
                          <Play className="h-3 w-3" />
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleStatus(strategy)}
                          disabled={isLoading}
                          className={`border-slate-600/50 rounded-lg ${
                            strategy.status === "active"
                              ? "text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
                              : "text-apichat-accent hover:text-apichat-lime hover:bg-apichat-accent/10"
                          }`}
                        >
                          {strategy.status === "active" ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedStrategy(strategy)
                            setShowLogsModal(true)
                          }}
                          className="border-slate-600/50 text-slate-300 hover:text-white bg-transparent hover:bg-slate-600/30 rounded-lg"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedStrategy(strategy)
                            setShowConfigModal(true)
                          }}
                          className="border-slate-600/50 text-slate-300 hover:text-white bg-transparent hover:bg-slate-600/30 rounded-lg"
                        >
                          <Settings className="h-3 w-3" />
                        </Button>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-400/50 text-red-400 hover:text-red-300 bg-transparent hover:bg-red-400/10 rounded-lg"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-slate-800/95 backdrop-blur-sm border-slate-700/50 text-white rounded-2xl max-w-md">
                            <DialogHeader>
                              <DialogTitle>Delete Schedule</DialogTitle>
                              <DialogDescription className="text-slate-400">
                                Are you sure you want to delete this schedule? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex gap-3 pt-4">
                              <Button
                                variant="outline"
                                className="flex-1 border-slate-600/50 text-slate-300 hover:text-white bg-transparent hover:bg-slate-600/30 rounded-xl"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={() => handleDelete(strategy)}
                                disabled={isLoading}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl"
                              >
                                Delete
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {scheduledStrategies.length === 0 && (
              <div className="text-center py-12">
                <Clock className="h-16 w-16 mx-auto mb-4 text-slate-500" />
                <h3 className="text-white font-semibold mb-2">No Scheduled Strategies</h3>
                <p className="text-slate-400 mb-4">Create your first scheduled strategy to automate your workflows</p>
                <Button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-gradient-to-br from-apichat-lime to-apichat-accent hover:from-apichat-lime-light hover:to-apichat-accent text-slate-900 rounded-xl"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Schedule
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      {selectedStrategy && (
        <>
          <ScheduleConfigModal
            isOpen={showConfigModal}
            onClose={() => {
              setShowConfigModal(false)
              setSelectedStrategy(null)
            }}
            strategyId={selectedStrategy.strategyId}
            strategyName={selectedStrategy.strategyName}
            existingSchedule={selectedStrategy.schedule}
            scheduleId={selectedStrategy.id}
          />

          <ExecutionLogsModal
            isOpen={showLogsModal}
            onClose={() => {
              setShowLogsModal(false)
              setSelectedStrategy(null)
            }}
            scheduledStrategy={selectedStrategy}
          />
        </>
      )}

      <ScheduleConfigModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        strategyId="1"
        strategyName="New Strategy"
      />
    </div>
  )
}
