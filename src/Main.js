import React, { useState } from 'react'
import _ from 'lodash'

import {
    Grid,
    Paper,
    Typography,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@material-ui/core/index'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import useMediaQuery from '@material-ui/core/useMediaQuery'

import Node from './util/Node'
import dict from './words.json'
import worker from 'workerize-loader?inline!./util/allPathsWorker' // eslint-disable-line import/no-webpack-loader-syntax

import useStyles from './style'

import InputGrid from './components/InputGrid/InputGrid'
import ResultBar from './components/ResultBar/ResultBar';

const Main = () => {

    const classes = useStyles()
    const isPortraitDevice = useMediaQuery('(max-aspect-ratio: 11/10)')

    // State
    const [gridWidth, setGridWidth] = useState(4)
    const [gridHeight, setGridHeight] = useState(4)
    const [inputs, setInputs] = useState(Array(gridHeight).fill().map(() => Array(gridWidth).fill('')))
    const [dictionary, setDictionary] = useState(dict)
    const [minWordLength, setMinWordLength] = useState(3)

    const [warningText, setWarningText] = useState('')
    const [processing, setProcessing] = useState(false)
    const [foundWords, setFoundWords] = useState([])
    const [highlightWord, setHighlightWord] = useState('')


    function handlePaths(paths) {
        const results = paths
            .map(path => ({
                'string': path.map(node => node.value || node._value).join(''),
                'path': path.map(node => node.id || node._id)
            })
            )

        const uniqResults = _.uniqBy(results, 'string')
        const groupedResults = _.groupBy(uniqResults, ({ string }) => string.length)

        for (const key of Object.keys(groupedResults)) {
            groupedResults[key] = _.orderBy(groupedResults[key], ['string'], ['asc'])
        }

        setFoundWords(groupedResults)
    }

    function deepCopy(data) {
        let result = [...data]
        return result.map(inner => [...inner])
    }

    function checkValidInput(str) {
        return str.match(/^([A-Z]|QU)$/g)
    }

    function findWords(inputGrid) {
        setProcessing(true)
        const graph = Node.graphFromGrid(inputGrid)

        const workerInstances = Array(gridWidth * gridHeight).fill().map(() => new worker())

        const promises = workerInstances.map((worker, i) => new Promise((resolve, reject) => {
            worker.addEventListener('message', ({ data }) => {
                if (data.type !== "RPC") {
                    // Non-autogenerated control events
                    resolve(data)
                }
            })

            worker.workerPathsFrom(graph[i],
                { minWordLength, dictionary }
            )
        }))

        Promise.all(promises)
            .then(results => results.reduce((acc, val) => acc.concat(val), []))
            .then(handlePaths)
            .then(() => setProcessing(false))

    }

    function runHighlightAnimation(path, onFinish) {
        console.log(path)
        setTimeout(onFinish, 1000)
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
                            setFoundWords({})
                        }} />
                        <div className={classes.controlPanel}>
                            <Button
                                variant='contained'
                                color='primary'
                                disabled={processing}
                                onClick={() => {
                                    if (!inputs.every(row => row.every(item => checkValidInput(item)))) {
                                        setWarningText('Please fill in grid correctly')
                                        return
                                    }
                                    findWords(inputs)
                                }}>
                                Find Words
                            </Button>
                            <Typography color='error'>
                                {warningText}
                            </Typography>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={isPortraitDevice ? 12 : 4}>
                    <Paper className={classes.gridPaper}>
                        {
                            <Typography variant='h4'>
                                {
                                    processing ? 'Processing...'
                                    : _.isEmpty(foundWords)
                                        ? 'Fill in grid to begin'
                                        : `${Object.entries(foundWords).reduce((acc, [wordLen, words]) => acc + words.length, 0)} Words Found`
                                }
                            </Typography>
                        }
                        {
                            Object.entries(foundWords).length > 0 &&
                            (<div className={classes.resultsBox}>
                                {
                                    Object.entries(foundWords).reverse().map(([wordLen, words]) => (
                                        <Accordion key={`${wordLen}-accordion`} >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls={`${wordLen}-letter-content`}
                                                id={`${wordLen}-letter-header`}
                                            >
                                                <Typography variant='h5'>{`${wordLen} letter words`}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails style={{ display: 'block' }}>
                                                {words.map(({ string, path }) =>
                                                    <ResultBar
                                                        key={string}
                                                        word={string}
                                                        isHighlighting={highlightWord === string}
                                                        onHighlight={() => {
                                                            setHighlightWord(string)
                                                            runHighlightAnimation(path,
                                                                () => setHighlightWord(''))
                                                        }}
                                                    />
                                                )}
                                            </AccordionDetails>
                                        </Accordion>
                                    ))
                                }
                            </div>)
                        }
                    </Paper>
                </Grid>

            </Grid>

        </div>
    )
}

export default Main
