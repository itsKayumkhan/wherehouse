"use client"

import { useState } from "react"
import { motion } from 'framer-motion'
import Image from "next/image"
import { DataTable } from "@/components/data-table"
import { ProductForm } from "@/components/product-form"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from 'lucide-react'

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  image: string
}

const initialProducts: Product[] = [
  { id: 1, name: "Smartphone", category: "Electronics", price: 599.99, stock: 50, image: "/placeholder.svg?height=50&width=50" },
  { id: 2, name: "T-shirt", category: "Clothing", price: 19.99, stock: 100, image: "/placeholder.svg?height=50&width=50" },
]

const categories = ["Electronics", "Clothing", "Books", "Home & Garden", "Toys"]

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts)

  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    const id = Math.max(0, ...products.map(p => p.id)) + 1
    setProducts([...products, { id, ...newProduct }])
  }

  const handleEditProduct = (editedProduct: Product) => {
    setProducts(products.map(p =>
      p.id === editedProduct.id ? editedProduct : p
    ))
  }

  const handleDeleteProduct = (product: Product) => {
    setProducts(products.filter((p) => p.id !== product.id))
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
        <h1 className="text-2xl font-bold">Products</h1>
        <ProductForm
          onSubmit={handleAddProduct}
          trigger={<Button>Add Product</Button>}
          categories={categories}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <DataTable
          columns={["Image", "Name", "Category", "Price", "Stock", "Edit", "Delete"]}
          data={products}
          renderCell={(column, item) => {
            if (column === "Image") {
              return (
                <div className="relative w-10 h-10">
                  <Image src={item.image} alt={item.name} fill className="object-cover rounded-sm" />
                </div>
              )
            }
            if (column === "Price") {
              return `$${item.price.toFixed(2)}`
            }
            if (column === "Edit") {
              return (
                <ProductForm
                  product={item}
                  onSubmit={(editedProduct) => handleEditProduct({ ...editedProduct, id: item.id })}
                  trigger={
                    <motion.button
                      className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit2 className="w-5 h-5" />
                    </motion.button>
                  }
                  categories={categories}
                />
              )
            }
            if (column === "Delete") {
              return (
                <motion.button
                  onClick={() => handleDeleteProduct(item)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              )
            }
            return item[column.toLowerCase()]
          }}
        />
      </motion.div>
    </motion.div>
  )
}
