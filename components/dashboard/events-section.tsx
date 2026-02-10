"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
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
import { Plus, MapPin, Clock, CalendarDays, Users, Pencil, Trash2 } from "lucide-react"

interface WeddingEvent {
  id: string
  name: string
  date: string
  time: string
  location: string
  address: string
  description: string
  type: string
  capacity: number
  dressCode: string
}

const initialEvents: WeddingEvent[] = [
  {
    id: "1",
    name: "Engagement Party",
    date: "2026-03-15",
    time: "18:00",
    location: "The Grand Ballroom",
    address: "123 Main St, New York, NY",
    description: "An intimate celebration to kick off the wedding festivities.",
    type: "pre-wedding",
    capacity: 80,
    dressCode: "Cocktail Attire",
  },
  {
    id: "2",
    name: "Rehearsal Dinner",
    date: "2026-06-19",
    time: "19:00",
    location: "Garden Terrace Restaurant",
    address: "456 Oak Ave, New York, NY",
    description: "Dinner for the wedding party and close family after rehearsal.",
    type: "pre-wedding",
    capacity: 40,
    dressCode: "Smart Casual",
  },
  {
    id: "3",
    name: "Wedding Ceremony",
    date: "2026-06-20",
    time: "16:00",
    location: "Rosewood Estate Garden",
    address: "789 Rose Ln, Westchester, NY",
    description: "The main ceremony in the beautiful garden estate.",
    type: "ceremony",
    capacity: 250,
    dressCode: "Black Tie",
  },
  {
    id: "4",
    name: "Reception",
    date: "2026-06-20",
    time: "18:30",
    location: "Rosewood Estate Ballroom",
    address: "789 Rose Ln, Westchester, NY",
    description: "Dinner, dancing, and celebration following the ceremony.",
    type: "reception",
    capacity: 250,
    dressCode: "Black Tie",
  },
  {
    id: "5",
    name: "Brunch the Day After",
    date: "2026-06-21",
    time: "10:00",
    location: "The Breakfast Club",
    address: "321 Maple Dr, Westchester, NY",
    description: "A casual brunch to wrap up the weekend festivities.",
    type: "post-wedding",
    capacity: 60,
    dressCode: "Casual",
  },
]

const emptyEvent: Omit<WeddingEvent, "id"> = {
  name: "",
  date: "",
  time: "",
  location: "",
  address: "",
  description: "",
  type: "ceremony",
  capacity: 0,
  dressCode: "",
}

function getEventTypeBadge(type: string) {
  switch (type) {
    case "pre-wedding":
      return <Badge variant="secondary">Pre-Wedding</Badge>
    case "ceremony":
      return <Badge className="bg-primary text-primary-foreground">Ceremony</Badge>
    case "reception":
      return <Badge className="bg-accent text-accent-foreground">Reception</Badge>
    case "post-wedding":
      return <Badge variant="outline">Post-Wedding</Badge>
    default:
      return <Badge variant="secondary">{type}</Badge>
  }
}

export function EventsSection() {
  const [events, setEvents] = useState<WeddingEvent[]>(initialEvents)
  const [editingEvent, setEditingEvent] = useState<Omit<WeddingEvent, "id"> & { id?: string }>(emptyEvent)
  const [dialogOpen, setDialogOpen] = useState(false)

  function handleSave() {
    if (!editingEvent.name.trim()) return
    if (editingEvent.id) {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === editingEvent.id ? { ...editingEvent, id: e.id } as WeddingEvent : e
        )
      )
    } else {
      setEvents((prev) => [
        ...prev,
        { ...editingEvent, id: Date.now().toString() } as WeddingEvent,
      ])
    }
    setEditingEvent(emptyEvent)
    setDialogOpen(false)
  }

  function handleEdit(event: WeddingEvent) {
    setEditingEvent(event)
    setDialogOpen(true)
  }

  function handleDelete(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage all wedding-related events.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setEditingEvent(emptyEvent)}
              className="bg-primary text-primary-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-serif">
                {editingEvent.id ? "Edit Event" : "Create New Event"}
              </DialogTitle>
              <DialogDescription>
                Fill in all the event details below.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="event-name">Event Name</Label>
                <Input
                  id="event-name"
                  placeholder="Wedding Ceremony"
                  value={editingEvent.name}
                  onChange={(e) => setEditingEvent((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="event-date">Date</Label>
                  <Input
                    id="event-date"
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent((prev) => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="event-time">Time</Label>
                  <Input
                    id="event-time"
                    type="time"
                    value={editingEvent.time}
                    onChange={(e) => setEditingEvent((prev) => ({ ...prev, time: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="event-type">Event Type</Label>
                <Select
                  value={editingEvent.type}
                  onValueChange={(value) => setEditingEvent((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre-wedding">Pre-Wedding</SelectItem>
                    <SelectItem value="ceremony">Ceremony</SelectItem>
                    <SelectItem value="reception">Reception</SelectItem>
                    <SelectItem value="post-wedding">Post-Wedding</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="event-location">Venue Name</Label>
                <Input
                  id="event-location"
                  placeholder="The Grand Ballroom"
                  value={editingEvent.location}
                  onChange={(e) => setEditingEvent((prev) => ({ ...prev, location: e.target.value }))}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="event-address">Address</Label>
                <Input
                  id="event-address"
                  placeholder="123 Main St, City, State"
                  value={editingEvent.address}
                  onChange={(e) => setEditingEvent((prev) => ({ ...prev, address: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="event-capacity">Capacity</Label>
                  <Input
                    id="event-capacity"
                    type="number"
                    value={editingEvent.capacity || ""}
                    onChange={(e) =>
                      setEditingEvent((prev) => ({ ...prev, capacity: parseInt(e.target.value) || 0 }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="event-dress">Dress Code</Label>
                  <Input
                    id="event-dress"
                    placeholder="Black Tie"
                    value={editingEvent.dressCode}
                    onChange={(e) =>
                      setEditingEvent((prev) => ({ ...prev, dressCode: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="event-description">Description</Label>
                <Textarea
                  id="event-description"
                  placeholder="Describe the event..."
                  value={editingEvent.description}
                  onChange={(e) =>
                    setEditingEvent((prev) => ({ ...prev, description: e.target.value }))
                  }
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-primary text-primary-foreground">
                {editingEvent.id ? "Update Event" : "Create Event"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {events.map((event) => (
          <Card key={event.id} className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  {getEventTypeBadge(event.type)}
                  <CardTitle className="font-serif text-lg mt-2">{event.name}</CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(event)}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit {event.name}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(event.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete {event.name}</span>
                  </Button>
                </div>
              </div>
              <CardDescription className="line-clamp-2">{event.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-3 pt-0">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4 shrink-0" />
                <span>
                  {new Date(event.date + "T00:00:00").toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4 shrink-0" />
                <span>Capacity: {event.capacity}</span>
              </div>
              {event.dressCode && (
                <Badge variant="outline" className="w-fit mt-1 text-xs">
                  {event.dressCode}
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
