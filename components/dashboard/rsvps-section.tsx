"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MailCheck, MailX, MailQuestion, Mail, Users, Utensils } from "lucide-react"

interface RsvpEntry {
  id: string
  name: string
  email: string
  status: "confirmed" | "declined" | "pending" | "not-sent"
  guestsCount: number
  mealChoice: string
  respondedAt: string
  dietaryNotes: string
}

const rsvpData: RsvpEntry[] = [
  { id: "1", name: "Sarah & Tom Johnson", email: "sarah@email.com", status: "confirmed", guestsCount: 2, mealChoice: "Vegetarian / Chicken", respondedAt: "2026-01-20", dietaryNotes: "Nut allergy" },
  { id: "2", name: "Michael Chen", email: "michael.c@email.com", status: "confirmed", guestsCount: 1, mealChoice: "Chicken", respondedAt: "2026-01-22", dietaryNotes: "" },
  { id: "3", name: "Olivia & David Davis", email: "olivia.d@email.com", status: "confirmed", guestsCount: 2, mealChoice: "Fish / Beef", respondedAt: "2026-01-25", dietaryNotes: "" },
  { id: "4", name: "Sophia & Carlos Martinez", email: "sophia.m@email.com", status: "confirmed", guestsCount: 2, mealChoice: "Beef / Beef", respondedAt: "2026-01-28", dietaryNotes: "Gluten-free" },
  { id: "5", name: "Emma Williams", email: "emma.w@email.com", status: "pending", guestsCount: 2, mealChoice: "", respondedAt: "", dietaryNotes: "Wheelchair access needed" },
  { id: "6", name: "James Rodriguez", email: "james.r@email.com", status: "declined", guestsCount: 0, mealChoice: "", respondedAt: "2026-02-01", dietaryNotes: "" },
  { id: "7", name: "William Thompson", email: "will.t@email.com", status: "pending", guestsCount: 1, mealChoice: "", respondedAt: "", dietaryNotes: "" },
  { id: "8", name: "Daniel Kim", email: "daniel.k@email.com", status: "not-sent", guestsCount: 1, mealChoice: "", respondedAt: "", dietaryNotes: "" },
  { id: "9", name: "Jessica & Ryan Moore", email: "jessica.m@email.com", status: "confirmed", guestsCount: 2, mealChoice: "Vegetarian / Fish", respondedAt: "2026-02-05", dietaryNotes: "Dairy-free" },
  { id: "10", name: "Andrew & Lisa Park", email: "andrew.p@email.com", status: "confirmed", guestsCount: 2, mealChoice: "Chicken / Chicken", respondedAt: "2026-02-08", dietaryNotes: "" },
]

const totalInvited = 248
const totalConfirmed = 186
const totalDeclined = 12
const totalPending = 35
const totalNotSent = 15

const mealBreakdown = [
  { meal: "Chicken", count: 62 },
  { meal: "Beef", count: 48 },
  { meal: "Fish", count: 34 },
  { meal: "Vegetarian", count: 28 },
  { meal: "Vegan", count: 14 },
]

function getStatusIcon(status: RsvpEntry["status"]) {
  switch (status) {
    case "confirmed":
      return <MailCheck className="h-4 w-4 text-[hsl(var(--success))]" />
    case "declined":
      return <MailX className="h-4 w-4 text-destructive" />
    case "pending":
      return <MailQuestion className="h-4 w-4 text-[hsl(var(--warning))]" />
    case "not-sent":
      return <Mail className="h-4 w-4 text-muted-foreground" />
  }
}

function getStatusBadge(status: RsvpEntry["status"]) {
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

export function RsvpsSection() {
  const responseRate = ((totalConfirmed + totalDeclined) / totalInvited) * 100

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight">RSVP Management</h1>
        <p className="text-muted-foreground mt-1">Track invitation responses and meal selections.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <Users className="h-6 w-6 text-primary" />
            <div>
              <p className="text-xl font-bold">{totalInvited}</p>
              <p className="text-xs text-muted-foreground">Invited</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <MailCheck className="h-6 w-6 text-[hsl(var(--success))]" />
            <div>
              <p className="text-xl font-bold">{totalConfirmed}</p>
              <p className="text-xs text-muted-foreground">Confirmed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <MailX className="h-6 w-6 text-destructive" />
            <div>
              <p className="text-xl font-bold">{totalDeclined}</p>
              <p className="text-xs text-muted-foreground">Declined</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <MailQuestion className="h-6 w-6 text-[hsl(var(--warning))]" />
            <div>
              <p className="text-xl font-bold">{totalPending}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <Mail className="h-6 w-6 text-muted-foreground" />
            <div>
              <p className="text-xl font-bold">{totalNotSent}</p>
              <p className="text-xs text-muted-foreground">Not Sent</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-serif text-lg">Response Rate</CardTitle>
            <CardDescription>{responseRate.toFixed(1)}% of guests have responded</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={responseRate} className="h-3" />
            <div className="flex items-center justify-between mt-3 text-sm">
              <span className="text-muted-foreground">{totalConfirmed + totalDeclined} responded</span>
              <span className="text-muted-foreground">{totalInvited - totalConfirmed - totalDeclined} remaining</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-lg flex items-center gap-2">
              <Utensils className="h-5 w-5" />
              Meal Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2">
              {mealBreakdown.map((meal) => (
                <li key={meal.meal} className="flex items-center justify-between text-sm">
                  <span>{meal.meal}</span>
                  <Badge variant="outline" className="text-xs">{meal.count}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-lg">Recent Responses</CardTitle>
          <CardDescription>Latest RSVP activity</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Guests</TableHead>
                <TableHead className="hidden lg:table-cell">Meal</TableHead>
                <TableHead className="hidden lg:table-cell">Responded</TableHead>
                <TableHead className="hidden md:table-cell">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rsvpData.map((rsvp) => (
                <TableRow key={rsvp.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(rsvp.status)}
                      <span className="font-medium">{rsvp.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{rsvp.email}</TableCell>
                  <TableCell>{getStatusBadge(rsvp.status)}</TableCell>
                  <TableCell className="hidden md:table-cell">{rsvp.guestsCount}</TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">{rsvp.mealChoice || "-"}</TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">
                    {rsvp.respondedAt
                      ? new Date(rsvp.respondedAt + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })
                      : "-"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-xs">{rsvp.dietaryNotes || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
