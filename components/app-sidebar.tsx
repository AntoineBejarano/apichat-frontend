"use client"
import { MessageCircle, Settings, Brain, History, ChevronDown, Globe, X, Zap, Database, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"

const navigation = [
  { title: "nav.chat", icon: MessageCircle, id: "chat" },
  { title: "nav.applications", icon: Settings, id: "applications" },
  { title: "nav.databases", icon: Database, id: "databases" },
  { title: "nav.agents", icon: Bot, id: "agents" },
  { title: "nav.strategies", icon: Brain, id: "strategies" },
  { title: "nav.history", icon: History, id: "history" },
  { title: "settings.title", icon: Settings, id: "settings" },
]

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
]

interface AppSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  isOpen: boolean
  onClose: () => void
}

export function AppSidebar({ activeTab, onTabChange, isOpen, onClose }: AppSidebarProps) {
  const { language, setLanguage, t } = useLanguage()
  const { user, signOut } = useAuth()

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-slate-700/50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-apichat-lime via-apichat-accent to-apichat-blue-metallic shadow-xl ring-2 ring-apichat-lime/30">
                <Zap className="h-6 w-6 text-slate-900" />
              </div>
              <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white tracking-tight bg-gradient-to-r from-apichat-lime to-apichat-accent bg-clip-text text-transparent">
                APIchat
              </span>
              <span className="text-xs text-slate-400 font-medium">AI-Powered Integration</span>
            </div>
          </div>

          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700/60 rounded-lg transition-all duration-200 lg:hidden"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close Sidebar</span>
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {navigation.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all duration-200 rounded-xl h-12 px-4 font-medium",
                activeTab === item.id &&
                  "bg-gradient-to-r from-apichat-lime/20 to-apichat-blue-metallic/20 text-apichat-lime border border-apichat-lime/30 shadow-lg",
              )}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span className="font-medium">{t(item.title)}</span>
            </Button>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700/50 p-4 space-y-3">
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all duration-200 rounded-xl h-11 px-4"
            >
              <Globe className="h-4 w-4 mr-3" />
              <span className="text-sm font-medium flex-1 text-left">
                {languages.find((l) => l.code === language)?.name}
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            side="top"
            className="w-48 bg-slate-800/95 backdrop-blur-md border-slate-700/50 rounded-xl shadow-xl"
          >
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => setLanguage(lang.code as any)}
                className="text-slate-300 hover:text-white hover:bg-slate-700/60 cursor-pointer rounded-lg mx-1"
              >
                <span className="mr-3 text-base">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all duration-200 rounded-xl h-11 px-4"
            >
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-apichat-blue-metallic to-apichat-accent ring-2 ring-apichat-blue-metallic/30 mr-3 flex items-center justify-center text-xs font-bold text-white">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium flex-1 text-left truncate">{user?.name || t("common.user")}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            side="top"
            className="w-48 bg-slate-800/95 backdrop-blur-md border-slate-700/50 rounded-xl shadow-xl"
          >
            <DropdownMenuItem
              onClick={() => onTabChange("settings")}
              className="text-slate-300 hover:text-white hover:bg-slate-700/60 cursor-pointer rounded-lg mx-1"
            >
              <span className="font-medium">{t("common.settings")}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700/50 mx-1" />
            <DropdownMenuItem
              onClick={() => signOut()}
              className="text-slate-300 hover:text-white hover:bg-slate-700/60 cursor-pointer rounded-lg mx-1"
            >
              <span className="font-medium">{t("common.logout")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
