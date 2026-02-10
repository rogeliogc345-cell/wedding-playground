"use client"

import React from "react"

import { cn } from "@/lib/utils"
import {
  Heart,
  CalendarDays,
  Users,
  Store,
  DollarSign,
  Clock,
  MailCheck,
  LayoutDashboard,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export type SectionKey =
  | "overview"
  | "about"
  | "events"
  | "guests"
  | "vendors"
  | "budget"
  | "timeline"
  | "rsvps"
  | "settings"

interface DashboardSidebarProps {
  activeSection: SectionKey
  onSectionChange: (section: SectionKey) => void
  collapsed: boolean
  onToggleCollapse: () => void
}

const navItems: { key: SectionKey; label: string; icon: React.ElementType }[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "about", label: "About Us", icon: Heart },
  { key: "events", label: "Events", icon: CalendarDays },
  { key: "guests", label: "Guest List", icon: Users },
  { key: "vendors", label: "Vendors", icon: Store },
  { key: "budget", label: "Budget", icon: DollarSign },
  { key: "timeline", label: "Timeline", icon: Clock },
  { key: "rsvps", label: "RSVPs", icon: MailCheck },
  { key: "settings", label: "Settings", icon: Settings },
]

export function DashboardSidebar({
  activeSection,
  onSectionChange,
  collapsed,
  onToggleCollapse,
}: DashboardSidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col bg-sidebar-background text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 h-screen sticky top-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-sidebar-primary" />
            <span className="font-serif text-lg font-semibold tracking-tight">
              Wedding Mgr
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground shrink-0"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>

      <nav className="flex-1 p-2 overflow-y-auto" aria-label="Dashboard navigation">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.key
            return (
              <li key={item.key}>
                <button
                  onClick={() => onSectionChange(item.key)}
                  className={cn(
                    "flex items-center gap-3 w-full rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    collapsed && "justify-center px-0"
                  )}
                  title={collapsed ? item.label : undefined}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/60">
            Wedding Dashboard v1.0
          </p>
        </div>
      )}
    </aside>
  )
}
