
"use client";

import Image from 'next/image';
import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Edit3 } from 'lucide-react';
import { cn } from "@/lib/utils";

interface ClientSideImagePickerProps {
  defaultSrc: string;
  alt: string;
  width: number;
  height: number;
  storageKey: string;
  className?: string;
  imageClassName?: string;
  iconSize?: number;
}

export function ClientSideImagePicker({
  defaultSrc,
  alt,
  width,
  height,
  storageKey,
  className,
  imageClassName,
  iconSize = 16,
}: ClientSideImagePickerProps) {
  const [imageSrc, setImageSrc] = useState<string>(defaultSrc);
  const [isMounted, setIsMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
    // Only access localStorage on the client-side after mount
    const storedImage = localStorage.getItem(storageKey);
    if (storedImage) {
      setImageSrc(storedImage);
    }
  }, [storageKey]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const newSrc = reader.result as string;
        setImageSrc(newSrc);
        if (isMounted) { // Ensure component is still mounted
          localStorage.setItem(storageKey, newSrc);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Render a consistent output on server and initial client render before hydration
  const currentSrc = isMounted ? imageSrc : defaultSrc;

  return (
    <div
      className={cn("relative group cursor-pointer", className)}
      style={{ width: `${width}px`, height: `${height}px` }} // Ensure dimensions are applied
      onClick={triggerFileInput}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') triggerFileInput(); }}
      aria-label={`Change ${alt}`}
    >
      <Image
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn("object-cover transition-opacity group-hover:opacity-70", imageClassName)}
        priority // Good for LCP elements like a logo
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 pointer-events-none">
        <Edit3 size={iconSize} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
        aria-hidden="true"
      />
    </div>
  );
}
