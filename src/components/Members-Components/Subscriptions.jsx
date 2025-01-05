import { Box } from '@mui/material'
import Banner  from '../../assets/images/Subscriptions.webp';
import Members from './Members';
import React from 'react'
import PermissionsLoader from '../UI/PermissionsLoader';

export default function Subscriptions() {


  return (
    <PermissionsLoader>
        <Box component={'div'} >
            <Box 
                component={'img'} 
                src={Banner} 
                width={'100%'} 
                display={'flex'}
                margin={'auto'}
                height={{xs: '220px', md: '600px', xl:'1000px'}} 
                position={{xs: 'relative', xl:'fixed'}}
                sx={{opacity: {xs: 0.5, md: 0.3, xl: 0.3}}}
                zIndex={-1}
            />
                <Members/>
        </Box>
    </PermissionsLoader>
  )
}