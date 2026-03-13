import { Menu } from "lucide-react"

export default function Header({ setSidebarOpen }) {
  return (
    <header className="bg-white border-b px-6 py-4 flex items-center justify-between">

      <div className="flex items-center gap-3">

        <button
          className="md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={22} />
        </button>

        <h1 className="text-lg font-semibold text-slate-800">
          HRMS Dashboard
        </h1>

      </div>

      <span className="text-sm text-slate-500">
        Admin
      </span>

    </header>
  )
}