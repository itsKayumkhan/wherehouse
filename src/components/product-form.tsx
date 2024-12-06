"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  image: string
}

interface ProductFormProps {
  product?: Product
  onSubmit: (product: Omit<Product, 'id'>) => void
  trigger: React.ReactNode
  categories: string[]
}

export function ProductForm({ product, onSubmit, trigger, categories }: ProductFormProps) {
  const [name, setName] = useState(product?.name || "")
  const [category, setCategory] = useState(product?.category || "")
  const [price, setPrice] = useState(product?.price?.toString() || "")
  const [stock, setStock] = useState(product?.stock?.toString() || "")
  const [image, setImage] = useState(product?.image || "")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (product) {
      setName(product.name)
      setCategory(product.category)
      setPrice(product.price.toString())
      setStock(product.stock.toString())
      setImage(product.image)
    }
  }, [product])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name,
      category,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      image
    })
    setName("")
    setCategory("")
    setPrice("")
    setStock("")
    setImage("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Enter stock quantity"
              required
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image URL"
              required
            />
          </div>
          <Button type="submit">{product ? 'Update Product' : 'Add Product'}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

