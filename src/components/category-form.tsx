"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Category {
  id: number
  name: string
  description: string
}

interface CategoryFormProps {
  category?: Category
  onSubmit: (category: Omit<Category, 'id'>) => void
  trigger: React.ReactNode
}

export function CategoryForm({ category, onSubmit, trigger }: CategoryFormProps) {
  const [name, setName] = useState(category?.name || "")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (category) {
      setName(category.name)
    }
  }, [category])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name })
    setName("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{category ? 'Edit Category' : 'Add New Category'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              required
            />
          </div>
         
          <Button type="submit">{category ? 'Update Category' : 'Add Category'}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

