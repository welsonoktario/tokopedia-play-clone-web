import { Dialog, Flex } from '@radix-ui/themes'
import { ReactNode, createContext, useMemo, useState } from 'react'

import { UserType } from '@/types'

import { AuthDialog } from './Dialogs/AuthDialog'

type AuthContextType = {
  user?: UserType
  setUser: (user: UserType | undefined) => void
  isDialogOpen: boolean
  setIsDialogOpen: (open: boolean) => void
}

type AuthProviderPropsType = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: AuthProviderPropsType) => {
  const [user, setUser] = useState<UserType | undefined>(undefined)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const value = useMemo(
    () => ({
      user,
      setUser,
      isDialogOpen,
      setIsDialogOpen,
    }),
    [user, isDialogOpen],
  )

  return (
    <AuthContext.Provider value={value}>
      <Dialog.Root open={isDialogOpen}>
        <Flex direction="column" grow="1" height="100%">
          {children}
        </Flex>
        <AuthDialog />
      </Dialog.Root>
    </AuthContext.Provider>
  )
}
