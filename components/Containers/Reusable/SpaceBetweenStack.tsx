import { Stack, SxProps, Typography } from "@mui/material";


const SpaceBetweenTypography: React.FC<{leftSide?: string, rightSide?: string, sx?: SxProps }> = ({leftSide, rightSide, sx}) => {
    return (
        <Stack sx={sx} justifyContent='space-between' spacing={3} direction='row'>
            <Typography component='div' fontWeight='bold'>{leftSide}</Typography>
            <Typography component='div'>{rightSide}</Typography>
        </Stack>
    )
}

export default SpaceBetweenTypography;