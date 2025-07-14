"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "javascript" | "python" | "typescript" | "sql"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  javascript: {
    // Navigation
    "nav.chat": "Chat",
    "nav.applications": "Applications",
    "nav.databases": "Databases",
    "nav.agents": "Agents",
    "nav.strategies": "Strategies",
    "nav.history": "History",

    // Chat
    "chat.placeholder": "Ask me anything about your APIs, databases, or code...",
    "chat.send": "Send",
    "chat.typing": "AI is thinking...",

    // Selectors
    "selectors.agent": "Agent:",
    "selectors.app": "App:",
    "selectors.db": "DB:",
    "selectors.selectAgent": "Select agent",
    "selectors.selectApp": "Select app",
    "selectors.selectDatabase": "Select database",

    // Agents
    "agent.technical": "Technical Assistant",
    "agent.creative": "Creative Helper",
    "agent.analytical": "Data Analyst",

    // Applications
    "app.ecommerce": "E-commerce API",
    "app.crm": "CRM System",
    "app.analytics": "Analytics API",

    // Databases
    "db.postgres": "PostgreSQL Main",
    "db.redis": "Redis Cache",
    "db.mongo": "MongoDB Logs",

    // Quick Actions
    "quick.generate_code": "Generate Code",
    "quick.explain_concept": "Explain Concept",
    "quick.analyze_data": "Analyze Data",
    "quick.quick_fix": "Quick Fix",

    // Common
    "common.user": "User",
    "common.settings": "Settings",
    "common.logout": "Logout",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.add": "Add",
    "common.remove": "Remove",
    "common.update": "Update",
    "common.create": "Create",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.sort": "Sort",
    "common.export": "Export",
    "common.import": "Import",
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.warning": "Warning",
    "common.info": "Information",

    // Settings
    "settings.title": "Settings",
    "settings.subtitle": "Manage your account and preferences",

    // Profile
    "profile.title": "Profile Information",
    "profile.subtitle": "Update your personal information and preferences",
    "profile.name": "Full Name",
    "profile.email": "Email Address",
    "profile.avatar": "Profile Picture",
    "profile.bio": "Biography",
    "profile.location": "Location",
    "profile.website": "Website",
    "profile.save": "Save Changes",
    "profile.changeAvatar": "Change Avatar",
    "profile.removeAvatar": "Remove Avatar",

    // Subscription
    "subscription.title": "Subscription Plan",
    "subscription.subtitle": "Manage your subscription and billing",
    "subscription.tokens": "API Tokens",
    "subscription.tokensRemaining": "tokens remaining",

    // Billing
    "billing.title": "Billing Information",
    "billing.subtitle": "Manage your payment methods and billing history",
    "billing.paymentMethod": "Payment Method",
    "billing.updatePaymentMethod": "Update Payment Method",
    "billing.removePaymentMethod": "Remove Payment Method",
    "billing.history": "Billing History",

    // Security
    "security.title": "Security Settings",
    "security.subtitle": "Manage your account security and privacy",
    "security.changePassword": "Change Password",
    "security.currentPassword": "Current Password",
    "security.newPassword": "New Password",
    "security.confirmPassword": "Confirm Password",
    "security.twoFactor": "Two-Factor Authentication",
    "security.sessions": "Active Sessions",
    "security.enable2FA": "Enable 2FA",
    "security.terminateAll": "Terminate All Sessions",
    "security.terminateSession": "Terminate Session",

    // Notifications
    "notifications.title": "Notification Preferences",
    "notifications.subtitle": "Choose what notifications you want to receive",
    "notifications.email": "Email Notifications",
    "notifications.push": "Push Notifications",
    "notifications.marketing": "Marketing Communications",
    "notifications.security": "Security Alerts",
    "notifications.billing": "Billing Notifications",
    "notifications.updates": "Product Updates",

    // Onboarding
    "onboarding.guestWelcome": "Welcome, Guest!",
    "onboarding.signIn": "Sign In",
    "onboarding.signUp": "Sign Up",
    "onboarding.getStarted": "Get Started",
    "onboarding.or": "or",
    "onboarding.feature1": "Connect APIs",
    "onboarding.feature1Desc": "Integrate with your favorite applications and services",
    "onboarding.feature2": "Database Integration",
    "onboarding.feature2Desc": "Connect and query your databases with natural language",
    "onboarding.feature3": "AI Agents",
    "onboarding.feature3Desc": "Create intelligent assistants for your workflows",
    "onboarding.feature4": "Automation",
    "onboarding.feature4Desc": "Build powerful automation strategies and workflows",
    "onboarding.signInWithGoogle": "Sign in with Google",
    "onboarding.continueAsGuest": "Continue as Guest",
    "onboarding.guestNote": "Limited features available in guest mode",
    "onboarding.welcome": "Welcome to ApiChat",
    "onboarding.subtitle": "Your AI-powered API and database assistant",
    "onboarding.description":
      "Connect, query, and automate your applications and databases through natural language conversations",

    // Applications
    "apps.title": "Applications",
    "apps.subtitle": "Manage your connected applications",
    "apps.addNew": "Add Application",
    "apps.installed": "Installed Applications",
    "apps.available": "Available Applications",
    "apps.active": "Active",
    "apps.inactive": "Inactive",
    "apps.install": "Install",
    "apps.configure": "Configure",
    "apps.selectApp": "Select an application to view details",

    // Databases
    "databases.title": "Database Connections",
    "databases.subtitle": "Manage your database integrations",
    "databases.addNew": "Add Database",
    "databases.schema": "Database Schema",
    "databases.connect": "Connect",
    "databases.disconnect": "Disconnect",
    "databases.testConnection": "Test Connection",
    "databases.connections": "Database Connections",
    "databases.selectDatabase": "Select a database to view schema",

    // Strategies
    "strategies.title": "Automation Strategies",
    "strategies.subtitle": "Create and manage your automation workflows",
    "strategies.functionFlow": "Function Flow",
    "strategies.executed": "Executed",
    "strategies.times": "times",
    "strategies.lastExecution": "Last Execution",
    "strategies.executeNow": "Execute Now",
    "strategies.newStrategy": "New Strategy",

    // History
    "history.title": "Conversation History",
    "history.subtitle": "View and manage your past conversations",
    "history.messages": "messages",
    "history.functions": "functions",
    "history.allApps": "All Applications",
    "history.allDates": "All Dates",
    "history.completed": "Completed",
    "history.error": "Error",
    "history.viewConversation": "View Conversation",
    "history.loadMore": "Load More",

    // Agents
    "agents.title": "AI Agents",
    "agents.subtitle": "Manage your AI assistants and their capabilities",
  },
  python: {
    // Navigation
    "nav.chat": "Chat",
    "nav.applications": "Aplicaciones",
    "nav.databases": "Bases de Datos",
    "nav.agents": "Agentes",
    "nav.strategies": "Estrategias",
    "nav.history": "Historial",

    // Chat
    "chat.placeholder": "Pregúntame sobre tus APIs, bases de datos o código...",
    "chat.send": "Enviar",
    "chat.typing": "La IA está pensando...",

    // Selectors
    "selectors.agent": "Agente:",
    "selectors.app": "App:",
    "selectors.db": "BD:",
    "selectors.selectAgent": "Seleccionar agente",
    "selectors.selectApp": "Seleccionar app",
    "selectors.selectDatabase": "Seleccionar base de datos",

    // Agents
    "agent.technical": "Asistente Técnico",
    "agent.creative": "Ayudante Creativo",
    "agent.analytical": "Analista de Datos",

    // Applications
    "app.ecommerce": "API E-commerce",
    "app.crm": "Sistema CRM",
    "app.analytics": "API Analytics",

    // Databases
    "db.postgres": "PostgreSQL Principal",
    "db.redis": "Caché Redis",
    "db.mongo": "Logs MongoDB",

    // Quick Actions
    "quick.generate_code": "Generar Código",
    "quick.explain_concept": "Explicar Concepto",
    "quick.analyze_data": "Analizar Datos",
    "quick.quick_fix": "Solución Rápida",

    // Common
    "common.user": "Usuario",
    "common.settings": "Configuración",
    "common.logout": "Cerrar Sesión",
    "common.save": "Guardar",
    "common.cancel": "Cancelar",
    "common.delete": "Eliminar",
    "common.edit": "Editar",
    "common.add": "Agregar",
    "common.remove": "Quitar",
    "common.update": "Actualizar",
    "common.create": "Crear",
    "common.search": "Buscar",
    "common.filter": "Filtrar",
    "common.sort": "Ordenar",
    "common.export": "Exportar",
    "common.import": "Importar",
    "common.loading": "Cargando...",
    "common.error": "Error",
    "common.success": "Éxito",
    "common.warning": "Advertencia",
    "common.info": "Información",

    // Settings
    "settings.title": "Configuración",
    "settings.subtitle": "Administra tu cuenta y preferencias",

    // Profile
    "profile.title": "Información del Perfil",
    "profile.subtitle": "Actualiza tu información personal y preferencias",
    "profile.name": "Nombre Completo",
    "profile.email": "Dirección de Correo",
    "profile.avatar": "Foto de Perfil",
    "profile.bio": "Biografía",
    "profile.location": "Ubicación",
    "profile.website": "Sitio Web",
    "profile.save": "Guardar Cambios",
    "profile.changeAvatar": "Cambiar Avatar",
    "profile.removeAvatar": "Quitar Avatar",

    // Subscription
    "subscription.title": "Plan de Suscripción",
    "subscription.subtitle": "Administra tu suscripción y facturación",
    "subscription.tokens": "Tokens de API",
    "subscription.tokensRemaining": "tokens restantes",

    // Billing
    "billing.title": "Información de Facturación",
    "billing.subtitle": "Administra tus métodos de pago e historial de facturación",
    "billing.paymentMethod": "Método de Pago",
    "billing.updatePaymentMethod": "Actualizar Método de Pago",
    "billing.removePaymentMethod": "Quitar Método de Pago",
    "billing.history": "Historial de Facturación",

    // Security
    "security.title": "Configuración de Seguridad",
    "security.subtitle": "Administra la seguridad y privacidad de tu cuenta",
    "security.changePassword": "Cambiar Contraseña",
    "security.currentPassword": "Contraseña Actual",
    "security.newPassword": "Nueva Contraseña",
    "security.confirmPassword": "Confirmar Contraseña",
    "security.twoFactor": "Autenticación de Dos Factores",
    "security.sessions": "Sesiones Activas",
    "security.enable2FA": "Habilitar 2FA",
    "security.terminateAll": "Terminar Todas las Sesiones",
    "security.terminateSession": "Terminar Sesión",

    // Notifications
    "notifications.title": "Preferencias de Notificación",
    "notifications.subtitle": "Elige qué notificaciones quieres recibir",
    "notifications.email": "Notificaciones por Correo",
    "notifications.push": "Notificaciones Push",
    "notifications.marketing": "Comunicaciones de Marketing",
    "notifications.security": "Alertas de Seguridad",
    "notifications.billing": "Notificaciones de Facturación",
    "notifications.updates": "Actualizaciones de Producto",

    // Onboarding
    "onboarding.guestWelcome": "¡Bienvenido, Invitado!",
    "onboarding.signIn": "Iniciar Sesión",
    "onboarding.signUp": "Registrarse",
    "onboarding.getStarted": "Comenzar",
    "onboarding.or": "o",
    "onboarding.feature1": "Conectar APIs",
    "onboarding.feature1Desc": "Integra con tus aplicaciones y servicios favoritos",
    "onboarding.feature2": "Integración de Base de Datos",
    "onboarding.feature2Desc": "Conecta y consulta tus bases de datos con lenguaje natural",
    "onboarding.feature3": "Agentes IA",
    "onboarding.feature3Desc": "Crea asistentes inteligentes para tus flujos de trabajo",
    "onboarding.feature4": "Automatización",
    "onboarding.feature4Desc": "Construye estrategias de automatización y flujos de trabajo poderosos",
    "onboarding.signInWithGoogle": "Iniciar sesión con Google",
    "onboarding.continueAsGuest": "Continuar como Invitado",
    "onboarding.guestNote": "Funciones limitadas disponibles en modo invitado",
    "onboarding.welcome": "Bienvenido a ApiChat",
    "onboarding.subtitle": "Tu asistente de API y base de datos impulsado por IA",
    "onboarding.description":
      "Conecta, consulta y automatiza tus aplicaciones y bases de datos a través de conversaciones en lenguaje natural",

    // Applications
    "apps.title": "Aplicaciones",
    "apps.subtitle": "Administra tus aplicaciones conectadas",
    "apps.addNew": "Agregar Aplicación",
    "apps.installed": "Aplicaciones Instaladas",
    "apps.available": "Aplicaciones Disponibles",
    "apps.active": "Activo",
    "apps.inactive": "Inactivo",
    "apps.install": "Instalar",
    "apps.configure": "Configurar",
    "apps.selectApp": "Selecciona una aplicación para ver detalles",

    // Databases
    "databases.title": "Conexiones de Base de Datos",
    "databases.subtitle": "Administra tus integraciones de base de datos",
    "databases.addNew": "Agregar Base de Datos",
    "databases.schema": "Esquema de Base de Datos",
    "databases.connect": "Conectar",
    "databases.disconnect": "Desconectar",
    "databases.testConnection": "Probar Conexión",
    "databases.connections": "Conexiones de Base de Datos",
    "databases.selectDatabase": "Selecciona una base de datos para ver el esquema",

    // Strategies
    "strategies.title": "Estrategias de Automatización",
    "strategies.subtitle": "Crea y administra tus flujos de trabajo de automatización",
    "strategies.functionFlow": "Flujo de Funciones",
    "strategies.executed": "Ejecutado",
    "strategies.times": "veces",
    "strategies.lastExecution": "Última Ejecución",
    "strategies.executeNow": "Ejecutar Ahora",
    "strategies.newStrategy": "Nueva Estrategia",

    // History
    "history.title": "Historial de Conversaciones",
    "history.subtitle": "Ve y administra tus conversaciones pasadas",
    "history.messages": "mensajes",
    "history.functions": "funciones",
    "history.allApps": "Todas las Aplicaciones",
    "history.allDates": "Todas las Fechas",
    "history.completed": "Completado",
    "history.error": "Error",
    "history.viewConversation": "Ver Conversación",
    "history.loadMore": "Cargar Más",

    // Agents
    "agents.title": "Agentes de IA",
    "agents.subtitle": "Administra tus asistentes de IA y sus capacidades",
  },
  typescript: {
    // Navigation
    "nav.chat": "Chat",
    "nav.applications": "Applications",
    "nav.databases": "Databases",
    "nav.agents": "Agents",
    "nav.strategies": "Strategies",
    "nav.history": "History",

    // Chat
    "chat.placeholder": "Demandez-moi n'importe quoi sur vos APIs, bases de données ou code...",
    "chat.send": "Envoyer",
    "chat.typing": "L'IA réfléchit...",

    // Selectors
    "selectors.agent": "Agent:",
    "selectors.app": "App:",
    "selectors.db": "BD:",
    "selectors.selectAgent": "Sélectionner un agent",
    "selectors.selectApp": "Sélectionner une app",
    "selectors.selectDatabase": "Sélectionner une base de données",

    // Agents
    "agent.technical": "Assistant Technique",
    "agent.creative": "Aideur Créatif",
    "agent.analytical": "Analyste de Données",

    // Applications
    "app.ecommerce": "API E-commerce",
    "app.crm": "Système CRM",
    "app.analytics": "API Analytics",

    // Databases
    "db.postgres": "PostgreSQL Principal",
    "db.redis": "Cache Redis",
    "db.mongo": "Logs MongoDB",

    // Quick Actions
    "quick.generate_code": "Générer le Code",
    "quick.explain_concept": "Expliquer le Concept",
    "quick.analyze_data": "Analyser les Données",
    "quick.quick_fix": "Correction Rapide",

    // Common
    "common.user": "Utilisateur",
    "common.settings": "Paramètres",
    "common.logout": "Déconnexion",
    "common.save": "Enregistrer",
    "common.cancel": "Annuler",
    "common.delete": "Supprimer",
    "common.edit": "Modifier",
    "common.add": "Ajouter",
    "common.remove": "Retirer",
    "common.update": "Mettre à jour",
    "common.create": "Créer",
    "common.search": "Rechercher",
    "common.filter": "Filtrer",
    "common.sort": "Trier",
    "common.export": "Exporter",
    "common.import": "Importer",
    "common.loading": "Chargement...",
    "common.error": "Erreur",
    "common.success": "Succès",
    "common.warning": "Avertissement",
    "common.info": "Information",

    // Settings
    "settings.title": "Paramètres",
    "settings.subtitle": "Gérez votre compte et vos préférences",

    // Profile
    "profile.title": "Informations du Profil",
    "profile.subtitle": "Mettez à jour vos informations personnelles et préférences",
    "profile.name": "Nom Complet",
    "profile.email": "Adresse E-mail",
    "profile.avatar": "Photo de Profil",
    "profile.bio": "Biographie",
    "profile.location": "Localisation",
    "profile.website": "Site Web",
    "profile.save": "Enregistrer les Modifications",
    "profile.changeAvatar": "Changer l'Avatar",
    "profile.removeAvatar": "Supprimer l'Avatar",

    // Subscription
    "subscription.title": "Plan d'Abonnement",
    "subscription.subtitle": "Gérez votre abonnement et facturation",
    "subscription.tokens": "Jetons API",
    "subscription.tokensRemaining": "jetons restants",

    // Billing
    "billing.title": "Informations de Facturation",
    "billing.subtitle": "Gérez vos méthodes de paiement et historique de facturation",
    "billing.paymentMethod": "Méthode de Paiement",
    "billing.updatePaymentMethod": "Mettre à jour la Méthode de Paiement",
    "billing.removePaymentMethod": "Supprimer la Méthode de Paiement",
    "billing.history": "Historique de Facturation",

    // Security
    "security.title": "Paramètres de Sécurité",
    "security.subtitle": "Gérez la sécurité et la confidentialité de votre compte",
    "security.changePassword": "Changer le Mot de Passe",
    "security.currentPassword": "Mot de Passe Actuel",
    "security.newPassword": "Nouveau Mot de Passe",
    "security.confirmPassword": "Confirmer le Mot de Passe",
    "security.twoFactor": "Authentification à Deux Facteurs",
    "security.sessions": "Sessions Actives",
    "security.enable2FA": "Activer 2FA",
    "security.terminateAll": "Terminer Toutes les Sessions",
    "security.terminateSession": "Terminer la Session",

    // Notifications
    "notifications.title": "Préférences de Notification",
    "notifications.subtitle": "Choisissez les notifications que vous souhaitez recevoir",
    "notifications.email": "Notifications par E-mail",
    "notifications.push": "Notifications Push",
    "notifications.marketing": "Communications Marketing",
    "notifications.security": "Alertes de Sécurité",
    "notifications.billing": "Notifications de Facturation",
    "notifications.updates": "Mises à jour Produit",

    // Onboarding
    "onboarding.guestWelcome": "Bienvenue, Invité !",
    "onboarding.signIn": "Se Connecter",
    "onboarding.signUp": "S'inscrire",
    "onboarding.getStarted": "Commencer",
    "onboarding.or": "ou",
    "onboarding.feature1": "Connecter les APIs",
    "onboarding.feature1Desc": "Intégrez avec vos applications et services préférés",
    "onboarding.feature2": "Intégration de Base de Données",
    "onboarding.feature2Desc": "Connectez et interrogez vos bases de données avec le langage naturel",
    "onboarding.feature3": "Agents IA",
    "onboarding.feature3Desc": "Créez des assistants intelligents pour vos flux de travail",
    "onboarding.feature4": "Automatisation",
    "onboarding.feature4Desc": "Construisez des stratégies d'automatisation et des flux de travail puissants",
    "onboarding.signInWithGoogle": "Se connecter avec Google",
    "onboarding.continueAsGuest": "Continuer en tant qu'invité",
    "onboarding.guestNote": "Fonctionnalités limitées disponibles en mode invité",
    "onboarding.welcome": "Bienvenue sur ApiChat",
    "onboarding.subtitle": "Votre assistant API et base de données alimenté par l'IA",
    "onboarding.description":
      "Connectez, interrogez et automatisez vos applications et bases de données grâce à des conversations en langage naturel",

    // Applications
    "apps.title": "Applications",
    "apps.subtitle": "Gérez vos applications connectées",
    "apps.addNew": "Ajouter une Application",
    "apps.installed": "Applications Installées",
    "apps.available": "Applications Disponibles",
    "apps.active": "Actif",
    "apps.inactive": "Inactif",
    "apps.install": "Installer",
    "apps.configure": "Configurer",
    "apps.selectApp": "Sélectionnez une application pour voir les détails",

    // Databases
    "databases.title": "Connexions de Base de Données",
    "databases.subtitle": "Gérez vos intégrations de base de données",
    "databases.addNew": "Ajouter une Base de Données",
    "databases.schema": "Schéma de Base de Données",
    "databases.connect": "Connecter",
    "databases.disconnect": "Déconnecter",
    "databases.testConnection": "Tester la Connexion",
    "databases.connections": "Connexions de Base de Données",
    "databases.selectDatabase": "Sélectionnez une base de données pour voir le schéma",

    // Strategies
    "strategies.title": "Stratégies d'Automatisation",
    "strategies.subtitle": "Créez et gérez vos flux de travail d'automatisation",
    "strategies.functionFlow": "Flux de Fonctions",
    "strategies.executed": "Exécuté",
    "strategies.times": "fois",
    "strategies.lastExecution": "Dernière Exécution",
    "strategies.executeNow": "Exécuter Maintenant",
    "strategies.newStrategy": "Nouvelle Stratégie",

    // History
    "history.title": "Historique des Conversations",
    "history.subtitle": "Visualisez et gérez vos conversations passées",
    "history.messages": "messages",
    "history.functions": "fonctions",
    "history.allApps": "Toutes les Applications",
    "history.allDates": "Toutes les Dates",
    "history.completed": "Terminé",
    "history.error": "Erreur",
    "history.viewConversation": "Voir la Conversation",
    "history.loadMore": "Charger Plus",

    // Agents
    "agents.title": "Agents IA",
    "agents.subtitle": "Gérez vos assistants IA et leurs capacités",
  },
  sql: {
    // Navigation
    "nav.chat": "Chat",
    "nav.applications": "Aplicaciones",
    "nav.databases": "Bases de Datos",
    "nav.agents": "Agentes",
    "nav.strategies": "Estrategias",
    "nav.history": "Historial",

    // Chat
    "chat.placeholder": "Pregúntame sobre tus APIs, bases de datos o código...",
    "chat.send": "Enviar",
    "chat.typing": "La IA está pensando...",

    // Selectors
    "selectors.agent": "Agente:",
    "selectors.app": "App:",
    "selectors.db": "BD:",
    "selectors.selectAgent": "Seleccionar agente",
    "selectors.selectApp": "Seleccionar app",
    "selectors.selectDatabase": "Seleccionar base de datos",

    // Agents
    "agent.technical": "Asistente Técnico",
    "agent.creative": "Ayudante Creativo",
    "agent.analytical": "Analista de Datos",

    // Applications
    "app.ecommerce": "API E-commerce",
    "app.crm": "Sistema CRM",
    "app.analytics": "API Analytics",

    // Databases
    "db.postgres": "PostgreSQL Principal",
    "db.redis": "Caché Redis",
    "db.mongo": "Logs MongoDB",

    // Quick Actions
    "quick.generate_code": "Generar Código",
    "quick.explain_concept": "Explicar Concepto",
    "quick.analyze_data": "Analizar Datos",
    "quick.quick_fix": "Solución Rápida",

    // Common
    "common.user": "Usuario",
    "common.settings": "Configuración",
    "common.logout": "Cerrar Sesión",
    "common.save": "Guardar",
    "common.cancel": "Cancelar",
    "common.delete": "Eliminar",
    "common.edit": "Editar",
    "common.add": "Agregar",
    "common.remove": "Quitar",
    "common.update": "Actualizar",
    "common.create": "Crear",
    "common.search": "Buscar",
    "common.filter": "Filtrar",
    "common.sort": "Ordenar",
    "common.export": "Exportar",
    "common.import": "Importar",
    "common.loading": "Cargando...",
    "common.error": "Error",
    "common.success": "Éxito",
    "common.warning": "Advertencia",
    "common.info": "Información",

    // Settings
    "settings.title": "Configuración",
    "settings.subtitle": "Administra tu cuenta y preferencias",

    // Profile
    "profile.title": "Información del Perfil",
    "profile.subtitle": "Actualiza tu información personal y preferencias",
    "profile.name": "Nombre Completo",
    "profile.email": "Dirección de Correo",
    "profile.avatar": "Foto de Perfil",
    "profile.bio": "Biografía",
    "profile.location": "Ubicación",
    "profile.website": "Sitio Web",
    "profile.save": "Guardar Cambios",
    "profile.changeAvatar": "Cambiar Avatar",
    "profile.removeAvatar": "Quitar Avatar",

    // Subscription
    "subscription.title": "Plan de Suscripción",
    "subscription.subtitle": "Administra tu suscripción y facturación",
    "subscription.tokens": "Tokens de API",
    "subscription.tokensRemaining": "tokens restantes",

    // Billing
    "billing.title": "Información de Facturación",
    "billing.subtitle": "Administra tus métodos de pago e historial de facturación",
    "billing.paymentMethod": "Método de Pago",
    "billing.updatePaymentMethod": "Actualizar Método de Pago",
    "billing.removePaymentMethod": "Quitar Método de Pago",
    "billing.history": "Historial de Facturación",

    // Security
    "security.title": "Configuración de Seguridad",
    "security.subtitle": "Administra la seguridad y privacidad de tu cuenta",
    "security.changePassword": "Cambiar Contraseña",
    "security.currentPassword": "Contraseña Actual",
    "security.newPassword": "Nueva Contraseña",
    "security.confirmPassword": "Confirmar Contraseña",
    "security.twoFactor": "Autenticación de Dos Factores",
    "security.sessions": "Sesiones Activas",
    "security.enable2FA": "Habilitar 2FA",
    "security.terminateAll": "Terminar Todas las Sesiones",
    "security.terminateSession": "Terminar Sesión",

    // Notifications
    "notifications.title": "Preferencias de Notificación",
    "notifications.subtitle": "Elige qué notificaciones quieres recibir",
    "notifications.email": "Notificaciones por Correo",
    "notifications.push": "Notificaciones Push",
    "notifications.marketing": "Comunicaciones de Marketing",
    "notifications.security": "Alertas de Seguridad",
    "notifications.billing": "Notificaciones de Facturación",
    "notifications.updates": "Actualizaciones de Producto",

    // Onboarding
    "onboarding.guestWelcome": "¡Bienvenido, Invitado!",
    "onboarding.signIn": "Iniciar Sesión",
    "onboarding.signUp": "Registrarse",
    "onboarding.getStarted": "Comenzar",
    "onboarding.or": "o",
    "onboarding.feature1": "Conectar APIs",
    "onboarding.feature1Desc": "Integra con tus aplicaciones y servicios favoritos",
    "onboarding.feature2": "Integración de Base de Datos",
    "onboarding.feature2Desc": "Conecta y consulta tus bases de datos con lenguaje natural",
    "onboarding.feature3": "Agentes IA",
    "onboarding.feature3Desc": "Crea asistentes inteligentes para tus flujos de trabajo",
    "onboarding.feature4": "Automatización",
    "onboarding.feature4Desc": "Construye estrategias de automatización y flujos de trabajo poderosos",
    "onboarding.signInWithGoogle": "Iniciar sesión con Google",
    "onboarding.continueAsGuest": "Continuar como Invitado",
    "onboarding.guestNote": "Funciones limitadas disponibles en modo invitado",
    "onboarding.welcome": "Bienvenido a ApiChat",
    "onboarding.subtitle": "Tu asistente de API y base de datos impulsado por IA",
    "onboarding.description":
      "Conecta, consulta y automatiza tus aplicaciones y bases de datos a través de conversaciones en lenguaje natural",

    // Applications
    "apps.title": "Aplicaciones",
    "apps.subtitle": "Administra tus aplicaciones conectadas",
    "apps.addNew": "Agregar Aplicación",
    "apps.installed": "Aplicaciones Instaladas",
    "apps.available": "Aplicaciones Disponibles",
    "apps.active": "Activo",
    "apps.inactive": "Inactivo",
    "apps.install": "Instalar",
    "apps.configure": "Configurar",
    "apps.selectApp": "Selecciona una aplicación para ver detalles",

    // Databases
    "databases.title": "Conexiones de Base de Datos",
    "databases.subtitle": "Administra tus integraciones de base de datos",
    "databases.addNew": "Agregar Base de Datos",
    "databases.schema": "Esquema de Base de Datos",
    "databases.connect": "Conectar",
    "databases.disconnect": "Desconectar",
    "databases.testConnection": "Probar Conexión",
    "databases.connections": "Conexiones de Base de Datos",
    "databases.selectDatabase": "Selecciona una base de datos para ver el esquema",

    // Strategies
    "strategies.title": "Estrategias de Automatización",
    "strategies.subtitle": "Crea y administra tus flujos de trabajo de automatización",
    "strategies.functionFlow": "Flujo de Funciones",
    "strategies.executed": "Ejecutado",
    "strategies.times": "veces",
    "strategies.lastExecution": "Última Ejecución",
    "strategies.executeNow": "Ejecutar Ahora",
    "strategies.newStrategy": "Nueva Estrategia",

    // History
    "history.title": "Historial de Conversaciones",
    "history.subtitle": "Ve y administra tus conversaciones pasadas",
    "history.messages": "mensajes",
    "history.functions": "funciones",
    "history.allApps": "Todas las Aplicaciones",
    "history.allDates": "Todas las Fechas",
    "history.completed": "Completado",
    "history.error": "Error",
    "history.viewConversation": "Ver Conversación",
    "history.loadMore": "Cargar Más",

    // Agents
    "agents.title": "Agentes de IA",
    "agents.subtitle": "Administra tus asistentes de IA y sus capacidades",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("javascript")

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["javascript", "python", "typescript", "sql"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
