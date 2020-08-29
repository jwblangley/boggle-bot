import React from 'react'
import _ from 'lodash'

import {
    Grid,
    TextField
} from '@material-ui/core/index'

import useStyles from './style'

const InputGrid = ({values, onChange, highlights, checkValidInput}) => {
    const classes = useStyles()

    const width = values[0].length

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
                                <div
                                    className={`${classes.inputBorder} ${highlights.some(h => _.isEqual(h, [i, j])) ? classes.highlight : ''}`}
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
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                ))
            }
        </Grid>

    )
}

export default InputGrid
