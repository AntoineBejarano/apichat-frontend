"use client"

import * as React from "react"
import { Send, Bot, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"

const mockApplications = [
  { id: "notion", name: "Notion API", endpoints: 12, active: true },
  { id: "github", name: "GitHub API", endpoints: 8, active: true },
  { id: "stripe", name: "Stripe API", endpoints: 15, active: false },
]

const mockMessages = [
  {
    id: 1,
    type: "user" as const,
    content: "Create a new page in Notion with the title 'APIchat Project'",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    type: "assistant" as const,
    content:
      "Perfect! I'll create a new page in Notion for you. Executing the `createPage` function from the Notion API...",
    timestamp: "10:30 AM",
    functionCall: {
      name: "notion.createPage",
      parameters: { title: "APIchat Project", parent: "workspace" },
      result: "Page created successfully with ID: page_123",
    },
  },
]

export function ChatSection() {
  const [message, setMessage] = React.useState("")
  const [selectedApp, setSelectedApp] = React.useState("notion")
  const [isTyping, setIsTyping] = React.useState(false)
  const { t } = useLanguage()
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!message.trim()) return
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessage("")
    }, 2000)
  }

  return (
    <div className="content-section">
      {/* Header */}
      <div className="section-header">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-apichat-lime to-apichat-accent shadow-lg ring-2 ring-apichat-lime/20">
                <Sparkles className="h-6 w-6 text-slate-900" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">{t("chat.title")}</h1>
                <p className="text-sm text-slate-400 font-medium">{t("chat.subtitle")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-400 font-medium hidden lg:inline">{t("chat.activeApp")}:</span>
              <Select value={selectedApp} onValueChange={setSelectedApp}>
                <SelectTrigger className="w-full lg:w-64 bg-slate-700/60 border-slate-600/50 text-white backdrop-blur-sm rounded-xl h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700/95 backdrop-blur-md border-slate-600/50 rounded-xl">
                  {mockApplications.map((app) => (
                    <SelectItem key={app.id} value={app.id} className="text-white hover:bg-slate-600/60 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{app.name}</span>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-apichat-accent/20 text-apichat-accent border-apichat-accent/30 rounded-md"
                        >
                          {app.endpoints} {t("apps.endpoints")}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="section-body custom-scrollbar flex-1">
        <div className="p-6 h-full">
          <div className="max-w-4xl mx-auto space-y-6 h-full flex flex-col justify-end">
            {mockMessages.map((msg) => (
              <div key={msg.id} className={`flex gap-4 ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-4 max-w-3xl ${msg.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full shadow-lg ring-2 flex-shrink-0 ${
                      msg.type === "user"
                        ? "bg-gradient-to-br from-apichat-blue-metallic to-blue-500 ring-apichat-blue-metallic/30"
                        : "bg-gradient-to-br from-apichat-lime to-apichat-accent ring-apichat-lime/30"
                    }`}
                  >
                    {msg.type === "user" ? (
                      <User className="h-5 w-5 text-white" />
                    ) : (
                      <Bot className="h-5 w-5 text-slate-900" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-5 py-4 shadow-lg backdrop-blur-sm ${
                      msg.type === "user"
                        ? "bg-gradient-to-br from-apichat-blue-metallic to-blue-500 text-white"
                        : "bg-slate-700/80 text-white border border-slate-600/30"
                    }`}
                  >
                    <p className="text-sm leading-relaxed font-medium">{msg.content}</p>
                    {msg.functionCall && (
                      <Card className="mt-4 bg-slate-600/60 border-slate-500/50 backdrop-blur-sm rounded-xl">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xs text-apichat-lime font-semibold">
                            {t("chat.functionExecuted")}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2 text-xs">
                            <div>
                              <span className="text-slate-400">{t("chat.function")}:</span>{" "}
                              <code className="text-white font-mono bg-slate-800/60 px-2 py-1 rounded-md">
                                {msg.functionCall.name}
                              </code>
                            </div>
                            <div>
                              <span className="text-slate-400">{t("chat.result")}:</span>{" "}
                              <span className="text-apichat-accent font-semibold">{msg.functionCall.result}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    <span className="text-xs text-slate-400 mt-3 block opacity-70">{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="section-footer">
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={onSubmit} className="flex gap-4">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("chat.placeholder")}
                className="flex-1 bg-slate-700/60 border-slate-600/50 text-white placeholder:text-slate-400 rounded-xl h-12 px-4"
                disabled={isTyping}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isTyping || !message.trim()}
                className="bg-gradient-to-br from-apichat-lime to-apichat-accent hover:from-apichat-lime-light hover:to-apichat-accent text-slate-900 rounded-xl h-12 w-12 shadow-lg"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
