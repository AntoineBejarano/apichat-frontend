"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  isGuest: boolean
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signInWithGoogle: () => Promise<void>
  signInAsGuest: () => Promise<void>
  signOut: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string, name: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem("apichat-user")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error("Failed to restore user session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signInWithGoogle = async () => {
    setIsLoading(true)
    try {
      // Simulate Google OAuth flow
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const googleUser: User = {
        id: "google_" + Math.random().toString(36).substr(2, 9),
        name: "John Doe",
        email: "john.doe@gmail.com",
        avatar: "/placeholder.svg?height=100&width=100&text=JD",
        isGuest: false,
        createdAt: new Date(),
      }

      setUser(googleUser)
      localStorage.setItem("apichat-user", JSON.stringify(googleUser))
    } catch (error) {
      throw new Error("Google sign-in failed")
    } finally {
      setIsLoading(false)
    }
  }

  const signInAsGuest = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const guestUser: User = {
        id: "guest_" + Math.random().toString(36).substr(2, 9),
        name: "Guest",
        email: "",
        isGuest: true,
        createdAt: new Date(),
      }

      setUser(guestUser)
      localStorage.setItem("apichat-user", JSON.stringify(guestUser))
    } catch (error) {
      throw new Error("Guest sign-in failed")
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate email/password authentication
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const emailUser: User = {
        id: "email_" + Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0],
        email,
        isGuest: false,
        createdAt: new Date(),
      }

      setUser(emailUser)
      localStorage.setItem("apichat-user", JSON.stringify(emailUser))
    } catch (error) {
      throw new Error("Email sign-in failed")
    } finally {
      setIsLoading(false)
    }
  }

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      // Simulate email/password registration
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newUser: User = {
        id: "email_" + Math.random().toString(36).substr(2, 9),
        name,
        email,
        isGuest: false,
        createdAt: new Date(),
      }

      setUser(newUser)
      localStorage.setItem("apichat-user", JSON.stringify(newUser))
    } catch (error) {
      throw new Error("Email sign-up failed")
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setUser(null)
      localStorage.removeItem("apichat-user")
    } catch (error) {
      console.error("Sign out failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signInWithGoogle,
    signInAsGuest,
    signOut,
    signInWithEmail,
    signUpWithEmail,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
