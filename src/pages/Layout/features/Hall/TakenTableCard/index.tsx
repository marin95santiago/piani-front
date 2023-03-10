import * as React from 'react';
import { Box, Paper, Avatar, Divider, Grid, Typography } from '@mui/material'
import { gridHall } from '../utils';
import { Utils } from '../../../../../utils/style';

type props = {
    grid: gridHall
}

export default function TakenTableCard(props: props) {


    return (
        <Paper sx={{position: 'fixed', zIndex: 10, padding: 2, backgroundColor: props.grid.taken ? Utils.palette.taken.main : Utils.palette.available.main}}>
            <Box>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Avatar sx={{ bgcolor: props.grid.taken ? Utils.palette.taken.dark : Utils.palette.available.dark }} aria-label="recipe">{props.grid.key}</Avatar>
                </Box>
            </Box>
        </Paper>
    );
}
