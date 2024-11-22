import { useEffect, useState } from 'react';
import plus_img from '../images/plus.png';
import PropTypes from 'prop-types';

function NavigationBlock({ setAddtodo }) {
    const [click, setClick] = useState(false);

    const handleClick = () => {
        const newClickState = !click;
        setAddtodo(newClickState); // Передаем новое значение родительскому компоненту
    };

    useEffect(() => {

        setClick(prev => !prev)

    }, [setAddtodo])

    return (
        <div className='w-[100%] h-[10%] mb-[1%] lp:mb-[4%]'>
            <div
                className="w-full h-[80%] mt-[5%] flex items-start justify-center relative"
                style={{ backgroundColor: 'rgb(51, 51, 51)' }}
            >
                <button
                    onClick={handleClick} 
                    className='absolute bottom-[35%] h-[90%] bg-blue-400 aspect-square rounded-[50%] flex items-center justify-center transform rotate-90'
                >
                    <img style={{
                        transform: click ? 'rotate(135deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease', 
                    }} src={plus_img} alt="" />
                </button>
            </div>
        </div>
    );
}

NavigationBlock.propTypes = {
    setAddtodo: PropTypes.func.isRequired,
};

export default NavigationBlock;
