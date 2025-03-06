"use client";

import React, { SVGProps } from "react";
import { useIconContext } from "./iconContext";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: string;
  size?: number | string;
  title?: string;
}

export const Icon = ({
  name,
  size,
  width,
  height,
  title,
  className = "",
  ...props
}: IconProps) => {
  const { loaded } = useIconContext();

  // Set dimensions based on size prop or individual width/height
  const finalWidth = size || width || "24px";
  const finalHeight = size || height || "24px";

  if (!loaded) {
    // Optional: Return a placeholder or skeleton while loading
    return (
      <svg
        width={finalWidth}
        height={finalHeight}
        className={`icon-placeholder ${className}`}
        viewBox="0 0 24 24"
        {...props}
      >
        <rect width="24" height="24" fill="currentColor" opacity="0.2" />
      </svg>
    );
  }

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      className={`icon icon-${name} ${className}`}
      aria-hidden={!title}
      {...props}
    >
      {title && <title>{title}</title>}
      <use href={`#${name}`} />
    </svg>
  );
};
