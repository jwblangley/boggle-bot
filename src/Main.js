import React, {useState} from 'react'

import {
    Grid,
    Paper,
    Typography,
    Button
} from '@material-ui/core/index'

import useMediaQuery from '@material-ui/core/useMediaQuery'

import Node from './util/Node'
import dict from './words.json'
import worker from 'workerize-loader?inline!./util/allPathsWorker' // eslint-disable-line import/no-webpack-loader-syntax

import useStyles from './style'

import InputGrid from './components/InputGrid/InputGrid'

const Main = () => {

    const classes = useStyles()
    const isPortraitDevice = useMediaQuery('(max-aspect-ratio: 11/10)')

    // State
    const [gridWidth, setGridWidth] = useState(4)
    const [gridHeight, setGridHeight] = useState(4)
    const [inputs, setInputs] = useState(Array(gridHeight).fill().map(() => Array(gridWidth).fill('')))
    const [dictionary, setDictionary] = useState(dict)
    const [minWordLength, setMinWordLength] = useState(3)

    const workerInstances = Array(gridWidth * gridHeight).fill().map(() => new worker())

    for (const worker of workerInstances) {
        worker.addEventListener('message', ({ data }) => {
            if (data.type === "RPC") {
                // Autogenerated control events
                return
            }

            console.log('New Message: ', data)
        })
    }

    function deepCopy(data) {
        let result = [...data]
        return result.map(inner => [...inner])
    }

    function checkValidInput(str) {
        return str.match(/^([A-Z]|QU)$/g)
    }

    function findWords(inputGrid) {
        const graph = Node.graphFromGrid(inputGrid)

        for (let i = 0; i < graph.length; i++) {
            workerInstances[i].workerPathsFrom(graph[i],
                {minWordLength, dictionary}
            )
        }
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
                        <InputGrid values={inputs} checkValidInput={checkValidInput} onChange={(i, j, newValue) => {
                            let stateClone = deepCopy(inputs)
                            stateClone[i][j] = newValue.toUpperCase()
                            setInputs(stateClone)
                        }} />
                    </Paper>
                </Grid>
                <Grid item xs={isPortraitDevice ? 12 : 4}>
                    <Paper className={classes.gridPaper}>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                if (!inputs.every(row => row.every(item => checkValidInput(item)))) {
                                    alert("Please fill in grid correctly")
                                    return
                                }
                                console.log('Start')
                                findWords(inputs)
                            }}>
                            Find Words
                        </Button>
                    </Paper>
                </Grid>

            </Grid>

        </div>
    )
}

export default Main
