"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Paperclip, Mic, Square } from "lucide-react"

interface ChatInputProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  isLoading?: boolean
}

export function ChatInput({ input, handleInputChange, handleSubmit, isLoading }: ChatInputProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px"
    }
  }

  React.useEffect(() => {
    adjustTextareaHeight()
  }, [input])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <div className="border-t border-slate-700 bg-slate-800/50 p-4">
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
            className="min-h-[44px] max-h-[120px] resize-none bg-slate-700 border-slate-600 text-white placeholder-slate-400 pr-20"
            rows={1}
          />
          <div className="absolute right-2 bottom-2 flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-600"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-600"
            >
              <Mic className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-gradient-to-r from-apichat-lime to-apichat-accent text-slate-900 hover:from-apichat-lime/90 hover:to-apichat-accent/90 disabled:opacity-50"
        >
          {isLoading ? <Square className="h-4 w-4" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  )
}
