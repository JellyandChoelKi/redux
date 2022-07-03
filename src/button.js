import { legacy_createStore  } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

const ADD = "ADD";
const Minus = "Minus";



const countModifier = (count = 0, action) => {
    switch (action.type){
        case ADD:
            return count+1;
        case Minus:
            return count-1;
        default:
            return count;
    }
};

const countStore = legacy_createStore (countModifier);

const onChange = () =>{
    number.innerText = countStore.getState();
}

countStore.subscribe(onChange)


const handleadd = () =>{
    countStore.dispatch({type:ADD});
}
const handleMinus = () =>{
    countStore.dispatch({type:Minus});
}

add.addEventListener("click", handleadd);
minus.addEventListener("click", handleMinus);