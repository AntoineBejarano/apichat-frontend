"use client"

import * as React from "react"
import { Key, Smartphone, Monitor, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"

const mockSessions = [
  {
    id: "1",
    device: "MacBook Pro",
    location: "Madrid, Spain",
    lastActive: "Active now",
    current: true,
  },
  {
    id: "2",
    device: "iPhone 15",
    location: "Madrid, Spain",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: "3",
    device: "Chrome on Windows",
    location: "Barcelona, Spain",
    lastActive: "1 day ago",
    current: false,
  },
]

export function SecuritySettings() {
  const { t } = useLanguage()
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false)

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <Card className="bg-slate-700/50 backdrop-blur-sm border-slate-600/30 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
              <Key className="h-4 w-4 text-white" />
            </div>
            {t("security.title")}
          </CardTitle>
          <p className="text-slate-400 text-sm">{t("security.subtitle")}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-white font-semibold">{t("security.changePassword")}</h3>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-white">
                  {t("security.currentPassword")}
                </Label>
                <Input
                  id="current-password"
                  type="password"
                  className="bg-slate-600/50 border-slate-500/50 text-white rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-white">
                  {t("security.newPassword")}
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  className="bg-slate-600/50 border-slate-500/50 text-white rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-white">
                  {t("security.confirmPassword")}
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  className="bg-slate-600/50 border-slate-500/50 text-white rounded-xl"
                />
              </div>
            </div>
            <Button className="bg-gradient-to-br from-apichat-lime to-apichat-accent hover:from-apichat-lime-light hover:to-apichat-accent text-slate-900 rounded-xl">
              {t("common.update")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className="bg-slate-700/50 backdrop-blur-sm border-slate-600/30 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-apichat-accent to-emerald-500 flex items-center justify-center">
              <Smartphone className="h-4 w-4 text-white" />
            </div>
            {t("security.twoFactor")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold mb-1">{t("security.twoFactor")}</h3>
              <p className="text-slate-400 text-sm">Add an extra layer of security to your account</p>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
              <Button
                variant="outline"
                size="sm"
                className="border-slate-600/50 text-slate-300 hover:text-white bg-transparent hover:bg-slate-600/30 rounded-lg"
              >
                {twoFactorEnabled ? t("security.disable2FA") : t("security.enable2FA")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card className="bg-slate-700/50 backdrop-blur-sm border-slate-600/30 rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-apichat-blue-metallic to-blue-500 flex items-center justify-center">
                <Monitor className="h-4 w-4 text-white" />
              </div>
              {t("security.sessions")}
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="border-red-400/50 text-red-400 hover:text-red-300 bg-transparent hover:bg-red-400/10 rounded-lg"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              {t("security.terminateAll")}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 bg-slate-600/50 rounded-xl border border-slate-500/50"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                    <Monitor className="h-5 w-5 text-slate-300" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{session.device}</span>
                      {session.current && (
                        <Badge
                          variant="secondary"
                          className="bg-apichat-accent/20 text-apichat-accent border-apichat-accent/30 text-xs"
                        >
                          Current
                        </Badge>
                      )}
                    </div>
                    <div className="text-slate-400 text-sm">
                      {session.location} • {session.lastActive}
                    </div>
                  </div>
                </div>
                {!session.current && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-400/50 text-red-400 hover:text-red-300 bg-transparent hover:bg-red-400/10 rounded-lg"
                  >
                    {t("security.terminateSession")}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
