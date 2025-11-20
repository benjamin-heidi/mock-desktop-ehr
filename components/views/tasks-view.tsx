"use client"

import { Plus, Search } from "lucide-react"

interface Task {
  id: string
  priority: "H" | "M" | "L"
  status: string
  task: string
  createdBy: string
  assignedTo: string
  type: string
  patient: string
  dueDate: string
}

const MOCK_TASKS: Task[] = [
  {
    id: "1",
    priority: "H",
    status: "Open",
    task: "Blood dose",
    createdBy: "Andy Epifani",
    assignedTo: "Andy Epifani",
    type: "Lab order",
    patient: "John Doe",
    dueDate: "18/11/2025",
  },
]

export default function TasksView() {
  const activeSection = "pending"
  const sectionTitle =
    activeSection === "pending" ? "Pending" : activeSection === "completed" ? "Completed" : "Assigned to Me"

  return (
    <div className="flex flex-col h-full overflow-auto bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="p-6 bg-white border-b border-neutral-200 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Tasks - {sectionTitle}</h1>
            <p className="text-neutral-600 text-sm mt-2">Manage and track tasks for patients and clinical workflows</p>
          </div>
          <button className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-md hover:shadow-lg">
            <Plus className="w-4 h-4" />
            New task
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-lg">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-neutral-100 to-neutral-50 border-b-2 border-neutral-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">Task</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">Created by</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">Assigned to</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">Due date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {MOCK_TASKS.map((task) => (
                  <tr key={task.id} className="transition-all hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 text-red-800 rounded text-xs font-bold">
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-neutral-900">{task.task}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-neutral-700">{task.createdBy}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-neutral-700">{task.assignedTo}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-neutral-700">{task.type}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-sm text-primary hover:underline font-medium">{task.patient}</button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-neutral-700">{task.dueDate}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-neutral-600">Total: {MOCK_TASKS.length} tasks</p>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white rounded-lg border border-neutral-200 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded font-medium text-sm shadow-sm">
                1
              </button>
              <button className="p-2 hover:bg-white rounded-lg border border-neutral-200 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <select className="px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary">
                <option>10 / page</option>
                <option>25 / page</option>
                <option>50 / page</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
