import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { DropdownMenu, Flex, IconButton } from '@radix-ui/themes'

import { useTheme } from '@/hooks'

export const ThemeMenu = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost" size='3'>
          {theme === 'dark' && <MoonIcon width="20" height="20" />}
          {theme === 'light' && <SunIcon width="20" height="20" />}
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" variant="soft">
        <DropdownMenu.Label>Set theme mode</DropdownMenu.Label>
        <DropdownMenu.Item
          color={theme === 'light' ? 'green' : undefined}
          onClick={() => toggleTheme('light')}
        >
          <Flex gap="3" align="center">
            <SunIcon />
            Light
          </Flex>
        </DropdownMenu.Item>
        <DropdownMenu.Item
          color={theme === 'dark' ? 'green' : undefined}
          onClick={() => toggleTheme('dark')}
        >
          <Flex gap="3" align="center">
            <MoonIcon />
            Dark
          </Flex>
        </DropdownMenu.Item>
        <DropdownMenu.Item
          color={theme === 'system' ? 'green' : undefined}
          onClick={() => toggleTheme('system')}
        >
          <Flex gap="3" align="center">
            <DesktopIcon />
            System
          </Flex>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
