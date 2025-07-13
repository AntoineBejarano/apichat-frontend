"use client"
import { Activity, CheckCircle, XCircle, Clock, Trash2, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLanguage } from "@/contexts/language-context"
import { useScheduler, type ScheduledStrategy } from "@/contexts/scheduler-context"
import { useToast } from "@/hooks/use-toast"

interface ExecutionLogsModalProps {
  isOpen: boolean
  onClose: () => void
  scheduledStrategy: ScheduledStrategy
}

export function ExecutionLogsModal({ isOpen, onClose, scheduledStrategy }: ExecutionLogsModalProps) {
  const { t } = useLanguage()
  const { getExecutionLogs, clearLogs, isLoading } = useScheduler()
  const { toast } = useToast()

  const logs = getExecutionLogs(scheduledStrategy.id)

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`
    }
    return `${seconds}s`
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-apichat-accent" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-400" />
      case "timeout":
        return <Clock className="h-4 w-4 text-yellow-400" />
      default:
        return <Activity className="h-4 w-4 text-slate-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-apichat-accent/20 text-apichat-accent border-apichat-accent/30"
      case "error":
        return "bg-red-400/20 text-red-400 border-red-400/30"
      case "timeout":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
      default:
        return "bg-slate-600/50 text-slate-400"
    }
  }

  const handleClearLogs = async () => {
    try {
      await clearLogs(scheduledStrategy.id)
      toast({
        title: t("common.success"),
        description: "Execution logs cleared successfully",
      })
    } catch (error) {
      toast({
        title: t("common.error"),
        description: "Failed to clear logs",
        variant: "destructive",
      })
    }
  }

  const handleExportLogs = () => {
    const csvContent = [
      "Timestamp,Status,Duration,Result,Error,Retry Attempt",
      ...logs.map((log) =>
        [
          log.executedAt.toISOString(),
          log.status,
          log.duration,
          log.result ? JSON.stringify(log.result) : "",
          log.error || "",
          log.retryAttempt,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${scheduledStrategy.strategyName}_execution_logs.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: t("common.success"),
      description: "Logs exported successfully",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800/95 backdrop-blur-sm border-slate-700/50 text-white rounded-2xl max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Activity className="h-4 w-4 text-white" />
              </div>
              Execution Logs - {scheduledStrategy.strategyName}
            </DialogTitle>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleExportLogs}
                disabled={logs.length === 0}
                className="border-slate-600/50 text-slate-300 hover:text-white bg-transparent hover:bg-slate-600/30 rounded-lg"
              >
                <Download className="h-3 w-3 mr-1" />
                Export
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleClearLogs}
                disabled={isLoading || logs.length === 0}
                className="border-red-400/50 text-red-400 hover:text-red-300 bg-transparent hover:bg-red-400/10 rounded-lg"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Clear
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="bg-slate-700/50 border-slate-600/30 rounded-xl">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-white">{logs.length}</div>
                <div className="text-xs text-slate-400">Total Runs</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-700/50 border-slate-600/30 rounded-xl">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-apichat-accent">
                  {logs.filter((l) => l.status === "success").length}
                </div>
                <div className="text-xs text-slate-400">Successful</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-700/50 border-slate-600/30 rounded-xl">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-red-400">{logs.filter((l) => l.status === "error").length}</div>
                <div className="text-xs text-slate-400">Failed</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-700/50 border-slate-600/30 rounded-xl">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-white">
                  {logs.length > 0 ? formatDuration(logs.reduce((sum, l) => sum + l.duration, 0) / logs.length) : "0ms"}
                </div>
                <div className="text-xs text-slate-400">Avg Duration</div>
              </CardContent>
            </Card>
          </div>

          {/* Logs List */}
          <ScrollArea className="h-96">
            <div className="space-y-3 pr-4">
              {logs.map((log) => (
                <Card key={log.id} className="bg-slate-600/50 border-slate-500/50 rounded-xl">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">{getStatusIcon(log.status)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className={`text-xs rounded-lg ${getStatusColor(log.status)}`}>
                              {log.status}
                            </Badge>
                            <span className="text-slate-400 text-sm">{formatDate(log.executedAt)}</span>
                            <span className="text-slate-400 text-sm">•</span>
                            <span className="text-slate-400 text-sm">{formatDuration(log.duration)}</span>
                            {log.retryAttempt > 0 && (
                              <>
                                <span className="text-slate-400 text-sm">•</span>
                                <div className="flex items-center gap-1">
                                  <RefreshCw className="h-3 w-3 text-yellow-400" />
                                  <span className="text-yellow-400 text-sm">Retry {log.retryAttempt}</span>
                                </div>
                              </>
                            )}
                          </div>

                          {log.result && (
                            <div className="bg-slate-700/50 rounded-lg p-3 mb-2">
                              <div className="text-xs text-slate-400 mb-1">Result:</div>
                              <pre className="text-xs text-apichat-accent font-mono overflow-x-auto">
                                {JSON.stringify(log.result, null, 2)}
                              </pre>
                            </div>
                          )}

                          {log.error && (
                            <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-3">
                              <div className="text-xs text-red-400 mb-1">Error:</div>
                              <div className="text-sm text-red-300 font-mono">{log.error}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {logs.length === 0 && (
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 mx-auto mb-3 text-slate-500" />
                  <h3 className="text-white font-semibold mb-1">No Execution Logs</h3>
                  <p className="text-slate-400 text-sm">This strategy hasn't been executed yet</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
