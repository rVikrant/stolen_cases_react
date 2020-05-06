// import required dependencies
import {createStyles} from '@material-ui/core';


// create styles and export
export const ListCasesStyle = () => createStyles({
    root: {
        margin: '1rem 2rem 2rem 9rem',
        clear: 'both',
        width: '72%',
        height: '100px',
        'text-align': 'left',
        'padding': '10px 0px 10px 10px',
        'border': '2px solid black'
    },
    default: {margin: '1rem 2rem 2rem 8rem', "text-align": 'left', 'padding': '10px 0px 10px 10px'},
    countDiv: {
        'text-align': 'right',
        width: '73%',
        margin: '2rem 0px 0px 9rem'
    },
    imageDiv: {
        width: "12%",
        float: 'left',
    },
    image: {
        height: "100px",
        width: "100px"
    },
    para: {
        'text-align': 'left',
        'font-size': '22px',
        float: 'left',
        width: '88%',
        'overflow-y': 'overlay',
        'max-height': '-webkit-fill-available'
    },
    span: {
        display: 'block',
        'text-align': 'left',
        'font-size': '14px',
    }
});