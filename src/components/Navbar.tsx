import { VideoIcon } from '@radix-ui/react-icons'
import { Box, Container, Flex, Heading } from '@radix-ui/themes'
import { Link } from 'react-router-dom'

import { useTheme } from '@/hooks'

import { AuthMenu } from './NavbarMenus/AuthMenu'
import { ThemeMenu } from './NavbarMenus/ThemeMenu'

export const Navbar = () => {
  const { theme } = useTheme()

  return (
    <Container
      position="sticky"
      p="4"
      top="0"
      left="0"
      right="0"
      style={{
        background: theme === 'dark' ? 'var(--mauve-3)' : 'var(--mauve-1)',
        zIndex: 999,
      }}
    >
      <Box>
        <Flex width="100%" align="center" justify="between">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Flex gap="3" align="center">
              <VideoIcon
                height="32"
                width="32"
                style={{ color: 'var(--green-11)' }}
              />
              <Heading color="green">Tokopedia Play (Clone)</Heading>
            </Flex>
          </Link>
          <Flex gap="5">
            <AuthMenu />
            <ThemeMenu />
          </Flex>
        </Flex>
      </Box>
    </Container>
  )
}
