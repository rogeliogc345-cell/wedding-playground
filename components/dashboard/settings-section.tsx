"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Save } from "lucide-react"

export function SettingsSection() {
  const [weddingSettings, setWeddingSettings] = useState({
    coupleName1: "Alexandra",
    coupleName2: "Jonathan",
    weddingDate: "2026-06-20",
    venueName: "Rosewood Estate",
    venueAddress: "789 Rose Ln, Westchester, NY 10601",
    weddingWebsite: "alexandra-and-jonathan.com",
    hashtag: "#AlexAndJon2026",
    contactEmail: "wedding@alexandra-jonathan.com",
    contactPhone: "(555) 000-1111",
    rsvpDeadline: "2026-05-01",
    welcomeMessage: "We are so excited to celebrate our love with you! Thank you for being a part of our special day.",
  })

  const [notifications, setNotifications] = useState({
    emailRsvp: true,
    emailBudget: true,
    emailVendor: false,
    emailTimeline: true,
  })

  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure your wedding details and preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-lg">Wedding Details</CardTitle>
          <CardDescription>Basic information about your wedding.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name1">Partner 1 Name</Label>
              <Input
                id="name1"
                value={weddingSettings.coupleName1}
                onChange={(e) => setWeddingSettings((prev) => ({ ...prev, coupleName1: e.target.value }))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name2">Partner 2 Name</Label>
              <Input
                id="name2"
                value={weddingSettings.coupleName2}
                onChange={(e) => setWeddingSettings((prev) => ({ ...prev, coupleName2: e.target.value }))}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="wedding-date">Wedding Date</Label>
              <Input
                id="wedding-date"
                type="date"
                value={weddingSettings.weddingDate}
                onChange={(e) => setWeddingSettings((prev) => ({ ...prev, weddingDate: e.target.value }))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="rsvp-deadline">RSVP Deadline</Label>
              <Input
                id="rsvp-deadline"
                type="date"
                value={weddingSettings.rsvpDeadline}
                onChange={(e) => setWeddingSettings((prev) => ({ ...prev, rsvpDeadline: e.target.value }))}
              />
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="venue-name">Venue Name</Label>
              <Input
                id="venue-name"
                value={weddingSettings.venueName}
                onChange={(e) => setWeddingSettings((prev) => ({ ...prev, venueName: e.target.value }))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="venue-address">Venue Address</Label>
              <Input
                id="venue-address"
                value={weddingSettings.venueAddress}
                onChange={(e) => setWeddingSettings((prev) => ({ ...prev, venueAddress: e.target.value }))}
              />
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="website">Wedding Website</Label>
              <Input
                id="website"
                value={weddingSettings.weddingWebsite}
                onChange={(e) => setWeddingSettings((prev) => ({ ...prev, weddingWebsite: e.target.value }))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="hashtag">Wedding Hashtag</Label>
              <Input
                id="hashtag"
                value={weddingSettings.hashtag}
                onChange={(e) => setWeddingSettings((prev) => ({ ...prev, hashtag: e.target.value }))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input
                id="contact-email"
                type="email"
                value={weddingSettings.contactEmail}
                onChange={(e) => setWeddingSettings((prev) => ({ ...prev, contactEmail: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="welcome-msg">Welcome Message</Label>
            <Textarea
              id="welcome-msg"
              value={weddingSettings.welcomeMessage}
              onChange={(e) => setWeddingSettings((prev) => ({ ...prev, welcomeMessage: e.target.value }))}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-lg">Email Notifications</CardTitle>
          <CardDescription>Choose which updates you want to receive via email.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">New RSVP Responses</p>
              <p className="text-xs text-muted-foreground">Get notified when a guest responds to the invitation.</p>
            </div>
            <Switch
              checked={notifications.emailRsvp}
              onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emailRsvp: checked }))}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Budget Alerts</p>
              <p className="text-xs text-muted-foreground">Receive alerts when nearing or exceeding budget.</p>
            </div>
            <Switch
              checked={notifications.emailBudget}
              onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emailBudget: checked }))}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Vendor Updates</p>
              <p className="text-xs text-muted-foreground">Notifications about vendor contract milestones.</p>
            </div>
            <Switch
              checked={notifications.emailVendor}
              onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emailVendor: checked }))}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Timeline Reminders</p>
              <p className="text-xs text-muted-foreground">Get reminders for upcoming milestones and deadlines.</p>
            </div>
            <Switch
              checked={notifications.emailTimeline}
              onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emailTimeline: checked }))}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-primary text-primary-foreground">
          <Save className="h-4 w-4 mr-2" />
          {saved ? "Saved!" : "Save Settings"}
        </Button>
      </div>
    </div>
  )
}
