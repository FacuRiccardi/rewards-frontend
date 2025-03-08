import { BrowserRouter as Router } from "react-router-dom"
import { AppRoutes } from "@/routes"
import { AppProvider } from "@/store/providers/AppProvider"

function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  )
}

export default App
