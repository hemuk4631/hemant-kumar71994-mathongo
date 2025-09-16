import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function useSystemTheme(): Theme {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (isDark: boolean) => {
      const newTheme: Theme = isDark ? 'dark' : 'light';
      setTheme(newTheme);
      document.documentElement.classList.toggle('dark', isDark);
    };
    applyTheme(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => applyTheme(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return theme;
}
