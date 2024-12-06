"use client"

import { useState } from "react"
import { motion } from 'framer-motion'
import { DataTable } from "@/components/data-table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {  Trash2 } from 'lucide-react'

const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
]

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers)

  const handleRoleChange = (userId: number, newRole: string) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    ))
  }

  const handleDelete = (user: any) => {
    setUsers(users.filter((u) => u.id !== user.id))
  }

  return (
<>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-2xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Users
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <DataTable
          columns={["Name", "Email", "Role",  "Delete"]}
          data={users}
          renderCell={(column, user) => {
            if (column === "Role") {
              return (
                <Select
                  defaultValue={user.role}
                  onValueChange={(newRole) => handleRoleChange(user.id, newRole)}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="User">User</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              )
            }
            if (column === "Delete") {
              return (
                <motion.button
                  onClick={() => handleDelete(user)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              )
            }
            return user[column.toLowerCase()]
          }}
        />
      </motion.div>
    </motion.div></>
  )
}
