"use client"

import { useAtom } from "jotai"
import { MapPin, Plus, Building2, Users, Trash2 } from "lucide-react"
import { clinicSettingsAtom } from "@/lib/store/atoms"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Location {
  id: string
  name: string
  address: string
  rooms: number
  active: boolean
}

export default function LocationSettings() {
  const [clinicSettings, setClinicSettings] = useAtom(clinicSettingsAtom)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    rooms: 1,
  })

  const [locations, setLocations] = useState<Location[]>([
    {
      id: "loc1",
      name: "Heidi SF - Main Clinic",
      address: "123 Market St, San Francisco, CA 94102",
      rooms: 2,
      active: true,
    },
    {
      id: "loc2",
      name: "Heidi SF - Downtown",
      address: "456 Montgomery St, San Francisco, CA 94104",
      rooms: 3,
      active: true,
    },
    {
      id: "loc3",
      name: "Heidi SF - Mission District",
      address: "789 Valencia St, San Francisco, CA 94110",
      rooms: 1,
      active: false,
    },
  ])

  const handleToggleActive = (locationId: string) => {
    setLocations(locations.map(loc =>
      loc.id === locationId ? { ...loc, active: !loc.active } : loc
    ))
  }

  const handleDeleteLocation = (locationId: string) => {
    if (confirm("Are you sure you want to delete this location?")) {
      setLocations(locations.filter(loc => loc.id !== locationId))
    }
  }

  const handleAddLocation = () => {
    const location: Location = {
      id: `loc${Date.now()}`,
      name: newLocation.name,
      address: newLocation.address,
      rooms: newLocation.rooms,
      active: true,
    }
    setLocations([...locations, location])
    setIsDialogOpen(false)
    setNewLocation({ name: "", address: "", rooms: 1 })
  }

  const handleUpdateLocation = (locationId: string, field: keyof Location, value: any) => {
    setLocations(locations.map(loc =>
      loc.id === locationId ? { ...loc, [field]: value } : loc
    ))
  }

  return (
    <div className="flex flex-col h-full overflow-auto bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="p-6 bg-white border-b border-neutral-200 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <div className="flex items-center gap-3">
              <MapPin className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-neutral-900">Location Settings</h1>
                <p className="text-neutral-600 text-sm mt-1">Manage clinic locations and their room configurations</p>
              </div>
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button
                className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Add Location
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Location</DialogTitle>
                <DialogDescription>
                  Fill in the details for the new clinic location.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Location Name
                  </label>
                  <input
                    type="text"
                    value={newLocation.name}
                    onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-neutral-200 rounded-lg text-sm font-medium focus:outline-none focus:border-primary transition-colors"
                    placeholder="e.g., Heidi SF - Main Clinic"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={newLocation.address}
                    onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="e.g., 123 Market St, San Francisco, CA 94102"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Number of Rooms
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newLocation.rooms}
                    onChange={(e) => setNewLocation({ ...newLocation, rooms: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-2.5 border-2 border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <DialogFooter>
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="px-4 py-2 border-2 border-neutral-300 rounded-lg text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddLocation}
                  disabled={!newLocation.name || !newLocation.address}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Location
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Active Locations */}
          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Locations ({locations.filter(loc => loc.active).length} active)
            </h2>

            <div className="space-y-4">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className={`bg-white border border-neutral-200 rounded-xl p-6 shadow-md transition-all ${
                    !location.active ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={location.active}
                            onChange={() => handleToggleActive(location.id)}
                            className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-2 focus:ring-primary"
                          />
                          <span className={`text-xs font-semibold ${location.active ? "text-green-700" : "text-neutral-500"}`}>
                            {location.active ? "Active" : "Inactive"}
                          </span>
                        </label>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-2">
                            Location Name
                          </label>
                          <input
                            type="text"
                            value={location.name}
                            onChange={(e) => handleUpdateLocation(location.id, "name", e.target.value)}
                            className="w-full px-4 py-2.5 border-2 border-neutral-200 rounded-lg text-sm font-medium focus:outline-none focus:border-primary transition-colors"
                            placeholder="e.g., Heidi SF - Main Clinic"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-2">
                            Address
                          </label>
                          <input
                            type="text"
                            value={location.address}
                            onChange={(e) => handleUpdateLocation(location.id, "address", e.target.value)}
                            className="w-full px-4 py-2.5 border-2 border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
                            placeholder="e.g., 123 Market St, San Francisco, CA 94102"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-2">
                              Number of Rooms
                            </label>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-neutral-400" />
                              <input
                                type="number"
                                min="1"
                                value={location.rooms}
                                onChange={(e) => handleUpdateLocation(location.id, "rooms", parseInt(e.target.value) || 1)}
                                className="flex-1 px-4 py-2.5 border-2 border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
                              />
                            </div>
                          </div>

                          <div className="flex items-end">
                            <button
                              onClick={() => handleDeleteLocation(location.id)}
                              className="w-full px-4 py-2.5 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete Location
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location Stats */}
                  <div className="mt-4 pt-4 border-t border-neutral-200">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        <span className="text-neutral-600">Rooms:</span>
                        <span className="font-semibold text-neutral-900">{location.rooms}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-green-600" />
                        <span className="text-neutral-600">Status:</span>
                        <span className={`font-semibold ${location.active ? "text-green-600" : "text-neutral-500"}`}>
                          {location.active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg shadow-sm">
            <h3 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              About Location Settings
            </h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Active locations are available for appointment scheduling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Inactive locations are hidden but their data is preserved</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Each location can have multiple rooms configured</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Changes take effect immediately across the application</span>
              </li>
            </ul>
          </div>

          {/* Save Actions */}
          <div className="flex gap-3 pb-6">
            <button className="px-6 py-3 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-opacity-90 shadow-md transition-all">
              Save Changes
            </button>
            <button className="px-6 py-3 border-2 border-neutral-300 rounded-lg text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-all">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
