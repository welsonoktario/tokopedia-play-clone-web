import { EnterIcon, ExitIcon, PersonIcon } from '@radix-ui/react-icons'
import { Dialog, DropdownMenu, Flex, IconButton } from '@radix-ui/themes'
import { useEffect } from 'react'

import { useAuth } from '@/hooks'

export const AuthMenu = () => {
  const { user, setIsDialogOpen, login, logout } = useAuth()

  useEffect(() => {
    const authUsername = document.cookie.replace(
      /(?:(?:^|.*;\s*)auth\s*\=\s*([^;]*).*$)|^.*$/,
      '$1',
    )

    if (!user) {
      if (authUsername) {
        login(authUsername)
      }
    }
  }, [])

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost" size='3'>
          <PersonIcon width="20" height="20" />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" variant="soft">
        <DropdownMenu.Group>
          {user && (
            <>
              <DropdownMenu.Item>
                <Flex gap="2" align="center">
                  <PersonIcon />
                  Profile
                </Flex>
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item onClick={() => logout()}>
                <Flex gap="2" align="center" color="red">
                  <ExitIcon />
                  Sign-out
                </Flex>
              </DropdownMenu.Item>
            </>
          )}
          {!user && (
            <>
              <DropdownMenu.Label>Welcome back!</DropdownMenu.Label>
              <Dialog.Trigger>
                <DropdownMenu.Item onClick={() => setIsDialogOpen(true)}>
                  <Flex gap="2" align="center">
                    <EnterIcon />
                    Sign-in
                  </Flex>
                </DropdownMenu.Item>
              </Dialog.Trigger>
            </>
          )}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
