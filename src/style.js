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
        paddingLeft: theme.spacing(2.5),
        paddingRight: theme.spacing(2.5),
        paddingTop: theme.spacing(1),
        margin: 0,
        textAlign: 'center',
        width: '100%',
    },
    paper: {
        padding: theme.spacing(2)
    },
    inputGridPaper: {
        position: 'sticky',
        top: theme.spacing(12.5)
    },
    controlPanel: {
        marginTop: theme.spacing(2)
    },
    resultsBox: {
        marginTop: theme.spacing(2)
    }
}))

export default useStyles
