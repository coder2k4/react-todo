import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

    state = {
        srhStrng: ''
    };

    search = (e) => {
        const srhStrng = e.target.value;
        this.setState({srhStrng});
        this.props.onSearchChange(srhStrng);
    };

    render() {
        return (
            <input type="text"
                   className="form-control search-input"
                   placeholder="type to search"
                   value={this.state.srhStrng}
                   onChange={this.search}
            />
        );
    }
}
