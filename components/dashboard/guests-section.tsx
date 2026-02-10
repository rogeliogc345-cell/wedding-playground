"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Search, Pencil, Trash2, Users, UserCheck, UserX, HelpCircle } from "lucide-react"

interface Guest {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  group: string
  rsvpStatus: "confirmed" | "declined" | "pending" | "not-sent"
  mealPreference: string
  plusOne: boolean
  plusOneName: string
  tableNumber: string
  notes: string
}

const initialGuests: Guest[] = [
  { id: "1", firstName: "Sarah", lastName: "Johnson", email: "sarah@email.com", phone: "(555) 123-4567", group: "Bride's Family", rsvpStatus: "confirmed", mealPreference: "Vegetarian", plusOne: true, plusOneName: "Tom Johnson", tableNumber: "1", notes: "Allergic to nuts" },
  { id: "2", firstName: "Michael", lastName: "Chen", email: "michael.c@email.com", phone: "(555) 234-5678", group: "Groom's Friends", rsvpStatus: "confirmed", mealPreference: "Chicken", plusOne: false, plusOneName: "", tableNumber: "5", notes: "" },
  { id: "3", firstName: "Emma", lastName: "Williams", email: "emma.w@email.com", phone: "(555) 345-6789", group: "Bride's Friends", rsvpStatus: "pending", mealPreference: "", plusOne: true, plusOneName: "", tableNumber: "", notes: "Needs wheelchair access" },
  { id: "4", firstName: "James", lastName: "Rodriguez", email: "james.r@email.com", phone: "(555) 456-7890", group: "Groom's Family", rsvpStatus: "declined", mealPreference: "", plusOne: false, plusOneName: "", tableNumber: "", notes: "Will attend rehearsal only" },
  { id: "5", firstName: "Olivia", lastName: "Davis", email: "olivia.d@email.com", phone: "(555) 567-8901", group: "Bride's Friends", rsvpStatus: "confirmed", mealPreference: "Fish", plusOne: true, plusOneName: "David Park", tableNumber: "3", notes: "" },
  { id: "6", firstName: "Daniel", lastName: "Kim", email: "daniel.k@email.com", phone: "(555) 678-9012", group: "Work Colleagues", rsvpStatus: "not-sent", mealPreference: "", plusOne: false, plusOneName: "", tableNumber: "", notes: "" },
  { id: "7", firstName: "Sophia", lastName: "Martinez", email: "sophia.m@email.com", phone: "(555) 789-0123", group: "Bride's Family", rsvpStatus: "confirmed", mealPreference: "Beef", plusOne: true, plusOneName: "Carlos Martinez", tableNumber: "1", notes: "" },
  { id: "8", firstName: "William", lastName: "Thompson", email: "will.t@email.com", phone: "(555) 890-1234", group: "Groom's Friends", rsvpStatus: "pending", mealPreference: "", plusOne: false, plusOneName: "", tableNumber: "", notes: "May bring instrument for reception" },
]

const emptyGuest: Omit<Guest, "id"> = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  group: "Bride's Family",
  rsvpStatus: "not-sent",
  mealPreference: "",
  plusOne: false,
  plusOneName: "",
  tableNumber: "",
  notes: "",
}

function getRsvpBadge(status: Guest["rsvpStatus"]) {
  switch (status) {
    case "confirmed":
      return <Badge className="bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))] text-xs">Confirmed</Badge>
    case "declined":
      return <Badge className="bg-destructive text-destructive-foreground text-xs">Declined</Badge>
    case "pending":
      return <Badge className="bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] text-xs">Pending</Badge>
    case "not-sent":
      return <Badge variant="secondary" className="text-xs">Not Sent</Badge>
  }
}

export function GuestsSection() {
  const [guests, setGuests] = useState<Guest[]>(initialGuests)
  const [editingGuest, setEditingGuest] = useState<Omit<Guest, "id"> & { id?: string }>(emptyGuest)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterGroup, setFilterGroup] = useState("all")

  const confirmed = guests.filter((g) => g.rsvpStatus === "confirmed").length
  const declined = guests.filter((g) => g.rsvpStatus === "declined").length
  const pending = guests.filter((g) => g.rsvpStatus === "pending").length

  const filteredGuests = guests.filter((g) => {
    const matchesSearch =
      g.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGroup = filterGroup === "all" || g.group === filterGroup
    return matchesSearch && matchesGroup
  })

  const groups = [...new Set(guests.map((g) => g.group))]

  function handleSave() {
    if (!editingGuest.firstName.trim() || !editingGuest.lastName.trim()) return
    if (editingGuest.id) {
      setGuests((prev) =>
        prev.map((g) => (g.id === editingGuest.id ? { ...editingGuest, id: g.id } as Guest : g))
      )
    } else {
      setGuests((prev) => [...prev, { ...editingGuest, id: Date.now().toString() } as Guest])
    }
    setEditingGuest(emptyGuest)
    setDialogOpen(false)
  }

  function handleEdit(guest: Guest) {
    setEditingGuest(guest)
    setDialogOpen(true)
  }

  function handleDelete(id: string) {
    setGuests((prev) => prev.filter((g) => g.id !== id))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">Guest List</h1>
          <p className="text-muted-foreground mt-1">
            Manage your guests, RSVPs, and seating assignments.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setEditingGuest(emptyGuest)}
              className="bg-primary text-primary-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Guest
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-serif">
                {editingGuest.id ? "Edit Guest" : "Add New Guest"}
              </DialogTitle>
              <DialogDescription>
                Enter the guest information below.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="guest-first">First Name</Label>
                  <Input
                    id="guest-first"
                    value={editingGuest.firstName}
                    onChange={(e) => setEditingGuest((prev) => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="guest-last">Last Name</Label>
                  <Input
                    id="guest-last"
                    value={editingGuest.lastName}
                    onChange={(e) => setEditingGuest((prev) => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="guest-email">Email</Label>
                <Input
                  id="guest-email"
                  type="email"
                  value={editingGuest.email}
                  onChange={(e) => setEditingGuest((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="guest-phone">Phone</Label>
                <Input
                  id="guest-phone"
                  value={editingGuest.phone}
                  onChange={(e) => setEditingGuest((prev) => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="guest-group">Group</Label>
                <Select
                  value={editingGuest.group}
                  onValueChange={(value) => setEditingGuest((prev) => ({ ...prev, group: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bride's Family">{"Bride's Family"}</SelectItem>
                    <SelectItem value="Groom's Family">{"Groom's Family"}</SelectItem>
                    <SelectItem value="Bride's Friends">{"Bride's Friends"}</SelectItem>
                    <SelectItem value="Groom's Friends">{"Groom's Friends"}</SelectItem>
                    <SelectItem value="Work Colleagues">Work Colleagues</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="guest-meal">Meal Preference</Label>
                  <Select
                    value={editingGuest.mealPreference || "none"}
                    onValueChange={(value) =>
                      setEditingGuest((prev) => ({ ...prev, mealPreference: value === "none" ? "" : value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select meal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Not selected</SelectItem>
                      <SelectItem value="Chicken">Chicken</SelectItem>
                      <SelectItem value="Beef">Beef</SelectItem>
                      <SelectItem value="Fish">Fish</SelectItem>
                      <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="Vegan">Vegan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="guest-table">Table Number</Label>
                  <Input
                    id="guest-table"
                    value={editingGuest.tableNumber}
                    onChange={(e) =>
                      setEditingGuest((prev) => ({ ...prev, tableNumber: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="guest-notes">Notes</Label>
                <Input
                  id="guest-notes"
                  placeholder="Dietary restrictions, accessibility needs, etc."
                  value={editingGuest.notes}
                  onChange={(e) => setEditingGuest((prev) => ({ ...prev, notes: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} className="bg-primary text-primary-foreground">
                {editingGuest.id ? "Update" : "Add Guest"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{guests.length}</p>
              <p className="text-xs text-muted-foreground">Total Guests</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <UserCheck className="h-8 w-8 text-[hsl(var(--success))]" />
            <div>
              <p className="text-2xl font-bold">{confirmed}</p>
              <p className="text-xs text-muted-foreground">Confirmed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <UserX className="h-8 w-8 text-destructive" />
            <div>
              <p className="text-2xl font-bold">{declined}</p>
              <p className="text-xs text-muted-foreground">Declined</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <HelpCircle className="h-8 w-8 text-[hsl(var(--warning))]" />
            <div>
              <p className="text-2xl font-bold">{pending}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-lg">Guest Directory</CardTitle>
          <CardDescription>{filteredGuests.length} of {guests.length} guests shown</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterGroup} onValueChange={setFilterGroup}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Groups</SelectItem>
                {groups.map((group) => (
                  <SelectItem key={group} value={group}>{group}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden lg:table-cell">Group</TableHead>
                  <TableHead>RSVP</TableHead>
                  <TableHead className="hidden md:table-cell">Meal</TableHead>
                  <TableHead className="hidden lg:table-cell">Table</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGuests.map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell className="font-medium">
                      {guest.firstName} {guest.lastName}
                      {guest.plusOne && (
                        <span className="block text-xs text-muted-foreground">
                          +1{guest.plusOneName ? `: ${guest.plusOneName}` : ""}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{guest.email}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge variant="outline" className="text-xs">{guest.group}</Badge>
                    </TableCell>
                    <TableCell>{getRsvpBadge(guest.rsvpStatus)}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {guest.mealPreference || "-"}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">
                      {guest.tableNumber || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(guest)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit {guest.firstName}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(guest.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete {guest.firstName}</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
