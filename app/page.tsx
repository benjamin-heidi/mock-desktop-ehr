"use client"

import { useState } from "react"
import AppLayout from "@/components/layout/app-layout"
import AppointmentsView from "@/components/views/appointments-view"
import PatientsView from "@/components/views/patients-view"
import TasksView from "@/components/views/tasks-view"
import LabsView from "@/components/views/labs-view"
import SettingsView from "@/components/views/settings-view"

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

export default function Home() {
  const [activeModule, setActiveModule] = useState<ActiveModule>("appointments")

  const renderView = () => {
    switch (activeModule) {
      case "appointments":
        return <AppointmentsView />
      case "patients":
        return <PatientsView />
      case "tasks":
        return <TasksView />
      case "labs":
        return <LabsView />
      case "settings":
        return <SettingsView />
      default:
        return <div className="p-8 text-neutral-500">Module coming soon</div>
    }
  }

  return (
    <AppLayout activeModule={activeModule} onModuleChange={setActiveModule}>
      {renderView()}
    </AppLayout>
  )
}
