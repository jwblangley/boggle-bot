import React from 'react'

import {
    Grid,
    TextField
} from '@material-ui/core/index'

import useStyles from './style'

const InputGrid = ({values, onChange}) => {
    const classes = useStyles()

    const width = values[0].length

    function checkValidInput(str) {
        return str.match(/^([A-Z]|QU)$/g)
    }

    return (
        <Grid
            container
            spacing={2}
            className={classes.container}
        >
            {
                values.map((row, i) => (
                    <Grid
                        container
                        className={classes.row}
                        key={`row${i}`}
                    >
                        {row.map((value, j) => (
                            <Grid
                                item
                                key={`item${i}${j}`}
                                className={classes.boardItem}
                            >
                                <TextField
                                    variant="outlined"
                                    error={!checkValidInput(values[i][j])}
                                    inputProps={{ style: {
                                        'width': `${45 / width}vmin`,
                                        'height': `${45 / width}vmin`,
                                        'fontSize': '3em',
                                        'textAlign': 'center',
                                        'boxSizing': 'border-box'
                                    }}}

                                    value={value}
                                    onChange={e => {
                                        onChange(i, j, e.target.value)
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
