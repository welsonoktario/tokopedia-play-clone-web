import {
  Button,
  Dialog,
  DialogClose,
  Flex,
  Text,
  TextField,
} from '@radix-ui/themes'
import { FormEvent, useState } from 'react'

import { doFetch } from '@/helpers/fetch'
import { useAuth } from '@/hooks'
import { UserType } from '@/types'

export const AuthDialog = () => {
  const { setUser } = useAuth()
  const { setIsDialogOpen } = useAuth()!
  const [username, setUsername] = useState('')
  const [validationError, setValidationError] = useState('')

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (username.includes(' ')) {
      setValidationError("Username can't contain space(s)")
    }

    if (!/^[a-z0-9]+$/.test(username)) {
      setValidationError(
        'Username can only contains lowercase alphanumeric (a-z and 0-9) characters',
      )
    }

    if (!validationError) {
      try {
        const user = await doFetch<UserType>('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ username }),
          credentials: 'include',
        })

        setUser(user)
        setIsDialogOpen(false)
      } catch (err: any) {}
    }
  }

  return (
    <Dialog.Content style={{ maxWidth: '32%' }}>
      <Dialog.Title>Welcome back!</Dialog.Title>
      <Dialog.Description mb="5">Sign-in to your account.</Dialog.Description>

      <form onSubmit={handleSignIn}>
        {validationError && (
          <Text size="1" color="red">
            {validationError}
          </Text>
        )}
        <TextField.Root color={validationError ? 'red' : 'green'}>
          <TextField.Slot>
            <Text size="3">Username</Text>
          </TextField.Slot>
          <TextField.Input
            size="3"
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            placeholder="Enter your username or create a new one"
            required
          />
          <TextField.Slot>
            <Button size="3" type="submit" variant="ghost">
              Sign-in
            </Button>
          </TextField.Slot>
        </TextField.Root>
      </form>

      <Flex mt="5" gap="3" justify="end">
        <DialogClose onClick={() => setIsDialogOpen(false)}>
          <Button size="3" variant="surface">
            Close
          </Button>
        </DialogClose>
      </Flex>
    </Dialog.Content>
  )
}
