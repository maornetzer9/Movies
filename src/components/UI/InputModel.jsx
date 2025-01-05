import { InputLabel, TextField } from '@mui/material'
import React from 'react'

export default function InputModel({ 
        type = 'text', 
        variant = 'outlined', 
        name = '', 
        label = 'Input', 
        helperText = '',
        error = false,
        autoComplete = '',
        defaultValue = '',
        style = {},
        onChange = () => {},
        children,
    }) {
    return (
    <>
        <TextField 
            type={type}
            variant={variant}
            label={label}
            name={name}
            style={style}
            onChange={onChange}
            autoComplete={autoComplete}
            helperText={helperText ? helperText : ''}
            defaultValue={defaultValue}
            error={!!error}
        >
            {children}
        </TextField>
    </>
  )
}
