import React from 'react'

import {
    Paper, Typography
} from '@material-ui/core/index'

import VisibilityIcon from '@material-ui/icons/Visibility'

import useStyles from './style'

const ResultBar = ({ word, isHighlighting, canHighlight, onHighlight }) => {
    const classes = useStyles()

    return (
        <Paper className={classes.paper}>
            <Typography className={classes.text}>{word}</Typography>
            <VisibilityIcon
                className={classes.showIcon}
                color={isHighlighting ? 'primary' : 'disabled'}
                style={canHighlight ? {'cursor': 'pointer'} : {}}
                onClick={() => {
                    if (canHighlight) {
                        onHighlight()
                    }
                }}
            />
        </Paper>
    )
}

export default ResultBar
