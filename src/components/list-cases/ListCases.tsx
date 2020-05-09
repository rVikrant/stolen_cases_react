// import required dependencies
import {Classes} from "jss";
import moment from "moment";
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';

// required local dependencies
import {ListCasesStyle} from './ListCasesStyle';
import Pagination from '../shared/Pagination';
import CasesStore from "../../stores/casesStore";

interface IProps {
    classes: Classes,
    store: CasesStore,
}

interface IState {
    error?: any,
    isLoaded: boolean,
}

@inject('store')
@observer
class ListCases extends Component<IProps, IState> {
    public state: IState = {
        error: null,
        isLoaded: false,
    };

    private case: any = this.props.store.totalCasesCount ? this.props.store.cases.slice(this.props.store.initial, this.props.store.last) : [];

    componentDidMount() {
        this.props.store.updatePageCases(this.case);
        this.setState({
            isLoaded: true,

        });
    }

    private showData = (pageNo:number) => {
        this.fetchData(pageNo, this.props.store.last)
            .then((result:any) => {
                this.props.store.updatePageCases(result);
                this.setState({
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
        const { error, isLoaded } = this.state;
        if (error) {
            return <div  className = {this.props.classes.default}>Ooops, something went wrong</div>;
        } else if (!isLoaded) {
            return <div  className = {this.props.classes.default}>Loading...</div>;
        } else if(!this.props.store.totalCasesCount){
            return <div  className = {this.props.classes.default}>No results</div>;
        } else {
            return (
                <div>
                    <div className = {this.props.classes.countDiv}>total: <span>{this.props.store.totalCasesCount}</span></div>
                    {this.props.store.currentPageCases.map((obj:any) => {
                        // @ts-ignore
                        return (<div key={obj.id} className = {this.props.classes.root}>
                            <div className = {this.props.classes.imageDiv}>
                                <img className = {this.props.classes.image} src={obj.media.image_url_thumb} alt = ""/>
                            </div>
                            <div className = {this.props.classes.para}>
                                <Link to={{pathname: `/case/${obj.id}`}} onClick={() => this.props.store.updateCaseToshow(obj)}>{obj.title}</Link>
                                <span className = {this.props.classes.span}>{obj.description}</span>
                                <span className = {this.props.classes.span}>{moment(obj.occurred_at).format('ll')} - {obj.address}</span>
                            </div>
                        </div>
                        )
                    })}
                    <Pagination cases= {this.props.store.totalCasesCount} showData = {this.showData}/>
                </div>
            );
        }
    }
}

export default withStyles(ListCasesStyle)(ListCases);