"use client"

import * as React from "react"
import { Bell, Mail, Smartphone, TrendingUp, Shield, CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useLanguage } from "@/contexts/language-context"

export function NotificationSettings() {
  const { t } = useLanguage()
  const [notifications, setNotifications] = React.useState({
    email: true,
    push: true,
    marketing: false,
    security: true,
    billing: true,
    updates: true,
  })

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const notificationItems = [
    {
      key: "email" as const,
      icon: Mail,
      title: t("notifications.email"),
      description: "Receive email notifications for important updates",
    },
    {
      key: "push" as const,
      icon: Smartphone,
      title: t("notifications.push"),
      description: "Receive push notifications on your devices",
    },
    {
      key: "marketing" as const,
      icon: TrendingUp,
      title: t("notifications.marketing"),
      description: "Receive marketing communications and product announcements",
    },
    {
      key: "security" as const,
      icon: Shield,
      title: t("notifications.security"),
      description: "Receive alerts about security events and login attempts",
    },
    {
      key: "billing" as const,
      icon: CreditCard,
      title: t("notifications.billing"),
      description: "Receive notifications about billing and payment updates",
    },
    {
      key: "updates" as const,
      icon: Bell,
      title: t("notifications.updates"),
      description: "Receive notifications about new features and improvements",
    },
  ]

  return (
    <Card className="bg-slate-700/50 backdrop-blur-sm border-slate-600/30 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
            <Bell className="h-4 w-4 text-white" />
          </div>
          {t("notifications.title")}
        </CardTitle>
        <p className="text-slate-400 text-sm">{t("notifications.subtitle")}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {notificationItems.map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-slate-600/50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-slate-300" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </div>
              </div>
              <Switch checked={notifications[item.key]} onCheckedChange={() => handleToggle(item.key)} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
