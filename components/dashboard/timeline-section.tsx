"use client"

import { Progress } from "@/components/ui/progress"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Circle, CheckCircle2, Clock } from "lucide-react"

interface TimelineItem {
  id: string
  title: string
  date: string
  category: string
  isCompleted: boolean
  description: string
}

const initialTimeline: TimelineItem[] = [
  { id: "1", title: "Book venue", date: "2025-08-15", category: "Venue", isCompleted: true, description: "Rosewood Estate confirmed and deposit paid." },
  { id: "2", title: "Hire photographer", date: "2025-09-01", category: "Photography", isCompleted: true, description: "Signed contract with Lens & Light Photography." },
  { id: "3", title: "Choose wedding party", date: "2025-10-01", category: "Planning", isCompleted: true, description: "Bridesmaids and groomsmen selected." },
  { id: "4", title: "Send save-the-dates", date: "2025-11-01", category: "Invitations", isCompleted: true, description: "Digital save-the-dates sent to all guests." },
  { id: "5", title: "Book caterer", date: "2025-12-01", category: "Catering", isCompleted: true, description: "Elegance Catering booked with deposit." },
  { id: "6", title: "Order invitations", date: "2026-01-15", category: "Invitations", isCompleted: true, description: "Custom letterpress invitations ordered." },
  { id: "7", title: "Mail invitations", date: "2026-02-01", category: "Invitations", isCompleted: true, description: "All invitations mailed to guests." },
  { id: "8", title: "Final menu tasting", date: "2026-02-22", category: "Catering", isCompleted: false, description: "Tasting at Elegance Catering to finalize menu." },
  { id: "9", title: "Cake tasting", date: "2026-02-22", category: "Cake", isCompleted: false, description: "Visit Sweet Layers Bakery for tasting." },
  { id: "10", title: "Finalize floral arrangements", date: "2026-03-15", category: "Florals", isCompleted: false, description: "Select final bouquet and table arrangements." },
  { id: "11", title: "Final dress fitting", date: "2026-04-01", category: "Attire", isCompleted: false, description: "Last fitting and alterations pickup." },
  { id: "12", title: "Create seating chart", date: "2026-05-01", category: "Planning", isCompleted: false, description: "Assign tables based on RSVP responses." },
  { id: "13", title: "Rehearsal dinner", date: "2026-06-19", category: "Events", isCompleted: false, description: "Dinner at Garden Terrace Restaurant." },
  { id: "14", title: "Wedding day", date: "2026-06-20", category: "Events", isCompleted: false, description: "The big day at Rosewood Estate." },
]

const emptyItem: Omit<TimelineItem, "id"> = {
  title: "",
  date: "",
  category: "Planning",
  isCompleted: false,
  description: "",
}

export function TimelineSection() {
  const [timeline, setTimeline] = useState<TimelineItem[]>(initialTimeline)
  const [editingItem, setEditingItem] = useState<Omit<TimelineItem, "id"> & { id?: string }>(emptyItem)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [showCompleted, setShowCompleted] = useState(true)

  const completedCount = timeline.filter((t) => t.isCompleted).length
  const totalCount = timeline.length

  function handleSave() {
    if (!editingItem.title.trim()) return
    if (editingItem.id) {
      setTimeline((prev) => prev.map((t) => (t.id === editingItem.id ? { ...editingItem, id: t.id } as TimelineItem : t)))
    } else {
      setTimeline((prev) => [...prev, { ...editingItem, id: Date.now().toString() } as TimelineItem].sort((a, b) => a.date.localeCompare(b.date)))
    }
    setEditingItem(emptyItem)
    setDialogOpen(false)
  }

  function toggleComplete(id: string) {
    setTimeline((prev) => prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t)))
  }

  const filteredTimeline = showCompleted ? timeline : timeline.filter((t) => !t.isCompleted)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">Wedding Timeline</h1>
          <p className="text-muted-foreground mt-1">Track milestones and deadlines leading up to the big day.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingItem(emptyItem)} className="bg-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Add Milestone
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-serif">{editingItem.id ? "Edit Milestone" : "Add Milestone"}</DialogTitle>
              <DialogDescription>Add a new milestone to your wedding timeline.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label>Title</Label>
                <Input placeholder="Book venue" value={editingItem.title} onChange={(e) => setEditingItem((prev) => ({ ...prev, title: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Date</Label>
                  <Input type="date" value={editingItem.date} onChange={(e) => setEditingItem((prev) => ({ ...prev, date: e.target.value }))} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Category</Label>
                  <Select value={editingItem.category} onValueChange={(v) => setEditingItem((prev) => ({ ...prev, category: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="Venue">Venue</SelectItem>
                      <SelectItem value="Catering">Catering</SelectItem>
                      <SelectItem value="Photography">Photography</SelectItem>
                      <SelectItem value="Florals">Florals</SelectItem>
                      <SelectItem value="Attire">Attire</SelectItem>
                      <SelectItem value="Invitations">Invitations</SelectItem>
                      <SelectItem value="Cake">Cake</SelectItem>
                      <SelectItem value="Events">Events</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Description</Label>
                <Input placeholder="Details about this milestone" value={editingItem.description} onChange={(e) => setEditingItem((prev) => ({ ...prev, description: e.target.value }))} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} className="bg-primary text-primary-foreground">{editingItem.id ? "Update" : "Add"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Progress</p>
            <p className="text-3xl font-bold mt-1">{completedCount}/{totalCount}</p>
            <Progress value={(completedCount / totalCount) * 100} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{((completedCount / totalCount) * 100).toFixed(0)}% complete</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Next Milestone</p>
            <p className="text-lg font-bold mt-1">
              {timeline.find((t) => !t.isCompleted)?.title || "All done!"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {timeline.find((t) => !t.isCompleted)?.date
                ? new Date(timeline.find((t) => !t.isCompleted)!.date + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                : ""}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-3">
            <Checkbox
              id="show-completed"
              checked={showCompleted}
              onCheckedChange={(checked) => setShowCompleted(checked === true)}
            />
            <label htmlFor="show-completed" className="text-sm cursor-pointer">
              Show completed milestones
            </label>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-lg">Milestones</CardTitle>
          <CardDescription>Showing {filteredTimeline.length} milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
            <ul className="flex flex-col gap-0">
              {filteredTimeline.map((item) => (
                <li key={item.id} className="relative flex items-start gap-4 pb-8 last:pb-0">
                  <button
                    onClick={() => toggleComplete(item.id)}
                    className="relative z-10 mt-0.5 shrink-0 cursor-pointer"
                    aria-label={item.isCompleted ? `Mark ${item.title} as incomplete` : `Mark ${item.title} as complete`}
                  >
                    {item.isCompleted ? (
                      <CheckCircle2 className="h-8 w-8 text-[hsl(var(--success))] fill-[hsl(var(--success))]/10" />
                    ) : (
                      <Circle className="h-8 w-8 text-border" />
                    )}
                  </button>
                  <div className="flex-1 pt-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm font-medium ${item.isCompleted ? "line-through text-muted-foreground" : ""}`}>
                        {item.title}
                      </span>
                      <Badge variant="outline" className="text-xs">{item.category}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {new Date(item.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
