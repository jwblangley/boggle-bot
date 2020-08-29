import { makeStyles } from '@material-ui/core/index'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),
        margin: theme.spacing(0.5)
    },
    text: {
        display: 'inline-block',
        verticalAlign: 'middle'
    },
    showIcon: {
        display: 'inline-block',
        verticalAlign: 'middle',
        float: 'right'
    }
}))

export default useStyles
