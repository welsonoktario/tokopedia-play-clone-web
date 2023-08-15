import { Container, Theme } from '@radix-ui/themes'
import { BrowserRouter } from 'react-router-dom'

import { Navbar } from '@/components'
import { useTheme } from '@/hooks'

import { AppRoutes } from './AppRoutes'
import { AuthProvider } from './components/AuthContext'

const App = () => {
  const { theme } = useTheme()

  return (
    <Theme
      accentColor="green"
      grayColor="mauve"
      radius="large"
      suppressHydrationWarning
      style={{
        minHeight: '100vh',
        maxHeight: '100vh',
        backgroundColor: theme === 'dark' ? 'var(--mauve-1)' : 'var(--mauve-4)',
        overflowY: 'auto',
      }}
    >
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Container pt="6">
            <AppRoutes />
          </Container>
        </BrowserRouter>
      </AuthProvider>
    </Theme>
  )
}

export default App
