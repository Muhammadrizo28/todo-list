import { useEffect, useState } from 'react';
import Header from './components/Header';
import MainPage from './components/MainPage';
import NavigationBlock from './components/NavigationBlock';
import './style/index.css';
import AddTodoBlock from './components/AddTodoBlock';

function App() {
  const [showFilters, setShowFilters] = useState(false);
  const [addTodo, setAddTodo] = useState(false);
  const [todoData, setTodoData] = useState({ title: '', description: '', date: '', id: '' });
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    console.log("AddTodo state changed:", addTodo);
  }, [addTodo]);

  const setTodoFunc = (bool) => {
   
    setAddTodo(bool);
  
  };
  const closeBlockFunc = (bool) => {

    console.log(bool);
    
    setAddTodo(bool);
    setTodoData({ title: '', description: '', date: '', id: '' });
    
  };

  const showFilterFunc = (newState) => {
    setShowFilters(newState);
  };

  const setTodoDataFunc = (value) => {
    setTodoData((prev) => ({ ...prev, ...value }));
  };

  const updateFunc = () => {
    setUpdate(prev => !prev); 
  }


  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-between">
      <Header showFilterFunc={showFilterFunc} />
      <MainPage showFilters={showFilters} setTodo={setTodoDataFunc} update={update}   updateFunc = {updateFunc}/>
      <NavigationBlock setAddtodo={setTodoFunc} />
      {addTodo && (
        <AddTodoBlock 
          openBlock={closeBlockFunc}  // Передаем функцию
          update = {updateFunc}
        />
      )}

      {todoData.title !== '' && (
        <AddTodoBlock 
          value={todoData}
          openBlock={closeBlockFunc}
          change={true}
          update = {updateFunc}
        />
      )}
    </div>
  );
}

export default App;
