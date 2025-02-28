'use client'

import { Authenticator } from '@aws-amplify/ui-react'

import Auth from '@/providers/AuthProvider'
import StoreProvider from '@/state/redux'


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <Authenticator.Provider>
        <Auth>{children}</Auth>
      </Authenticator.Provider>
    </StoreProvider>
  )
}

export default Providers
