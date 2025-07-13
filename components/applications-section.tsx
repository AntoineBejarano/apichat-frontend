"use client"

import * as React from "react"
import { Plus, Upload, Settings, Play, Pause, Eye, Code, Tag, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useLanguage } from "@/contexts/language-context"

const mockApplications = [
  {
    id: "notion",
    name: "Notion API",
    description: "Page, database and content management",
    endpoints: 12,
    active: true,
    categories: [
      {
        name: "Pages",
        endpoints: [
          { name: "createPage", method: "POST", path: "/pages", active: true },
          { name: "getPage", method: "GET", path: "/pages/{id}", active: true },
          { name: "updatePage", method: "PATCH", path: "/pages/{id}", active: true },
        ],
      },
      {
        name: "Databases",
        endpoints: [
          { name: "queryDatabase", method: "POST", path: "/databases/{id}/query", active: true },
          { name: "createDatabase", method: "POST", path: "/databases", active: false },
        ],
      },
    ],
  },
  {
    id: "github",
    name: "GitHub API",
    description: "Repository, issues and pull request management",
    endpoints: 8,
    active: true,
    categories: [
      {
        name: "Issues",
        endpoints: [
          { name: "createIssue", method: "POST", path: "/repos/{owner}/{repo}/issues", active: true },
          { name: "listIssues", method: "GET", path: "/repos/{owner}/{repo}/issues", active: true },
        ],
      },
    ],
  },
]

export function ApplicationsSection() {
  const [selectedApp, setSelectedApp] = React.useState<string | null>(null)
  const { t } = useLanguage()

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-slate-700/50 bg-slate-800/60 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-apichat-blue-metallic to-blue-500 shadow-lg ring-2 ring-apichat-blue-metallic/20">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">{t("apps.title")}</h1>
                <p className="text-sm text-slate-400 font-medium">{t("apps.subtitle")}</p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger>
                <Button className="bg-gradient-to-br from-apichat-lime to-apichat-accent hover:from-apichat-lime-light hover:to-apichat-accent text-slate-900 shadow-lg rounded-xl ring-2 ring-apichat-lime/20">
                  <Plus className="h-4 w-4 mr-2" />
                  {t("apps.addNew")}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800/95 backdrop-blur-sm border-slate-700/50 text-white rounded-2xl max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">{t("apps.addNewTitle")}</DialogTitle>
                  <DialogDescription className="text-slate-400">{t("apps.addNewDesc")}</DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="app-name" className="text-sm font-medium text-white">
                      {t("apps.appName")}
                    </Label>
                    <Input
                      id="app-name"
                      placeholder={t("apps.appNamePlaceholder")}
                      className="bg-slate-700/50 border-slate-600/50 text-white rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="openapi-file" className="text-sm font-medium text-white">
                      {t("apps.openApiFile")}
                    </Label>
                    <div className="border-2 border-dashed border-slate-600/50 rounded-xl p-8 text-center bg-slate-700/20 hover:bg-slate-700/30 transition-colors cursor-pointer">
                      <Upload className="h-10 w-10 mx-auto mb-3 text-slate-400" />
                      <p className="text-sm text-slate-400 leading-relaxed">{t("apps.dragDrop")}</p>
                      <Input type="file" accept=".json" className="hidden" />
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-br from-apichat-lime to-apichat-accent hover:from-apichat-lime-light hover:to-apichat-accent text-slate-900 rounded-xl h-12">
                    <Zap className="h-4 w-4 mr-2" />
                    {t("apps.processAdd")}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Applications List */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-apichat-lime" />
                  {t("apps.installed")}
                </h2>
                <div className="space-y-4">
                  {mockApplications.map((app) => (
                    <Card
                      key={app.id}
                      className={`bg-slate-700/50 backdrop-blur-sm border-slate-600/30 cursor-pointer transition-all duration-200 hover:bg-slate-600/50 hover:shadow-lg rounded-2xl ${
                        selectedApp === app.id ? "ring-2 ring-apichat-lime shadow-lg shadow-apichat-lime/20" : ""
                      }`}
                      onClick={() => setSelectedApp(app.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-apichat-blue-metallic to-blue-500 flex items-center justify-center shadow-lg">
                              <Code className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-white font-semibold">{app.name}</CardTitle>
                              <p className="text-sm text-slate-400 mt-1">{app.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={app.active ? "default" : "secondary"}
                              className="bg-apichat-accent/20 text-apichat-accent border-apichat-accent/30 rounded-lg"
                            >
                              {app.endpoints} {t("apps.endpoints")}
                            </Badge>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-slate-400 hover:text-white rounded-lg"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-2 w-2 rounded-full ${app.active ? "bg-apichat-accent" : "bg-slate-500"}`}
                          />
                          <span className="text-xs text-slate-400">
                            {app.active ? t("apps.active") : t("apps.inactive")}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Application Details */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-apichat-blue-metallic" />
                  {t("apps.available")}
                </h2>
                {selectedApp ? (
                  <div className="space-y-4">
                    {mockApplications
                      .find((app) => app.id === selectedApp)
                      ?.categories.map((category) => (
                        <Card
                          key={category.name}
                          className="bg-slate-700/50 backdrop-blur-sm border-slate-600/30 rounded-2xl"
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                              <Tag className="h-5 w-5 text-apichat-lime" />
                              <CardTitle className="text-white text-base font-semibold">{category.name}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <Accordion type="single" collapsible className="space-y-2">
                              {category.endpoints.map((endpoint, index) => (
                                <AccordionItem
                                  key={index}
                                  value={`endpoint-${index}`}
                                  className="border-slate-600/30 rounded-xl"
                                >
                                  <AccordionTrigger className="text-white hover:text-apichat-lime px-4 py-3 rounded-xl hover:bg-slate-600/30 transition-colors">
                                    <div className="flex items-center gap-3">
                                      <Badge
                                        variant="outline"
                                        className={`text-xs font-mono ${
                                          endpoint.method === "GET"
                                            ? "border-blue-400 text-blue-400 bg-blue-400/10"
                                            : endpoint.method === "POST"
                                              ? "border-green-400 text-green-400 bg-green-400/10"
                                              : endpoint.method === "PATCH"
                                                ? "border-yellow-400 text-yellow-400 bg-yellow-400/10"
                                                : "border-red-400 text-red-400 bg-red-400/10"
                                        } rounded-lg`}
                                      >
                                        {endpoint.method}
                                      </Badge>
                                      <span className="font-mono text-sm">{endpoint.name}</span>
                                      <div
                                        className={`h-2 w-2 rounded-full ${endpoint.active ? "bg-apichat-accent" : "bg-slate-500"}`}
                                      />
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="text-slate-400 px-4 pb-4">
                                    <div className="space-y-4 pt-2">
                                      <div className="bg-slate-800/50 rounded-xl p-3">
                                        <span className="text-xs text-slate-500 block mb-1">Path:</span>
                                        <code className="text-sm bg-slate-900/50 px-3 py-2 rounded-lg text-apichat-blue-metallic block">
                                          {endpoint.path}
                                        </code>
                                      </div>
                                      <div className="flex flex-wrap gap-2">
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="border-slate-600/50 text-slate-300 hover:text-white bg-transparent hover:bg-slate-600/30 rounded-lg"
                                        >
                                          <Eye className="h-3 w-3 mr-1" />
                                          {t("apps.test")}
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className={`border-slate-600/50 rounded-lg ${
                                            endpoint.active
                                              ? "text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                              : "text-apichat-accent hover:text-apichat-lime hover:bg-apichat-accent/10"
                                          }`}
                                        >
                                          {endpoint.active ? (
                                            <Pause className="h-3 w-3 mr-1" />
                                          ) : (
                                            <Play className="h-3 w-3 mr-1" />
                                          )}
                                          {endpoint.active ? t("apps.deactivate") : t("apps.activate")}
                                        </Button>
                                      </div>
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              ))}
                            </Accordion>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <Card className="bg-slate-700/50 backdrop-blur-sm border-slate-600/30 rounded-2xl">
                    <CardContent className="flex items-center justify-center h-80">
                      <div className="text-center">
                        <Code className="h-16 w-16 mx-auto mb-4 text-slate-500" />
                        <p className="text-slate-400 leading-relaxed max-w-sm">{t("apps.selectApp")}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
