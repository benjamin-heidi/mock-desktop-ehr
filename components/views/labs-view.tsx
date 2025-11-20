"use client"

import { Plus, Search } from "lucide-react"

interface LabResult {
  id: string
  date: string
  testName: string
  patient: string
  status: string
  result: string
}

const MOCK_LAB_RESULTS: LabResult[] = [
  {
    id: "1",
    date: "18/11/2025",
    testName: "Complete Blood Count",
    patient: "John Doe",
    status: "Completed",
    result: "Normal",
  },
  {
    id: "2",
    date: "17/11/2025",
    testName: "Metabolic Panel",
    patient: "Agnes Martin",
    status: "Completed",
    result: "Abnormal",
  },
  {
    id: "3",
    date: "16/11/2025",
    testName: "Lipid Panel",
    patient: "Henri Matisse",
    status: "Pending",
    result: "Pending",
  },
]

export default function LabsView() {
  const activeSection = "results"
  const sectionTitle =
    activeSection === "results" ? "Lab Results" : activeSection === "pending" ? "Pending Tests" : "History"

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 bg-surface border-b border-soft">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-neutral-900">{sectionTitle}</h1>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New lab order
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border border-soft rounded-lg text-sm max-w-xs"
          />
        </div>
      </div>

      {/* Lab Results Table */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-neutral-50 border-b border-soft">
            <tr>
              <th className="px-6 py-3 text-left text-neutral-600 font-medium">Date</th>
              <th className="px-6 py-3 text-left text-neutral-600 font-medium">Test Name</th>
              <th className="px-6 py-3 text-left text-neutral-600 font-medium">Patient</th>
              <th className="px-6 py-3 text-left text-neutral-600 font-medium">Status</th>
              <th className="px-6 py-3 text-left text-neutral-600 font-medium">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-soft bg-white">
            {MOCK_LAB_RESULTS.map((result) => (
              <tr key={result.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 text-neutral-700">{result.date}</td>
                <td className="px-6 py-4 font-medium text-neutral-900">{result.testName}</td>
                <td className="px-6 py-4">
                  <button className="text-primary hover:underline">{result.patient}</button>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      result.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {result.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      result.result === "Normal"
                        ? "bg-green-100 text-green-800"
                        : result.result === "Abnormal"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {result.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-6 bg-surface border-t border-soft flex items-center justify-between">
        <p className="text-sm text-neutral-600">Total: {MOCK_LAB_RESULTS.length} results</p>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-neutral-100 rounded-lg border border-soft">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded font-medium text-sm">
            1
          </button>
          <button className="p-2 hover:bg-neutral-100 rounded-lg border border-soft">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
