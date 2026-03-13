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

        <main className="flex-1 px-6 md:px-10 py-8 w-full">
          {children}
        </main>

      </div>

    </div>
  )
}