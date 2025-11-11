"use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Package, Truck, CheckCircle, Clock } from "lucide-react";
// import Link from "next/link";

// // Mock orders data
// const orders = [
//   {
//     id: "ORD-2024-001",
//     date: "2024-01-15",
//     status: "delivered",
//     total: 279.98,
//     items: [
//       {
//         name: "Wireless Headphones",
//         quantity: 1,
//         price: 79.99,
//         image: "/wireless-headphones.png",
//       },
//       {
//         name: "Smart Watch",
//         quantity: 1,
//         price: 199.99,
//         image: "/smartwatch-lifestyle.png",
//       },
//     ],
//   },
//   {
//     id: "ORD-2024-002",
//     date: "2024-01-20",
//     status: "shipped",
//     total: 129.99,
//     items: [
//       {
//         name: "Mechanical Keyboard",
//         quantity: 1,
//         price: 129.99,
//         image: "/mechanical-keyboard-rgb.jpg",
//       },
//     ],
//   },
//   {
//     id: "ORD-2024-003",
//     date: "2024-01-22",
//     status: "processing",
//     total: 89.98,
//     items: [
//       {
//         name: "Wireless Mouse",
//         quantity: 1,
//         price: 39.99,
//         image: "/wireless-mouse.png",
//       },
//       {
//         name: "Laptop Stand",
//         quantity: 1,
//         price: 49.99,
//         image: "/laptop-stand.png",
//       },
//     ],
//   },
// ];

// const statusConfig = {
//   processing: { label: "Processing", icon: Clock, color: "bg-blue-500" },
//   shipped: { label: "Shipped", icon: Truck, color: "bg-amber-500" },
//   delivered: { label: "Delivered", icon: CheckCircle, color: "bg-green-500" },
// };

// export default function OrdersPage() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [activeTab, setActiveTab] = useState("all");

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const filteredOrders =
//     activeTab === "all"
//       ? orders
//       : orders.filter((order) => order.status === activeTab);

//   return (
//     <div className="min-h-screen bg-background py-12">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="font-sans text-3xl font-bold md:text-4xl">
//             My Orders
//           </h1>
//           <p className="mt-2 text-muted-foreground">
//             Track and manage your orders
//           </p>
//         </div>

//         {/* Tabs */}
//         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//           <TabsList className="mb-8 grid w-full max-w-md grid-cols-4">
//             <TabsTrigger value="all">All</TabsTrigger>
//             <TabsTrigger value="processing">Processing</TabsTrigger>
//             <TabsTrigger value="shipped">Shipped</TabsTrigger>
//             <TabsTrigger value="delivered">Delivered</TabsTrigger>
//           </TabsList>

//           <TabsContent value={activeTab} className="space-y-6">
//             {filteredOrders.length === 0 ? (
//               <Card>
//                 <CardContent className="flex flex-col items-center justify-center py-16 text-center">
//                   <Package className="mb-4 h-16 w-16 text-muted-foreground" />
//                   <h3 className="mb-2 font-sans text-xl font-semibold">
//                     No orders found
//                   </h3>
//                   <p className="mb-6 text-muted-foreground">
//                     You haven't placed any orders yet
//                   </p>
//                   <Link href="/products">
//                     <Button>Start Shopping</Button>
//                   </Link>
//                 </CardContent>
//               </Card>
//             ) : (
//               filteredOrders.map((order, index) => {
//                 const StatusIcon = statusConfig[order.status].icon;
//                 return (
//                   <Card
//                     key={order.id}
//                     className={`transition-all duration-500 hover:shadow-lg ${
//                       isVisible
//                         ? "translate-y-0 opacity-100"
//                         : "translate-y-10 opacity-0"
//                     }`}
//                     style={{ transitionDelay: `${index * 100}ms` }}
//                   >
//                     <CardContent className="p-6">
//                       {/* Order Header */}
//                       <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
//                         <div>
//                           <h3 className="font-sans text-lg font-semibold">
//                             {order.id}
//                           </h3>
//                           <p className="text-sm text-muted-foreground">
//                             Placed on{" "}
//                             {new Date(order.date).toLocaleDateString()}
//                           </p>
//                         </div>

//                         <div className="flex items-center gap-3">
//                           <Badge
//                             variant="secondary"
//                             className="flex items-center gap-1.5 bg-accent text-accent-foreground"
//                           >
//                             <StatusIcon className="h-3.5 w-3.5" />
//                             {statusConfig[order.status].label}
//                           </Badge>
//                           <span className="font-sans text-lg font-bold text-primary">
//                             ${order.total.toFixed(2)}
//                           </span>
//                         </div>
//                       </div>

//                       {/* Order Items */}
//                       <div className="space-y-3">
//                         {order.items.map((item, itemIndex) => (
//                           <div
//                             key={itemIndex}
//                             className="flex gap-4 rounded-lg border border-border p-3"
//                           >
//                             <img
//                               src={item.image || "/placeholder.svg"}
//                               alt={item.name}
//                               className="h-20 w-20 rounded-md object-cover"
//                             />
//                             <div className="flex flex-1 flex-col justify-center">
//                               <h4 className="font-medium">{item.name}</h4>
//                               <p className="text-sm text-muted-foreground">
//                                 Quantity: {item.quantity}
//                               </p>
//                               <p className="text-sm font-medium text-primary">
//                                 ${item.price.toFixed(2)}
//                               </p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       {/* Order Actions */}
//                       <div className="mt-4 flex flex-wrap gap-3">
//                         <Button variant="outline" className="bg-transparent">
//                           View Details
//                         </Button>
//                         {order.status === "delivered" && (
//                           <Button variant="outline" className="bg-transparent">
//                             Write Review
//                           </Button>
//                         )}
//                         {order.status !== "delivered" && (
//                           <Button variant="outline" className="bg-transparent">
//                             Track Order
//                           </Button>
//                         )}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 );
//               })
//             )}
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }
import { Button } from "@/components/ui/button";
import React from "react";

// OrderCompleted.jsx
// A simple, single-file React component (JSX) page to tell the customer their order is completed.
// Tailwind CSS classes are used for styling. Exported as default component.

export default function OrderCompleted({ orderId, onContinue }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <section className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
        <div className="mx-auto w-32 h-32 rounded-full bg-green-50 flex items-center justify-center mb-6">
          {/* check icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
          Your order is completed
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you — we received your order and are preparing it for shipment.
        </p>

        <div>
          <Button
            onClick={() =>
              onContinue ? onContinue() : window.location.assign("/products")
            }
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 bg-green-600 text-white font-medium shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Continue shopping
          </Button>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          You will also receive an email confirmation shortly.
        </p>
      </section>
    </main>
  );
}
