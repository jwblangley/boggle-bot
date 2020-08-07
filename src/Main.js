import React, {useState} from 'react'

import {
    Grid,
    Paper,
    Typography
} from '@material-ui/core/index'

import useMediaQuery from '@material-ui/core/useMediaQuery'

import useStyles from './style'

import InputGrid from './components/InputGrid/InputGrid'

const Main = () => {

    const classes = useStyles()
    const isPortraitDevice = useMediaQuery('(max-aspect-ratio: 11/10)')

    // State
    const [gridWidth, setGridWidth] = useState(4)
    const [gridHeight, setGridHeight] = useState(4)
    const [inputs, setInputs] = useState(Array(gridHeight).fill().map(() => Array(gridWidth).fill('')))

    function deepCopy(data) {
        let result = [...data]
        return result.map(inner => [...inner])
    }

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
                        <InputGrid values={inputs} onChange={(i, j, newValue) => {
                            let stateClone = deepCopy(inputs)
                            stateClone[i][j] = newValue.toUpperCase()
                            setInputs(stateClone)
                        }} />
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
