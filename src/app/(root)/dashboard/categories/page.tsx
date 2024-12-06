"use client"

import { useState } from "react"
import { motion } from 'framer-motion'
import { DataTable } from "@/components/data-table"
import { CategoryForm } from "@/components/category-form"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from 'lucide-react'

interface Category {
  id: number
  name: string
}

const initialCategories: Category[] = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories)

  const handleAddCategory = (newCategory: Omit<Category, 'id'>) => {
    const id = Math.max(0, ...categories.map(c => c.id)) + 1
    setCategories([...categories, { id, ...newCategory }])
  }

  const handleEditCategory = (editedCategory: Category) => {
    setCategories(categories.map(c =>
      c.id === editedCategory.id ? editedCategory : c
    ))
  }

  const handleDelete = (category: Category) => {
    setCategories(categories.filter((c) => c.id !== category.id))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex justify-between items-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-2xl font-bold">Categories</h1>
        <CategoryForm
          onSubmit={handleAddCategory}
          trigger={<Button>Add Category</Button>}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <DataTable
          columns={["Name", "Edit", "Delete"]}
          data={categories}
          renderCell={(column, category) => {
            if (column === "Edit") {
              return (
                <CategoryForm
                  category={category}
                  onSubmit={(editedCategory) => handleEditCategory({ ...editedCategory, id: category.id })}
                  trigger={
                    <motion.button
                      className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit2 className="w-5 h-5" />
                    </motion.button>
                  }
                />
              )
            }
            if (column === "Delete") {
              return (
                <motion.button
                  onClick={() => handleDelete(category)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              )
            }
            return category[column.toLowerCase()]
          }}
        />
      </motion.div>
    </motion.div>
  )
}
