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
        margin: theme.spacing(1),
    }
}))

export default useStyles
