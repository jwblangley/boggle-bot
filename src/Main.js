import React from 'react'

import {
    Grid,
    Paper,
    Typography
} from '@material-ui/core/index'

import useStyles from './style'

const Main = () => {

    const classes = useStyles()


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
                <Grid item xs={8}>
                    <Paper className={classes.gridPaper}>
                        Hello
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.gridPaper}>
                        Also hello
                    </Paper>
                </Grid>

            </Grid>

        </div>
    )
}

export default Main
