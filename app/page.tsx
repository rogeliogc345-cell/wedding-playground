'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [clicked, setClicked]= useState(false);

  const handleClick = ()=>{
    setClicked(!clicked)
  }



  return (
      <section className="flex flex-col items-center justify-center h-screen">
        <Button
          onClick={handleClick}
        
        >Handle Click</Button>
       {clicked? <h1>Hello world</h1>:<p></p>} 
      </section>
    
  );
}
