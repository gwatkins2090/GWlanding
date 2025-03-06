"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface IconContextProps {
  loaded: boolean;
}

const IconContext = createContext<IconContextProps>({ loaded: false });

export const useIconContext = () => useContext(IconContext);

export interface IconProviderProps {
  children: ReactNode;
  spritePath?: string;
}

export const IconProvider: React.FC<IconProviderProps> = ({
  children,
  spritePath = "/sprite.svg",
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === "undefined") return;

    // Check if the sprite is already loaded
    if (document.getElementById("svg-sprite-container")) {
      setLoaded(true);
      return;
    }

    // Fetch and inject the sprite
    fetch(spritePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to load SVG sprite (${response.status} ${response.statusText})`
          );
        }
        return response.text();
      })
      .then((text) => {
        const div = document.createElement("div");
        div.innerHTML = text;
        div.style.display = "none";
        div.id = "svg-sprite-container";
        document.body.appendChild(div);
        setLoaded(true);
      })
      .catch((error) => {
        console.error("Error loading SVG sprite:", error);
      });
  }, [spritePath]);

  return (
    <IconContext.Provider value={{ loaded }}>{children}</IconContext.Provider>
  );
};
