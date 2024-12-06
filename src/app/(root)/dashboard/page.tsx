"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, ShoppingBag, FolderTree } from 'lucide-react'
import { DataTable } from "@/components/data-table"

interface DashboardItem {
  icon: React.ReactNode
  label: string
  count: number
}

export default function Dashboard() {
  const [users, setUsers] = useState([])
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    // Simulating data fetch
    setUsers([
      { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    ])
    setCategories([
      { id: 1, name: "Electronics" },
      { id: 2, name: "Clothing" },
    ])
    setProducts([
      { id: 1, name: "Smartphone", category: "Electronics", price: 599.99, stock: 50 },
      { id: 2, name: "T-shirt", category: "Clothing", price: 19.99, stock: 100 },
    ])
  }, [])

  const dashboardItems: DashboardItem[] = [
    { icon: <Users size={24} />, label: "Users", count: users.length },
    { icon: <FolderTree size={24} />, label: "Categories", count: categories.length },
    { icon: <ShoppingBag size={24} />, label: "Products", count: products.length },
  ]

  return (
    <div className="p-6 space-y-8">
      <motion.h1
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dashboard
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {dashboardItems.map((item, index) => (
          <motion.div
            key={item.label}
            className=" p-6 rounded-lg shadow-md flex items-center justify-between"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">{item.icon}</div>
              <div>
                <h2 className="text-xl font-semibold">{item.label}</h2>
                <p className="text-gray-600">Total: {item.count}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.div
          className=" p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
          <DataTable
            columns={["Name", "Email" ]}
            data={users.slice(0, 5)}
            renderCell={(column, user) => user[column.toLowerCase()]}
          />
        </motion.div>

        <motion.div
          className=" p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-xl font-semibold mb-4">Recent Categories</h2>
          <DataTable
            columns={["Name"]}
            data={categories.slice(0, 5)}
            renderCell={(column, category) => category[column.toLowerCase()]}
          />
        </motion.div>

        <motion.div
          className=" p-6 rounded-lg shadow-md"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-xl font-semibold mb-4">Recent Products</h2>
          <DataTable
            columns={["Name", "Category" ]}
            data={products.slice(0, 5)}
            renderCell={(column, product) => {
            
              return product[column.toLowerCase()]
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
