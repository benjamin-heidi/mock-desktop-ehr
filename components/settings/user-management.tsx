"use client"

import { useAtom } from "jotai"
import { Plus, UserCog, Mail, Trash2, Check, X } from "lucide-react"
import { usersAtom, type User } from "@/lib/store/atoms"
import { useState } from "react"

export default function UserManagement() {
  const [users, setUsers] = useAtom(usersAtom)
  const [editingUser, setEditingUser] = useState<string | null>(null)

  const handleToggleActive = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, active: !u.active } : u))
  }

  const handleUpdateUser = (userId: string, field: keyof User, value: string | boolean) => {
    setUsers(users.map(u => u.id === userId ? { ...u, [field]: value } : u))
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(u => u.id !== userId))
    }
  }

  const handleAddUser = () => {
    const newUser: User = {
      id: `u${Date.now()}`,
      name: "New User",
      fullName: "New User",
      email: "newuser@careflow.com",
      role: "Physician",
      specialty: "",
      active: true,
    }
    setUsers([...users, newUser])
    setEditingUser(newUser.id)
  }

  const handleSaveUser = () => {
    setEditingUser(null)
  }

  const handleCancelEdit = (userId: string) => {
    setEditingUser(null)
  }

  return (
    <div className="flex flex-col h-full overflow-auto bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="p-6 bg-white border-b border-neutral-200 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">User Management</h1>
            <p className="text-neutral-600 text-sm mt-2">Manage clinicians and staff who appear in the appointment schedule</p>
          </div>
          <button
            onClick={handleAddUser}
            className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Add User
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-lg">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-neutral-100 to-neutral-50 border-b-2 border-neutral-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                    Display Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                    Specialty
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className={`transition-all hover:bg-neutral-50 ${
                      editingUser === user.id ? "bg-blue-50 ring-2 ring-blue-200" : ""
                    } ${!user.active ? "opacity-50" : ""}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={user.active}
                          onChange={() => handleToggleActive(user.id)}
                          className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-2 focus:ring-primary"
                        />
                        <span className={`text-xs font-medium ${user.active ? "text-green-700" : "text-neutral-500"}`}>
                          {user.active ? "Active" : "Inactive"}
                        </span>
                      </label>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingUser === user.id ? (
                        <input
                          type="text"
                          value={user.name}
                          onChange={(e) => handleUpdateUser(user.id, "name", e.target.value)}
                          className="px-3 py-2 border-2 border-blue-300 rounded-lg text-sm w-full focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      ) : (
                        <span className="text-sm font-semibold text-neutral-900">
                          {user.name}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingUser === user.id ? (
                        <input
                          type="text"
                          value={user.fullName}
                          onChange={(e) => handleUpdateUser(user.id, "fullName", e.target.value)}
                          className="px-3 py-2 border-2 border-blue-300 rounded-lg text-sm w-full focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      ) : (
                        <span className="text-sm text-neutral-700">{user.fullName}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                        {editingUser === user.id ? (
                          <input
                            type="email"
                            value={user.email}
                            onChange={(e) => handleUpdateUser(user.id, "email", e.target.value)}
                            className="px-3 py-2 border-2 border-blue-300 rounded-lg text-sm w-full focus:outline-none focus:border-blue-500 transition-colors"
                          />
                        ) : (
                          <span className="text-sm text-neutral-700">{user.email}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingUser === user.id ? (
                        <select
                          value={user.role}
                          onChange={(e) => handleUpdateUser(user.id, "role", e.target.value)}
                          className="px-3 py-2 border-2 border-blue-300 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 transition-colors"
                        >
                          <option value="Physician">Physician</option>
                          <option value="Nurse Practitioner">Nurse Practitioner</option>
                          <option value="Admin">Admin</option>
                          <option value="System">System</option>
                        </select>
                      ) : (
                        <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {user.role}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingUser === user.id ? (
                        <input
                          type="text"
                          value={user.specialty || ""}
                          onChange={(e) => handleUpdateUser(user.id, "specialty", e.target.value)}
                          placeholder="e.g., Cardiology"
                          className="px-3 py-2 border-2 border-blue-300 rounded-lg text-sm w-full focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      ) : (
                        <span className="text-sm text-neutral-600">{user.specialty || "-"}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {editingUser === user.id ? (
                          <>
                            <button
                              onClick={handleSaveUser}
                              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-sm"
                              title="Save changes"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleCancelEdit(user.id)}
                              className="p-2 bg-neutral-400 text-white rounded-lg hover:bg-neutral-500 transition-colors shadow-sm"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => setEditingUser(user.id)}
                              className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                              title="Edit user"
                            >
                              <UserCog className="w-4 h-4 text-blue-600" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                              title="Delete user"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg shadow-sm">
            <h3 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              About User Management
            </h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Active users appear as columns in the appointment schedule grid</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Inactive users are hidden from the schedule but their data is preserved</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>The "Display Name" is shown in the schedule header (e.g., "M. Johnson")</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Click the edit icon to modify user details, then save or cancel your changes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
