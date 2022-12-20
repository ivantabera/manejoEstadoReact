import React, { Fragment, useEffect, useState, useReducer } from 'react'

const SECURITY_CODE1 = 'paradigma';

export const UseReducer = ( { name } ) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        // Validamos que loading sea true para evitar la peticion en la primer renderizacion
        if (!!state.loading) {
            setTimeout(() => {
                // validar si el SECURITY_CODE1 es valido
                if (state.value === SECURITY_CODE1 ) {
                    dispatch({
                        type: 'CONFIRM'
                    })
                } else {
                    dispatch({
                        type: 'ERROR'
                    })
                }
            }, 2000);
        }        
    }, [state]);

    // Validar el estado y dependiendo de cada caso se va renderizar la vista 
    if(!state.deleted && !state.confirmed){
        return (
            <div>
                <h2>Eliminar { name }</h2>
    
                <p>Por favor, escribe el código de seguridad.</p>
    
                {
                    state.error && (
                        <p>Error: el código es incorrecto</p>
                    )
                }
    
                {
                    state.loading && (
                        <p>Cargando...</p>
                    )
                }
    
                <input 
                    onChange={ (e) => {
                        dispatch({
                            type: 'CODIGO',
                            payload: e.target.value
                        })
                    } }      
                    placeholder='Codigo de seguridad' 
                    value={state.value}
                />
    
                <button
                    onClick={ () => {
                        dispatch({
                            type: 'COMPROBAR'
                        })
                    } }
                >
                    Comprobar
                </button>
            </div>
        )
    } else if(!!state.confirmed && !state.deleted){
        return (
            <Fragment>
                <p>Estas seguro que deseas eliminar?</p>
                <button
                    onClick={ () => {
                        dispatch({
                            type: 'ELIMINAR'
                        })
                    } }
                >
                    Si, eliminar
                </button>
                <button
                    onClick={ () => {
                        dispatch({
                            type: 'CANCELAR'
                        })
                    } }
                >
                    No, me arrepentí
                </button>
            </Fragment>
        )
    } else{
        return(
            <Fragment>
                <p>Eliminado con exito</p>
                <button
                    onClick={ () => {
                        dispatch({
                            type: 'REGRESAR'
                        })
                    } }
                >
                    Regresar
                </button>
            </Fragment>
        )
    }

}

//Crear un objeto de estado inicial 
const initialState = {
    value:'',
        error:false,
        loading:false,
        deleted:false,
        confirmed:false
}

//crear la  funcion reducerObject pero recibe solo el state y  retornamos implicitamente un objeto clave '' : {}
const reducerObject = (state, payload) => ({
    'CONFIRM' : {
        ...state,
        error:false,
        loading:false,
        confirmed:true,
    },
    'ERROR': {
        ...state,
        error:true,
        loading:false,
    },
    'COMPROBAR': {
        ...state,
        loading:true,
        error:false,
    },
    'CODIGO': {
        ...state,
        value: payload
    },
    'ELIMINAR': {
        ...state,
        deleted:true,
    },
    'CANCELAR': {
        ...state,
        confirmed:false,
        value:''
    },
    'REGRESAR': {
        ...state,
        confirmed:false,
        deleted:false,
        value:''
    }
});
//creamos la funcion que recibe el estate y la aaction y valida si reducerObject(state)[action.type] y 
//retorna la misma validacion de lo contrario retorna el state
const reducer = (state, action) => {
    if(reducerObject(state, action.payload)[action.type]) {
        return reducerObject(state, action.payload)[action.type];
    } else {
        return state;
    }
}
