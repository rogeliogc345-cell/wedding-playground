'use client'
import React from 'react'
import {motion} from 'framer-motion'

const AnimateSection = ({children}:{children: React.ReactNode}) => {
  return (
    <motion.div
        initial={{opacity:0, y:-40}}
        whileInView={{opacity:1, y:0}}
        viewport={{once:true}}
        transition={{duration:.9}}
        className='py-20'
    
    >
        {children}
    </motion.div>
  )
}

export default AnimateSection