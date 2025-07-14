"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ChatSection } from "@/components/chat-section"
import { ApplicationsSection } from "@/components/applications-section"
import { DatabasesSection } from "@/components/databases-section"
import { AgentsSection } from "@/components/agents-section"
import { StrategiesSection } from "@/components/strategies-section"
import { HistorySection } from "@/components/history-section"
import { SettingsSection } from "@/components/settings-section"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"
import { GuestBanner } from "@/components/onboarding/guest-banner"
import { LanguageProvider } from "@/contexts/language-context"
import { AuthProvider, useAuth } from "@/contexts/auth-context"
import { SchedulerProvider } from "@/contexts/scheduler-context"

function APIchatContent() {
  const [activeTab, setActiveTab] = React.useState("chat")
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [selectedAgent, setSelectedAgent] = React.useState<string>("1")
  const [selectedApp, setSelectedApp] = React.useState<string>("")
  const [selectedDb, setSelectedDb] = React.useState<string>("")
  const { isAuthenticated, isLoading } = useAuth()

  const renderContent = () => {
    switch (activeTab) {
      case "chat":
        return (
          <ChatSection
            selectedAgent={selectedAgent}
            onAgentChange={setSelectedAgent}
            selectedApp={selectedApp}
            onAppChange={setSelectedApp}
            selectedDb={selectedDb}
            onDbChange={setSelectedDb}
          />
        )
      case "applications":
        return <ApplicationsSection />
      case "databases":
        return <DatabasesSection />
      case "agents":
        return <AgentsSection />
      case "strategies":
        return <StrategiesSection />
      case "history":
        return <HistorySection />
      case "settings":
        return <SettingsSection />
      default:
        return (
          <ChatSection
            selectedAgent={selectedAgent}
            onAgentChange={setSelectedAgent}
            selectedApp={selectedApp}
            onAppChange={setSelectedApp}
            selectedDb={selectedDb}
            onDbChange={setSelectedDb}
          />
        )
    }
  }

  // Show onboarding if not authenticated
  if (!isAuthenticated && !isLoading) {
    return <OnboardingFlow />
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-apichat-darker via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-apichat-lime to-apichat-accent flex items-center justify-center animate-pulse">
            <span className="text-xl font-bold text-slate-900">API</span>
          </div>
          <div className="text-white text-lg font-medium">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-apichat-darker via-slate-900 to-slate-800">
      <div className="app-layout">
        {/* Sidebar */}
        <div className={`app-sidebar ${!sidebarOpen ? "collapsed" : ""}`}>
          <AppSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        </div>

        {/* Main Content */}
        <div className={`app-main ${!sidebarOpen ? "sidebar-collapsed" : ""}`}>
          {/* Content */}
          <div className="app-content">
            <GuestBanner />
            <div className="flex-1 bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl overflow-hidden">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function APIchatApp() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <SchedulerProvider>
          <APIchatContent />
        </SchedulerProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}
