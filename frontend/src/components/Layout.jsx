import { useState } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"

export default function Layout({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-100 flex">

      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">

        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 px-4 md:px-8 py-8 flex justify-center">

          {/* centered container */}
          <div className="w-full max-w-7xl">
            {children}
          </div>

        </main>

      </div>

    </div>
  )
}