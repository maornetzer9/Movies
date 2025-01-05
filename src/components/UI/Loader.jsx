import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import '../../css/loader.css';

export default function Loader( { color } ) {

  return (
    <Box 
        component={'div'} 
        className="loader-container" 
    >
        <CircularProgress 
            size={'100px'}
            thickness={1}
            color={color} 
            variant='indeterminate'
        />
    </Box>
  );
}