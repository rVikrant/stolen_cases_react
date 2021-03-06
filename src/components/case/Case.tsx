// import required dependencies
import {Classes} from "jss";
import moment from "moment";
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';

// required local dependencies
import Header from "../shared/Header";
import {CaseStyle} from './CaseStyle';

interface IProps {
    classes: Classes;
    location: {
        state: any
    }
}

interface IState {
    error?: any,
    cases: any,
    total: number,
    count: number,
    isLoaded: boolean,
}

class Case extends Component<IProps, IState> {

    render() {
        const {state} = this.props.location,
            {classes} = this.props;

        return (
            <div>
                <Header/>
                <div className = {classes.root}>
                    <h1 className = {classes.heading}>{state.title}</h1>
                    <span className = {classes.span}><b>Stolen</b> {moment(state.occurred_at).format('MMM Do, h a')}
                        <b> at </b> {state.address}</span>
                </div>
                <div className = {classes.mapDiv}></div>
                <div className = {classes.root}>
                    <h3 className = {classes.heading}>DESCRIPTION OF INCIDENT</h3>
                    <p>
                        {state.description}
                    </p>
                </div>
            </div>
        );
    }
}

export default withStyles(CaseStyle)(Case);