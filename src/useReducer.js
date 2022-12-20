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
                    onConfirm();
                } else {
                    onError();
                }
            }, 2000);
        }        
    }, [state]);

    //Action Creators
    const onConfirm = () => dispatch({ type: actionTypes.confirm });
    const handleClickComprobar = () => dispatch({ type: actionTypes.check });
    const handleClickEliminar = () => dispatch({ type: actionTypes.delete });
    const handleClickCancelar = () => dispatch({ type: actionTypes.cancel });
    const handleClickRegresar = () => dispatch({ type: actionTypes.return });
    const onError = () => dispatch({ type: actionTypes.error });
    const handleChangeCodigoSeguridad = (e) => {
        dispatch({
            type: actionTypes.code,
            payload: e.target.value
        })
    };

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
                    onChange={ (e) => {handleChangeCodigoSeguridad(e)} }      
                    placeholder='Codigo de seguridad' 
                    value={state.value}
                />
    
                <button
                    onClick={ handleClickComprobar }
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
                    onClick={ handleClickEliminar }
                >
                    Si, eliminar
                </button>
                <button
                    onClick={ handleClickCancelar }
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
                    onClick={ handleClickRegresar }
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

const actionTypes = {
    confirm: 'CONFIRM',
    error: 'ERROR',
    check: 'COMPROBAR',
    code: 'CODIGO',
    delete: 'ELIMINAR',
    cancel: 'CANCELAR',
    return: 'REGRESAR'
}

//crear la  funcion reducerObject pero recibe solo el state y  retornamos implicitamente un objeto clave '' : {}
const reducerObject = (state, payload) => ({
    [actionTypes.confirm] : {
        ...state,
        error:false,
        loading:false,
        confirmed:true,
    },
    [actionTypes.error]: {
        ...state,
        error:true,
        loading:false,
    },
    [actionTypes.check]: {
        ...state,
        loading:true,
        error:false,
    },
    [actionTypes.code]: {
        ...state,
        value: payload
    },
    [actionTypes.delete]: {
        ...state,
        deleted:true,
    },
    [actionTypes.cancel]: {
        ...state,
        confirmed:false,
        value:''
    },
    [actionTypes.return]: {
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
