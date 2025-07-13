"use client"

import * as React from "react"
import { Camera, Upload, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"

export function ProfileSettings() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState(false)
  const [profile, setProfile] = React.useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=100&width=100&text=JD",
  })

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: t("common.success"),
        description: t("profile.saved"),
      })
    } catch (error) {
      toast({
        title: t("common.error"),
        description: t("profile.error"),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfile((prev) => ({ ...prev, avatar: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card className="bg-slate-700/50 backdrop-blur-sm border-slate-600/30 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-apichat-blue-metallic to-blue-500 flex items-center justify-center">
            <Camera className="h-4 w-4 text-white" />
          </div>
          {t("profile.title")}
        </CardTitle>
        <p className="text-slate-400 text-sm">{t("profile.subtitle")}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24 ring-4 ring-slate-600/50">
              <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
              <AvatarFallback className="bg-gradient-to-br from-apichat-blue-metallic to-blue-500 text-white text-lg font-semibold">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2">
              <label htmlFor="avatar-upload" className="cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-apichat-lime hover:bg-apichat-lime-light transition-colors flex items-center justify-center shadow-lg">
                  <Camera className="h-4 w-4 text-slate-900" />
                </div>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-white font-semibold">{t("profile.avatar")}</h3>
            <p className="text-slate-400 text-sm">{t("profile.uploadAvatar")}</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="border-slate-600/50 text-slate-300 hover:text-white bg-transparent hover:bg-slate-600/30 rounded-lg"
                onClick={() => document.getElementById("avatar-upload")?.click()}
              >
                <Upload className="h-3 w-3 mr-1" />
                {t("profile.changeAvatar")}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-red-400/50 text-red-400 hover:text-red-300 bg-transparent hover:bg-red-400/10 rounded-lg"
                onClick={() => setProfile((prev) => ({ ...prev, avatar: "" }))}
              >
                <X className="h-3 w-3 mr-1" />
                {t("profile.removeAvatar")}
              </Button>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white font-medium">
              {t("profile.name")}
            </Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
              className="bg-slate-600/50 border-slate-500/50 text-white rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white font-medium">
              {t("profile.email")}
            </Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
              className="bg-slate-600/50 border-slate-500/50 text-white rounded-xl"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-gradient-to-br from-apichat-lime to-apichat-accent hover:from-apichat-lime-light hover:to-apichat-accent text-slate-900 rounded-xl px-8"
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent mr-2" />
            ) : (
              <Check className="h-4 w-4 mr-2" />
            )}
            {t("profile.save")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
