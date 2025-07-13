"use client"

import { Menu, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AppHeaderProps {
  onToggleSidebar: () => void
  sidebarOpen: boolean
}

const mockNotifications = [
  {
    id: "1",
    title: "Strategy Execution Completed",
    description: "Notion-GitHub Sync executed successfully",
    time: "2 min ago",
    type: "success",
    unread: true,
  },
  {
    id: "2",
    title: "API Rate Limit Warning",
    description: "GitHub API approaching rate limit (80% used)",
    time: "15 min ago",
    type: "warning",
    unread: true,
  },
  {
    id: "3",
    title: "New Integration Available",
    description: "Slack API integration is now available",
    time: "1 hour ago",
    type: "info",
    unread: false,
  },
  {
    id: "4",
    title: "Scheduled Strategy Failed",
    description: "Stripe Sales Report failed to execute",
    time: "2 hours ago",
    type: "error",
    unread: false,
  },
  {
    id: "5",
    title: "Monthly Usage Report",
    description: "Your API usage summary for this month",
    time: "1 day ago",
    type: "info",
    unread: false,
  },
]

export function AppHeader({ onToggleSidebar, sidebarOpen }: AppHeaderProps) {
  const unreadCount = mockNotifications.filter((n) => n.unread).length

  const getNotificationIcon = (type: string) => {
    const baseClasses = "h-2 w-2 rounded-full"
    switch (type) {
      case "success":
        return <div className={`${baseClasses} bg-apichat-accent`} />
      case "warning":
        return <div className={`${baseClasses} bg-yellow-400`} />
      case "error":
        return <div className={`${baseClasses} bg-red-400`} />
      default:
        return <div className={`${baseClasses} bg-apichat-blue-metallic`} />
    }
  }

  const formatTime = (time: string) => {
    return time
  }

  return (
    <header className="h-16 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left side - Mobile menu button */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="h-9 w-9 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 lg:hidden"
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </div>

        {/* Center - Empty space */}
        <div className="flex-1" />

        {/* Right side - Notifications */}
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs font-bold bg-gradient-to-r from-red-500 to-red-600 border-0 shadow-lg"
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </Badge>
                )}
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 bg-slate-800/95 backdrop-blur-md border-slate-700/50 rounded-xl shadow-2xl"
            >
              <DropdownMenuLabel className="text-white font-semibold px-4 py-3 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <Badge
                      variant="secondary"
                      className="bg-apichat-accent/20 text-apichat-accent border-apichat-accent/30 text-xs"
                    >
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
              </DropdownMenuLabel>

              <ScrollArea className="max-h-96">
                <div className="py-2">
                  {mockNotifications.map((notification, index) => (
                    <div key={notification.id}>
                      <DropdownMenuItem className="px-4 py-3 cursor-pointer hover:bg-slate-700/50 focus:bg-slate-700/50 rounded-none">
                        <div className="flex items-start gap-3 w-full">
                          <div className="mt-2">{getNotificationIcon(notification.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4
                                className={`text-sm font-medium leading-tight ${
                                  notification.unread ? "text-white" : "text-slate-300"
                                }`}
                              >
                                {notification.title}
                              </h4>
                              {notification.unread && (
                                <div className="h-2 w-2 rounded-full bg-apichat-accent flex-shrink-0 mt-1" />
                              )}
                            </div>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{notification.description}</p>
                            <span className="text-xs text-slate-500 mt-2 block">{formatTime(notification.time)}</span>
                          </div>
                        </div>
                      </DropdownMenuItem>
                      {index < mockNotifications.length - 1 && (
                        <DropdownMenuSeparator className="bg-slate-700/30 mx-4" />
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <DropdownMenuSeparator className="bg-slate-700/50" />
              <div className="p-2">
                <Button
                  variant="ghost"
                  className="w-full text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg text-sm"
                >
                  View all notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
