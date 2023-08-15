import { useEffect, useState } from 'react'

export const useTheme = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>('system')
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(
    prefersDark.matches ? 'dark' : 'light',
  )

  const bodyClasses = document.body.classList
  const isLight = bodyClasses.contains('light-theme')
  const isDark = bodyClasses.contains('dark-theme')

  const handler = ({ matches }: MediaQueryListEvent) => {
    if (matches) {
      if (theme === 'system') {
        setTheme(systemTheme)
        localStorage.setItem('theme', 'system')
      } else {
        setTheme('dark')
        localStorage.setItem('theme', 'dark')
      }
    } else {
      if (theme === 'system') {
        setTheme(systemTheme)
        localStorage.setItem('theme', 'system')
      } else {
        setTheme('light')
        localStorage.setItem('theme', 'light')
      }
    }
  }

  const toggleTheme = (selectedTheme: 'system' | 'light' | 'dark') => {
    setTheme(selectedTheme)
    localStorage.setItem('theme', selectedTheme)
  }

  useEffect(() => {
    const localTheme = localStorage.getItem('theme') as
      | 'system'
      | 'light'
      | 'dark'
      | null

    if (localTheme === 'system') {
      setTheme(systemTheme)
      prefersDark.addEventListener('change', handler)
    } else if (localTheme) {
      setTheme(localTheme)
      localStorage.setItem('theme', localTheme)
    }

    const themeClass = () => {
      if (theme === 'system') {
        if (systemTheme === 'dark') {
          isLight && bodyClasses.remove('light-theme')
          bodyClasses.add('dark-theme')
        } else {
          isDark && bodyClasses.remove('dark-theme')
          bodyClasses.add('light-theme')
        }
      } else if (theme === 'dark') {
        isLight && bodyClasses.remove('light-theme')
        bodyClasses.add('dark-theme')
      } else if (theme === 'light') {
        isDark && bodyClasses.remove('dark-theme')
        bodyClasses.add('light-theme')
      }
    }

    themeClass()

    return () => prefersDark.removeEventListener('change', handler)
  }, [theme])

  return {
    theme,
    toggleTheme,
    systemTheme,
  }
}
