// import required dependencies
import {Classes} from "jss";
import moment from "moment";
import {Link} from 'react-router-dom';
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';

// required local dependencies
import {ListCasesStyle} from './ListCasesStyle';
import Pagination from '../shared/Pagination';

interface IProps {
    classes: Classes;
}

interface IState {
    error?: any,
    cases: any,
    total: number,
    count: number,
    isLoaded: boolean,
}

class ListCases extends Component<IProps, IState> {
    public state: IState = {
        error: null,
        cases: [],
        total: 0,
        count: 10,
        isLoaded: false,
    };

    componentDidMount() {
        this.fetchData(0, 0)
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

    showData = (pageNo:number) => {
        console.log("showData---");
        this.fetchData(pageNo, this.state.count)
            .then(result => {
                console.log(result, 'cases-----');
                this.setState({
                    cases: result,
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

    fetchData = (page: number,count: number) => {
        return new Promise((resolve, reject) => {
            console.log(count, 'COUNT');
            fetch(`https://bikewise.org/api/v2/incidents?page=${page}&per_page=${count}`)
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
        const { error, isLoaded, cases, total } = this.state;
        if (error) {
            return <div  className = {this.props.classes.default}>Ooops, something went wrong</div>;
        } else if (!isLoaded) {
            return <div  className = {this.props.classes.default}>Loading...</div>;
        } else {
            return (
                <div>
                    <div className = {this.props.classes.countDiv}>total: <span>{total}</span></div>
                    {cases.map((obj:any) => {
                        // @ts-ignore
                        return (<div key={obj.id} className = {this.props.classes.root}>
                            <div className = {this.props.classes.imageDiv}>
                                <img className = {this.props.classes.image} src={obj.media.image_url_thumb} alt = ""/>
                            </div>
                            <div className = {this.props.classes.para}>
                                <Link to={{pathname: "/case/"+obj.id, state: obj}}>{obj.title}</Link>
                                <span className = {this.props.classes.span}>{obj.description}</span>
                                <span className = {this.props.classes.span}>{moment(obj.occurred_at).format('ll')} - {obj.address}</span>
                            </div>
                        </div>
                        )
                    })}
                    <Pagination cases = {total} showData = {this.showData}/>
                </div>
            );
        }
    }
}

export default withStyles(ListCasesStyle)(ListCases);