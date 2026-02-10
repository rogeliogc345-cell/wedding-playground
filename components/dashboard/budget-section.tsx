"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Plus, Pencil, Trash2, DollarSign, TrendingDown, TrendingUp } from "lucide-react"

interface BudgetItem {
  id: string
  category: string
  description: string
  estimatedCost: number
  actualCost: number
  isPaid: boolean
}

const initialBudgetItems: BudgetItem[] = [
  { id: "1", category: "Venue", description: "Rosewood Estate rental fee", estimatedCost: 15000, actualCost: 15000, isPaid: true },
  { id: "2", category: "Catering", description: "Elegance Catering - full service", estimatedCost: 12000, actualCost: 11500, isPaid: false },
  { id: "3", category: "Photography", description: "Lens & Light - full day + engagement", estimatedCost: 6000, actualCost: 6000, isPaid: false },
  { id: "4", category: "Florals", description: "Bloom & Petal - ceremony + reception", estimatedCost: 5000, actualCost: 4500, isPaid: false },
  { id: "5", category: "Entertainment", description: "DJ Harmony - ceremony + reception music", estimatedCost: 2500, actualCost: 2500, isPaid: false },
  { id: "6", category: "Cake", description: "Sweet Layers - 4 tier custom cake", estimatedCost: 1200, actualCost: 0, isPaid: false },
  { id: "7", category: "Attire", description: "Wedding dress, alterations, accessories", estimatedCost: 3500, actualCost: 3200, isPaid: true },
  { id: "8", category: "Invitations", description: "Printed invitations & save-the-dates", estimatedCost: 800, actualCost: 750, isPaid: true },
  { id: "9", category: "Transportation", description: "Limo service for wedding party", estimatedCost: 1500, actualCost: 0, isPaid: false },
  { id: "10", category: "Decorations", description: "Table settings, lighting, signage", estimatedCost: 2500, actualCost: 2000, isPaid: false },
]

const totalBudget = 50000

const emptyItem: Omit<BudgetItem, "id"> = {
  category: "",
  description: "",
  estimatedCost: 0,
  actualCost: 0,
  isPaid: false,
}

export function BudgetSection() {
  const [items, setItems] = useState<BudgetItem[]>(initialBudgetItems)
  const [editingItem, setEditingItem] = useState<Omit<BudgetItem, "id"> & { id?: string }>(emptyItem)
  const [dialogOpen, setDialogOpen] = useState(false)

  const totalEstimated = items.reduce((sum, item) => sum + item.estimatedCost, 0)
  const totalActual = items.reduce((sum, item) => sum + item.actualCost, 0)
  const totalPaid = items.filter((i) => i.isPaid).reduce((sum, i) => sum + i.actualCost, 0)
  const remaining = totalBudget - totalActual
  const savings = totalEstimated - totalActual

  function handleSave() {
    if (!editingItem.category.trim()) return
    if (editingItem.id) {
      setItems((prev) => prev.map((i) => (i.id === editingItem.id ? { ...editingItem, id: i.id } as BudgetItem : i)))
    } else {
      setItems((prev) => [...prev, { ...editingItem, id: Date.now().toString() } as BudgetItem])
    }
    setEditingItem(emptyItem)
    setDialogOpen(false)
  }

  function handleEdit(item: BudgetItem) {
    setEditingItem(item)
    setDialogOpen(true)
  }

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function togglePaid(id: string) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, isPaid: !i.isPaid } : i)))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">Budget Tracker</h1>
          <p className="text-muted-foreground mt-1">Monitor expenses and stay within your wedding budget.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingItem(emptyItem)} className="bg-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-serif">{editingItem.id ? "Edit Expense" : "Add New Expense"}</DialogTitle>
              <DialogDescription>Track your wedding expenses by category.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label>Category</Label>
                <Input placeholder="Venue, Catering, etc." value={editingItem.category} onChange={(e) => setEditingItem((prev) => ({ ...prev, category: e.target.value }))} />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Description</Label>
                <Input placeholder="Describe the expense" value={editingItem.description} onChange={(e) => setEditingItem((prev) => ({ ...prev, description: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Estimated Cost ($)</Label>
                  <Input type="number" value={editingItem.estimatedCost || ""} onChange={(e) => setEditingItem((prev) => ({ ...prev, estimatedCost: parseFloat(e.target.value) || 0 }))} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Actual Cost ($)</Label>
                  <Input type="number" value={editingItem.actualCost || ""} onChange={(e) => setEditingItem((prev) => ({ ...prev, actualCost: parseFloat(e.target.value) || 0 }))} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} className="bg-primary text-primary-foreground">{editingItem.id ? "Update" : "Add"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <p className="text-sm text-muted-foreground">Total Budget</p>
            </div>
            <p className="text-3xl font-bold mt-2">${totalBudget.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-accent" />
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </div>
            <p className="text-3xl font-bold mt-2">${totalActual.toLocaleString()}</p>
            <Progress value={(totalActual / totalBudget) * 100} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[hsl(var(--success))]" />
              <p className="text-sm text-muted-foreground">Remaining</p>
            </div>
            <p className="text-3xl font-bold mt-2">${remaining.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Under/Over Budget</p>
            <p className={`text-3xl font-bold mt-2 ${savings >= 0 ? "text-[hsl(var(--success))]" : "text-destructive"}`}>
              {savings >= 0 ? "-" : "+"}${Math.abs(savings).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {savings >= 0 ? "Under estimated budget" : "Over estimated budget"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-lg">Expense Breakdown</CardTitle>
          <CardDescription>{items.length} line items tracked</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead>Estimated</TableHead>
                <TableHead>Actual</TableHead>
                <TableHead>Diff</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => {
                const diff = item.estimatedCost - item.actualCost
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.category}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{item.description}</TableCell>
                    <TableCell>${item.estimatedCost.toLocaleString()}</TableCell>
                    <TableCell>${item.actualCost.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={diff >= 0 ? "text-[hsl(var(--success))]" : "text-destructive"}>
                        {diff >= 0 ? "-" : "+"}${Math.abs(diff).toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <button onClick={() => togglePaid(item.id)} className="cursor-pointer">
                        <Badge className={item.isPaid ? "bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))] text-xs" : "bg-muted text-muted-foreground text-xs"}>
                          {item.isPaid ? "Paid" : "Unpaid"}
                        </Badge>
                      </button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit {item.category}</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete {item.category}</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
