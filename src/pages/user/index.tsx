import React from 'react'
import dynamic from 'next/dynamic'

const SelfcareLogin = dynamic(() => import('../../views/selfcarelogin'))

export default SelfcareLogin