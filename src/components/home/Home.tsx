// import dependencies
import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import MomentUtils from "@date-io/moment";
import Grid from "@material-ui/core/Grid";
import {MuiPickersUtilsProvider, DatePicker, KeyboardDatePicker} from "@material-ui/pickers";

// import local dependencies
import './Home.css';
import Header from "../shared/Header";
import ListCases from "../list-cases/ListCases";
import {Classes} from "jss";

interface IProps {
    classes: Classes
}

interface IState {
    search: string,
    selectedDate: string
}

class Home extends Component<IProps, IState> {
    public readonly state: IState = {
        search: "",
        selectedDate: ""
    };

    private handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            search: event.currentTarget.value
        });
    };

    private handleDateChange = (value: any) => {
        this.setState({
            selectedDate: value
        });
    };

    render() {
        return (
            <div className="App">
                <Header/>
                <div className="Filter-container">
                    <div className="Input-div"><input onChange={this.handleClick} className="Input-text" type="text"
                                                      placeholder="Search case descriptions"></input></div>
                    <div className="Date-div"><TextField
                        id="date"
                        label="from"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    /></div>
                    <div className="Date-div"><MuiPickersUtilsProvider utils={MomentUtils}>
                        <Grid container className={classes.grid} justify="space-around">
                            <DatePicker
                                keyboard
                                placeholder="to"
                                format={"MM/DD/YYYY"}
                                // handle clearing outside => pass plain array if you are not controlling value outside
                                // mask={(value: array) =>
                                //     value
                                //         ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]
                                //         : []
                                // }
                                value={this.state.selectedDate}
                                onChange={this.handleDateChange}
                                // disableOpenOnEnter
                                animateYearScrolling={false}
                                autoOk={true}
                                clearable
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    </div>
                    <span className="Span-button"><button className="Button">Find cases</button></span>
                </div>
                <ListCases/>
            </div>
        );
    }
}

export default Home;