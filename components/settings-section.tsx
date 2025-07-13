"use client"

import * as React from "react"
import { Settings, User, CreditCard, Shield, Bell, Crown } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/contexts/language-context"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { SubscriptionSettings } from "@/components/settings/subscription-settings"
import { BillingSettings } from "@/components/settings/billing-settings"
import { SecuritySettings } from "@/components/settings/security-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"

export function SettingsSection() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = React.useState("profile")

  return (
    <div className="content-section">
      {/* Header */}
      <div className="section-header">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg ring-2 ring-purple-500/20">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">{t("settings.title")}</h1>
              <p className="text-sm text-slate-400 font-medium">{t("settings.subtitle")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section-body custom-scrollbar">
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-slate-700/50 backdrop-blur-sm border-slate-600/30 rounded-2xl p-1">
                <TabsTrigger
                  value="profile"
                  className="flex items-center gap-2 text-slate-300 data-[state=active]:bg-slate-600/60 data-[state=active]:text-white rounded-xl transition-all"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("settings.profile")}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="subscription"
                  className="flex items-center gap-2 text-slate-300 data-[state=active]:bg-slate-600/60 data-[state=active]:text-white rounded-xl transition-all"
                >
                  <Crown className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("settings.subscription")}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="billing"
                  className="flex items-center gap-2 text-slate-300 data-[state=active]:bg-slate-600/60 data-[state=active]:text-white rounded-xl transition-all"
                >
                  <CreditCard className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("settings.billing")}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="flex items-center gap-2 text-slate-300 data-[state=active]:bg-slate-600/60 data-[state=active]:text-white rounded-xl transition-all"
                >
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("settings.security")}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="flex items-center gap-2 text-slate-300 data-[state=active]:bg-slate-600/60 data-[state=active]:text-white rounded-xl transition-all"
                >
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("settings.notifications")}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <ProfileSettings />
              </TabsContent>

              <TabsContent value="subscription" className="space-y-6">
                <SubscriptionSettings />
              </TabsContent>

              <TabsContent value="billing" className="space-y-6">
                <BillingSettings />
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <SecuritySettings />
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <NotificationSettings />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
