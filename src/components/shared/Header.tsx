// import required dependencies
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import {Classes} from "jss";


// required local dependencies
import {HeaderStyle} from './HeaderStyle';

interface Props {
    classes: Classes;
}

interface State {
}

class Header extends Component<Props> {
    render() {
        const {classes} = this.props;

        return <div className={classes.header}>
            <img className={classes.image} src={require('../../assets/berlin-police.jpg')} alt=''/>
            <p className={classes.para}> Police Department of Berlin <span className={classes.span}> Stolen bikes </span></p>
        </div>
    }
}

export default withStyles(HeaderStyle)(Header);