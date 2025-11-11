import "./global.css";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export const metadata = {
  title: "El-Saket Dashboard",
  description: "Manage your fashion empire",
};

export default function DashboardLayout({ children }) {
  return (
    <body
      className={`h-screen bg-background font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
    >
      <div className={`flex `}>
        <DashboardSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </body>
  );
}
