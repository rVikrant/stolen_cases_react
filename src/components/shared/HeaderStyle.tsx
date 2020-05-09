// import required dependencies
import { createStyles } from '@material-ui/core';


// create styles and export
export const HeaderStyle = () => createStyles({
    header: {
        margin: '-2rem 1rem 1rem 9rem',
        'max-width': 'fit-content'
    },
    image: {
        height: '75px',
        width: '70px',
    },
    para: {
        display: 'inline-block',
        'text-align': 'left',
        'font-size': '65px',
        "font-weight": "300",
        padding: '0px 30px 0px 30px'
    },
    span: {
        display: 'block',
        'text-align': 'left',
        'font-size': '23px',
    }
});