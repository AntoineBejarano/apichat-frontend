"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"

export type ScheduleFrequency = "hourly" | "daily" | "weekly" | "monthly" | "custom"
export type ScheduleStatus = "active" | "paused" | "error" | "completed"

export interface ScheduleConfig {
  frequency: ScheduleFrequency
  interval: number // For custom frequency (minutes)
  specificTime?: string // HH:MM format for daily/weekly
  dayOfWeek?: number // 0-6 for weekly (0 = Sunday)
  dayOfMonth?: number // 1-31 for monthly
  timezone: string
}

export interface ScheduledStrategy {
  id: string
  strategyId: string
  strategyName: string
  schedule: ScheduleConfig
  status: ScheduleStatus
  nextExecution: Date
  lastExecution?: Date
  executionCount: number
  successCount: number
  errorCount: number
  retryCount: number
  maxRetries: number
  createdAt: Date
  updatedAt: Date
}

export interface ExecutionLog {
  id: string
  scheduledStrategyId: string
  executedAt: Date
  status: "success" | "error" | "timeout"
  duration: number // milliseconds
  result?: any
  error?: string
  retryAttempt: number
}

interface SchedulerContextType {
  scheduledStrategies: ScheduledStrategy[]
  executionLogs: ExecutionLog[]
  isLoading: boolean
  createSchedule: (strategyId: string, strategyName: string, schedule: ScheduleConfig) => Promise<void>
  updateSchedule: (id: string, schedule: Partial<ScheduleConfig>) => Promise<void>
  pauseSchedule: (id: string) => Promise<void>
  resumeSchedule: (id: string) => Promise<void>
  deleteSchedule: (id: string) => Promise<void>
  executeNow: (id: string) => Promise<void>
  getExecutionLogs: (scheduledStrategyId: string) => ExecutionLog[]
  clearLogs: (scheduledStrategyId: string) => Promise<void>
}

const SchedulerContext = createContext<SchedulerContextType | undefined>(undefined)

export function SchedulerProvider({ children }: { children: React.ReactNode }) {
  const [scheduledStrategies, setScheduledStrategies] = useState<ScheduledStrategy[]>([])
  const [executionLogs, setExecutionLogs] = useState<ExecutionLog[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock data initialization
  useEffect(() => {
    const mockScheduledStrategies: ScheduledStrategy[] = [
      {
        id: "sched_1",
        strategyId: "1",
        strategyName: "Notion-GitHub Sync",
        schedule: {
          frequency: "daily",
          interval: 1,
          specificTime: "09:00",
          timezone: "Europe/Madrid",
        },
        status: "active",
        nextExecution: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        lastExecution: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
        executionCount: 15,
        successCount: 14,
        errorCount: 1,
        retryCount: 0,
        maxRetries: 3,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
      {
        id: "sched_2",
        strategyId: "2",
        strategyName: "Stripe Sales Report",
        schedule: {
          frequency: "weekly",
          interval: 1,
          specificTime: "08:00",
          dayOfWeek: 1, // Monday
          timezone: "Europe/Madrid",
        },
        status: "paused",
        nextExecution: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        lastExecution: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        executionCount: 4,
        successCount: 4,
        errorCount: 0,
        retryCount: 0,
        maxRetries: 3,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    ]

    const mockExecutionLogs: ExecutionLog[] = [
      {
        id: "log_1",
        scheduledStrategyId: "sched_1",
        executedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        status: "success",
        duration: 2340,
        result: { processed: 5, created: 3, updated: 2 },
        retryAttempt: 0,
      },
      {
        id: "log_2",
        scheduledStrategyId: "sched_1",
        executedAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
        status: "error",
        duration: 1200,
        error: "API rate limit exceeded",
        retryAttempt: 1,
      },
      {
        id: "log_3",
        scheduledStrategyId: "sched_2",
        executedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        status: "success",
        duration: 4560,
        result: { reportGenerated: true, emailsSent: 3 },
        retryAttempt: 0,
      },
    ]

    setScheduledStrategies(mockScheduledStrategies)
    setExecutionLogs(mockExecutionLogs)
  }, [])

  const calculateNextExecution = (schedule: ScheduleConfig, lastExecution?: Date): Date => {
    const now = new Date()
    const base = lastExecution || now

    switch (schedule.frequency) {
      case "hourly":
        return new Date(base.getTime() + 60 * 60 * 1000)
      case "daily":
        const daily = new Date(base)
        daily.setDate(daily.getDate() + 1)
        if (schedule.specificTime) {
          const [hours, minutes] = schedule.specificTime.split(":").map(Number)
          daily.setHours(hours, minutes, 0, 0)
        }
        return daily
      case "weekly":
        const weekly = new Date(base)
        weekly.setDate(weekly.getDate() + 7)
        if (schedule.specificTime) {
          const [hours, minutes] = schedule.specificTime.split(":").map(Number)
          weekly.setHours(hours, minutes, 0, 0)
        }
        return weekly
      case "monthly":
        const monthly = new Date(base)
        monthly.setMonth(monthly.getMonth() + 1)
        if (schedule.dayOfMonth) {
          monthly.setDate(schedule.dayOfMonth)
        }
        if (schedule.specificTime) {
          const [hours, minutes] = schedule.specificTime.split(":").map(Number)
          monthly.setHours(hours, minutes, 0, 0)
        }
        return monthly
      case "custom":
        return new Date(base.getTime() + schedule.interval * 60 * 1000)
      default:
        return new Date(now.getTime() + 60 * 60 * 1000)
    }
  }

  const createSchedule = async (strategyId: string, strategyName: string, schedule: ScheduleConfig) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newSchedule: ScheduledStrategy = {
        id: "sched_" + Math.random().toString(36).substr(2, 9),
        strategyId,
        strategyName,
        schedule,
        status: "active",
        nextExecution: calculateNextExecution(schedule),
        executionCount: 0,
        successCount: 0,
        errorCount: 0,
        retryCount: 0,
        maxRetries: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      setScheduledStrategies((prev) => [...prev, newSchedule])
    } catch (error) {
      throw new Error("Failed to create schedule")
    } finally {
      setIsLoading(false)
    }
  }

  const updateSchedule = async (id: string, scheduleUpdate: Partial<ScheduleConfig>) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      setScheduledStrategies((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            const updatedSchedule = { ...item.schedule, ...scheduleUpdate }
            return {
              ...item,
              schedule: updatedSchedule,
              nextExecution: calculateNextExecution(updatedSchedule, item.lastExecution),
              updatedAt: new Date(),
            }
          }
          return item
        }),
      )
    } catch (error) {
      throw new Error("Failed to update schedule")
    } finally {
      setIsLoading(false)
    }
  }

  const pauseSchedule = async (id: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))

      setScheduledStrategies((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status: "paused" as ScheduleStatus,
                updatedAt: new Date(),
              }
            : item,
        ),
      )
    } catch (error) {
      throw new Error("Failed to pause schedule")
    } finally {
      setIsLoading(false)
    }
  }

  const resumeSchedule = async (id: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))

      setScheduledStrategies((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status: "active" as ScheduleStatus,
                nextExecution: calculateNextExecution(item.schedule),
                updatedAt: new Date(),
              }
            : item,
        ),
      )
    } catch (error) {
      throw new Error("Failed to resume schedule")
    } finally {
      setIsLoading(false)
    }
  }

  const deleteSchedule = async (id: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      setScheduledStrategies((prev) => prev.filter((item) => item.id !== id))
      setExecutionLogs((prev) => prev.filter((log) => log.scheduledStrategyId !== id))
    } catch (error) {
      throw new Error("Failed to delete schedule")
    } finally {
      setIsLoading(false)
    }
  }

  const executeNow = async (id: string) => {
    setIsLoading(true)
    try {
      const startTime = Date.now()
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate execution

      const duration = Date.now() - startTime
      const success = Math.random() > 0.2 // 80% success rate

      const newLog: ExecutionLog = {
        id: "log_" + Math.random().toString(36).substr(2, 9),
        scheduledStrategyId: id,
        executedAt: new Date(),
        status: success ? "success" : "error",
        duration,
        result: success ? { processed: Math.floor(Math.random() * 10) + 1 } : undefined,
        error: success ? undefined : "Execution failed",
        retryAttempt: 0,
      }

      setExecutionLogs((prev) => [newLog, ...prev])

      setScheduledStrategies((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                lastExecution: new Date(),
                nextExecution: calculateNextExecution(item.schedule, new Date()),
                executionCount: item.executionCount + 1,
                successCount: success ? item.successCount + 1 : item.successCount,
                errorCount: success ? item.errorCount : item.errorCount + 1,
                updatedAt: new Date(),
              }
            : item,
        ),
      )
    } catch (error) {
      throw new Error("Failed to execute strategy")
    } finally {
      setIsLoading(false)
    }
  }

  const getExecutionLogs = useCallback(
    (scheduledStrategyId: string) => {
      return executionLogs
        .filter((log) => log.scheduledStrategyId === scheduledStrategyId)
        .sort((a, b) => b.executedAt.getTime() - a.executedAt.getTime())
    },
    [executionLogs],
  )

  const clearLogs = async (scheduledStrategyId: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))
      setExecutionLogs((prev) => prev.filter((log) => log.scheduledStrategyId !== scheduledStrategyId))
    } catch (error) {
      throw new Error("Failed to clear logs")
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    scheduledStrategies,
    executionLogs,
    isLoading,
    createSchedule,
    updateSchedule,
    pauseSchedule,
    resumeSchedule,
    deleteSchedule,
    executeNow,
    getExecutionLogs,
    clearLogs,
  }

  return <SchedulerContext.Provider value={value}>{children}</SchedulerContext.Provider>
}

export function useScheduler() {
  const context = useContext(SchedulerContext)
  if (context === undefined) {
    throw new Error("useScheduler must be used within a SchedulerProvider")
  }
  return context
}
