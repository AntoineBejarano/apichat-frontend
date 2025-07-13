"use client"

import * as React from "react"
import { Sparkles, MessageCircle, Settings, Brain, History, ArrowRight, Chrome } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { AuthModal } from "./auth-modal"

export function OnboardingFlow() {
  const { t } = useLanguage()
  const { signInWithGoogle, signInAsGuest, isLoading } = useAuth()
  const [showAuthModal, setShowAuthModal] = React.useState(false)
  const [authMode, setAuthMode] = React.useState<"signin" | "signup">("signin")

  const features = [
    {
      icon: MessageCircle,
      title: t("onboarding.feature1"),
      description: t("onboarding.feature1Desc"),
      color: "from-apichat-lime to-apichat-accent",
    },
    {
      icon: Settings,
      title: t("onboarding.feature2"),
      description: t("onboarding.feature2Desc"),
      color: "from-apichat-blue-metallic to-blue-500",
    },
    {
      icon: Brain,
      title: t("onboarding.feature3"),
      description: t("onboarding.feature3Desc"),
      color: "from-apichat-accent to-emerald-500",
    },
    {
      icon: History,
      title: t("onboarding.feature4"),
      description: t("onboarding.feature4Desc"),
      color: "from-purple-500 to-pink-500",
    },
  ]

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error("Google sign-in failed:", error)
    }
  }

  const handleGuestAccess = async () => {
    try {
      await signInAsGuest()
    } catch (error) {
      console.error("Guest access failed:", error)
    }
  }

  const handleEmailAuth = (mode: "signin" | "signup") => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-apichat-darker via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-apichat-lime to-apichat-accent flex items-center justify-center animate-pulse">
            <Sparkles className="h-8 w-8 text-slate-900" />
          </div>
          <div className="text-white text-lg font-medium">{t("onboarding.loading")}</div>
          <div className="flex justify-center">
            <div className="h-1 w-32 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-apichat-lime to-apichat-accent rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-apichat-darker via-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-apichat-lime to-apichat-blue-metallic shadow-2xl ring-4 ring-apichat-lime/20 flex items-center justify-center">
                <span className="text-xl font-bold text-slate-900">API</span>
              </div>
              <div className="text-left">
                <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">{t("onboarding.welcome")}</h1>
                <p className="text-lg text-apichat-lime font-medium">{t("onboarding.subtitle")}</p>
              </div>
            </div>
            <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">{t("onboarding.description")}</p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-slate-700/50 backdrop-blur-sm border-slate-600/30 rounded-2xl hover:bg-slate-600/50 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`h-16 w-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg flex items-center justify-center`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2 text-lg">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Auth Options */}
          <div className="max-w-md mx-auto">
            <Card className="bg-slate-700/50 backdrop-blur-sm border-slate-600/30 rounded-2xl shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">{t("onboarding.getStarted")}</h2>
                  <p className="text-slate-400">Choose how you'd like to continue</p>
                </div>

                <div className="space-y-4">
                  {/* Google Sign In */}
                  <Button
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 rounded-xl font-medium shadow-lg transition-all duration-200 hover:shadow-xl"
                  >
                    <Chrome className="h-5 w-5 mr-3" />
                    {t("onboarding.signInWithGoogle")}
                  </Button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-600/50" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-slate-700/50 text-slate-400 font-medium">{t("onboarding.or")}</span>
                    </div>
                  </div>

                  {/* Email Auth Options */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => handleEmailAuth("signin")}
                      variant="outline"
                      className="border-slate-600/50 text-slate-300 hover:text-white bg-transparent hover:bg-slate-600/30 rounded-xl"
                    >
                      {t("onboarding.signIn")}
                    </Button>
                    <Button
                      onClick={() => handleEmailAuth("signup")}
                      variant="outline"
                      className="border-apichat-lime/50 text-apichat-lime hover:text-apichat-lime-light bg-transparent hover:bg-apichat-lime/10 rounded-xl"
                    >
                      {t("onboarding.signUp")}
                    </Button>
                  </div>

                  {/* Guest Access */}
                  <div className="pt-4">
                    <Button
                      onClick={handleGuestAccess}
                      disabled={isLoading}
                      variant="ghost"
                      className="w-full h-12 text-slate-300 hover:text-white hover:bg-slate-600/30 rounded-xl transition-all duration-200 group"
                    >
                      <span className="mr-2">{t("onboarding.continueAsGuest")}</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <p className="text-xs text-slate-500 text-center mt-2">{t("onboarding.guestNote")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  )
}
