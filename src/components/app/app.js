import React, {Component} from 'react';

import AppHeader from '../app-header/';
import SearchPanel from '../search-panel/';
import TodoList from '../todo-list/';
import ItemStatusFilter from '../item-status-filter/';
import AddItemPanel from "../add-item-panel";

import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createToDoItem("Drink Coffee"),
            this.createToDoItem("Make Awesome App"),
            this.createToDoItem("Have a lunch"),
        ],
        filter: 'All',
        search: ''
    };

    createToDoItem(text) {
        return {
            label: text,
            important: false,
            done: false,
            id: this.maxId++
        }
    };

    onDelete = (id) => {
        this.setState(
            ({todoData}) => {
                const data = [...todoData];
                const index = todoData.findIndex(el => el.id === id);
                data.splice(index, 1);

                return {
                    todoData: data
                }
            }
        )
    };

    onAdd = (text) => {
        let todo = this.createToDoItem(text);
        this.maxId += 1;

        this.setState(({todoData}) => {
            const data = [...todoData, todo];
            return {
                todoData: data
            }
        });
    };

    toggleProperty(arr, id, propName) {
        //Find Item with ID
        const index = arr.findIndex(el => el.id === id);
        const oldItem = arr[index];
        const updatedNewItem = {...oldItem, [propName]: !oldItem[propName]};

        //Create new array with changed Item
        const updatedNewTodoData = [...arr.slice(0, index), updatedNewItem, ...arr.slice(index + 1)];

        return updatedNewTodoData;
    };

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    };

    search = (data, search) => {
        if (search === '')
            return data;

        return data.filter((item) => {
            return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1
        })
    };

    filter = (data) => {
      switch (this.state.filter) {
          case 'All' : return data;
          case 'Active' : return data.filter((item) => !item.done);
          case 'Done' : return data.filter((item) => item.done);
          default: return data;
      }
    };

    onSearchChange = (search) => {
        this.setState({search})
    };

    onChangeFilter = (filter) => {
        this.setState({filter});
    };

    render() {
        const {todoData, filter, search} = this.state;
        const items = this.filter(this.search(todoData, search));
        const doneCount = todoData.filter((item) => item.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter onChangeFilter={this.onChangeFilter} filter={filter}/>
                </div>
                <TodoList todos={items}
                          onDelete={this.onDelete}
                          onToggleDone={this.onToggleDone}
                          onToggleImportant={this.onToggleImportant}
                />

                <AddItemPanel onAdd={this.onAdd}/>
            </div>
        );
    }
};


