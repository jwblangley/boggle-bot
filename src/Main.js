import React from 'react'

import {
    Grid,
    Paper,
    Typography
} from '@material-ui/core/index'

import useMediaQuery from '@material-ui/core/useMediaQuery';

import useStyles from './style'

const Main = () => {

    const classes = useStyles()

    const isPortraitDevice = useMediaQuery('(max-aspect-ratio: 11/10)');

    return (
        <div>
            <div className={classes.topBar}>
                <Typography
                    variant="h2"
                    className={classes.title}
                >
                    Boggle-Bot
                </Typography>
            </div>
            <Grid
                className={classes.content}
                container
                spacing={2}
            >
                <Grid item xs={isPortraitDevice ? 12 : 8}>
                    <Paper className={classes.gridPaper}>
                        Hello
                    </Paper>
                </Grid>
                <Grid item xs={isPortraitDevice ? 12 : 4}>
                    <Paper className={classes.gridPaper}>
                        Also hello
                    </Paper>
                </Grid>

            </Grid>

        </div>
    )
}

export default Main
