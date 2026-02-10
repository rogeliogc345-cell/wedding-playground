'use client'
import { Button } from "@/components/ui/button";
import AboutUsComponent1 from "@/components/ui/shared/about-us-components/AboutUs1";
import { CountDownComponentOne } from "@/components/ui/shared/countdowns-components/Countdown1";
import { EventSchedule } from "@/components/ui/shared/event-schedule-components/event-schedule1";
import { WeddingGallery } from "@/components/ui/shared/gallery-components/photo-gallery.1";
import PhotoGallery1Component from "@/components/ui/shared/gallery-components/PhotoGallery.2";
import Image from "next/image";
import { useState } from "react";
import CreatePage from "./create/page";
import { PhotoGallery2 } from "@/components/ui/shared/gallery-components/PhotoGallery2";

export default function Home() {

  const [clicked, setClicked]= useState(false);

  const handleClick = ()=>{
    setClicked(!clicked)
  }



  return (
      <section className="flex flex-col items-center justify-center">
        <Button
          onClick={handleClick}
        
        >Handle Click</Button>
       {clicked? <h1>Hello world</h1>:<p></p>} 

        <CountDownComponentOne targetDate={"2026-06-15T18:30:00Z"} />
       <AboutUsComponent1/>
       <WeddingGallery images={['/images/carousel-1.jpg', '/images/carousel-2.jpg','/images/event-1.jpg', '/images/event-2.jpg']}/>

       <PhotoGallery1Component images={['/images/carousel-1.jpg', '/images/carousel-2.jpg','/images/event-1.jpg', '/images/event-2.jpg']}/>

        <PhotoGallery2 images={['/images/carousel-1.jpg', '/images/carousel-2.jpg','/images/event-1.jpg', '/images/event-2.jpg']}/>
       <CreatePage/>
      
      </section>
    
  );
}
