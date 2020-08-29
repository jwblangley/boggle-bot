import { makeStyles } from '@material-ui/core/index'

const useStyles = makeStyles(theme => ({
    row: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 'auto',
        flexBasis: '100%',
        justifyContent: 'center'
    },
    boardItem: {
        padding: 0,
        margin: theme.spacing(0.75),
    },
    inputBorder: {
        border: `4px solid`,
        borderColor: theme.palette.background.paper,
        borderRadius: '8px'
    },
    highlight: {
        borderColor: theme.palette.secondary.main
    }
}))

export default useStyles
