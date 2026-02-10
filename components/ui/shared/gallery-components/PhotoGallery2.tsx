"use client";

import { motion } from "framer-motion";

export function PhotoGallery2({ images }: { images: string[] }) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-4 p-4 space-y-4">
      {images.map((src, index) => (
        <motion.div
          key={src}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          className="relative group overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-shadow"
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
  );
}