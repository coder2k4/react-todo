import React, {Component} from 'react';
import './add-item-panel.css';

export default class AddItemPanel extends Component {

    state = {
        label: ''
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.label);
        this.setState({
            label: ''
        })
    };

    render() {
        return (
            <div>
                <form className="item-add-form d-flex mt-3"
                onSubmit={this.onSubmit}
                >
                    <input type="text"
                           className="form-control mr-1"
                           placeholder="add new todo"
                           onChange={this.onLabelChange}
                           value={this.state.label}
                                               />
                    <div className="btn-group">
                        <button type="submit"
                                className="btn btn-success"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        )
    }
};
