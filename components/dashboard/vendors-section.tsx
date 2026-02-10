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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Plus, Pencil, Trash2, Phone, Mail, Globe } from "lucide-react"

interface Vendor {
  id: string
  name: string
  category: string
  contactName: string
  email: string
  phone: string
  website: string
  contractAmount: number
  amountPaid: number
  status: "booked" | "inquiry" | "contract-sent" | "deposit-paid" | "paid-in-full"
  notes: string
}

const initialVendors: Vendor[] = [
  { id: "1", name: "Rosewood Estate", category: "Venue", contactName: "Patricia Hayes", email: "bookings@rosewood.com", phone: "(555) 111-2222", website: "rosewood-estate.com", contractAmount: 15000, amountPaid: 15000, status: "paid-in-full", notes: "Includes setup and teardown" },
  { id: "2", name: "Bloom & Petal Florals", category: "Florist", contactName: "Lisa Tran", email: "lisa@bloomandpetal.com", phone: "(555) 222-3333", website: "bloomandpetal.com", contractAmount: 4500, amountPaid: 2250, status: "deposit-paid", notes: "Final arrangements due 2 weeks before" },
  { id: "3", name: "Lens & Light Photography", category: "Photographer", contactName: "Marcus Webb", email: "marcus@lensandlight.com", phone: "(555) 333-4444", website: "lensandlight.com", contractAmount: 6000, amountPaid: 3000, status: "deposit-paid", notes: "Engagement session included" },
  { id: "4", name: "Sweet Layers Bakery", category: "Cake/Bakery", contactName: "Anna Morel", email: "orders@sweetlayers.com", phone: "(555) 444-5555", website: "sweetlayers.com", contractAmount: 1200, amountPaid: 0, status: "contract-sent", notes: "Tasting on Feb 22" },
  { id: "5", name: "DJ Harmony", category: "Entertainment", contactName: "Derek Osei", email: "book@djharmony.com", phone: "(555) 555-6666", website: "djharmony.com", contractAmount: 2500, amountPaid: 500, status: "deposit-paid", notes: "Sound check day before" },
  { id: "6", name: "Elegance Catering", category: "Catering", contactName: "Robert Diaz", email: "events@elegance.com", phone: "(555) 666-7777", website: "elegancecatering.com", contractAmount: 12000, amountPaid: 6000, status: "deposit-paid", notes: "Menu tasting scheduled" },
]

const emptyVendor: Omit<Vendor, "id"> = {
  name: "",
  category: "Venue",
  contactName: "",
  email: "",
  phone: "",
  website: "",
  contractAmount: 0,
  amountPaid: 0,
  status: "inquiry",
  notes: "",
}

function getStatusBadge(status: Vendor["status"]) {
  switch (status) {
    case "paid-in-full":
      return <Badge className="bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))] text-xs">Paid in Full</Badge>
    case "deposit-paid":
      return <Badge className="bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] text-xs">Deposit Paid</Badge>
    case "contract-sent":
      return <Badge className="bg-primary text-primary-foreground text-xs">Contract Sent</Badge>
    case "booked":
      return <Badge variant="secondary" className="text-xs">Booked</Badge>
    case "inquiry":
      return <Badge variant="outline" className="text-xs">Inquiry</Badge>
  }
}

export function VendorsSection() {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors)
  const [editingVendor, setEditingVendor] = useState<Omit<Vendor, "id"> & { id?: string }>(emptyVendor)
  const [dialogOpen, setDialogOpen] = useState(false)

  const totalContract = vendors.reduce((sum, v) => sum + v.contractAmount, 0)
  const totalPaid = vendors.reduce((sum, v) => sum + v.amountPaid, 0)

  function handleSave() {
    if (!editingVendor.name.trim()) return
    if (editingVendor.id) {
      setVendors((prev) =>
        prev.map((v) => (v.id === editingVendor.id ? { ...editingVendor, id: v.id } as Vendor : v))
      )
    } else {
      setVendors((prev) => [...prev, { ...editingVendor, id: Date.now().toString() } as Vendor])
    }
    setEditingVendor(emptyVendor)
    setDialogOpen(false)
  }

  function handleEdit(vendor: Vendor) {
    setEditingVendor(vendor)
    setDialogOpen(true)
  }

  function handleDelete(id: string) {
    setVendors((prev) => prev.filter((v) => v.id !== id))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">Vendors</h1>
          <p className="text-muted-foreground mt-1">Track contracts, payments, and vendor contacts.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingVendor(emptyVendor)} className="bg-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Add Vendor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-serif">{editingVendor.id ? "Edit Vendor" : "Add New Vendor"}</DialogTitle>
              <DialogDescription>Enter vendor details and contract information.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Business Name</Label>
                  <Input value={editingVendor.name} onChange={(e) => setEditingVendor((prev) => ({ ...prev, name: e.target.value }))} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Category</Label>
                  <Select value={editingVendor.category} onValueChange={(v) => setEditingVendor((prev) => ({ ...prev, category: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Venue">Venue</SelectItem>
                      <SelectItem value="Catering">Catering</SelectItem>
                      <SelectItem value="Photographer">Photographer</SelectItem>
                      <SelectItem value="Videographer">Videographer</SelectItem>
                      <SelectItem value="Florist">Florist</SelectItem>
                      <SelectItem value="Entertainment">Entertainment</SelectItem>
                      <SelectItem value="Cake/Bakery">{"Cake/Bakery"}</SelectItem>
                      <SelectItem value="Officiant">Officiant</SelectItem>
                      <SelectItem value="Attire">Attire</SelectItem>
                      <SelectItem value="Transportation">Transportation</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Contact Name</Label>
                <Input value={editingVendor.contactName} onChange={(e) => setEditingVendor((prev) => ({ ...prev, contactName: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Email</Label>
                  <Input type="email" value={editingVendor.email} onChange={(e) => setEditingVendor((prev) => ({ ...prev, email: e.target.value }))} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Phone</Label>
                  <Input value={editingVendor.phone} onChange={(e) => setEditingVendor((prev) => ({ ...prev, phone: e.target.value }))} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Website</Label>
                <Input value={editingVendor.website} onChange={(e) => setEditingVendor((prev) => ({ ...prev, website: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Contract Amount ($)</Label>
                  <Input type="number" value={editingVendor.contractAmount || ""} onChange={(e) => setEditingVendor((prev) => ({ ...prev, contractAmount: parseFloat(e.target.value) || 0 }))} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Amount Paid ($)</Label>
                  <Input type="number" value={editingVendor.amountPaid || ""} onChange={(e) => setEditingVendor((prev) => ({ ...prev, amountPaid: parseFloat(e.target.value) || 0 }))} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Status</Label>
                <Select value={editingVendor.status} onValueChange={(v) => setEditingVendor((prev) => ({ ...prev, status: v as Vendor["status"] }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inquiry">Inquiry</SelectItem>
                    <SelectItem value="contract-sent">Contract Sent</SelectItem>
                    <SelectItem value="booked">Booked</SelectItem>
                    <SelectItem value="deposit-paid">Deposit Paid</SelectItem>
                    <SelectItem value="paid-in-full">Paid in Full</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Notes</Label>
                <Textarea value={editingVendor.notes} onChange={(e) => setEditingVendor((prev) => ({ ...prev, notes: e.target.value }))} rows={2} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} className="bg-primary text-primary-foreground">{editingVendor.id ? "Update" : "Add Vendor"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Vendors</p>
            <p className="text-3xl font-bold mt-1">{vendors.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Contracts</p>
            <p className="text-3xl font-bold mt-1">${totalContract.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Paid</p>
            <p className="text-3xl font-bold mt-1">${totalPaid.toLocaleString()}</p>
            <Progress value={(totalPaid / totalContract) * 100} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{((totalPaid / totalContract) * 100).toFixed(0)}% of total</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-lg">All Vendors</CardTitle>
          <CardDescription>{vendors.length} vendors registered</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden lg:table-cell">Contact</TableHead>
                <TableHead>Contract</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>
                    <div className="font-medium">{vendor.name}</div>
                    <div className="flex items-center gap-3 mt-1">
                      {vendor.phone && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />{vendor.phone}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline" className="text-xs">{vendor.category}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm">{vendor.contactName}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />{vendor.email}
                      </span>
                      {vendor.website && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Globe className="h-3 w-3" />{vendor.website}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">${vendor.amountPaid.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">of ${vendor.contractAmount.toLocaleString()}</div>
                  </TableCell>
                  <TableCell>{getStatusBadge(vendor.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(vendor)}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit {vendor.name}</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(vendor.id)} className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete {vendor.name}</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
