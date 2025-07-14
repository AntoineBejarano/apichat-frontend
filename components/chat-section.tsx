"use client"
import { useChat } from "@ai-sdk/react"
import { ChatHeader } from "./chat-header"
import { ChatInput } from "./chat-input"
import { CodeBlock } from "./ui/code-block"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, User, Copy, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatSectionProps {
  selectedAgent: string
  onAgentChange: (value: string) => void
  selectedApp: string
  onAppChange: (value: string) => void
  selectedDb: string
  onDbChange: (value: string) => void
}

export function ChatSection({
  selectedAgent,
  onAgentChange,
  selectedApp,
  onAppChange,
  selectedDb,
  onDbChange,
}: ChatSectionProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const renderMessage = (message: any) => {
    const isUser = message.role === "user"

    return (
      <div key={message.id} className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
        {!isUser && (
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-apichat-lime to-apichat-accent flex items-center justify-center">
              <Bot className="h-4 w-4 text-slate-900" />
            </div>
          </div>
        )}

        <div className={`max-w-[80%] ${isUser ? "order-first" : ""}`}>
          <Card
            className={`p-4 ${
              isUser
                ? "bg-gradient-to-r from-apichat-lime/20 to-apichat-accent/20 border-apichat-lime/30"
                : "bg-slate-800/50 border-slate-700"
            }`}
          >
            <div className="space-y-2">
              {message.content.includes("```") ? (
                <div className="space-y-2">
                  {message.content.split("```").map((part: string, index: number) => {
                    if (index % 2 === 1) {
                      const lines = part.split("\n")
                      const language = lines[0] || "text"
                      const code = lines.slice(1).join("\n")
                      return <CodeBlock key={index} language={language} code={code} />
                    }
                    return (
                      part && (
                        <p key={index} className="text-white whitespace-pre-wrap">
                          {part}
                        </p>
                      )
                    )
                  })}
                </div>
              ) : (
                <p className="text-white whitespace-pre-wrap">{message.content}</p>
              )}
            </div>

            {!isUser && (
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-600">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(message.content)}
                  className="h-6 px-2 text-slate-400 hover:text-white"
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-slate-400 hover:text-white">
                  <ThumbsUp className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-slate-400 hover:text-white">
                  <ThumbsDown className="h-3 w-3" />
                </Button>
                <Badge variant="secondary" className="ml-auto text-xs bg-slate-700 text-slate-300">
                  Agent: {selectedAgent}
                </Badge>
              </div>
            )}
          </Card>
        </div>

        {isUser && (
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-slate-600 flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <ChatHeader
        selectedAgent={selectedAgent}
        onAgentChange={onAgentChange}
        selectedApp={selectedApp}
        onAppChange={onAppChange}
        selectedDb={selectedDb}
        onDbChange={onDbChange}
      />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-apichat-lime to-apichat-accent flex items-center justify-center">
                <Bot className="h-8 w-8 text-slate-900" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Welcome to ApiChat</h3>
                <p className="text-slate-400 max-w-md">
                  Start a conversation with your AI assistant. Ask questions, request code, or get help with your
                  projects.
                </p>
              </div>
            </div>
          </div>
        ) : (
          messages.map(renderMessage)
        )}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-apichat-lime to-apichat-accent flex items-center justify-center">
                <Bot className="h-4 w-4 text-slate-900" />
              </div>
            </div>
            <Card className="p-4 bg-slate-800/50 border-slate-700">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-apichat-lime rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-apichat-lime rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 bg-apichat-lime rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
                <span className="text-slate-400 text-sm">AI is thinking...</span>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  )
}
