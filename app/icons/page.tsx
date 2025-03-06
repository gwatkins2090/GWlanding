"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon, getAvailableIcons } from "@/lib/icons";

// Categories mapping - for organizing icons
const categoryMap = {
  // Navigation
  home: "navigation",
  "arrow-left": "navigation",
  "arrow-right": "navigation",
  menu: "navigation",

  // Interface
  settings: "interface",
  bell: "interface",
  search: "interface",
  plus: "interface",
  minus: "interface",
  close: "interface",

  // Media
  camera: "media",
  image: "media",
  video: "media",
  music: "media",

  // Communication
  mail: "communication",
  message: "communication",
  "message-circle": "communication",
  phone: "communication",

  // Data
  calendar: "data",
  clock: "data",
  "bar-chart": "data",
  "pie-chart": "data",

  // Misc
  star: "misc",
  heart: "misc",
  bookmark: "misc",
  download: "misc",
  upload: "misc",

  // People
  user: "people",
  users: "people",

  // Files
  file: "files",
  folder: "files",
  document: "files",
  "file-text": "files",
};

// Other categories for icons not in our mapping
const defaultCategory = "misc";

export default function IconsShowcase() {
  const [icons, setIcons] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [iconSize, setIconSize] = useState(64);
  const [iconColor, setIconColor] = useState("#ffffff");
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [theme, setTheme] = useState<"purple" | "green">("purple");
  const [isMuted, setIsMuted] = useState(false);

  // State to handle custom image icons
  const [customIcons, setCustomIcons] = useState(true);

  // Load icons on client-side only
  useEffect(() => {
    // Wait a moment for the sprite to load
    const timer = setTimeout(() => {
      const availableIcons = getAvailableIcons();
      console.log(`Loaded ${availableIcons.length} icons`);
      setIcons(availableIcons);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Update theme on document root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Filter icons based on search term
  useEffect(() => {
    // Filter icons based on search term
    const delaySearch = setTimeout(() => {
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  // Filter icons based on search term
  const filteredIcons = icons.filter((name) => {
    if (searchTerm === "") return true;
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Handle icon selection
  const handleIconClick = (name: string) => {
    setSelectedIcon(name === selectedIcon ? null : name);
  };

  // Copy icon usage code
  const copyToClipboard = (codeType: "basic" | "styled") => {
    if (!selectedIcon) return;

    let code = "";

    if (codeType === "basic") {
      code = `<Icon name="${selectedIcon}" />`;
    } else {
      // For custom image icons, don't use text color class
      code = customIcons
        ? `<Icon name="${selectedIcon}" size={${iconSize}} />`
        : `<Icon name="${selectedIcon}" size={${iconSize}} className="text-[${iconColor}]" />`;
    }

    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsTyping(true);
  };

  const handleThemeToggle = () => {
    setTheme(theme === "purple" ? "green" : "purple");
  };

  const handleSoundToggle = () => {
    setIsMuted(!isMuted);
  };

  // Get category for an icon
  const getIconCategory = (name: string): string => {
    // Type assertion to tell TypeScript that name is a valid key
    return (categoryMap as Record<string, string>)[name] || defaultCategory;
  };

  // Icon grid animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header with controls */}
      <div className="px-6 py-4 flex justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-neon-secondary hover:text-neon-primary transition-colors"
          aria-label="Back"
        >
          <Icon name="arrow-left" size="24" className="text-neon-secondary" />
        </motion.button>

        <h1 className="neon-text text-xl">ICON ARCADE</h1>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleThemeToggle}
            className="text-neon-secondary hover:text-neon-primary transition-colors p-2 bg-black/50 rounded-full"
            aria-label="Toggle theme"
          >
            <Icon name="palette" size="24" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSoundToggle}
            className="text-neon-secondary hover:text-neon-primary transition-colors p-2 bg-black/50 rounded-full"
            aria-label="Toggle sound"
          >
            <Icon name="volume-2" size="24" />
          </motion.button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-6 py-4">
        <div className="arcade-screen p-6">
          {/* Search bar */}
          <div className="relative mb-8 neon-border">
            <input
              type="text"
              className="input-field pl-10"
              placeholder="SEARCH ICONS..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-secondary">
              <Icon name="search" size="20" className="text-neon-secondary" />
            </div>

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neon-tertiary"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ...
              </motion.div>
            )}
          </div>

          {/* Loading state */}
          {loading ? (
            <motion.div
              className="flex flex-col items-center justify-center p-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-neon-primary mb-4"
              >
                <Icon name="loader" size="48" />
              </motion.div>
              <p className="neon-text text-base">LOADING ICONS...</p>
            </motion.div>
          ) : (
            <>
              {/* Icons grid */}
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {filteredIcons.length > 0 ? (
                  filteredIcons.map((name) => (
                    <motion.div
                      key={name}
                      className="aspect-square neon-border p-4 flex flex-col items-center justify-center cursor-pointer bg-black/60 relative"
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: `0 0 15px var(--neon-primary)`,
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleIconClick(name)}
                    >
                      <div
                        className={`mb-2 ${
                          selectedIcon === name ? "glitch" : ""
                        }`}
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <Icon name={name} size="96" style={{ opacity: 1 }} />
                        </div>
                      </div>
                      <p className="text-neon-secondary text-xs uppercase">
                        {name}
                      </p>
                      <p className="text-neon-tertiary text-xs mt-1">
                        {getIconCategory(name)}
                      </p>
                      {selectedIcon === name && (
                        <motion.div
                          className="absolute inset-0 border-2 border-neon-tertiary"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                      )}
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    className="col-span-full text-center p-8 text-neon-secondary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    NO ICONS FOUND. PLEASE TRY AGAIN.
                  </motion.div>
                )}
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 flex justify-between items-center text-neon-secondary text-xs">
        <div>
          ICONS: {filteredIcons.length} / {icons.length}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-neon-tertiary"
          disabled={!selectedIcon}
        >
          <Icon
            name="download"
            size="16"
            className="w-4 h-4 text-neon-tertiary"
          />
          <span>EXPORT SELECTED</span>
        </motion.button>
      </div>

      {/* Selected icon details */}
      {selectedIcon && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 500 }}
          className="fixed bottom-0 left-0 right-0 bg-black border-t-2 border-neon-primary p-4 md:p-6"
        >
          <div className="container mx-auto">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <Icon
                  name={selectedIcon}
                  size={iconSize}
                  className="mr-4 text-neon-primary"
                  style={{ opacity: 1 }}
                />
                <div>
                  <h3 className="neon-text text-lg uppercase">
                    {selectedIcon}
                  </h3>
                  <p className="text-neon-secondary text-sm">
                    {getIconCategory(selectedIcon)}
                  </p>
                </div>
              </div>

              {/* Updated close button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="ml-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-400"
                onClick={() => setSelectedIcon(null)}
                style={{ boxShadow: "0 0 8px #ff0000" }}
              >
                <Icon name="x" size={20} />
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customization */}
              <div className="neon-border p-4">
                <h4
                  className="neon-text mb-3 uppercase"
                  style={{ color: "#0ff", textShadow: "0 0 5px #0ff" }}
                >
                  CUSTOMIZE
                </h4>

                <div className="mb-4">
                  <label className="block text-sm text-cyan-300 mb-1 uppercase">
                    Size: {iconSize}px
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="96"
                    value={iconSize}
                    onChange={(e) => setIconSize(parseInt(e.target.value))}
                    className="w-full"
                    style={{ accentColor: "#0ff", colorScheme: "dark" }}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-cyan-300 mb-1 uppercase">
                    Color
                  </label>
                  <input
                    type="color"
                    value={iconColor}
                    onChange={(e) => setIconColor(e.target.value)}
                    className="w-full h-10 p-1 border-2 border-cyan-500 rounded bg-black"
                    style={{ boxShadow: "0 0 8px #0ff" }}
                  />
                </div>
              </div>

              {/* Code examples */}
              <div className="neon-border p-4">
                <h4
                  className="neon-text mb-3 uppercase"
                  style={{ color: "#0ff", textShadow: "0 0 5px #0ff" }}
                >
                  CODE
                </h4>

                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-cyan-300 uppercase">
                      BASIC
                    </label>
                    <button
                      className="text-xs bg-cyan-600 text-black px-3 py-1 rounded hover:bg-cyan-400 font-bold"
                      onClick={() => copyToClipboard("basic")}
                      style={{ boxShadow: "0 0 8px #0ff" }}
                    >
                      {copied ? "COPIED!" : "COPY"}
                    </button>
                  </div>
                  <div className="border-2 border-cyan-500 p-2 rounded-md bg-black">
                    <code className="font-mono text-sm text-cyan-300 block overflow-x-auto">
                      {`<Icon name="${selectedIcon}" />`}
                    </code>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-cyan-300 uppercase">
                      WITH CUSTOMIZATION
                    </label>
                    <button
                      className="text-xs bg-cyan-600 text-black px-3 py-1 rounded hover:bg-cyan-400 font-bold"
                      onClick={() => copyToClipboard("styled")}
                      style={{ boxShadow: "0 0 8px #0ff" }}
                    >
                      {copied ? "COPIED!" : "COPY"}
                    </button>
                  </div>
                  <div className="border-2 border-cyan-500 p-2 rounded-md bg-black">
                    <code className="font-mono text-sm text-cyan-300 block overflow-x-auto">
                      {customIcons
                        ? `<Icon name="${selectedIcon}" size={${iconSize}} />`
                        : `<Icon name="${selectedIcon}" size={${iconSize}} className="text-[${iconColor}]" />`}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
