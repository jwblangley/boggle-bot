import { makeStyles } from '@material-ui/core/index'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1)
    },
    text: {
        display: 'inline-block',
        verticalAlign: 'middle'
    },
    showIcon: {
        display: 'inline-block',
        verticalAlign: 'middle',
        float: 'right',
        cursor: 'pointer'
    }
}))

export default useStyles
