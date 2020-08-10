import { makeStyles } from '@material-ui/core/index'

const useStyles = makeStyles(theme => ({
    button: {
        marginRight: theme.spacing(2)
    },
    topBar: {
        width: '100%',
        position: 'sticky',
        top: 0,
        zIndex: 5,
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
        backgroundColor: theme.palette.primary.main
    },
    title: {
        textAlign: 'center',
        color: theme.palette.background.default
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(5),
        textAlign: 'center',
        width: '100%',
    },
    gridPaper: {
        padding: theme.spacing(2)
    },
    displayCanvas: {
        marginTop: theme.spacing(2),
        width: '90%',
        height: '70vh'
        // objectFit: 'contain'
    }
}))

export default useStyles
