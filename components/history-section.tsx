"use client"

import * as React from "react"
import { Search, MessageCircle, Bot, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"

const mockConversations = [
  {
    id: "1",
    title: "Creating pages in Notion",
    date: "2024-01-15",
    time: "10:30 AM",
    app: "Notion API",
    messages: 8,
    functions: 3,
    status: "completed",
  },
  {
    id: "2",
    title: "Managing GitHub issues",
    date: "2024-01-15",
    time: "09:15 AM",
    app: "GitHub API",
    messages: 12,
    functions: 5,
    status: "completed",
  },
  {
    id: "3",
    title: "Stripe sales analysis",
    date: "2024-01-14",
    time: "16:45 PM",
    app: "Stripe API",
    messages: 6,
    functions: 2,
    status: "error",
  },
  {
    id: "4",
    title: "Data synchronization",
    date: "2024-01-14",
    time: "14:20 PM",
    app: "Multiple APIs",
    messages: 15,
    functions: 8,
    status: "completed",
  },
]

export function HistorySection() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedApp, setSelectedApp] = React.useState("all")
  const [selectedDate, setSelectedDate] = React.useState("all")
  const { t } = useLanguage()

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-800/60 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg ring-2 ring-purple-500/20">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">{t("history.title")}</h1>
              <p className="text-sm text-slate-400 font-medium">{t("history.subtitle")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">{t("history.title")}</h1>
                  <p className="text-sm text-slate-400">{t("history.subtitle")}</p>
                </div>
              </div>
            </div>

            {/* Filters */}
            <Card className="bg-slate-700/50 backdrop-blur-sm border-slate-600/30 mb-8 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder={t("history.search")}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-slate-600/50 border-slate-500/50 text-white placeholder:text-slate-400 rounded-xl"
                      />
                    </div>
                  </div>
                  <Select value={selectedApp} onValueChange={setSelectedApp}>
                    <SelectTrigger className="w-full md:w-56 bg-slate-600/50 border-slate-500/50 text-white rounded-xl">
                      <SelectValue placeholder={t("history.filterByApp")} />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-600/95 backdrop-blur-sm border-slate-500/50 rounded-xl">
                      <SelectItem value="all" className="text-white hover:bg-slate-500/50 rounded-lg">
                        {t("history.allApps")}
                      </SelectItem>
                      <SelectItem value="notion" className="text-white hover:bg-slate-500/50 rounded-lg">
                        Notion API
                      </SelectItem>
                      <SelectItem value="github" className="text-white hover:bg-slate-500/50 rounded-lg">
                        GitHub API
                      </SelectItem>
                      <SelectItem value="stripe" className="text-white hover:bg-slate-500/50 rounded-lg">
                        Stripe API
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedDate} onValueChange={setSelectedDate}>
                    <SelectTrigger className="w-full md:w-48 bg-slate-600/50 border-slate-500/50 text-white rounded-xl">
                      <SelectValue placeholder={t("history.filterByDate")} />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-600/95 backdrop-blur-sm border-slate-500/50 rounded-xl">
                      <SelectItem value="all" className="text-white hover:bg-slate-500/50 rounded-lg">
                        {t("history.allDates")}
                      </SelectItem>
                      <SelectItem value="today" className="text-white hover:bg-slate-500/50 rounded-lg">
                        {t("history.today")}
                      </SelectItem>
                      <SelectItem value="week" className="text-white hover:bg-slate-500/50 rounded-lg">
                        {t("history.thisWeek")}
                      </SelectItem>
                      <SelectItem value="month" className="text-white hover:bg-slate-500/50 rounded-lg">
                        {t("history.thisMonth")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Conversations List */}
            <div className="space-y-4">
              {mockConversations.map((conversation) => (
                <Card
                  key={conversation.id}
                  className="bg-slate-700/50 backdrop-blur-sm border-slate-600/30 hover:bg-slate-600/50 cursor-pointer transition-all duration-200 hover:shadow-lg rounded-2xl"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-apichat-blue-metallic to-apichat-accent shadow-lg">
                          <MessageCircle className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-white text-base font-semibold">{conversation.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="h-3 w-3 text-slate-400" />
                            <span className="text-xs text-slate-400">
                              {conversation.date} • {conversation.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`text-xs rounded-lg ${
                            conversation.status === "completed"
                              ? "border-apichat-accent text-apichat-accent bg-apichat-accent/10"
                              : conversation.status === "error"
                                ? "border-red-400 text-red-400 bg-red-400/10"
                                : "border-yellow-400 text-yellow-400 bg-yellow-400/10"
                          }`}
                        >
                          {conversation.status === "completed"
                            ? t("history.completed")
                            : conversation.status === "error"
                              ? t("history.error")
                              : t("history.inProgress")}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          <span>
                            {conversation.messages} {t("history.messages")}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bot className="h-3 w-3" />
                          <span>
                            {conversation.functions} {t("history.functions")}
                          </span>
                        </div>
                        <Badge variant="secondary" className="bg-slate-600/50 text-slate-300 text-xs rounded-lg">
                          {conversation.app}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600/50 text-slate-300 hover:text-white hover:bg-slate-600/30 bg-transparent rounded-xl"
                      >
                        {t("history.viewConversation")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                className="border-slate-600/50 text-slate-300 hover:text-white hover:bg-slate-700/50 bg-transparent rounded-xl px-8"
              >
                {t("history.loadMore")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
