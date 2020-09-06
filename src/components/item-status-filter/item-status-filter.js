import React, {Component} from 'react';

import './item-status-filter.css';

//todo
// 1 - Сделать массив кнопок
// 2 - Сгенерировать html из кнопок
// 3 - Добавить класс для кнопок
// 4 - Добавить обработку нажатия


export default class ItemStatusFilter extends Component {

    buttons = [
        {name: 'All', filterName : 'All'},
        {name: 'Active', filterName : 'Active'},
        {name: 'Done', filterName : 'Done'},
    ];

    render() {

        const {onChangeFilter, filter} = this.props;

        const htmlButtons = this.buttons.map((item) => {
            const isActive = filter === item.filterName;
            // тут будет фильтр на класс
            const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
            return (
                <button type="button"
                        className={`btn ${clazz}`}
                        key={item.filterName}
                        onClick={ () => onChangeFilter(item.filterName)}
                >
                    {item.name}
                </button>
            );
        });


        return (
            <div className="btn-group">
                {htmlButtons}
            </div>
        );
    }
}
