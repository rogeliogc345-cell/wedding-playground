"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react"

interface AboutEntry {
  id: string
  title: string
  subtitle: string
  content: string
  imageUrl: string
  isActive: boolean
}

const initialEntries: AboutEntry[] = [
  {
    id: "1",
    title: "How We Met",
    subtitle: "A coffee shop love story",
    content:
      "We first locked eyes over a crowded counter at a downtown coffee shop in the spring of 2021. What started as a casual conversation about oat milk turned into a three-hour first date.",
    imageUrl: "/images/how-we-met.jpg",
    isActive: true,
  },
  {
    id: "2",
    title: "The Proposal",
    subtitle: "Under the Tuscan sun",
    content:
      "During a sunset walk through the vineyards of Tuscany, surrounded by golden light and rolling hills, the question was popped with a vintage emerald ring.",
    imageUrl: "/images/proposal.jpg",
    isActive: true,
  },
  {
    id: "3",
    title: "Our Journey Together",
    subtitle: "Five years of adventures",
    content:
      "From hiking the Pacific Crest Trail to adopting our golden retriever, every chapter of our story has been an adventure worth sharing.",
    imageUrl: "/images/journey.jpg",
    isActive: true,
  },
  {
    id: "4",
    title: "Why We Chose This Venue",
    subtitle: "A place close to our hearts",
    content:
      "The garden estate where we are holding the wedding is where we celebrated our very first anniversary. It felt only right to make it the backdrop for the biggest day of our lives.",
    imageUrl: "/images/venue.jpg",
    isActive: false,
  },
]

const emptyEntry: Omit<AboutEntry, "id"> = {
  title: "",
  subtitle: "",
  content: "",
  imageUrl: "",
  isActive: true,
}

export function AboutSection() {
  const [entries, setEntries] = useState<AboutEntry[]>(initialEntries)
  const [editingEntry, setEditingEntry] = useState<Omit<AboutEntry, "id"> & { id?: string }>(emptyEntry)
  const [dialogOpen, setDialogOpen] = useState(false)

  function handleSave() {
    if (!editingEntry.title.trim()) return
    if (editingEntry.id) {
      setEntries((prev) =>
        prev.map((e) => (e.id === editingEntry.id ? { ...editingEntry, id: e.id } as AboutEntry : e))
      )
    } else {
      setEntries((prev) => [
        ...prev,
        { ...editingEntry, id: Date.now().toString() } as AboutEntry,
      ])
    }
    setEditingEntry(emptyEntry)
    setDialogOpen(false)
  }

  function handleEdit(entry: AboutEntry) {
    setEditingEntry(entry)
    setDialogOpen(true)
  }

  function handleDelete(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }

  function handleToggleActive(id: string) {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isActive: !e.isActive } : e))
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">About Us Sections</h1>
          <p className="text-muted-foreground mt-1">
            Manage the story sections displayed on your wedding website.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setEditingEntry(emptyEntry)}
              className="bg-primary text-primary-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Section
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-serif">
                {editingEntry.id ? "Edit Section" : "Add New Section"}
              </DialogTitle>
              <DialogDescription>
                Fill in the details for this about us section.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="about-title">Title</Label>
                <Input
                  id="about-title"
                  placeholder="How We Met"
                  value={editingEntry.title}
                  onChange={(e) =>
                    setEditingEntry((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="about-subtitle">Subtitle</Label>
                <Input
                  id="about-subtitle"
                  placeholder="A brief tagline"
                  value={editingEntry.subtitle}
                  onChange={(e) =>
                    setEditingEntry((prev) => ({ ...prev, subtitle: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="about-content">Content</Label>
                <Textarea
                  id="about-content"
                  placeholder="Tell your story..."
                  value={editingEntry.content}
                  onChange={(e) =>
                    setEditingEntry((prev) => ({ ...prev, content: e.target.value }))
                  }
                  rows={4}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="about-image">Image URL</Label>
                <Input
                  id="about-image"
                  placeholder="/images/section.jpg"
                  value={editingEntry.imageUrl}
                  onChange={(e) =>
                    setEditingEntry((prev) => ({ ...prev, imageUrl: e.target.value }))
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-primary text-primary-foreground">
                {editingEntry.id ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-lg">All Sections</CardTitle>
          <CardDescription>
            {entries.length} sections total, {entries.filter((e) => e.isActive).length} active
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8"></TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Subtitle</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                  </TableCell>
                  <TableCell className="font-medium">{entry.title}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {entry.subtitle}
                  </TableCell>
                  <TableCell>
                    <button onClick={() => handleToggleActive(entry.id)} className="cursor-pointer">
                      <Badge
                        className={
                          entry.isActive
                            ? "bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {entry.isActive ? "Active" : "Draft"}
                      </Badge>
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(entry)}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit {entry.title}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(entry.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete {entry.title}</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {entries
          .filter((e) => e.isActive)
          .map((entry) => (
            <Card key={entry.id} className="overflow-hidden">
              <div className="h-32 bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Image Preview</span>
              </div>
              <CardHeader>
                <CardTitle className="font-serif text-lg">{entry.title}</CardTitle>
                <CardDescription>{entry.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {entry.content}
                </p>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}
