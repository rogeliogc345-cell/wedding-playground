"use client"

import { useState } from "react"
import { DashboardSidebar, type SectionKey } from "@/components/dashboard/dashboard-sidebar"
import { OverviewSection } from "@/components/dashboard/overview-section"
import { AboutSection } from "@/components/dashboard/about-section"
import { EventsSection } from "@/components/dashboard/events-section"
import { GuestsSection } from "@/components/dashboard/guests-section"
import { VendorsSection } from "@/components/dashboard/vendors-section"
import { BudgetSection } from "@/components/dashboard/budget-section"
import { TimelineSection } from "@/components/dashboard/timeline-section"
import { RsvpsSection } from "@/components/dashboard/rsvps-section"
import { SettingsSection } from "@/components/dashboard/settings-section"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

function renderSection(section: SectionKey) {
  switch (section) {
    case "overview":
      return <OverviewSection />
    case "about":
      return <AboutSection />
    case "events":
      return <EventsSection />
    case "guests":
      return <GuestsSection />
    case "vendors":
      return <VendorsSection />
    case "budget":
      return <BudgetSection />
    case "timeline":
      return <TimelineSection />
    case "rsvps":
      return <RsvpsSection />
    case "settings":
      return <SettingsSection />
    default:
      return <OverviewSection />
  }
}

const sectionLabels: Record<SectionKey, string> = {
  overview: "Overview",
  about: "About Us",
  events: "Events",
  guests: "Guest List",
  vendors: "Vendors",
  budget: "Budget",
  timeline: "Timeline",
  rsvps: "RSVPs",
  settings: "Settings",
}

export default function Page() {
  const [activeSection, setActiveSection] = useState<SectionKey>("overview")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          sectionLabel={sectionLabels[activeSection]}
          onSectionChange={setActiveSection}
        />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {renderSection(activeSection)}
        </main>
      </div>
    </div>
  )
}
