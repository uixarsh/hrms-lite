import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../api/client"
import { useState } from "react"
import AddEmployeeModal from "../components/AddEmployeeModal"

export default function Employees() {
  const queryClient = useQueryClient()
  const [showModal, setShowModal] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await api.get("/employees")
      return res.data
    }
  })

  const deleteEmployee = useMutation({
    mutationFn: (id) => api.delete(`/employees/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["employees"])
  })

  if (isLoading) {
    return (
      <div className="text-slate-500 text-lg">
        Loading employees...
      </div>
    )
  }

  return (
    <div className="w-full">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

        <h1 className="text-2xl font-bold text-slate-800">
          Employees
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition shadow-sm"
        >
          + Add Employee
        </button>

      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

        <div className="overflow-x-auto">

            <table className="w-full text-sm">

            {/* Header */}
            <thead className="bg-slate-50 text-slate-600 uppercase text-xs">

                <tr>

                <th className="px-6 py-4 text-center">Employee ID</th>
                <th className="px-6 py-4 text-center">Name</th>
                <th className="px-6 py-4 text-center">Email</th>
                <th className="px-6 py-4 text-center">Department</th>
                <th className="px-6 py-4 text-center">Action</th>

                </tr>

            </thead>

            {/* Body */}
            <tbody>

                {data?.map((emp) => (
                <tr
                    key={emp.id}
                    className="border-t hover:bg-slate-50 transition"
                >

                    <td className="px-6 py-4 text-center font-medium text-slate-700">
                    {emp.employee_id}
                    </td>

                    <td className="px-6 py-4 text-center">
                    {emp.full_name}
                    </td>

                    <td className="px-6 py-4 text-center text-slate-600">
                    {emp.email}
                    </td>

                    <td className="px-6 py-4 text-center">
                    <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-xs">
                        {emp.department}
                    </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                    <button
                        onClick={() => deleteEmployee.mutate(emp.id)}
                        className="text-red-500 hover:text-red-700 font-medium"
                    >
                        Delete
                    </button>
                    </td>

                </tr>
                ))}

            </tbody>

            </table>

        </div>

        </div>
      
      {/* Modal */}
      {showModal && (
        <AddEmployeeModal close={() => setShowModal(false)} />
      )}

    </div>
  )
}