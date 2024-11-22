import { useState } from "react";
import PropTypes from "prop-types";
import { request } from "../api/request";

function AddTodoBlock({ value = { title: '', description: '', date: '' }, change = false, openBlock, update }) {
    const [newValueObj, setNewValueObj] = useState(value);
    const [errors, setErrors] = useState({});

    const onChangeFunc = (name, newValue) => {
        setNewValueObj((prev) => ({
            ...prev,
            [name]: newValue,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: '', 
        }));
    };

    
    async function changeData() {
        const areValuesNotEmpty = Object.values(newValueObj).every((val) => val !== "");
        if (!areValuesNotEmpty) {            
            setErrors({
                title: newValueObj.title ? '' : 'Название обязательно',
                description: newValueObj.description ? '' : 'Описание обязательно',
                date: newValueObj.date ? '' : 'Дата обязательна',
            });
            return;
        }

        const method = change ? 'patch' : 'post';
        const way = change ? `/${newValueObj.id}` : '';
     
        try {
            console.log("method:", method, "way:", way, "data:", newValueObj)
            
            const res = await request(method, way, newValueObj);

            if (res) {
                openBlock(false);
                update()
            } else {
                
                setErrors({ general: 'Ошибка при отправке данных' });
            }
        } catch (err) {
            console.error(err);
            setErrors({ general: 'Ошибка при отправке данных' });
        }
    }

    return (
        <div
            className="w-[93%] h-[40%] lg:w-[50%] absolute top-[10%] rounded-[5px] flex flex-col items-center"
            style={{ backgroundColor: 'rgb(51, 51, 51)' }}
        >
            <div className="w-[80%] h-[10%] flex justify-between items-center mt-[20px]">
                <span className="text-white text-[14px]">Название</span>
                <div className="flex flex-col w-[65%]">
                    <input
                        onChange={(e) => onChangeFunc('title', e.target.value)}
                        value={newValueObj.title}
                        className="w-full rounded-[5px] text-[14px] outline-none pl-[5%] text-white lg:h-[30px]"
                        type="text"
                        style={{ backgroundColor: 'rgb(71, 71, 71)' }}
                    />
                    {errors.title && (
                        <span className="text-red-500 text-[12px] mt-[5px]">{errors.title}</span>
                    )}
                </div>
            </div>

            <div className="w-[80%] h-[10%] flex justify-between items-center mt-[20px]">
                <span className="text-white text-[14px]">Описание</span>
                <div className="flex flex-col w-[65%]">
                    <input
                        onChange={(e) => onChangeFunc('description', e.target.value)}
                        value={newValueObj.description}
                        className="w-full rounded-[5px] text-[14px] outline-none pl-[5%] text-white lg:h-[30px]"
                        type="text"
                        style={{ backgroundColor: 'rgb(71, 71, 71)' }}
                    />
                    {errors.description && (
                        <span className="text-red-500 text-[12px] mt-[5px]">{errors.description}</span>
                    )}
                </div>
            </div>

            <div className="w-[80%] h-[10%] flex justify-between items-center mt-[20px]">
                <span className="text-white text-[14px]">Дата</span>
                <div className="flex flex-col w-[65%]">
                    <input
                        onChange={(e) => onChangeFunc('date', e.target.value)}
                        value={newValueObj.date}
                        className="w-full rounded-[5px] text-[14px] outline-none pl-[5%] text-white lg:h-[30px]"
                        type="date"
                        style={{ backgroundColor: 'rgb(71, 71, 71)' }}
                    />
                    {errors.date && (
                        <span className="text-red-500 text-[12px] mt-[5px]">{errors.date}</span>
                    )}
                </div>
            </div>

            <div className="w-full h-[22%] mt-[40px] flex flex-col items-end justify-between">
                <button
                    onClick={() => { changeData()}}
                    className="w-[25%] h-[30px] bg-blue-400 mr-[5%] rounded-[5px] text-[12px] text-white"
                >
                    {change ? 'Изменить' : 'Добавить'}
                </button>
                {errors.general && (
                    <span className="text-red-500 text-[12px] mt-[5px] mr-[5%]">{errors.general}</span>
                )}
            </div>
        </div>
    );
}

AddTodoBlock.propTypes = {
    value: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.string,
        id: PropTypes.string,
    }),
    change: PropTypes.bool,
    openBlock: PropTypes.func,
    update : PropTypes.func
};

export default AddTodoBlock;
