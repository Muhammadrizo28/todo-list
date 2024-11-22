import { useEffect, useState } from "react";
import { request } from "../api/request";
import CompleteCirle from "./CompleteCirlce";
import PropTypes from "prop-types";
import edit_img from '../images/edit.png'
import delete_img from '../images/delete.png'

function MainPage({ showFilters, setTodo, update, updateFunc }) {

    const [todos, setTodos] = useState([]);
    const [filters, setFilters] = useState({ 'all': true, 'completed': false, 'notCompleted': false });
    const [draggedIndex, setDraggedIndex] = useState(null);

    useEffect(() => {

        console.log(update);

        async function getData() {
            try {
                const res = await request('get');
                const sortedTodos = res.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateA - dateB; // Сортировка от ближайшей даты к дальней
                });
                setTodos(sortedTodos);
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, [update]);

    const clicksFunc = (click) => {
        setFilters(prevFilters => ({ ...prevFilters, ...click }));
    }

    const clickTodoFunc = (obj) => {
        setTodos(prev => prev.map((item) => item.id === Object.keys(obj)[0] ? { ...item, 'completed': obj[Object.keys(obj)[0]] } : item));
    };



    function deleteTodo(id) {
        try {
            const res = request('delete', `/${id.toString()}`);
            if (res) {
                updateFunc();
            } else {
                console.log('not deleted');
            }
        } catch (err) {
            console.log(err);
        }
    }



    const filteredTodos = todos.filter(item => {
        if (filters['completed'] && !filters['notCompleted'] && item.completed) {
            return true;
        }
        if (filters['notCompleted'] && !filters['completed'] && !item.completed) {
            return true;
        }
        if (filters['all']) {
            return true;
        }
        return false;
    });

    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        const updatedTodos = [...todos];
        const draggedItem = updatedTodos[draggedIndex];
        updatedTodos.splice(draggedIndex, 1);
        updatedTodos.splice(dropIndex, 0, draggedItem);
        setTodos(updatedTodos);
    }

    return (
        <div className='w-[90%] h-[80%] flex flex-col items-center'>
            <div className="w-[100%] h-[8%] lg:w-[60%]">
                {showFilters && (
                    <div className="w-full h-full flex items-center justify-between">
                        <div className="w-fit h-[70%] flex items-center gap-[6px]">
                            <div className="h-[60%] aspect-square"><CompleteCirle round="5px" clickedFunc={clicksFunc} name={'all'} firstState={true} /></div>
                            <span className="text-white text-[10px]">Все</span>
                        </div>

                        <div className="w-fit h-[70%] flex items-center gap-[6px]">
                            <div className="h-[60%] aspect-square"><CompleteCirle round="5px" clickedFunc={clicksFunc} name={'completed'} /></div>
                            <span className="text-white text-[10px]">Выполненные</span>
                        </div>

                        <div className="w-fit h-[70%] flex items-center gap-[6px]">
                            <div className="h-[60%] aspect-square"><CompleteCirle round="5px" clickedFunc={clicksFunc} name={'notCompleted'} /></div>
                            <span className="text-white text-[10px]">Невыполненные</span>
                        </div>
                    </div>
                )}
            </div>

            {filteredTodos.map((item, index) => (
                <div
                    key={item.id}
                    className={`w-[95%] h-[45px] flex items-center cursor-grab justify-around mt-[10px] rounded-[5px] lg:h-[60px] ${item.completed ? 'opacity-60' : ''}`}
                    style={{ backgroundColor: 'rgb(51, 51, 51)' }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    
                >
                    <div className="h-[50%] aspect-square">
                        <CompleteCirle round="50%" clickedFunc={clickTodoFunc} name={item.id.toString()} firstState={item.completed} change={item} />
                    </div>
                    <div className="w-[60%] h-[90%] flex flex-col items-start text-white">
                        <h3 className="lg:text-[20px]" style={item.completed ? { textDecoration: 'line-through' } : null}>{item.title}</h3>
                        <span className="text-[12px] lg:text-[15px] opacity-80">{item.description}</span>
                    </div>

                    <div className="w-[20%] h-full flex items-center justify-between lg:w-[10%]">
                        <button onClick={() => { setTodo({ title: item.title, description: item.description, date: item.date, id: item.id }) }} className="w-[40%] aspect-square flex items-center justify-center"><img src={edit_img} alt="" /></button>
                        <button onClick={() => deleteTodo(item.id)} className="w-[40%] aspect-square flex items-center justify-center"><img src={delete_img} alt="" /></button>
                    </div>
                </div>
            ))}
        </div>
    );
}

MainPage.propTypes = {
    showFilters: PropTypes.bool.isRequired,
    updateFunc: PropTypes.func
};

export default MainPage;
