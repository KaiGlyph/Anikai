// src/hooks/useTheme.ts
import { useState, useEffect } from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'anikai_theme';

// Aplica el atributo data-theme al <html>
function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return saved === 'light' ? 'light' : 'dark'; // dark por defecto
  });

  // Aplicar al montar y al cambiar
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const setDark  = () => setTheme('dark');
  const setLight = () => setTheme('light');

  return { theme, toggleTheme, setDark, setLight, isDark: theme === 'dark' };
}

// ── Versión singleton para usar fuera de React (ej: main.tsx) ──────────────
export function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
  applyTheme(saved === 'light' ? 'light' : 'dark');
}