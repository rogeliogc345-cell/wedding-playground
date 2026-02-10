"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const galleryItem = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.80,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0.1px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function WeddingGallery({ images }: { images: string[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="columns-1 sm:columns-2 lg:columns-3 gap-5 p-4 space-y-5"
    >
      {images.map((src, index) => (
        <motion.div
          key={src}
          variants={galleryItem}
          transition={{ delay: index * 0.08 }}
          whileTap={{ scale: 0.97 }}
          className="relative overflow-hidden rounded-2xl shadow-md bg-white"
        >
          <Image
            src={src}
            width={500}
            height={500}
            alt="Wedding moment"
            className="w-full h-auto object-cover transition-transform duration-700
                       md:group-hover:scale-105"
          />

          {/* Soft romantic overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t
                       from-black/25 via-transparent to-transparent
                       opacity-60 md:opacity-0 md:group-hover:opacity-60
                       transition-opacity duration-500"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}