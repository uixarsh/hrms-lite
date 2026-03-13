import { BrowserRouter, Routes, Route } from "react-router-dom"

import Employees from "./pages/Employees"
import Attendance from "./pages/Attendance"
import Layout from "./components/Layout"

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}