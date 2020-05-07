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
    cases: any,
    total: number
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
        cases: this.props.cases,
        total: this.props.total,
        count: 10,
        isLoaded: false,
    };

    componentDidMount() {
        this.setState({
            isLoaded: true
        });
    }

    private showData = (pageNo:number) => {
        this.fetchData(pageNo, this.state.count)
            .then(result => {
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
    };

    private fetchData = (page: number,count: number) => {
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
    };


    render() {
        const { error, isLoaded, cases, total } = this.state;
        if (error) {
            return <div  className = {this.props.classes.default}>Ooops, something went wrong</div>;
        } else if (!isLoaded) {
            return <div  className = {this.props.classes.default}>Loading...</div>;
        } else if(!total){
            return <div  className = {this.props.classes.default}>No results</div>;
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