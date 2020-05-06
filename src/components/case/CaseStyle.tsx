// import required dependencies
import {createStyles} from '@material-ui/core';


// create styles and export
export const CaseStyle = () => createStyles({
    root: {
        "width": "73%",
        "margin": "-2rem 0px 0px 9rem",
        "text-align": "left"
    },
    heading: {
        "font-family": "monospace",
        "font-size": "x-large",
        "font-weight": "100"
    },
    mapDiv: {
        height: "200px",
        width: '73%',
        margin: '-2rem 0px 0px 9rem'
    },
    imageDiv: {
        width: "12%",
        float: 'left',
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
        'font-size': 'smaller',
        "font-family": "inherit"
    }
});