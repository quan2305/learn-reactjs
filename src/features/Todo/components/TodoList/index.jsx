import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import classnames from 'classnames';

TodoList.propTypes = {
    todoList: PropTypes.array,
    onTodoClick: PropTypes.func
};

TodoList.defaultProps = {
    todoList: []
}

function TodoList({todoList, onTodoClick}) {
    function handleClick(todo, index) {
        if(!onTodoClick)return;

        onTodoClick(todo, index);
    }


    return (
        <ul className="todo-list">
            {todoList.map((todo, index) =>(
                <li className={classnames({
                        'todo-item': true,
                        completed: todo.status === 'completed',
                    })} 
                    key={index}
                    onClick={() =>(handleClick(todo, index))}

                >
                    {todo.title}
                </li>
            ))}
        </ul>
    );
}

export default TodoList;