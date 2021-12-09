import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TodoList from '../../components/TodoList';
import TodoForm from '../../components/TodoForm';
import { useLocation, useRouteMatch, useHistory } from 'react-router-dom';
import queryString from 'query-string';

ListPage.propTypes = {};

function ListPage(props) {
  const intialtodoList = [
    {
      id: 1,
      title: 'Eat',
      status: 'new',
    },
    {
      id: 2,
      title: 'Sleep',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Code',
      status: 'new',
    },
  ];

  const [todoList, setTodoList] = useState(intialtodoList);

  const location = useLocation();

  const history = useHistory();

  const match = useRouteMatch();

  const [filter, setFilter] = useState(() => {
    const params = queryString.parse(location.search);

    return params.status || 'all';
  });

  useEffect(() => {
    const params = queryString.parse(location.search);
    setFilter(params.status || 'all');
  }, [location.search]);

  function handleTodoClick(todo, index) {
    const newTodoList = [...todoList];

    newTodoList[index] = {
      ...newTodoList[index],
      status: todo.status === 'new' ? 'completed' : 'new',
    };

    setTodoList(newTodoList);
  }

  function handleShowAllClick() {
    //setFilter('all');
    const queryParams = { status: 'all' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  }

  function handleShowNewClick() {
    //setFilter('new');
    const queryParams = { status: 'new' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  }

  function handleShowCompletedClick() {
    //setFilter('completed');
    const queryParams = { status: 'completed' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  }

  const rerenderTodoList = todoList.filter((todo) => filter === 'all' || filter === todo.status);

  const handleTodoFormSubmit = (values) => {
    console.log('Form submit: ', values); 
    const newtoDo = {
      id: todoList.length + 1,
      title: values.title,
      status: 'new'
    }

    setTodoList([...todoList, newtoDo]);

  }

  return (
    <div>
      <h3>What to do</h3>
      <TodoForm onSubmit={handleTodoFormSubmit}/>
      <h3>TodoList</h3>
      <TodoList todoList={rerenderTodoList} onTodoClick={handleTodoClick} />

      <div>
        <button onClick={handleShowAllClick}>Show All</button>
        <button onClick={handleShowNewClick}>Show New</button>
        <button onClick={handleShowCompletedClick}>Show Completed</button>
      </div>
    </div>
  );
}

export default ListPage;
