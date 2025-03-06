// lib/icons/utils.ts

/**
 * Formats an icon name to ensure consistency
 * Converts camelCase or spaces to kebab-case
 */
export const formatIconName = (name: string): string => {
  // Convert camelCase to kebab-case
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
};

/**
 * Checks if an icon exists in the loaded sprite
 */
export const iconExists = (name: string): boolean => {
  if (typeof document === 'undefined') return false;
  
  const spriteContainer = document.getElementById('svg-sprite-container');
  if (!spriteContainer) return false;
  
  return !!spriteContainer.querySelector(`#${name}`);
};

/**
 * Gets all available icon names from the sprite
 */
export const getAvailableIcons = (): string[] => {
  if (typeof document === 'undefined') return [];
  
  const spriteContainer = document.getElementById('svg-sprite-container');
  if (!spriteContainer) return [];
  
  const symbols = spriteContainer.querySelectorAll('symbol[id]');
  return Array.from(symbols).map(symbol => symbol.id);
};
