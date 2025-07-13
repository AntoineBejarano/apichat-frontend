"use client"

import * as React from "react"
import { Plus, Play, Pause, Edit, Trash2, Zap, ArrowRight, Brain, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/contexts/language-context"
import { SchedulerProvider } from "@/contexts/scheduler-context"
import { SchedulerDashboard } from "@/components/scheduler/scheduler-dashboard"
import { ScheduleConfigModal } from "@/components/scheduler/schedule-config-modal"

const mockStrategies = [
  {
    id: "1",
    name: "Notion-GitHub Sync",
    description: "Automatically creates GitHub issues when tasks are added to Notion",
    active: true,
    functions: [
      { app: "Notion", function: "queryDatabase", order: 1 },
      { app: "GitHub", function: "createIssue", order: 2 },
      { app: "Notion", function: "updatePage", order: 3 },
    ],
    executions: 24,
    lastRun: "2 hours ago",
  },
  {
    id: "2",
    name: "Stripe Sales Report",
    description: "Generates weekly sales reports and sends them via email",
    active: false,
    functions: [
      { app: "Stripe", function: "listCharges", order: 1 },
      { app: "Email", function: "sendReport", order: 2 },
    ],
    executions: 8,
    lastRun: "1 week ago",
  },
]

export function StrategiesSection() {
  return (
    <SchedulerProvider>
      <StrategiesSectionContent />
    </SchedulerProvider>
  )
}

function StrategiesSectionContent() {
  const { t } = useLanguage()
  const [showScheduleModal, setShowScheduleModal] = React.useState(false)
  const [selectedStrategyForSchedule, setSelectedStrategyForSchedule] = React.useState<{
    id: string
    name: string
  } | null>(null)
  const [activeSchedulerTab, setActiveSchedulerTab] = React.useState("strategies")

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-800/60 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-apichat-accent to-emerald-500 shadow-lg ring-2 ring-apichat-accent/20">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">{t("strategies.title")}</h1>
                <p className="text-sm text-slate-400 font-medium">{t("strategies.subtitle")}</p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger>
                <Button className="bg-gradient-to-br from-apichat-lime to-apichat-accent hover:from-apichat-lime-light hover:to-apichat-accent text-slate-900 shadow-lg rounded-xl">
                  <Plus className="h-4 w-4 mr-2" />
                  {t("strategies.newStrategy")}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800/95 backdrop-blur-sm border-slate-700/50 text-white max-w-2xl rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">{t("strategies.createNew")}</DialogTitle>
                  <DialogDescription className="text-slate-400">{t("strategies.createDesc")}</DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="strategy-name" className="text-sm font-medium text-white">
                      {t("strategies.strategyName")}
                    </Label>
                    <Input
                      id="strategy-name"
                      placeholder={t("strategies.strategyNamePlaceholder")}
                      className="bg-slate-700/50 border-slate-600/50 text-white rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="strategy-description" className="text-sm font-medium text-white">
                      {t("strategies.description")}
                    </Label>
                    <Textarea
                      id="strategy-description"
                      placeholder={t("strategies.descriptionPlaceholder")}
                      className="bg-slate-700/50 border-slate-600/50 text-white rounded-xl min-h-20"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-white">{t("strategies.functionsToExecute")}</Label>
                    <Card className="bg-slate-700/50 border-slate-600/50 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-apichat-lime text-slate-900 flex items-center justify-center text-sm font-bold">
                            1
                          </div>
                          <span className="text-sm text-white">{t("strategies.selectFirstFunction")}</span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-600/50 text-slate-300 bg-transparent hover:bg-slate-600/30 rounded-lg"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </Card>
                  </div>
                  <Button className="w-full bg-gradient-to-br from-apichat-lime to-apichat-accent hover:from-apichat-lime-light hover:to-apichat-accent text-slate-900 rounded-xl h-12">
                    <Zap className="h-4 w-4 mr-2" />
                    {t("strategies.createStrategy")}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-2 mb-6">
              <Button
                variant={activeSchedulerTab === "strategies" ? "default" : "outline"}
                onClick={() => setActiveSchedulerTab("strategies")}
                className="rounded-xl"
              >
                Strategies
              </Button>
              <Button
                variant={activeSchedulerTab === "scheduler" ? "default" : "outline"}
                onClick={() => setActiveSchedulerTab("scheduler")}
                className="rounded-xl"
              >
                Scheduler
              </Button>
            </div>

            {activeSchedulerTab === "strategies" ? (
              <div className="grid gap-6">
                {mockStrategies.map((strategy) => (
                  <Card
                    key={strategy.id}
                    className="bg-slate-700/50 backdrop-blur-sm border-slate-600/30 rounded-2xl shadow-lg"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-apichat-lime to-apichat-accent shadow-lg">
                            <Zap className="h-6 w-6 text-slate-900" />
                          </div>
                          <div>
                            <CardTitle className="text-white text-lg font-semibold">{strategy.name}</CardTitle>
                            <p className="text-sm text-slate-400 mt-1">{strategy.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={strategy.active ? "default" : "secondary"}
                            className={`${strategy.active ? "bg-apichat-accent/20 text-apichat-accent border-apichat-accent/30" : "bg-slate-600/50 text-slate-400"} rounded-lg`}
                          >
                            {strategy.active ? t("apps.active") : t("apps.inactive")}
                          </Badge>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-slate-400 hover:text-white rounded-lg"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className={`h-8 w-8 rounded-lg ${strategy.active ? "text-red-400 hover:text-red-300" : "text-apichat-accent hover:text-apichat-lime"}`}
                          >
                            {strategy.active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-red-400 hover:text-red-300 rounded-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white rounded-xl shadow-lg"
                            onClick={() => {
                              setSelectedStrategyForSchedule({ id: strategy.id, name: strategy.name })
                              setShowScheduleModal(true)
                            }}
                          >
                            <Clock className="h-4 w-4 mr-2" />
                            Schedule
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Function Flow */}
                        <div>
                          <h4 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-apichat-blue-metallic" />
                            {t("strategies.functionFlow")}
                          </h4>
                          <div className="flex items-center gap-3 overflow-x-auto pb-2">
                            {strategy.functions.map((func, index) => (
                              <React.Fragment key={index}>
                                <div className="flex items-center gap-3 bg-slate-600/50 rounded-xl px-4 py-3 min-w-fit shadow-sm">
                                  <div className="h-6 w-6 rounded-full bg-apichat-blue-metallic text-white flex items-center justify-center text-xs font-bold">
                                    {func.order}
                                  </div>
                                  <div className="text-xs">
                                    <div className="text-white font-medium">{func.app}</div>
                                    <div className="text-slate-400 font-mono">{func.function}</div>
                                  </div>
                                </div>
                                {index < strategy.functions.length - 1 && (
                                  <ArrowRight className="h-4 w-4 text-slate-500 flex-shrink-0" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 border-t border-slate-600/30">
                          <div className="flex flex-wrap items-center gap-6 text-sm">
                            <span className="text-slate-400">
                              {t("strategies.executed")}{" "}
                              <span className="text-apichat-accent font-semibold">{strategy.executions}</span>{" "}
                              {t("strategies.times")}
                            </span>
                            <span className="text-slate-400">
                              {t("strategies.lastExecution")}:{" "}
                              <span className="text-white font-medium">{strategy.lastRun}</span>
                            </span>
                          </div>
                          <Button
                            size="sm"
                            className="bg-gradient-to-br from-apichat-blue-metallic to-blue-500 hover:from-blue-400 hover:to-blue-600 text-white rounded-xl shadow-lg"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            {t("strategies.executeNow")}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <SchedulerDashboard />
            )}
          </div>
        </div>
      </div>
      {selectedStrategyForSchedule && (
        <ScheduleConfigModal
          isOpen={showScheduleModal}
          onClose={() => {
            setShowScheduleModal(false)
            setSelectedStrategyForSchedule(null)
          }}
          strategyId={selectedStrategyForSchedule.id}
          strategyName={selectedStrategyForSchedule.name}
        />
      )}
    </div>
  )
}
