'use client'

import {
  Authenticator,
  Heading,
  Radio,
  RadioGroupField,
  useAuthenticator,
  View,
} from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Amplify } from 'aws-amplify'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId:
        process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
    },
  },
})

const components = {
  Header() {
    return (
      <View className="mt-4 mb-8">
        <Heading level={3} className="!text-2xl !font-bold">
          RENT
          <span className="text-secondary-500 font-light hover:!text-primary-300">
            IFUL
          </span>
        </Heading>
        <p className="text-muted-foreground mt-2">
          <span className="font-bold">Welcome!</span> Please sign in to continue
        </p>
      </View>
    )
  },
  SignIn: {
    Footer() {
      const { toSignUp } = useAuthenticator()

      return (
        <View className="text-center mt-4">
          <p className="text-muted-foreground">
            Dont&apos; have an account?{' '}
            <button
              onClick={toSignUp}
              className="font-semibold text-primary hover:underline bg-transparent border-none p-0"
            >
              Sign up
            </button>
          </p>
        </View>
      )
    },
  },
  SignUp: {
    FormFields() {
      const { validationErrors } = useAuthenticator()

      return (
        <>
          <Authenticator.SignUp.FormFields />
          <RadioGroupField
            legend="Role"
            name="custom:role"
            errorMessage={validationErrors?.['custom.role']}
            hasError={!!validationErrors?.['custom.role']}
            isRequired
          >
            <Radio value="tenant">Tenant</Radio>
            <Radio value="manager">Manager</Radio>
          </RadioGroupField>
        </>
      )
    },

    Footer() {
      const { toSignIn } = useAuthenticator()

      return (
        <View className="text-center mt-4">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <button
              onClick={toSignIn}
              className="font-semibold text-primary hover:underline bg-transparent border-none p-0"
            >
              Sign in
            </button>
          </p>
        </View>
      )
    },
  },
}

const formFields = {
  signIn: {
    username: {
      order: 1,
      placeholder: 'Enter your email',
      label: 'Email',
      isRequired: true,
    },
    password: {
      order: 2,
      placeholder: 'Enter your password',
      label: 'Password',
      isRequired: true,
    },
  },
  signUp: {
    username: {
      order: 1,
      placeholder: 'Choose a username',
      label: 'Username',
      isRequired: true,
    },
    email: {
      order: 2,
      placeholder: 'Enter your email',
      label: 'Email',
      isRequired: true,
    },
    password: {
      order: 3,
      placeholder: 'Enter your password',
      label: 'Password',
      isRequired: true,
    },
    confirm_password: {
      order: 4,
      placeholder: 'Confirm your password',
      label: 'Confirm Password',
      isRequired: true,
    },
  },
}

const Auth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthenticator((context) => [context.user])
  const router = useRouter()
  const pathname = usePathname()

  const isAuthPage = pathname.match(/^\/(sign-in|sign-up)$/)
  const isDashboardPage =
    pathname.startsWith('/managers') || pathname.startsWith('/tenants')

  // Redirect authenticated users away from auth pages
  useEffect(() => {
    if (user && isAuthPage) {
      router.push('/')
    }
  }, [user, isAuthPage, router])

  // Allow access to public pages without authentication
  if (!isAuthPage && !isDashboardPage) {
    return <>{children}</>
  }

  return (
    <div className="h-full">
      <Authenticator
        initialState={pathname.includes('sign-up') ? 'signUp' : 'signIn'}
        components={components}
        formFields={formFields}
      >
        {() => <>{children}</>}
      </Authenticator>
    </div>
  )
}

export default Auth
