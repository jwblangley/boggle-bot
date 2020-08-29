import React from 'react'

import {
    Paper, Typography
} from '@material-ui/core/index'

import VisibilityIcon from '@material-ui/icons/Visibility';

import useStyles from './style'

const ResultBar = ({ word, isHighlighting, onHighlight }) => {
    const classes = useStyles()

    return (
        <Paper className={classes.paper}>
            <Typography className={classes.text}>{word}</Typography>
            <VisibilityIcon
                className={classes.showIcon}
                color={isHighlighting ? 'primary' : 'disabled'}
                onClick={onHighlight}
            />
        </Paper>
    )
}

export default ResultBar
