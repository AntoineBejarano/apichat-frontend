"use client"

import * as React from "react"
import { Send, Paperclip, Mic, Square, Database, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/language-context"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  type?: "text" | "code" | "error"
}

const mockMessages: Message[] = [
  {
    id: "1",
    content:
      "Hello! I'm your AI assistant. I can help you interact with your APIs and databases through natural language. What would you like to do today?",
    role: "assistant",
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    type: "text",
  },
  {
    id: "2",
    content: "Can you show me the latest users from my database?",
    role: "user",
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    type: "text",
  },
  {
    id: "3",
    content:
      "I'll help you retrieve the latest users from your database. Let me execute a query for you:\n\n```sql\nSELECT * FROM users ORDER BY created_at DESC LIMIT 10;\n```\n\nHere are the results:\n- John Doe (john@example.com) - Created 2 hours ago\n- Jane Smith (jane@example.com) - Created 5 hours ago\n- Mike Johnson (mike@example.com) - Created 1 day ago",
    role: "assistant",
    timestamp: new Date(Date.now() - 7 * 60 * 1000),
    type: "code",
  },
]

const applications = [
  { id: "ecommerce", name: "E-commerce API", status: "connected" },
  { id: "crm", name: "CRM System", status: "connected" },
  { id: "analytics", name: "Analytics API", status: "disconnected" },
]

const databases = [
  { id: "postgres", name: "PostgreSQL Main", type: "PostgreSQL", status: "connected" },
  { id: "redis", name: "Redis Cache", type: "Redis", status: "connected" },
  { id: "mongo", name: "MongoDB Logs", type: "MongoDB", status: "disconnected" },
]

export function ChatSection() {
  const { t } = useLanguage()
  const [messages, setMessages] = React.useState<Message[]>(mockMessages)
  const [inputValue, setInputValue] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedApp, setSelectedApp] = React.useState<string>("")
  const [selectedDb, setSelectedDb] = React.useState<string>("")
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand your request. Let me process that for you...",
        role: "assistant",
        timestamp: new Date(),
        type: "text",
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getMessageTypeColor = (type?: string) => {
    switch (type) {
      case "code":
        return "border-l-apichat-lime"
      case "error":
        return "border-l-red-400"
      default:
        return "border-l-apichat-blue-metallic"
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header with selectors */}
      <div className="flex-shrink-0 p-4 md:p-6 border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white mb-2">AI Chat Interface</h1>
            <p className="text-sm text-slate-400">
              Connect to your applications and databases through natural language
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Application Selector */}
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-apichat-lime flex-shrink-0" />
              <Select value={selectedApp} onValueChange={setSelectedApp}>
                <SelectTrigger className="w-full sm:w-[180px] bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Select App" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {applications.map((app) => (
                    <SelectItem key={app.id} value={app.id} className="text-white hover:bg-slate-700">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            app.status === "connected" ? "bg-apichat-accent" : "bg-red-400"
                          }`}
                        />
                        <span className="truncate">{app.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Database Selector */}
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-apichat-blue-metallic flex-shrink-0" />
              <Select value={selectedDb} onValueChange={setSelectedDb}>
                <SelectTrigger className="w-full sm:w-[180px] bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Select DB" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {databases.map((db) => (
                    <SelectItem key={db.id} value={db.id} className="text-white hover:bg-slate-700">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            db.status === "connected" ? "bg-apichat-accent" : "bg-red-400"
                          }`}
                        />
                        <div className="flex flex-col">
                          <span className="text-sm truncate">{db.name}</span>
                          <span className="text-xs text-slate-400">{db.type}</span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 md:p-6 space-y-4 pb-20">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] md:max-w-[70%] ${
                    message.role === "user"
                      ? "bg-apichat-lime/20 border border-apichat-lime/30"
                      : `bg-slate-800/50 border border-slate-700/50 border-l-4 ${getMessageTypeColor(message.type)}`
                  } rounded-xl p-4`}
                >
                  <div className="flex items-start gap-3">
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-apichat-lime to-apichat-accent flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-slate-900">AI</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-sm font-medium ${
                            message.role === "user" ? "text-apichat-lime" : "text-white"
                          }`}
                        >
                          {message.role === "user" ? "You" : "AI Assistant"}
                        </span>
                        {message.type && message.type !== "text" && (
                          <Badge
                            variant="secondary"
                            className={`text-xs ${
                              message.type === "code"
                                ? "bg-apichat-lime/20 text-apichat-lime"
                                : "bg-red-400/20 text-red-400"
                            }`}
                          >
                            {message.type}
                          </Badge>
                        )}
                        <span className="text-xs text-slate-500">{formatTime(message.timestamp)}</span>
                      </div>
                      <div
                        className={`text-sm leading-relaxed ${
                          message.role === "user" ? "text-slate-200" : "text-slate-300"
                        }`}
                      >
                        {message.content.split("\n").map((line, index) => (
                          <div key={index}>
                            {line.startsWith("```") ? (
                              <code className="block bg-slate-900/50 p-2 rounded text-apichat-lime text-xs font-mono mt-2 mb-2 overflow-x-auto">
                                {line.replace(/```\w*/, "")}
                              </code>
                            ) : (
                              <span>{line}</span>
                            )}
                            {index < message.content.split("\n").length - 1 && <br />}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800/50 border border-slate-700/50 border-l-4 border-l-apichat-blue-metallic rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-apichat-lime to-apichat-accent flex items-center justify-center animate-pulse">
                      <span className="text-xs font-bold text-slate-900">AI</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-apichat-lime rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-apichat-lime rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-apichat-lime rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 p-4 md:p-6 border-t border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
        <div className="flex gap-2 md:gap-4">
          <div className="flex-1">
            <div className="relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your APIs or databases..."
                className="w-full bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 pr-12 md:pr-20 py-3 md:py-4 text-sm md:text-base"
                disabled={isLoading}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-600/50"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-600/50 hidden md:flex"
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-to-r from-apichat-lime to-apichat-accent hover:from-apichat-lime/80 hover:to-apichat-accent/80 text-slate-900 font-medium px-4 md:px-6 py-3 md:py-4 h-auto"
          >
            {isLoading ? <Square className="h-4 w-4" /> : <Send className="h-4 w-4" />}
            <span className="ml-2 hidden sm:inline">{isLoading ? "Stop" : "Send"}</span>
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs bg-slate-700/30 border-slate-600 text-slate-300 hover:bg-slate-600/50 hover:text-white"
            onClick={() => setInputValue("Show me the latest database entries")}
          >
            Latest entries
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs bg-slate-700/30 border-slate-600 text-slate-300 hover:bg-slate-600/50 hover:text-white"
            onClick={() => setInputValue("What APIs are currently connected?")}
          >
            Connected APIs
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs bg-slate-700/30 border-slate-600 text-slate-300 hover:bg-slate-600/50 hover:text-white"
            onClick={() => setInputValue("Generate a report of user activity")}
          >
            User report
          </Button>
        </div>
      </div>
    </div>
  )
}
