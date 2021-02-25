import React, {useReducer, createContext, useContext, useRef} from 'react';

const initialTodos = [
    {
        id: 1,
        text: '예제) 쓰레기통을 클릭해 삭제해 주세요',
        done: false,
    },
];

/*
    Create
    Toggle
    Remove
*/
function todoReducer(state, action){
    switch(action.type){
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            return state.map(
                todo => todo.id === action.id ? {...todo, done: !todo.done} : todo
            );
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({children}){
    const [state, dispath] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(2);

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispath}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

export function useTodoState(){
    const context = useContext(TodoStateContext);
    if(!context){
        throw new Error('Cannot find Todo Provider');
    }
    return context;
}

export function useTodoDispath(){
    const context = useContext(TodoDispatchContext);
    if(!context){
        throw new Error('Cannot find Todo Provider');
    }
    return context;
}

export function useTodoNextId(){
    const context = useContext(TodoNextIdContext);
    if(!context){
        throw new Error('Cannot find Todo Provider');
    }
    return context;
}