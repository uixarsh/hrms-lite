import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../api/client"

export default function AddEmployeeModal({ close }) {

  const queryClient = useQueryClient()

  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: ""
  })

  const createEmployee = useMutation({
    mutationFn: (data) => api.post("/employees/", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"])
      close()
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createEmployee.mutate(form)
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4"
      onClick={close}
    >

      {/* Modal */}
      <div
        className="bg-white w-full max-w-md rounded-xl shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >

        <h2 className="text-xl font-semibold text-slate-800 mb-6 text-left">
          Add Employee
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 text-left">

          {/* Employee ID */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-600 mb-1">
              Employee ID
            </label>

            <input
              type="text"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) =>
                setForm({ ...form, employee_id: e.target.value })
              }
            />
          </div>

          {/* Full Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-600 mb-1">
              Full Name
            </label>

            <input
              type="text"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) =>
                setForm({ ...form, full_name: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-600 mb-1">
              Email
            </label>

            <input
              type="email"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-600 mb-1">
              Department
            </label>

            <input
              type="text"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) =>
                setForm({ ...form, department: e.target.value })
              }
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">

            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Create
            </button>

            <button
              type="button"
              onClick={close}
              className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}