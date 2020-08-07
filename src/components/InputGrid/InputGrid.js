import React, { useState } from 'react'

import {
    Grid,
    TextField
} from '@material-ui/core/index'

import useStyles from './style'

const InputGrid = ({width, height}) => {

    const classes = useStyles()

    // State
    const [inputs, setInputs] = useState(Array(height).fill().map(() => Array(width).fill('')))

    function deepCopy(data) {
        let result = [...data]
        return result.map(inner => [...inner])
    }

    return (
        <Grid
            container
            spacing={2}
            className={classes.container}
        >
            {
                inputs.map((row, i) => (
                    <Grid
                        container
                        className={classes.row}
                        key={`row${i}`}
                    >
                        {row.map((input, j) => (
                            <Grid
                                item
                                key={`item${i}${j}`}
                                className={classes.boardItem}
                            >
                                <TextField
                                    variant="outlined"
                                    inputProps={{ style: {
                                        'width': `${45 / width}vmin`,
                                        'height': `${45 / width}vmin`,
                                        'fontSize': '3.5em',
                                        'textAlign': 'center',
                                        'boxSizing': 'border-box'
                                    }}}

                                    value={input}
                                    onChange={e => {
                                        let stateClone = deepCopy(inputs)
                                        stateClone[i][j] = e.target.value
                                        setInputs(stateClone)
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ))
            }
        </Grid>

    )
}

export default InputGrid
