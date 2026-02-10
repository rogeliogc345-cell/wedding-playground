"use client";

import { AnimatePresence, motion } from "framer-motion";
import { div, section } from "framer-motion/client";
import { useEffect, useState } from "react";

interface CountDownProps{
  targetDate:string | Date;
}

type TimeLeft = {
  days:number;
  hours:number;
  minutes:number;
  seconds:number;

}

export const CountDownComponentOne=({targetDate}:CountDownProps)=>{
  const calculateTimeLeft = ():TimeLeft=>{
    const difference = +new Date(targetDate) - +new Date();
  
  
  if(difference <= 0){
    return {days:0, hours:0, minutes:0, seconds:0}
  }

  return{
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),

  }}


  const [timeLeft, setTimeLeft]= useState<TimeLeft>({
    days:0, hours:0, minutes:0, seconds:0
  });

  useEffect(()=>{
    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(()=>{
      setTimeLeft(calculateTimeLeft())
    },1000);

    return()=> clearInterval(interval);


  }, [targetDate])

   return (
    <div className="flex gap-4 text-center items-center justify-center pb-3 ">
      <TimeBox label="Días" value={timeLeft.days} />
      <TimeBox label="Horas" value={timeLeft.hours} />
      <TimeBox label="Min" value={timeLeft.minutes} />
      <TimeBox label="Seg" value={timeLeft.seconds} />
    </div>
  );

 

}
 

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <section className="">
    <div className="w-16 bg-white opacity-40 h-20 rounded-4xl flex flex-col items-center justify-center shadow-md   ">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl text-blackfont-light font-heading "
        >
          {value}
        </motion.span>
      </AnimatePresence>

      <span className="text-xs uppercase text-black ">
        {label}
      </span>
    </div>
    </section>
  );
}

