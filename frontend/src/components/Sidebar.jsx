import { Link } from "react-router-dom"

export default function Sidebar({ open, setOpen }) {

  return (
    <>
      {/* mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
        bg-indigo-600 text-white p-6 w-64
        fixed md:sticky top-0 left-0
        h-screen overflow-y-auto
        transform transition-transform duration-200
        z-50
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        `}
      >

        <h2 className="text-2xl font-bold mb-10">
          HRMS
        </h2>

        <nav className="flex flex-col gap-4">

          <Link
            to="/employees"
            className="p-2 rounded hover:bg-indigo-500 transition"
          >
            Employees
          </Link>

          <Link
            to="/attendance"
            className="p-2 rounded hover:bg-indigo-500 transition"
          >
            Attendance
          </Link>

        </nav>

      </aside>
    </>
  )
}