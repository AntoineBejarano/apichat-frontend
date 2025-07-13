"use client"

import * as React from "react"
import { Clock, Calendar, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { useScheduler, type ScheduleConfig, type ScheduleFrequency } from "@/contexts/scheduler-context"
import { useToast } from "@/hooks/use-toast"

interface ScheduleConfigModalProps {
  isOpen: boolean
  onClose: () => void
  strategyId: string
  strategyName: string
  existingSchedule?: ScheduleConfig
  scheduleId?: string
}

export function ScheduleConfigModal({
  isOpen,
  onClose,
  strategyId,
  strategyName,
  existingSchedule,
  scheduleId,
}: ScheduleConfigModalProps) {
  const { t } = useLanguage()
  const { createSchedule, updateSchedule, isLoading } = useScheduler()
  const { toast } = useToast()

  const [config, setConfig] = React.useState<ScheduleConfig>({
    frequency: "daily",
    interval: 1,
    specificTime: "09:00",
    timezone: "Europe/Madrid",
  })

  React.useEffect(() => {
    if (existingSchedule) {
      setConfig(existingSchedule)
    } else {
      setConfig({
        frequency: "daily",
        interval: 1,
        specificTime: "09:00",
        timezone: "Europe/Madrid",
      })
    }
  }, [existingSchedule, isOpen])

  const handleFrequencyChange = (frequency: ScheduleFrequency) => {
    setConfig((prev) => ({
      ...prev,
      frequency,
      // Reset specific fields based on frequency
      specificTime: frequency === "hourly" ? undefined : prev.specificTime || "09:00",
      dayOfWeek: frequency === "weekly" ? 1 : undefined,
      dayOfMonth: frequency === "monthly" ? 1 : undefined,
      interval: frequency === "custom" ? 60 : 1,
    }))
  }

  const handleSave = async () => {
    try {
      if (scheduleId) {
        await updateSchedule(scheduleId, config)
        toast({
          title: t("common.success"),
          description: "Schedule updated successfully",
        })
      } else {
        await createSchedule(strategyId, strategyName, config)
        toast({
          title: t("common.success"),
          description: "Schedule created successfully",
        })
      }
      onClose()
    } catch (error) {
      toast({
        title: t("common.error"),
        description: "Failed to save schedule",
        variant: "destructive",
      })
    }
  }

  const getFrequencyDescription = () => {
    switch (config.frequency) {
      case "hourly":
        return "Executes every hour"
      case "daily":
        return `Executes daily at ${config.specificTime || "09:00"}`
      case "weekly":
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        return `Executes weekly on ${days[config.dayOfWeek || 1]} at ${config.specificTime || "09:00"}`
      case "monthly":
        return `Executes monthly on day ${config.dayOfMonth || 1} at ${config.specificTime || "09:00"}`
      case "custom":
        return `Executes every ${config.interval} minutes`
      default:
        return ""
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800/95 backdrop-blur-sm border-slate-700/50 text-white rounded-2xl max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-apichat-accent to-emerald-500 flex items-center justify-center">
              <Clock className="h-4 w-4 text-white" />
            </div>
            {scheduleId ? "Edit Schedule" : "Create Schedule"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Strategy Info */}
          <Card className="bg-slate-700/50 border-slate-600/30 rounded-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-base">{strategyName}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-slate-400 text-sm">Configure when this strategy should be executed automatically</p>
            </CardContent>
          </Card>

          {/* Frequency Selection */}
          <div className="space-y-4">
            <Label className="text-white font-medium">Execution Frequency</Label>
            <Select value={config.frequency} onValueChange={handleFrequencyChange}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-white rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700/95 backdrop-blur-sm border-slate-600/50 rounded-xl">
                <SelectItem value="hourly" className="text-white hover:bg-slate-600/50 rounded-lg">
                  Hourly
                </SelectItem>
                <SelectItem value="daily" className="text-white hover:bg-slate-600/50 rounded-lg">
                  Daily
                </SelectItem>
                <SelectItem value="weekly" className="text-white hover:bg-slate-600/50 rounded-lg">
                  Weekly
                </SelectItem>
                <SelectItem value="monthly" className="text-white hover:bg-slate-600/50 rounded-lg">
                  Monthly
                </SelectItem>
                <SelectItem value="custom" className="text-white hover:bg-slate-600/50 rounded-lg">
                  Custom Interval
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Specific Time (for daily, weekly, monthly) */}
          {(config.frequency === "daily" || config.frequency === "weekly" || config.frequency === "monthly") && (
            <div className="space-y-2">
              <Label className="text-white font-medium">Execution Time</Label>
              <Input
                type="time"
                value={config.specificTime || "09:00"}
                onChange={(e) => setConfig((prev) => ({ ...prev, specificTime: e.target.value }))}
                className="bg-slate-700/50 border-slate-600/50 text-white rounded-xl"
              />
            </div>
          )}

          {/* Day of Week (for weekly) */}
          {config.frequency === "weekly" && (
            <div className="space-y-2">
              <Label className="text-white font-medium">Day of Week</Label>
              <Select
                value={config.dayOfWeek?.toString() || "1"}
                onValueChange={(value) => setConfig((prev) => ({ ...prev, dayOfWeek: Number.parseInt(value) }))}
              >
                <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-white rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700/95 backdrop-blur-sm border-slate-600/50 rounded-xl">
                  <SelectItem value="0" className="text-white hover:bg-slate-600/50 rounded-lg">
                    Sunday
                  </SelectItem>
                  <SelectItem value="1" className="text-white hover:bg-slate-600/50 rounded-lg">
                    Monday
                  </SelectItem>
                  <SelectItem value="2" className="text-white hover:bg-slate-600/50 rounded-lg">
                    Tuesday
                  </SelectItem>
                  <SelectItem value="3" className="text-white hover:bg-slate-600/50 rounded-lg">
                    Wednesday
                  </SelectItem>
                  <SelectItem value="4" className="text-white hover:bg-slate-600/50 rounded-lg">
                    Thursday
                  </SelectItem>
                  <SelectItem value="5" className="text-white hover:bg-slate-600/50 rounded-lg">
                    Friday
                  </SelectItem>
                  <SelectItem value="6" className="text-white hover:bg-slate-600/50 rounded-lg">
                    Saturday
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Day of Month (for monthly) */}
          {config.frequency === "monthly" && (
            <div className="space-y-2">
              <Label className="text-white font-medium">Day of Month</Label>
              <Input
                type="number"
                min="1"
                max="31"
                value={config.dayOfMonth || 1}
                onChange={(e) => setConfig((prev) => ({ ...prev, dayOfMonth: Number.parseInt(e.target.value) }))}
                className="bg-slate-700/50 border-slate-600/50 text-white rounded-xl"
              />
            </div>
          )}

          {/* Custom Interval (for custom) */}
          {config.frequency === "custom" && (
            <div className="space-y-2">
              <Label className="text-white font-medium">Interval (minutes)</Label>
              <Input
                type="number"
                min="1"
                value={config.interval}
                onChange={(e) => setConfig((prev) => ({ ...prev, interval: Number.parseInt(e.target.value) }))}
                className="bg-slate-700/50 border-slate-600/50 text-white rounded-xl"
              />
            </div>
          )}

          {/* Timezone */}
          <div className="space-y-2">
            <Label className="text-white font-medium">Timezone</Label>
            <Select
              value={config.timezone}
              onValueChange={(value) => setConfig((prev) => ({ ...prev, timezone: value }))}
            >
              <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-white rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700/95 backdrop-blur-sm border-slate-600/50 rounded-xl">
                <SelectItem value="Europe/Madrid" className="text-white hover:bg-slate-600/50 rounded-lg">
                  Europe/Madrid (CET)
                </SelectItem>
                <SelectItem value="America/New_York" className="text-white hover:bg-slate-600/50 rounded-lg">
                  America/New_York (EST)
                </SelectItem>
                <SelectItem value="America/Los_Angeles" className="text-white hover:bg-slate-600/50 rounded-lg">
                  America/Los_Angeles (PST)
                </SelectItem>
                <SelectItem value="Europe/London" className="text-white hover:bg-slate-600/50 rounded-lg">
                  Europe/London (GMT)
                </SelectItem>
                <SelectItem value="Asia/Tokyo" className="text-white hover:bg-slate-600/50 rounded-lg">
                  Asia/Tokyo (JST)
                </SelectItem>
                <SelectItem value="UTC" className="text-white hover:bg-slate-600/50 rounded-lg">
                  UTC
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preview */}
          <Card className="bg-slate-600/30 border-slate-500/30 rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-apichat-accent" />
                <span className="text-white font-medium text-sm">Schedule Preview</span>
              </div>
              <p className="text-slate-300 text-sm">{getFrequencyDescription()}</p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-slate-600/50 text-slate-300 hover:text-white bg-transparent hover:bg-slate-600/30 rounded-xl"
            >
              <X className="h-4 w-4 mr-2" />
              {t("common.cancel")}
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-br from-apichat-lime to-apichat-accent hover:from-apichat-lime-light hover:to-apichat-accent text-slate-900 rounded-xl"
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {scheduleId ? t("common.update") : t("common.save")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
