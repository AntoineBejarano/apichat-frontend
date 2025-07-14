"use client"

import * as React from "react"
import { X, UserPlus, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"

export function GuestBanner() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [isVisible, setIsVisible] = React.useState(true)

  if (!user?.isGuest || !isVisible) {
    return null
  }

  return (
    <div className="p-6 pb-0">
      <Card className="bg-gradient-to-r from-apichat-lime/10 to-apichat-accent/10 border-apichat-lime/30 rounded-2xl mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-apichat-lime to-apichat-accent flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 text-slate-900" />
              </div>
              <div>
                <h3 className="text-slate-900 font-semibold text-lg">{t("onboarding.guestWelcome")}</h3>
                <p className="text-slate-600 text-sm mt-1 max-w-2xl">{t("onboarding.guestMessage")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                className="bg-gradient-to-br from-apichat-lime to-apichat-accent hover:from-apichat-lime-light hover:to-apichat-accent text-slate-900 rounded-lg px-4 py-2"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                {t("onboarding.signUp")}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsVisible(false)}
                className="text-slate-500 hover:text-slate-700 rounded-lg h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
