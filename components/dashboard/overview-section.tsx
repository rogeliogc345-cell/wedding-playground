"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  CalendarDays,
  DollarSign,
  MailCheck,
  TrendingUp,
  Clock,
} from "lucide-react"

const stats = [
  {
    title: "Total Guests",
    value: "248",
    subtitle: "186 confirmed",
    icon: Users,
    trend: "+12 this week",
  },
  {
    title: "Upcoming Events",
    value: "5",
    subtitle: "Next: Rehearsal Dinner",
    icon: CalendarDays,
    trend: "In 14 days",
  },
  {
    title: "Budget Used",
    value: "$32,450",
    subtitle: "of $50,000 total",
    icon: DollarSign,
    trend: "64.9% spent",
  },
  {
    title: "RSVPs Received",
    value: "186",
    subtitle: "of 248 invited",
    icon: MailCheck,
    trend: "75% response rate",
  },
]

const recentActivity = [
  { action: "RSVP received from Sarah & Tom", time: "2 hours ago", type: "rsvp" },
  { action: "Florist contract signed", time: "5 hours ago", type: "vendor" },
  { action: "Menu tasting scheduled", time: "1 day ago", type: "event" },
  { action: "DJ deposit paid - $500", time: "2 days ago", type: "budget" },
  { action: "Invitation batch #3 sent", time: "3 days ago", type: "rsvp" },
]

const upcomingTasks = [
  { task: "Final venue walkthrough", due: "Feb 20, 2026", priority: "high" },
  { task: "Cake tasting appointment", due: "Feb 22, 2026", priority: "medium" },
  { task: "Send reminder to pending RSVPs", due: "Feb 25, 2026", priority: "high" },
  { task: "Finalize seating chart", due: "Mar 1, 2026", priority: "low" },
  { task: "Dress fitting #3", due: "Mar 5, 2026", priority: "medium" },
]

function getPriorityBadge(priority: string) {
  switch (priority) {
    case "high":
      return <Badge className="bg-destructive text-destructive-foreground text-xs">High</Badge>
    case "medium":
      return <Badge className="bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] text-xs">Medium</Badge>
    case "low":
      return <Badge className="bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))] text-xs">Low</Badge>
    default:
      return <Badge variant="secondary" className="text-xs">Unknown</Badge>
  }
}

function getActivityBadge(type: string) {
  switch (type) {
    case "rsvp":
      return <Badge variant="outline" className="text-xs">RSVP</Badge>
    case "vendor":
      return <Badge variant="secondary" className="text-xs">Vendor</Badge>
    case "event":
      return <Badge className="bg-primary text-primary-foreground text-xs">Event</Badge>
    case "budget":
      return <Badge className="bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))] text-xs">Budget</Badge>
    default:
      return <Badge variant="secondary" className="text-xs">Other</Badge>
  }
}

export function OverviewSection() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">
          Your wedding at a glance. Everything is on track.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 text-[hsl(var(--success))]" />
                  <span className="text-xs text-[hsl(var(--success))]">{stat.trend}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-serif">Planning Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span>Venue & Catering</span>
                <span className="text-muted-foreground">100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span>Guest List & RSVPs</span>
                <span className="text-muted-foreground">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span>Decorations & Florals</span>
                <span className="text-muted-foreground">60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span>Photography & Video</span>
                <span className="text-muted-foreground">90%</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span>Music & Entertainment</span>
                <span className="text-muted-foreground">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-serif">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-3">
              {recentActivity.map((activity, i) => (
                <li key={i} className="flex items-start justify-between gap-4 pb-3 border-b border-border last:border-0 last:pb-0">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm">{activity.action}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </span>
                  </div>
                  {getActivityBadge(activity.type)}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-serif">Upcoming Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-3">
            {upcomingTasks.map((task, i) => (
              <li key={i} className="flex items-center justify-between pb-3 border-b border-border last:border-0 last:pb-0">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">{task.task}</span>
                  <span className="text-xs text-muted-foreground">Due: {task.due}</span>
                </div>
                {getPriorityBadge(task.priority)}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
