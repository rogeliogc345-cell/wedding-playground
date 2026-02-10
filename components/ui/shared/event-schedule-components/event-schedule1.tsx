"use client";

import React from "react"

import { Church, PartyPopper, Music, MapPin, Clock, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface Event {
  icon: React.ReactElement<{className?:string}>;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

interface EventScheduleProps {
  events?: Event[];
}

const defaultEvents: Event[] = [
  {
    icon: <Church className="w-8 h-8" />,
    title: "The Ceremony",
    date: "June 15, 2026",
    time: "3:00 PM",
    location: "St. Mary's Chapel",
    description: "Join us as we exchange our vows in an intimate ceremony surrounded by our closest family and friends.",
  },
  {
    icon: <PartyPopper className="w-8 h-8" />,
    title: "The Reception",
    date: "June 15, 2026",
    time: "5:00 PM",
    location: "Rosewood Estate Gardens",
    description: "Celebrate with us over dinner, drinks, and dancing under the stars at the beautiful Rosewood Estate.",
  },
  {
    icon: <Music className="w-8 h-8" />,
    title: "After Party",
    date: "June 15, 2026",
    time: "9:00 PM",
    location: "The Garden Pavilion",
    description: "Keep the celebration going with music, cocktails, and midnight snacks in our private pavilion.",
  },
];


const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function EventSchedule({ events = defaultEvents }: EventScheduleProps) {
  return (
    <motion.div
      id="events"
      className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto"
  variants={container}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
    >
      {/* 🌸 Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.08),_transparent_60%)]" />

      <div className="relative container mx-auto px-6 bg-rose-50">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-4">
            Wedding Hello
          </p>

          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Our Special Day
          </h2>

          {/* Floral divider */}
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-primary/40" />
            <span className="text-primary/60 text-sm">✿</span>
            <span className="h-px w-10 bg-primary/40" />
          </div>
        </div>

        {/* Timeline grid */}
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {events.map((event, index) => (
            
            <motion.div key={event.title} variants={item}>
            <Card
              key={event.title}
              className="relative bg-blue-400 backdrop-blur border border-border/40 rounded-3xl shadow-sm hover:shadow-md transition-all duration-500"
            >
              <CardContent className="p-10 text-center">
                {/* Icon */}
                <div className="relative w-20 h-20 mx-auto mb-8">
                  <div className="absolute inset-0 rounded-full bg-primary/10 blur-md" />
                  <div className="relative w-full h-full rounded-full border border-primary/30 flex items-center justify-center text-primary">
                    {React.cloneElement(event.icon ,{
                      className: "w-8 h-8",
                    })}
                  </div>
                </div>

                <h3 className="font-serif text-2xl text-foreground mb-6">
                  {event.title}
                </h3>

                <div className="space-y-3 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground max-w-xs mx-auto">
                  {event.description}
                </p>

                {/* Bottom ornament */}
                <div className="mt-8 flex justify-center">
                  <span className="text-primary/40 text-xs">✿ ✿ ✿</span>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
