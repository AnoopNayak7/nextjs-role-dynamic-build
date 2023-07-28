import React from 'react'
import dynamic from 'next/dynamic'

const BackofficeLogin = dynamic(() => import('../../views/backofficelogin'))

export default BackofficeLogin;