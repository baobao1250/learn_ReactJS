import { useEffect, useState } from 'react';
import './App.css';
import Pagination from './components/pagination';
import PostList from './components/PostList';
import TodoForm from './components/TodoFrom';
import TodoList from './components/TodoList/Todolist';
import queryString from 'query-string';
import PostFiltersFrom from './components/PostFiltersForm';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'hello world' },
    { id: 2, title: 'hello 2 world ' },
    { id: 3, title: 'hello 3 world ' },
    { id: 4, title: 'hello 4 world ' },
    { id: 5, title: 'hello 5 world ' },
  ]);

  function handleTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    console.log('form Submit:', formValues);

    const newtodo = {
      id: todoList.length + 1,
      ...formValues,
    };
    const newTodoList = [...todoList]
    newTodoList.push(newtodo);
    setTodoList(newTodoList);


  }

  const [postlist, setPostlist] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 11,
  });
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 10,
  })

  function handlePageChange(newPage) {
    console.log('New Page:', newPage);
    setFilters({
      ...filters,
      _page: newPage,
    })
  }

  function handleFiltersChange(newFilters) {
    console.log("new filters: ", newFilters)
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    });
  }

  useEffect(() => {
    async function fetchPostLish() {
      try {
        const paramsString = queryString.stringify(filters)
        const requestURL = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestURL);
        const responseJSON = await response.json();
        console.log({ responseJSON });

        const { data, pagination } = responseJSON;
        setPostlist(data);
        setPagination(pagination)
      } catch (error) {
        console.log('that bai', error.message)
      }
    }
    fetchPostLish();
  }, [filters])

  return (
    <div className="App">
      <h2>hello</h2>
      <PostFiltersFrom onSubmit={handleFiltersChange} />
      <PostList posts={postlist} />
      <Pagination
        pagination={pagination}
        onPagechange={handlePageChange}
      />

      {/* <TodoForm onSubmit={handleTodoFormSubmit} /> */}
      {/* <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
    </div>
  );
}

export default App;
