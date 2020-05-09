// import dependencies
import React, {Component} from 'react';
import MomentUtils from "@date-io/moment";
import moment from "moment";
import {observer, inject} from 'mobx-react';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";

// import local dependencies
import './Home.css';
import Header from "../shared/Header";
import ListCases from "../list-cases/ListCases";
import CasesStore from "../../stores/casesStore";


interface IProps {
    store: CasesStore
}

interface IState {
    error?: any,
    search: string,
    isLoaded: boolean,
    selectedDateTo: string,
    selectedDateFrom: string
}

@inject('store')
@observer
class Home extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        // this.fetchData = this.fetchData.bind(this);
    };

    public readonly state: IState = {
        error: null,
        isLoaded: false,
        search: "",
        selectedDateTo: moment().format("MM/DD/YYYY"),
        selectedDateFrom: moment().format("MM/DD/YYYY"),
    };

    async componentDidMount() {
        try {
            let result: any = await this.fetchData();
            this.props.store.updateCases(result.incidents);
            this.setState({
                isLoaded: true
            });
        } catch (error) {
            this.setState({
                isLoaded: true,
                error
            });
        }
    }

    private handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            search: event.currentTarget.value
        });
    };

    private getData = async () => {

        this.setState({
            isLoaded: false,
        });

        let {search, selectedDateFrom, selectedDateTo} = this.state,
            query = ``;

        if (search) query += `&query=${search}`;
        if (selectedDateTo) query += `&occurred_before=${moment(selectedDateTo).startOf('day').valueOf()}`;
        if (selectedDateFrom) query += `&occurred_after=${moment(selectedDateFrom).startOf('day').valueOf()}`;

        this.props.store.updateQuery(query);

        try {
            let result: any = await this.fetchData();
            this.props.store.updateCases(result.incidents);
            this.setState({
                isLoaded: true
            });
        } catch (error) {
            this.setState({
                isLoaded: true,
                error
            });
        }
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

    fetchData = async () => {
        try {
            let url = `https://bikewise.org/api/v2/incidents?page=0`;

            if (this.props.store.search) url += this.props.store.search;

            let res = await fetch(url);

            return res.json();
        } catch (e) {
            throw e;
        }
    };

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
                                inputVariant="outlined"
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
                                inputVariant="outlined"
                                value={this.state.selectedDateTo}
                                onChange={this.handleDateTo}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </div>
                    </MuiPickersUtilsProvider>
                    </div>
                    <span className="Span-button"><button className="Button" onClick={this.getData}>Find cases</button></span>
                </div>
                {this.state.error && <div className="default">Ooops, something went wrong</div>}
                {this.state.isLoaded ? <ListCases store={this.props.store}/> :
                    <div className="default">Loading...</div>}
            </div>
        );
    }
}

export default Home;