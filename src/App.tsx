import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import { Layout } from "./components/layout/Layout";
import { AuthProvider } from "./providers/auth/auth-provider";
import Expenses from "./pages/expenses/Expenses";
import Settings from "./pages/settings/Settings";
import Income from "./pages/income/Income";
import Goals from "./pages/goals/Goals";
import Wallet from "./pages/wallet/Wallet";
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
            <Route path="income" element={<Income />} />
            <Route path="goals" element={<Goals />} />
            <Route path="wallet" element={<Wallet />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
