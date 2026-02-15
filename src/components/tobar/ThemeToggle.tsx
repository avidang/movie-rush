import { Moon, Sun } from 'lucide-react';
import { Button } from '../ui/Button';
import { useThemePreference } from '@/hooks/useThemePreference';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useThemePreference();
  return (
    <Button
      type="button"
      size="icon"
      color="secondary"
      onClick={toggleTheme}
      className="ml-auto *:size-auto"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
};

export { ThemeToggle };
