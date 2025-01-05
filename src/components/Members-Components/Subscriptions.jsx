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
                height={{xs: 'fit-content', md: '600px', xl:'1000px'}} 
                position={{xs: 'relative', xl:'fixed'}}
                sx={{opacity: 0.3}}
                zIndex={-1}
            />
                <Members/>
        </Box>
    </PermissionsLoader>
  )
}