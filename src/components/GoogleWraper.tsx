'use client'

import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
const GoogleWraper = ({children}:{children:React.ReactNode}) => {

  return (
    <GoogleOAuthProvider clientId='955947248885-9birk1mcp2val3qbap1krv161aj214m5.apps.googleusercontent.com'>{children}</GoogleOAuthProvider>
  )
}

export default GoogleWraper
