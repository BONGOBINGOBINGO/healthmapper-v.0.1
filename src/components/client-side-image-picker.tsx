
"use client";

import Image from 'next/image';
import Link from 'next/link';
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
  href?: string; // New optional href prop
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
  href, // Destructure new prop
}: ClientSideImagePickerProps) {
  const [imageSrc, setImageSrc] = useState<string>(defaultSrc);
  const [isMounted, setIsMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
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
        if (isMounted) {
          localStorage.setItem(storageKey, newSrc);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleEditTrigger = (e: React.MouseEvent) => {
    // If the component is acting as a link, stop propagation to prevent navigation when editing.
    if (href) {
      e.stopPropagation();
      e.preventDefault();
    }
    triggerFileInput();
  };

  const currentSrc = isMounted ? imageSrc : defaultSrc;

  const imageContent = (
    <>
      <Image
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "object-cover transition-opacity",
          imageClassName,
          !href ? "group-hover:opacity-70" : "" // Only apply this specific hover if not a link (link hover is handled by Link)
        )}
        priority 
      />
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200",
          href ? "cursor-pointer" : "pointer-events-none" // Make edit icon area clickable only if it's a link
        )}
        onClick={href ? handleEditTrigger : undefined} // Edit icon triggers edit if component is a link
      >
        <Edit3 
          size={iconSize} 
          className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
        />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
        aria-hidden="true"
      />
    </>
  );

  if (href) {
    return (
      <Link href={href} passHref legacyBehavior>
        <a
          className={cn("relative group", className)} // Removed cursor-pointer, Link handles it
          style={{ width: `${width}px`, height: `${height}px` }}
          aria-label={`${alt} - Navigate to homepage`}
        >
          {imageContent}
        </a>
      </Link>
    );
  }

  // Original behavior: entire component is clickable to edit
  return (
    <div
      className={cn("relative group cursor-pointer", className)}
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={triggerFileInput} // Entire component triggers edit if not a link
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') triggerFileInput(); }}
      aria-label={`Change ${alt}`}
    >
      {imageContent}
    </div>
  );
}
