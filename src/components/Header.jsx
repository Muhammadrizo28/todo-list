import { useState } from 'react';
import filter_img from '../images/filter.png';
import close_img from '../images/close.png';
import PropTypes from 'prop-types';

function Header({ showFilterFunc }) {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick((prev) => {
      const newClick = !prev;
      showFilterFunc(newClick); // Обновляем состояние родителя через коллбек
      return newClick;
    });
  };

  return (
    <div className='w-[85%] h-[8%] flex items-center justify-between '>
      <button onClick={handleClick} className="w-[42px] aspect-square flex items-center justify-center lg:w-[55px]">
        {!click && <img className='w-full h-full' src={filter_img} alt="Filter" />}
        {click && <img src={close_img} alt="Close" />}
      </button>

     
      <p className='text-white'>Todo</p>
    </div>
  );
}

Header.propTypes = {
  showFilterFunc: PropTypes.func.isRequired,
};

export default Header;
