import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
    palette: {
        primary: {
            light: '#7d87df',
            dark: '#0d317d',
            main: '#4b5aad',
            contrastText: '#ffffff'
        },
        secondary: {
            light: '#ffb66e',
            dark: '#dd6e00',
            main: '#ff9b38',
            contrastText: '#ffffff'
        },
        success: {
            light: '#00f563',
            dark: '#007E33',
            main: '#00C851',
            contrastText: '#ffffff'
        },
        error: {
            light: '#ff8888',
            dark: '#CC0000',
            main: '#ff4444',
            contrastText: '#ffffff'
        }
    }
})
