"use client"

import * as React from "react"
import { Plus, Database, Play, Trash2, CheckCircle, XCircle, AlertCircle, Table } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useLanguage } from "@/contexts/language-context"
import { useToast } from "@/hooks/use-toast"

interface DatabaseConnection {
  id: string
  name: string
  type: "mysql" | "postgresql" | "mongodb" | "sqlite" | "redis" | "oracle"
  host: string
  port: number
  database: string
  username: string
  status: "connected" | "disconnected" | "error" | "testing"
  lastConnected?: Date
  tables?: DatabaseTable[]
  description?: string
}

interface DatabaseTable {
  name: string
  type: "table" | "view" | "collection"
  rowCount?: number
  columns?: DatabaseColumn[]
}

interface DatabaseColumn {
  name: string
  type: string
  nullable: boolean
  primaryKey: boolean
}

const mockDatabases: DatabaseConnection[] = [
  {
    id: "db1",
    name: "Production MySQL",
    type: "mysql",
    host: "prod-mysql.company.com",
    port: 3306,
    database: "ecommerce",
    username: "api_user",
    status: "connected",
    lastConnected: new Date(Date.now() - 2 * 60 * 1000),
    description: "Main production database for e-commerce platform",
    tables: [
      {
        name: "users",
        type: "table",
        rowCount: 15420,
        columns: [
          { name: "id", type: "INT", nullable: false, primaryKey: true },
          { name: "email", type: "VARCHAR(255)", nullable: false, primaryKey: false },
          { name: "name", type: "VARCHAR(100)", nullable: false, primaryKey: false },
          { name: "created_at", type: "TIMESTAMP", nullable: false, primaryKey: false },
        ],
      },
      {
        name: "orders",
        type: "table",
        rowCount: 8932,
        columns: [
          { name: "id", type: "INT", nullable: false, primaryKey: true },
          { name: "user_id", type: "INT", nullable: false, primaryKey: false },
          { name: "total", type: "DECIMAL(10,2)", nullable: false, primaryKey: false },
          { name: "status", type: "ENUM", nullable: false, primaryKey: false },
        ],
      },
      {
        name: "products",
        type: "table",
        rowCount: 2341,
        columns: [
          { name: "id", type: "INT", nullable: false, primaryKey: true },
          { name: "name", type: "VARCHAR(255)", nullable: false, primaryKey: false },
          { name: "price", type: "DECIMAL(10,2)", nullable: false, primaryKey: false },
          { name: "stock", type: "INT", nullable: false, primaryKey: false },
        ],
      },
    ],
  },
  {
    id: "db2",
    name: "Analytics PostgreSQL",
    type: "postgresql",
    host: "analytics-pg.company.com",
    port: 5432,
    database: "analytics",
    username: "analyst",
    status: "connected",
    lastConnected: new Date(Date.now() - 15 * 60 * 1000),
    description: "Analytics and reporting database",
    tables: [
      {
        name: "events",
        type: "table",
        rowCount: 1250000,
        columns: [
          { name: "id", type: "BIGSERIAL", nullable: false, primaryKey: true },
          { name: "event_type", type: "VARCHAR(50)", nullable: false, primaryKey: false },
          { name: "user_id", type: "INTEGER", nullable: true, primaryKey: false },
          { name: "properties", type: "JSONB", nullable: true, primaryKey: false },
        ],
      },
      {
        name: "user_sessions",
        type: "view",
        rowCount: 45230,
      },
    ],
  },
  {
    id: "db3",
    name: "Cache Redis",
    type: "redis",
    host: "cache-redis.company.com",
    port: 6379,
    database: "0",
    username: "cache_user",
    status: "error",
    lastConnected: new Date(Date.now() - 2 * 60 * 60 * 1000),
    description: "Redis cache for session storage and temporary data",
  },
]

const databaseTypes = [
  { value: "mysql", label: "MySQL", icon: "🐬" },
  { value: "postgresql", label: "PostgreSQL", icon: "🐘" },
  { value: "mongodb", label: "MongoDB", icon: "🍃" },
  { value: "sqlite", label: "SQLite", icon: "📁" },
  { value: "redis", label: "Redis", icon: "🔴" },
  { value: "oracle", label: "Oracle", icon: "🔶" },
]

export function DatabasesSection() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [databases, setDatabases] = React.useState<DatabaseConnection[]>(mockDatabases)
  const [selectedDatabase, setSelectedDatabase] = React.useState<string | null>(null)
  const [showAddDialog, setShowAddDialog] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const [newDatabase, setNewDatabase] = React.useState({
    name: "",
    type: "mysql" as DatabaseConnection["type"],
    host: "",
    port: 3306,
    database: "",
    username: "",
    password: "",
    description: "",
  })

  const getStatusIcon = (status: DatabaseConnection["status"]) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-apichat-accent" />
      case "disconnected":
        return <XCircle className="h-4 w-4 text-slate-400" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-400" />
      case "testing":
        return <AlertCircle className="h-4 w-4 text-yellow-400 animate-pulse" />
      default:
        return <XCircle className="h-4 w-4 text-slate-400" />
    }
  }

  const getStatusColor = (status: DatabaseConnection["status"]) => {
    switch (status) {
      case "connected":
        return "bg-apichat-accent/20 text-apichat-accent border-apichat-accent/30"
      case "disconnected":
        return "bg-slate-600/50 text-slate-400"
      case "error":
        return "bg-red-400/20 text-red-400 border-red-400/30"
      case "testing":
        return "bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
      default:
        return "bg-slate-600/50 text-slate-400"
    }
  }

  const getDatabaseIcon = (type: DatabaseConnection["type"]) => {
    const dbType = databaseTypes.find((t) => t.value === type)
    return dbType?.icon || "🗄️"
  }

  const handleTestConnection = async (id: string) => {
    setIsLoading(true)
    setDatabases((prev) => prev.map((db) => (db.id === id ? { ...db, status: "testing" as const } : db)))

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const success = Math.random() > 0.3 // 70% success rate

      setDatabases((prev) =>
        prev.map((db) =>
          db.id === id
            ? {
                ...db,
                status: success ? ("connected" as const) : ("error" as const),
                lastConnected: success ? new Date() : db.lastConnected,
              }
            : db,
        ),
      )

      toast({
        title: success ? t("common.success") : t("common.error"),
        description: success ? "Database connection successful" : "Failed to connect to database",
        variant: success ? "default" : "destructive",
      })
    } catch (error) {
      setDatabases((prev) => prev.map((db) => (db.id === id ? { ...db, status: "error" as const } : db)))
      toast({
        title: t("common.error"),
        description: "Connection test failed",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddDatabase = async () => {
    if (!newDatabase.name || !newDatabase.host || !newDatabase.database) {
      toast({
        title: t("common.error"),
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const database: DatabaseConnection = {
        id: "db_" + Math.random().toString(36).substr(2, 9),
        ...newDatabase,
        status: "disconnected",
      }

      setDatabases((prev) => [...prev, database])
      setShowAddDialog(false)
      setNewDatabase({
        name: "",
        type: "mysql",
        host: "",
        port: 3306,
        database: "",
        username: "",
        password: "",
        description: "",
      })

      toast({
        title: t("common.success"),
        description: "Database connection added successfully",
      })
    } catch (error) {
      toast({
        title: t("common.error"),
        description: "Failed to add database connection",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteDatabase = async (id: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setDatabases((prev) => prev.filter((db) => db.id !== id))
      if (selectedDatabase === id) {
        setSelectedDatabase(null)
      }
      toast({
        title: t("common.success"),
        description: "Database connection deleted successfully",
      })
    } catch (error) {
      toast({
        title: t("common.error"),
        description: "Failed to delete database connection",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const formatLastConnected = (date?: Date) => {
    if (!date) return "Never"
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
    return "Just now"
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-800/60 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg ring-2 ring-purple-500/20">
                <Database className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">{t("databases.title")}</h1>
                <p className="text-sm text-slate-400 font-medium">{t("databases.subtitle")}</p>
              </div>
            </div>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-br from-apichat-lime to-apichat-accent hover:from-apichat-lime-light hover:to-apichat-accent text-slate-900 shadow-lg rounded-xl">
                  <Plus className="h-4 w-4 mr-2" />
                  {t("databases.addNew")}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800/95 backdrop-blur-sm border-slate-700/50 text-white rounded-2xl max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">{t("databases.addNewTitle")}</DialogTitle>
                  <DialogDescription className="text-slate-400">{t("databases.addNewDesc")}</DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="db-name" className="text-sm font-medium text-white">
                        {t("databases.name")}
                      </Label>
                      <Input
                        id="db-name"
                        placeholder={t("databases.namePlaceholder")}
                        value={newDatabase.name}
                        onChange={(e) => setNewDatabase((prev) => ({ ...prev, name: e.target.value }))}
                        className="bg-slate-700/50 border-slate-600/50 text-white rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-type" className="text-sm font-medium text-white">
                        {t("databases.type")}
                      </Label>
                      <Select
                        value={newDatabase.type}
                        onValueChange={(value) =>
                          setNewDatabase((prev) => ({
                            ...prev,
                            type: value as DatabaseConnection["type"],
                            port:
                              value === "postgresql"
                                ? 5432
                                : value === "mongodb"
                                  ? 27017
                                  : value === "redis"
                                    ? 6379
                                    : 3306,
                          }))
                        }
                      >
                        <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-white rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700/95 backdrop-blur-sm border-slate-600/50 rounded-xl">
                          {databaseTypes.map((type) => (
                            <SelectItem
                              key={type.value}
                              value={type.value}
                              className="text-white hover:bg-slate-600/50 rounded-lg"
                            >
                              <div className="flex items-center gap-2">
                                <span>{type.icon}</span>
                                <span>{type.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="db-host" className="text-sm font-medium text-white">
                        {t("databases.host")}
                      </Label>
                      <Input
                        id="db-host"
                        placeholder="localhost"
                        value={newDatabase.host}
                        onChange={(e) => setNewDatabase((prev) => ({ ...prev, host: e.target.value }))}
                        className="bg-slate-700/50 border-slate-600/50 text-white rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-port" className="text-sm font-medium text-white">
                        {t("databases.port")}
                      </Label>
                      <Input
                        id="db-port"
                        type="number"
                        value={newDatabase.port}
                        onChange={(e) => setNewDatabase((prev) => ({ ...prev, port: Number.parseInt(e.target.value) }))}
                        className="bg-slate-700/50 border-slate-600/50 text-white rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="db-database" className="text-sm font-medium text-white">
                        {t("databases.database")}
                      </Label>
                      <Input
                        id="db-database"
                        placeholder="database_name"
                        value={newDatabase.database}
                        onChange={(e) => setNewDatabase((prev) => ({ ...prev, database: e.target.value }))}
                        className="bg-slate-700/50 border-slate-600/50 text-white rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-username" className="text-sm font-medium text-white">
                        {t("databases.username")}
                      </Label>
                      <Input
                        id="db-username"
                        placeholder="username"
                        value={newDatabase.username}
                        onChange={(e) => setNewDatabase((prev) => ({ ...prev, username: e.target.value }))}
                        className="bg-slate-700/50 border-slate-600/50 text-white rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="db-password" className="text-sm font-medium text-white">
                      {t("databases.password")}
                    </Label>
                    <Input
                      id="db-password"
                      type="password"
                      placeholder="password"
                      value={newDatabase.password}
                      onChange={(e) => setNewDatabase((prev) => ({ ...prev, password: e.target.value }))}
                      className="bg-slate-700/50 border-slate-600/50 text-white rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="db-description" className="text-sm font-medium text-white">
                      {t("databases.description")}
                    </Label>
                    <Textarea
                      id="db-description"
                      placeholder={t("databases.descriptionPlaceholder")}
                      value={newDatabase.description}
                      onChange={(e) => setNewDatabase((prev) => ({ ...prev, description: e.target.value }))}
                      className="bg-slate-700/50 border-slate-600/50 text-white rounded-xl min-h-20"
                    />
                  </div>

                  <Button
                    onClick={handleAddDatabase}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-br from-apichat-lime to-apichat-accent hover:from-apichat-lime-light hover:to-apichat-accent text-slate-900 rounded-xl h-12"
                  >
                    {isLoading ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent mr-2" />
                    ) : (
                      <Database className="h-4 w-4 mr-2" />
                    )}
                    {t("databases.addConnection")}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Database Connections List */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500" />
                  {t("databases.connections")}
                </h2>
                <div className="space-y-4">
                  {databases.map((database) => (
                    <Card
                      key={database.id}
                      className={`bg-slate-700/50 backdrop-blur-sm border-slate-600/30 cursor-pointer transition-all duration-200 hover:bg-slate-600/50 hover:shadow-lg rounded-2xl ${
                        selectedDatabase === database.id ? "ring-2 ring-purple-500 shadow-lg shadow-purple-500/20" : ""
                      }`}
                      onClick={() => setSelectedDatabase(database.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg text-lg">
                              {getDatabaseIcon(database.type)}
                            </div>
                            <div>
                              <CardTitle className="text-white font-semibold">{database.name}</CardTitle>
                              <p className="text-sm text-slate-400 mt-1">
                                {database.type.toUpperCase()} • {database.host}:{database.port}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {getStatusIcon(database.status)}
                              <Badge
                                variant="outline"
                                className={`text-xs rounded-lg ${getStatusColor(database.status)}`}
                              >
                                {database.status}
                              </Badge>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-slate-400 hover:text-white rounded-lg"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleTestConnection(database.id)
                              }}
                              disabled={isLoading}
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8 text-red-400 hover:text-red-300 rounded-lg"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-slate-800/95 backdrop-blur-sm border-slate-700/50 text-white rounded-2xl max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Delete Database Connection</DialogTitle>
                                  <DialogDescription className="text-slate-400">
                                    Are you sure you want to delete this database connection? This action cannot be
                                    undone.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="flex gap-3 pt-4">
                                  <Button
                                    variant="outline"
                                    className="flex-1 border-slate-600/50 text-slate-300 hover:text-white bg-transparent hover:bg-slate-600/30 rounded-xl"
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    onClick={() => handleDeleteDatabase(database.id)}
                                    disabled={isLoading}
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl"
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Database:</span>
                            <span className="text-white font-mono">{database.database}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Last connected:</span>
                            <span className="text-slate-300">{formatLastConnected(database.lastConnected)}</span>
                          </div>
                          {database.description && (
                            <p className="text-xs text-slate-400 mt-2 leading-relaxed">{database.description}</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Database Details */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-apichat-blue-metallic" />
                  {t("databases.schema")}
                </h2>
                {selectedDatabase ? (
                  <div className="space-y-4">
                    {databases
                      .find((db) => db.id === selectedDatabase)
                      ?.tables?.map((table) => (
                        <Card
                          key={table.name}
                          className="bg-slate-700/50 backdrop-blur-sm border-slate-600/30 rounded-2xl"
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                              <Table className="h-5 w-5 text-apichat-blue-metallic" />
                              <CardTitle className="text-white text-base font-semibold">{table.name}</CardTitle>
                              <Badge
                                variant="outline"
                                className="text-xs bg-apichat-blue-metallic/20 text-apichat-blue-metallic border-apichat-blue-metallic/30 rounded-lg"
                              >
                                {table.type}
                              </Badge>
                              {table.rowCount && (
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-slate-600/50 text-slate-300 border-slate-500/50 rounded-lg"
                                >
                                  {table.rowCount.toLocaleString()} rows
                                </Badge>
                              )}
                            </div>
                          </CardHeader>
                          {table.columns && (
                            <CardContent className="pt-0">
                              <Accordion type="single" collapsible className="space-y-2">
                                <AccordionItem value={`table-${table.name}`} className="border-slate-600/30 rounded-xl">
                                  <AccordionTrigger className="text-white hover:text-apichat-blue-metallic px-4 py-3 rounded-xl hover:bg-slate-600/30 transition-colors">
                                    <span className="text-sm font-medium">View Columns ({table.columns.length})</span>
                                  </AccordionTrigger>
                                  <AccordionContent className="text-slate-400 px-4 pb-4">
                                    <div className="space-y-2 pt-2">
                                      {table.columns.map((column, index) => (
                                        <div
                                          key={index}
                                          className="flex items-center justify-between p-2 bg-slate-800/50 rounded-lg"
                                        >
                                          <div className="flex items-center gap-2">
                                            <span className="text-white font-mono text-sm">{column.name}</span>
                                            {column.primaryKey && (
                                              <Badge
                                                variant="outline"
                                                className="text-xs bg-yellow-400/20 text-yellow-400 border-yellow-400/30 rounded-md"
                                              >
                                                PK
                                              </Badge>
                                            )}
                                          </div>
                                          <div className="flex items-center gap-2 text-xs">
                                            <span className="text-apichat-blue-metallic font-mono">{column.type}</span>
                                            {!column.nullable && <span className="text-red-400">NOT NULL</span>}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            </CardContent>
                          )}
                        </Card>
                      ))}
                  </div>
                ) : (
                  <Card className="bg-slate-700/50 backdrop-blur-sm border-slate-600/30 rounded-2xl">
                    <CardContent className="flex items-center justify-center h-80">
                      <div className="text-center">
                        <Database className="h-16 w-16 mx-auto mb-4 text-slate-500" />
                        <p className="text-slate-400 leading-relaxed max-w-sm">{t("databases.selectDatabase")}</p>
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
