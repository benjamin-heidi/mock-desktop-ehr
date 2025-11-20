"use client"

import type React from "react"

import { useState } from "react"
import TopNavigation from "./top-navigation"
import Sidebar from "./sidebar"

type ActiveModule =
  | "appointments"
  | "patients"
  | "tasks"
  | "labs"
  | "letters"
  | "invoices"
  | "contacts"
  | "data"
  | "settings"

interface AppLayoutProps {
  activeModule: ActiveModule
  onModuleChange: (module: ActiveModule) => void
  children: React.ReactNode
}

export default function AppLayout({ activeModule, onModuleChange, children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} activeModule={activeModule} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNavigation
          activeModule={activeModule}
          onModuleChange={onModuleChange}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-background">{children}</main>
      </div>
    </div>
  )
}
