"use client"

import * as React from "react"
import { Eye, EyeOff, Mail, Lock, User, Chrome } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: "signin" | "signup"
  onModeChange: (mode: "signin" | "signup") => void
}

export function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const { t } = useLanguage()
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, isLoading } = useAuth()
  const { toast } = useToast()

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = t("auth.emailRequired")
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.password) {
      newErrors.password = t("auth.passwordRequired")
    } else if (formData.password.length < 8) {
      newErrors.password = t("auth.passwordTooShort")
    }

    if (mode === "signup") {
      if (!formData.name) {
        newErrors.name = "Name is required"
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = t("auth.passwordsDoNotMatch")
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      if (mode === "signin") {
        await signInWithEmail(formData.email, formData.password)
      } else {
        await signUpWithEmail(formData.email, formData.password, formData.name)
      }
      onClose()
    } catch (error) {
      toast({
        title: t("common.error"),
        description: mode === "signin" ? t("auth.signInError") : t("auth.signUpError"),
        variant: "destructive",
      })
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      onClose()
    } catch (error) {
      toast({
        title: t("common.error"),
        description: t("auth.signInError"),
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    })
    setErrors({})
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  React.useEffect(() => {
    if (isOpen) {
      resetForm()
    }
  }, [isOpen, mode])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800/95 backdrop-blur-sm border-slate-700/50 text-white rounded-2xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {mode === "signin" ? t("auth.signInTitle") : t("auth.signUpTitle")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Google Sign In */}
          <Button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 rounded-xl font-medium"
          >
            <Chrome className="h-5 w-5 mr-3" />
            {t("onboarding.signInWithGoogle")}
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600/50" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-800/95 text-slate-400 font-medium">{t("onboarding.or")}</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="pl-10 bg-slate-700/50 border-slate-600/50 text-white rounded-xl"
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">
                {t("auth.email")}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="pl-10 bg-slate-700/50 border-slate-600/50 text-white rounded-xl"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-medium">
                {t("auth.password")}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  className="pl-10 pr-10 bg-slate-700/50 border-slate-600/50 text-white rounded-xl"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
            </div>

            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white font-medium">
                  {t("auth.confirmPassword")}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                    className="pl-10 pr-10 bg-slate-700/50 border-slate-600/50 text-white rounded-xl"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword}</p>}
              </div>
            )}

            {mode === "signin" && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, rememberMe: !!checked }))}
                  />
                  <Label htmlFor="remember" className="text-sm text-slate-300">
                    {t("auth.rememberMe")}
                  </Label>
                </div>
                <Button variant="link" className="text-apichat-lime hover:text-apichat-lime-light p-0 h-auto">
                  {t("auth.forgotPassword")}
                </Button>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-br from-apichat-lime to-apichat-accent hover:from-apichat-lime-light hover:to-apichat-accent text-slate-900 rounded-xl font-medium"
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent mr-2" />
              ) : null}
              {mode === "signin" ? t("onboarding.signIn") : t("auth.createAccount")}
            </Button>
          </form>

          {/* Terms and Privacy */}
          {mode === "signup" && (
            <p className="text-xs text-slate-400 text-center leading-relaxed">{t("auth.termsAndPrivacy")}</p>
          )}

          {/* Switch Mode */}
          <div className="text-center">
            <span className="text-slate-400 text-sm">
              {mode === "signin" ? t("auth.dontHaveAccount") : t("auth.alreadyHaveAccount")}
            </span>
            <Button
              variant="link"
              onClick={() => onModeChange(mode === "signin" ? "signup" : "signin")}
              className="text-apichat-lime hover:text-apichat-lime-light p-0 ml-1 h-auto"
            >
              {mode === "signin" ? t("onboarding.signUp") : t("onboarding.signIn")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
