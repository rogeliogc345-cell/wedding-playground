import { motion } from 'framer-motion'
import React from 'react'

type PhotoGalleryProps = {
    images:string[], 
}

const PhotoGallery1Component = ({images}:PhotoGalleryProps) => {


  return (
    <div className='columns-1 md:columns-2 lg:columns-3 gap-4 p-4 space-y-4'>
        {images.map((src,index)=>(
            <motion.div
            //Animation 1
                // key={src}
                // initial={{opacity:0, scale:0.9}}
                // whileInView={{opacity:1,scale:1}}
                // transition={{delay:index*0.1}}
                // viewport={{once:true}}//La animación solo se ejecuta la primera vez que el elemento 
                // // entra en el viewport (zona visible de la pantalla).
                //className='relative group overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-shadow'


                //animation 2
                // initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                // whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                // transition={{
                // duration: 1.3,
                // ease: "easeOut",
                // delay: index * 0.08,
                // }}
                // viewport={{ once: true }}
                // className="overflow-hidden rounded-xl shadow-md"


                //animation 3
                key={src}
                initial={{ opacity: 0, scale: 1.08 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.97 }}
                transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1], // smooth & romantic
                    delay: index * 0.1,
  }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-2xl shadow-lg"


                
            >

                <img
            src={src}
            alt="Gallery image"
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                
            </motion.div>
        ))}

    </div>
  )
}

export default PhotoGallery1Component