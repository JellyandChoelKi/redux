import { legacy_createStore  } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";


const addToDo = (text) => {
    return {
        type: ADD_TODO, text
    }
}
const deleteToDo = id => {
    return {
        type: DELETE_TODO, id
    }
}

const reducer = (state =[], action)=>{
    switch(action.type){
        case ADD_TODO:
            const newToDoObj = { text:action.text, id:Date.now() };
            return[newToDoObj,...state];
        case DELETE_TODO:
            const cleanded = state.filter(toDo => toDo.id !== parseInt(action.id));
            return cleanded;
        default:
            return[]

    }
};


const store = legacy_createStore(reducer)

store.subscribe(()=> console.log(store.getState()));



const dispatchaddToDo = text => {
    store.dispatch(addToDo(text));
};



const dispatchdeleteTodo = e => {
    const id = parseInt(e.target.parentNode.id);
    store.dispatch(deleteToDo(id));
};



const paintToDos = () => {
    const toDos= store.getState();
    ul.innerHTML = "";
    toDos.forEach(toDo => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.innerText="DEL";
        btn.addEventListener("click" , dispatchdeleteTodo)
        li.id = toDo.id;
        li.innerText = toDo.text;
        li.appendChild(btn);
        ul.appendChild(li);
    });
};

store.subscribe(paintToDos)


const onSubmit = e => {
    e.preventDefault();
    const toDo = input.value;
    input.value = "";
    dispatchaddToDo(toDo);
};

form.addEventListener("submit", onSubmit);  
    




/* button */
// const add = document.getElementById("add");
// const minus = document.getElementById("minus");
// const number = document.querySelector("span");

// number.innerText = 0;

// const ADD = "ADD";
// const Minus = "Minus";



// const countModifier = (count = 0, action) => {
//     switch (action.type){
//         case ADD:
//             return count+1;
//         case Minus:
//             return count-1;
//         default:
//             return count;
//     }
// };

// const countStore = legacy_createStore (countModifier);

// const onChange = () =>{
//     number.innerText = countStore.getState();
// }

// countStore.subscribe(onChange)


// const handleadd = () =>{
//     countStore.dispatch({type:ADD});
// }
// const handleMinus = () =>{
//     countStore.dispatch({type:Minus});
// }

// add.addEventListener("click", handleadd);
// minus.addEventListener("click", handleMinus);
