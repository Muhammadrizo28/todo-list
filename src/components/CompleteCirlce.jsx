import PropTypes from "prop-types";
import mark_img from '../images/mark.png';
import { useState } from "react";
import { request } from "../api/request";

function CompleteCirle({ round, clickedFunc, name, firstState = false, change = {} }) {
    const [clicked, setClicked] = useState(firstState); 

    const handleClick = () => {
        const newClickedState = !clicked;
        setClicked(newClickedState); 
        clickedFunc({ [name]: newClickedState });  

        try {

            const res = request('patch', `/${change.id.toString()}`,

            {...change, completed : newClickedState}
        )

            if(res) {
                console.log('goood');
                
            }
            else {
                console.log('not deleted');
                
            }

        }
        catch(err) {console.log(err)}
        
    };

    return (
        <div 
            onClick={handleClick}
            className="w-full h-full border-2 border-white flex items-center justify-center cursor-pointer"
            style={{
                borderRadius: round
            }}
        >
            {clicked && <img className="h-[50%] aspect-square" src={mark_img} alt="" />}
        </div>
    );
}

CompleteCirle.propTypes = {
    round: PropTypes.string.isRequired,
    clickedFunc: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    firstState: PropTypes.bool, 
    change : PropTypes.object
};

export default CompleteCirle;
