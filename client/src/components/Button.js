import React from 'react';
import LameButton from '@mui/material/Button';

export default function Button({children, variant, color, ...props}){

    return(
        <LameButton variant={variant ?? "contained"} color={color ?? "primary"}{...props}>{children}</LameButton>
    )
}
