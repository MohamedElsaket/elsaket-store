"use client";

import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, ShoppingCart, Users, DollarSign } from "lucide-react";

const salesData = [
  { month: "Jan", sales: 4000, revenue: 2400 },
  { month: "Feb", sales: 3000, revenue: 1398 },
  { month: "Mar", sales: 2000, revenue: 9800 },
  { month: "Apr", sales: 2780, revenue: 3908 },
  { month: "May", sales: 1890, revenue: 4800 },
  { month: "Jun", sales: 2390, revenue: 3800 },
];

const categoryData = [
  { name: "Dresses", value: 35, color: "#d4af37" },
  { name: "Shirts", value: 25, color: "#b8860b" },
  { name: "Pants", value: 20, color: "#ffd700" },
  { name: "Accessories", value: 20, color: "#daa520" },
];

const recentOrders = [
  {
    id: "#2024001",
    customer: "Sarah Ahmed",
    amount: "$450",
    status: "Completed",
    date: "2024-01-15",
  },
  {
    id: "#2024002",
    customer: "Fatima Hassan",
    amount: "$320",
    status: "Processing",
    date: "2024-01-14",
  },
  {
    id: "#2024003",
    customer: "Layla Mohamed",
    amount: "$580",
    status: "Pending",
    date: "2024-01-13",
  },
  {
    id: "#2024004",
    customer: "Noor Ali",
    amount: "$275",
    status: "Completed",
    date: "2024-01-12",
  },
];

export function DashboardContent() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back to El-Saket
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's what's happening with your fashion empire today
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$45,231</div>
            <p className="text-xs text-accent mt-1">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Total Orders
            </CardTitle>
            <ShoppingCart className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,234</div>
            <p className="text-xs text-accent mt-1">+8.2% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Active Customers
            </CardTitle>
            <Users className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">892</div>
            <p className="text-xs text-accent mt-1">+5.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Avg. Order Value
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$127</div>
            <p className="text-xs text-accent mt-1">+3.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Sales & Revenue</CardTitle>
            <CardDescription className="text-muted-foreground">
              Last 6 months performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #d4af37",
                  }}
                  labelStyle={{ color: "#d4af37" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#d4af37"
                  strokeWidth={2}
                  dot={{ fill: "#d4af37" }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ffd700"
                  strokeWidth={2}
                  dot={{ fill: "#ffd700" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">
              Product Categories
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Sales distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#d4af37"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #d4af37",
                  }}
                  labelStyle={{ color: "#d4af37" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Orders</CardTitle>
          <CardDescription className="text-muted-foreground">
            Your latest customer orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-accent font-medium">
                      {order.id}
                    </td>
                    <td className="py-3 px-4 text-foreground">
                      {order.customer}
                    </td>
                    <td className="py-3 px-4 text-foreground font-semibold">
                      {order.amount}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium",
                          order.status === "Completed" &&
                            "bg-green-500/20 text-green-400",
                          order.status === "Processing" &&
                            "bg-blue-500/20 text-blue-400",
                          order.status === "Pending" &&
                            "bg-yellow-500/20 text-yellow-400"
                        )}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
