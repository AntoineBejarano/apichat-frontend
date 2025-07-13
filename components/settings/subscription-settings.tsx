"use client"

import * as React from "react"
import { Crown, Zap, Check, X, Calendar, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"

export function SubscriptionSettings() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState(false)
  const [subscription, setSubscription] = React.useState({
    plan: "free", // "free" or "pro"
    renewalDate: "2024-02-15",
    tokensUsed: 1250,
    tokensLimit: 5000,
  })

  const handleUpgrade = async () => {
    setIsLoading(true)
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSubscription((prev) => ({ ...prev, plan: "pro", tokensLimit: -1 }))
      toast({
        title: t("common.success"),
        description: t("subscription.upgradeSuccess"),
      })
    } catch (error) {
      toast({
        title: t("common.error"),
        description: "Payment failed. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubscription((prev) => ({ ...prev, plan: "free", tokensLimit: 5000 }))
      toast({
        title: t("common.success"),
        description: t("subscription.cancelSuccess"),
      })
    } catch (error) {
      toast({
        title: t("common.error"),
        description: "Failed to cancel subscription.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const tokensPercentage =
    subscription.tokensLimit === -1 ? 0 : (subscription.tokensUsed / subscription.tokensLimit) * 100

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card className="bg-slate-700/50 backdrop-blur-sm border-slate-600/30 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-apichat-accent to-emerald-500 flex items-center justify-center">
              <Crown className="h-4 w-4 text-white" />
            </div>
            {t("subscription.title")}
          </CardTitle>
          <p className="text-slate-400 text-sm">{t("subscription.subtitle")}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge
                  variant={subscription.plan === "pro" ? "default" : "secondary"}
                  className={`text-sm px-3 py-1 rounded-lg ${
                    subscription.plan === "pro"
                      ? "bg-gradient-to-r from-apichat-accent to-emerald-500 text-white"
                      : "bg-slate-600/50 text-slate-300"
                  }`}
                >
                  {subscription.plan === "pro" ? t("subscription.proPlan") : t("subscription.freePlan")}
                </Badge>
                {subscription.plan === "pro" && (
                  <div className="flex items-center gap-1 text-apichat-accent text-sm">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {t("subscription.renews")} {subscription.renewalDate}
                    </span>
                  </div>
                )}
              </div>

              {/* Token Usage */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{t("subscription.tokens")}</span>
                  <span className="text-slate-400 text-sm">
                    {subscription.tokensLimit === -1
                      ? t("subscription.unlimited")
                      : `${subscription.tokensUsed.toLocaleString()} / ${subscription.tokensLimit.toLocaleString()}`}
                  </span>
                </div>
                {subscription.tokensLimit !== -1 && (
                  <div className="space-y-2">
                    <Progress value={tokensPercentage} className="h-2 bg-slate-600/50" />
                    <p className="text-xs text-slate-400">
                      {subscription.tokensLimit - subscription.tokensUsed > 0
                        ? `${(subscription.tokensLimit - subscription.tokensUsed).toLocaleString()} ${t("subscription.tokensRemaining")}`
                        : "Token limit reached"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              {subscription.plan === "free" ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-br from-apichat-lime to-apichat-accent hover:from-apichat-lime-light hover:to-apichat-accent text-slate-900 rounded-xl px-6">
                      <Crown className="h-4 w-4 mr-2" />
                      {t("subscription.upgrade")}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800/95 backdrop-blur-sm border-slate-700/50 text-white rounded-2xl max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold">{t("subscription.confirmUpgrade")}</DialogTitle>
                      <DialogDescription className="text-slate-400">
                        Upgrade to Pro for unlimited API calls and premium features.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="bg-slate-700/50 rounded-xl p-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-apichat-lime mb-2">{t("subscription.price")}</div>
                          <div className="text-slate-400 text-sm">Billed monthly</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-white">{t("subscription.features")}:</h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-apichat-accent" />
                            {t("subscription.feature1")}
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-apichat-accent" />
                            {t("subscription.feature2")}
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-apichat-accent" />
                            {t("subscription.feature3")}
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-apichat-accent" />
                            {t("subscription.feature4")}
                          </li>
                        </ul>
                      </div>
                      <Button
                        onClick={handleUpgrade}
                        disabled={isLoading}
                        className="w-full bg-gradient-to-br from-apichat-lime to-apichat-accent hover:from-apichat-lime-light hover:to-apichat-accent text-slate-900 rounded-xl h-12"
                      >
                        {isLoading ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent mr-2" />
                        ) : (
                          <Zap className="h-4 w-4 mr-2" />
                        )}
                        {t("subscription.upgrade")}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-slate-600/50 text-slate-300 hover:text-white bg-transparent hover:bg-slate-600/30 rounded-xl"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    {t("subscription.manage")}
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-red-400/50 text-red-400 hover:text-red-300 bg-transparent hover:bg-red-400/10 rounded-xl"
                      >
                        <X className="h-4 w-4 mr-2" />
                        {t("subscription.cancel")}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-800/95 backdrop-blur-sm border-slate-700/50 text-white rounded-2xl max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold">{t("subscription.confirmCancel")}</DialogTitle>
                        <DialogDescription className="text-slate-400">
                          Are you sure you want to cancel your Pro subscription? You'll lose access to premium features.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex gap-3 pt-4">
                        <Button
                          variant="outline"
                          className="flex-1 border-slate-600/50 text-slate-300 hover:text-white bg-transparent hover:bg-slate-600/30 rounded-xl"
                        >
                          {t("common.cancel")}
                        </Button>
                        <Button
                          onClick={handleCancel}
                          disabled={isLoading}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl"
                        >
                          {isLoading ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                          ) : (
                            <X className="h-4 w-4 mr-2" />
                          )}
                          {t("subscription.cancel")}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
