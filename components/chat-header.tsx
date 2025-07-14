"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Bot, Database, Zap } from "lucide-react"

interface ChatHeaderProps {
  selectedAgent: string
  onAgentChange: (value: string) => void
  selectedApp: string
  onAppChange: (value: string) => void
  selectedDb: string
  onDbChange: (value: string) => void
}

export function ChatHeader({
  selectedAgent,
  onAgentChange,
  selectedApp,
  onAppChange,
  selectedDb,
  onDbChange,
}: ChatHeaderProps) {
  const agents = [
    { id: "1", name: "General Assistant", description: "Multi-purpose AI assistant" },
    { id: "2", name: "Code Expert", description: "Specialized in programming" },
    { id: "3", name: "Data Analyst", description: "Database and analytics focused" },
    { id: "4", name: "API Specialist", description: "API integration expert" },
  ]

  const applications = [
    { id: "slack", name: "Slack", status: "connected" },
    { id: "github", name: "GitHub", status: "connected" },
    { id: "jira", name: "Jira", status: "disconnected" },
    { id: "notion", name: "Notion", status: "connected" },
  ]

  const databases = [
    { id: "postgres", name: "PostgreSQL", status: "connected" },
    { id: "mysql", name: "MySQL", status: "connected" },
    { id: "mongodb", name: "MongoDB", status: "disconnected" },
    { id: "redis", name: "Redis", status: "connected" },
  ]

  return (
    <div className="border-b border-slate-700 bg-slate-800/50 p-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Agent Selection */}
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-apichat-lime" />
          <Select value={selectedAgent} onValueChange={onAgentChange}>
            <SelectTrigger className="w-48 bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Select Agent" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              {agents.map((agent) => (
                <SelectItem key={agent.id} value={agent.id} className="text-white hover:bg-slate-700">
                  <div>
                    <div className="font-medium">{agent.name}</div>
                    <div className="text-xs text-slate-400">{agent.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Application Selection */}
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-blue-400" />
          <Select value={selectedApp} onValueChange={onAppChange}>
            <SelectTrigger className="w-48 bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Select Application" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              {applications.map((app) => (
                <SelectItem key={app.id} value={app.id} className="text-white hover:bg-slate-700">
                  <div className="flex items-center justify-between w-full">
                    <span>{app.name}</span>
                    <Badge
                      variant={app.status === "connected" ? "default" : "secondary"}
                      className={
                        app.status === "connected" ? "bg-green-500/20 text-green-400" : "bg-slate-500/20 text-slate-400"
                      }
                    >
                      {app.status}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Database Selection */}
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-purple-400" />
          <Select value={selectedDb} onValueChange={onDbChange}>
            <SelectTrigger className="w-48 bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Select Database" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              {databases.map((db) => (
                <SelectItem key={db.id} value={db.id} className="text-white hover:bg-slate-700">
                  <div className="flex items-center justify-between w-full">
                    <span>{db.name}</span>
                    <Badge
                      variant={db.status === "connected" ? "default" : "secondary"}
                      className={
                        db.status === "connected" ? "bg-green-500/20 text-green-400" : "bg-slate-500/20 text-slate-400"
                      }
                    >
                      {db.status}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
