import React from 'react'
import Image from 'next/image'
import AnimateSection from '../animationsComponents/Animation1'
import { CountDownComponentOne } from '../countdowns-components/Countdown1'

const HeroComponent1 = () => {
  return (
    <div className='relative min-h-screen min-w-screen '>
        <Image
            src={'/images/carousel-2.jpg'}
            alt='wedding background'
            fill
            priority
            className='object-cover'        
        />

        <div className="absolute inset-0 bg-black/60">

            <div className="relative z-10 p-5 bg-fixed ">
                
                
                <AnimateSection>
                    <div className='flex flex-col items-center justify-center h-screen gap-2 md:max-w-1/2 mx-auto '>
                    <h1 className='text-5xl text-center font-heading text-white mb-3  '>Rogelio & Elizabeth</h1>
                    <p className='text-muted text-justify mb-6 font-sans'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exuga laboriosam beatae ea quia nisi numquam doloremque vel?</p>
                    <CountDownComponentOne targetDate={'2026-06-15T00:00:00'} />
                    </div>

                </AnimateSection>

             

               

              
                
            </div>
    
        </div>
    </div>
  )
}

export default HeroComponent1