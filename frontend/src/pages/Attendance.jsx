import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../api/client"
import { useState } from "react"

export default function Attendance() {

  const queryClient = useQueryClient()

  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "present"
  })

  // fetch employees
  const { data: employees } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await api.get("/employees")
      return res.data
    }
  })

  // fetch attendance
  const { data: attendance } = useQuery({
    queryKey: ["attendance"],
    queryFn: async () => {
      const res = await api.get("/attendance")
      return res.data
    }
  })

  // mark attendance
  const markAttendance = useMutation({
    mutationFn: (data) => api.post("/attendance", data),
    onSuccess: () => queryClient.invalidateQueries(["attendance"])
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    markAttendance.mutate(form)
  }

  return (
    <div className="w-full">

      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        Attendance
      </h1>

      {/* Attendance Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >

          {/* Employee */}
          <select
            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-indigo-500"
            onChange={(e) =>
              setForm({ ...form, employee_id: e.target.value })
            }
          >
            <option value="">Select Employee</option>

            {employees?.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.full_name}
              </option>
            ))}
          </select>

          {/* Date */}
          <input
            type="date"
            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-indigo-500"
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />

          {/* Status */}
          <select
            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-indigo-500"
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>

          {/* Button */}
          <button
            type="submit"
            className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition"
          >
            Mark Attendance
          </button>

        </form>

      </div>

      {/* Attendance Table */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
            <tr>

              <th className="px-6 py-4 text-center">Employee</th>
              <th className="px-6 py-4 text-center">Date</th>
              <th className="px-6 py-4 text-center">Status</th>

            </tr>
          </thead>

          <tbody>

            {attendance?.map((row) => (
              <tr
                key={row.id}
                className="border-t hover:bg-slate-50 transition"
              >

                <td className="px-6 py-4 text-center font-medium text-slate-700">
                  {row.employee_name}
                </td>

                <td className="px-6 py-4 text-center text-slate-600">
                  {row.date}
                </td>

                <td className="px-6 py-4 text-center">

                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                      row.status === "present"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {row.status}
                  </span>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}