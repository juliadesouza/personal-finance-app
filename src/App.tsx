import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import { Layout } from "./components/layout/Layout";
import { AuthProvider } from "./providers/auth/auth-provider";
import Expenses from "./pages/expenses/Expenses";
import Settings from "./pages/settings/Settings";
import Incomes from "./pages/incomes/Incomes";
import { Toaster } from "./components/ui/toast";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="settings" element={<Settings />} />
            <Route path="incomes" element={<Incomes />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
