import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as FontAwesome from 'react-icons/lib/fa';
import {Table} from 'reactstrap';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            ascOrDesc: 0,
            sortedBy: ''
        };

        this.handleSort = this.handleSort.bind(this);
        this.handleThClick = this.handleThClick.bind(this);

    }

    handleSort(sortKey, ascOrDesc) {
        let tableData = this.state.data;
        if (typeof tableData[0][sortKey] === 'string') {
            return tableData.sort((a, b) => {
                if (a[sortKey].toUpperCase() < b[sortKey].toUpperCase()) {
                    return ascOrDesc ? 1 : -1;
                } else if (a[sortKey].toUpperCase() > b[sortKey].toUpperCase()) {
                    return ascOrDesc ? -1 : 1;
                }
                return 0
            });
        } else {
            return tableData.sort((a, b) => {
                return ascOrDesc ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]
            });
        }
    }

    handleThClick(event) {

        let sortKey = event.target.dataset.sort;

        this.setState(oldState => ({
            ascOrDesc: !oldState.ascOrDesc,
            sortedBy: sortKey
        }));

        let tableData = this.handleSort(sortKey, this.state.ascOrDesc);

        this.setState({
            data: tableData
        });

    }

    generateTbody() {
        return this.state.data.map((data, key) => (
            <tr key={key}>
                <td>{data.first_name}</td>
                <td>{data.last_name}</td>
                <td>{data.age}</td>
            </tr>
        ));
    }

    generateIcon(field) {
        if (this.state.sortedBy === field) {
            return this.state.ascOrDesc ? <FontAwesome.FaArrowDown/> : <FontAwesome.FaArrowUp/>
        }
    }

    render() {
        return (
            <Table>
                <thead>
                <tr>
                    <th data-sort="first_name" onClick={this.handleThClick}>
                        First Name
                        {this.generateIcon('first_name')}
                    </th>
                    <th data-sort="last_name" onClick={this.handleThClick}>
                        Last Name
                        {this.generateIcon('last_name')}
                    </th>
                    <th data-sort="age" onClick={this.handleThClick}>
                        Age
                        {this.generateIcon('age')}
                    </th>
                </tr>
                </thead>
                <tbody>
                {this.generateTbody()}
                </tbody>
            </Table>
        );
    }
}