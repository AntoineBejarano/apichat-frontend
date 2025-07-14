"use client"

import * as React from "react"
import { Bot, Plus, Edit, Trash2, Power, PowerOff, Copy, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useLanguage } from "@/contexts/language-context"

interface Agent {
  id: string
  name: string
  description: string
  systemPrompt: string
  personality: string
  model: string
  temperature: number
  maxTokens: number
  isActive: boolean
  createdAt: Date
  lastUsed?: Date
  usageCount: number
}

const personalityColors = {
  professional: "from-blue-500 to-blue-600",
  creative: "from-purple-500 to-pink-500",
  analytical: "from-green-500 to-teal-500",
  friendly: "from-yellow-500 to-orange-500",
  casual: "from-indigo-500 to-purple-500",
  formal: "from-gray-600 to-gray-700",
}

const defaultFormData: Omit<Agent, "id" | "createdAt" | "usageCount"> = {
  name: "",
  description: "",
  systemPrompt: "",
  personality: "professional",
  model: "gpt-4",
  temperature: 0.7,
  maxTokens: 2048,
  isActive: true,
  lastUsed: undefined,
}

const AgentForm = React.memo(
  ({
    formData,
    onFormChange,
    onSubmit,
    onCancel,
    isEditing = false,
  }: {
    formData: Omit<Agent, "id" | "createdAt" | "usageCount">
    onFormChange: (field: string, value: any) => void
    onSubmit: () => void
    onCancel: () => void
    isEditing?: boolean
  }) => {
    const { t } = useLanguage()

    const updateFormField = React.useCallback(
      (field: string, value: any) => {
        onFormChange(field, value)
      },
      [onFormChange],
    )

    const handleSubmit = React.useCallback(
      (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit()
      },
      [onSubmit],
    )

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Agent Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateFormField("name", e.target.value)}
              placeholder="e.g., Technical Assistant"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="personality">Personality</Label>
            <Select value={formData.personality} onValueChange={(value) => updateFormField("personality", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select personality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
                <SelectItem value="analytical">Analytical</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={formData.description}
            onChange={(e) => updateFormField("description", e.target.value)}
            placeholder="Brief description of the agent's purpose"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="systemPrompt">System Prompt</Label>
          <Textarea
            id="systemPrompt"
            value={formData.systemPrompt}
            onChange={(e) => updateFormField("systemPrompt", e.target.value)}
            placeholder="Define the agent's behavior, expertise, and personality..."
            className="min-h-[120px]"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="model">AI Model</Label>
            <Select value={formData.model} onValueChange={(value) => updateFormField("model", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                <SelectItem value="claude-3">Claude 3</SelectItem>
                <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxTokens">Max Tokens</Label>
            <Input
              id="maxTokens"
              type="number"
              value={formData.maxTokens}
              onChange={(e) => updateFormField("maxTokens", Number.parseInt(e.target.value))}
              min={100}
              max={4000}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Temperature: {formData.temperature}</Label>
          <Slider
            value={[formData.temperature]}
            onValueChange={(value) => updateFormField("temperature", value[0])}
            max={1}
            min={0}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>Focused</span>
            <span>Creative</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) => updateFormField("isActive", checked)}
          />
          <Label htmlFor="isActive">Active Agent</Label>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-gradient-to-r from-apichat-lime to-apichat-accent text-slate-900">
            {isEditing ? "Update Agent" : "Create Agent"}
          </Button>
        </div>
      </form>
    )
  },
)

AgentForm.displayName = "AgentForm"

const AgentModal = React.memo(
  ({
    isOpen,
    onClose,
    agent,
    onSave,
  }: {
    isOpen: boolean
    onClose: () => void
    agent?: Agent
    onSave: (agentData: Omit<Agent, "id" | "createdAt" | "usageCount">) => void
  }) => {
    const [formData, setFormData] = React.useState<Omit<Agent, "id" | "createdAt" | "usageCount">>(
      agent
        ? {
            name: agent.name,
            description: agent.description,
            systemPrompt: agent.systemPrompt,
            personality: agent.personality,
            model: agent.model,
            temperature: agent.temperature,
            maxTokens: agent.maxTokens,
            isActive: agent.isActive,
            lastUsed: agent.lastUsed,
          }
        : defaultFormData,
    )

    const handleFormChange = React.useCallback((field: string, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }, [])

    const handleSubmit = React.useCallback(() => {
      onSave(formData)
      onClose()
    }, [formData, onSave, onClose])

    const handleCancel = React.useCallback(() => {
      setFormData(
        agent
          ? {
              name: agent.name,
              description: agent.description,
              systemPrompt: agent.systemPrompt,
              personality: agent.personality,
              model: agent.model,
              temperature: agent.temperature,
              maxTokens: agent.maxTokens,
              isActive: agent.isActive,
              lastUsed: agent.lastUsed,
            }
          : defaultFormData,
      )
      onClose()
    }, [agent, onClose])

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          onPointerDownOutside={(e) => {
            // Prevent modal from closing when clicking on select dropdowns
            const target = e.target as Element
            if (target.closest('[role="listbox"]') || target.closest("[data-radix-select-content]")) {
              e.preventDefault()
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>{agent ? "Edit Agent" : "Create New Agent"}</DialogTitle>
            <DialogDescription>
              {agent
                ? "Modify the agent configuration below."
                : "Configure your AI agent with custom behavior and personality."}
            </DialogDescription>
          </DialogHeader>
          <AgentForm
            formData={formData}
            onFormChange={handleFormChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isEditing={!!agent}
          />
        </DialogContent>
      </Dialog>
    )
  },
)

AgentModal.displayName = "AgentModal"

export function AgentsSection() {
  const { t } = useLanguage()
  const [agents, setAgents] = React.useState<Agent[]>([
    {
      id: "1",
      name: "Technical Assistant",
      description: "Specialized in API documentation and technical support",
      systemPrompt:
        "You are a technical assistant specialized in API development, documentation, and troubleshooting. Provide clear, accurate, and detailed technical guidance.",
      personality: "professional",
      model: "gpt-4",
      temperature: 0.3,
      maxTokens: 2048,
      isActive: true,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000),
      usageCount: 45,
    },
    {
      id: "2",
      name: "Creative Helper",
      description: "Assists with brainstorming and creative problem-solving",
      systemPrompt:
        "You are a creative assistant that helps with brainstorming, ideation, and innovative problem-solving. Be imaginative, inspiring, and think outside the box.",
      personality: "creative",
      model: "gpt-4",
      temperature: 0.8,
      maxTokens: 1500,
      isActive: true,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      lastUsed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      usageCount: 23,
    },
    {
      id: "3",
      name: "Data Analyst",
      description: "Expert in data analysis and database queries",
      systemPrompt:
        "You are a data analyst expert. Help users understand data patterns, write efficient database queries, and provide insights from data analysis.",
      personality: "analytical",
      model: "gpt-3.5-turbo",
      temperature: 0.2,
      maxTokens: 2048,
      isActive: false,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      usageCount: 12,
    },
  ])

  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [editingAgent, setEditingAgent] = React.useState<Agent | undefined>()
  const [deleteAgent, setDeleteAgent] = React.useState<Agent | undefined>()

  const handleCreateAgent = React.useCallback(() => {
    setEditingAgent(undefined)
    setIsModalOpen(true)
  }, [])

  const handleEditAgent = React.useCallback((agent: Agent) => {
    setEditingAgent(agent)
    setIsModalOpen(true)
  }, [])

  const handleSaveAgent = React.useCallback(
    (agentData: Omit<Agent, "id" | "createdAt" | "usageCount">) => {
      if (editingAgent) {
        // Update existing agent
        setAgents((prev) => prev.map((agent) => (agent.id === editingAgent.id ? { ...agent, ...agentData } : agent)))
      } else {
        // Create new agent
        const newAgent: Agent = {
          ...agentData,
          id: Date.now().toString(),
          createdAt: new Date(),
          usageCount: 0,
        }
        setAgents((prev) => [...prev, newAgent])
      }
    },
    [editingAgent],
  )

  const handleDeleteAgent = React.useCallback((agent: Agent) => {
    setDeleteAgent(agent)
  }, [])

  const confirmDelete = React.useCallback(() => {
    if (deleteAgent) {
      setAgents((prev) => prev.filter((agent) => agent.id !== deleteAgent.id))
      setDeleteAgent(undefined)
    }
  }, [deleteAgent])

  const handleToggleAgent = React.useCallback((agentId: string) => {
    setAgents((prev) => prev.map((agent) => (agent.id === agentId ? { ...agent, isActive: !agent.isActive } : agent)))
  }, [])

  const handleDuplicateAgent = React.useCallback((agent: Agent) => {
    const duplicatedAgent: Agent = {
      ...agent,
      id: Date.now().toString(),
      name: `${agent.name} (Copy)`,
      createdAt: new Date(),
      usageCount: 0,
      lastUsed: undefined,
    }
    setAgents((prev) => [...prev, duplicatedAgent])
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getPersonalityColor = (personality: string) => {
    return personalityColors[personality as keyof typeof personalityColors] || personalityColors.professional
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 p-4 md:p-6 border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white mb-2">AI Agents</h1>
            <p className="text-sm text-slate-400">
              Create and manage AI agents with custom personalities and behaviors
            </p>
          </div>
          <Button
            onClick={handleCreateAgent}
            className="bg-gradient-to-r from-apichat-lime to-apichat-accent text-slate-900 font-medium"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Agent
          </Button>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="flex-1 overflow-auto p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Card
              key={agent.id}
              className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getPersonalityColor(agent.personality)} flex items-center justify-center`}
                    >
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{agent.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="secondary"
                          className={`text-xs bg-gradient-to-r ${getPersonalityColor(agent.personality)} text-white border-0`}
                        >
                          {agent.personality}
                        </Badge>
                        {agent.isActive ? (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-green-500/20 text-green-400 border-green-500/30"
                          >
                            Active
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-slate-600/20 text-slate-400 border-slate-600/30"
                          >
                            Inactive
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                      <DropdownMenuItem
                        onClick={() => handleEditAgent(agent)}
                        className="text-slate-300 hover:text-white"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDuplicateAgent(agent)}
                        className="text-slate-300 hover:text-white"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleToggleAgent(agent.id)}
                        className="text-slate-300 hover:text-white"
                      >
                        {agent.isActive ? (
                          <>
                            <PowerOff className="h-4 w-4 mr-2" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <Power className="h-4 w-4 mr-2" />
                            Activate
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteAgent(agent)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-slate-400 text-sm">{agent.description}</CardDescription>

                <div className="space-y-2 text-xs text-slate-500">
                  <div className="flex justify-between">
                    <span>Model:</span>
                    <span className="text-slate-300">{agent.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Temperature:</span>
                    <span className="text-slate-300">{agent.temperature}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Usage:</span>
                    <span className="text-slate-300">{agent.usageCount} times</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Created:</span>
                    <span className="text-slate-300">{formatDate(agent.createdAt)}</span>
                  </div>
                  {agent.lastUsed && (
                    <div className="flex justify-between">
                      <span>Last used:</span>
                      <span className="text-slate-300">{formatDate(agent.lastUsed)}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {agents.length === 0 && (
          <div className="text-center py-12">
            <Bot className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-300 mb-2">No agents created yet</h3>
            <p className="text-slate-500 mb-6">Create your first AI agent to get started</p>
            <Button
              onClick={handleCreateAgent}
              className="bg-gradient-to-r from-apichat-lime to-apichat-accent text-slate-900"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Agent
            </Button>
          </div>
        )}
      </div>

      {/* Agent Modal */}
      <AgentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        agent={editingAgent}
        onSave={handleSaveAgent}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteAgent} onOpenChange={() => setDeleteAgent(undefined)}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Agent</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete "{deleteAgent?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
