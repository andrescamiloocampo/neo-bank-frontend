import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./index.css";

import App from "./App.tsx";
import AuthLayout from "./Layouts/AuthLayout/AuthLayout.tsx";
import MainLayout from "./Layouts/MainLayout/MainLayout.tsx";

import { TestComponent } from "./components/TestComponent.tsx";

import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.tsx";
import PocketsPage from "./pages/PocketsPage/PocketsPage.tsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";
import TransactionPage from "./pages/TransactionPage/TransactionPage.tsx";
import Transfer from "./pages/Transfer/Transfer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" index element={<LoginPage />} />
          <Route path="register" index element={<RegisterPage />} />
        </Route>
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<App />} />
          <Route path="test" element={<TestComponent />} />
          <Route path="pockets" element={<PocketsPage />} />
          <Route path="transactions" element={<div>Transacciones</div>} />
          <Route path="alerts" element={<div>Notificaciones</div>} />
          <Route path="transactions_panel" element={<TransactionPage/>}/>            
          <Route path="transfer" element={<Transfer/>}/>          
          <Route path="settings" element={<div>Configuración</div>}>
            <Route path="security" element={<div>Seguridad</div>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
