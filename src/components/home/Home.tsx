// import dependencies
import React, {Component} from 'react';
import MomentUtils from "@date-io/moment";
import moment from "moment";
import {observer} from 'mobx-react';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";

// import local dependencies
import './Home.css';
import Header from "../shared/Header";
import ListCases from "../list-cases/ListCases";
import {Classes} from "jss";


interface IProps {
    classes: Classes
}

interface IState {
    error?: any,
    cases: any,
    total: number,
    search: string,
    isLoaded: boolean,
    selectedDateTo: string,
    selectedDateFrom: string
}

@observer
class Home extends Component<IProps, IState> {
    public readonly state: IState = {
        error: null,
        cases: [],
        total: 0,
        isLoaded: false,
        search: "",
        selectedDateTo: moment().format("MM/DD/YYYY"),
        selectedDateFrom: moment().format("MM/DD/YYYY"),
    };

    componentDidMount() {
        this.fetchData(0, 0, "")
            .then((result: any) => {
                this.setState({
                    cases: result.slice(0, 10),
                    total: result.length,
                    isLoaded: true
                });
            })
            .catch(error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            })
    }

    private handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            search: event.currentTarget.value
        });
    };

    private getData = () => {

        this.setState({
           isLoaded: false,
            total: 0,
            cases: []
        });

        let {search, selectedDateFrom, selectedDateTo} = this.state,
            query = ``;

        if(search) query += `&query=${search}`;
        if(selectedDateTo) query += `&occurred_before=${moment(selectedDateTo).startOf('day').valueOf()}`;
        if(selectedDateFrom) query += `&occurred_after=${moment(selectedDateFrom).startOf('day').valueOf()}`;

        this.fetchData(0,0,query)
            .then((result: any) => {
                this.setState({
                    cases: result,
                    total: result.length,
                    isLoaded: true
                });
            })
            .catch(error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            })
    };

    private handleDateTo = (value: any) => {
        this.setState({
            selectedDateTo: value
        });
    };

    private handleDateFrom = (value: any) => {
        this.setState({
            selectedDateFrom: value
        });
    };

    private fetchData = (page: number,count: number, query: string) => {
        return new Promise((resolve, reject) => {
            let url = `https://bikewise.org/api/v2/incidents?page=${page}&per_page=${count}`;

            if(query) url+=query;

            fetch(url)
                .then(res => res.json())
                .then(
                    (result) => {
                        resolve(result.incidents);
                    },
                    (error) => {
                        reject(error);
                    }
                )
        })
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <div className="Filter-container">
                    <div className="Input-div"><input onChange={this.handleClick} className="Input-text" type="text"
                                                      placeholder="Search case descriptions"></input></div>
                    <div className="Date-div"><MuiPickersUtilsProvider utils={MomentUtils}>
                        <div className="Date-div">
                            <KeyboardDatePicker
                                id="from"
                                label="from"
                                format="MM/DD/YYYY"
                                inputVariant= "outlined"
                                value={this.state.selectedDateFrom}
                                onChange={this.handleDateFrom}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </div>
                        <div className="Date-div">
                            <KeyboardDatePicker
                                id="to"
                                label="to"
                                format="MM/DD/YYYY"
                                inputVariant= "outlined"
                                value={this.state.selectedDateTo}
                                onChange={this.handleDateTo}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </div>
                    </MuiPickersUtilsProvider>
                    </div>
                    <span className="Span-button"><button className="Button" onClick = {this.getData}>Find cases</button></span>
                </div>
                {this.state.error && <div  className = "default">Ooops, something went wrong</div>}
                {this.state.isLoaded ? <ListCases cases = {this.state.cases} total = {this.state.total}/> : <div  className = "default">Loading...</div>}
            </div>
        );
    }
}

export default Home;