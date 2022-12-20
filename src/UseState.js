import React, { Fragment, useEffect, useState } from 'react'

const SECURITY_CODE = 'paradigma';

export const UseState = ( { name } ) => {

    // ESTADOS COMPUESTOS
    const [state, setState] = useState({
        value:'',
        error:false,
        loading:false,
        deleted:false,
        confirmed:false
    })
    
    // ESTADOS INDEPENDIENTES
    // estado del valor del input
    // const [value, setValue] = useState('');
    // estado del SECURITY_CODE 
    // const [error, setError] = useState(false);
    // estado de carga
    // const [loading, setLoading] = useState(false);

    const onConfirm = () => {
        setState({
            ...state,
            error:false,
            loading:false,
            confirmed:true,
        })
    }

    const onError = () => {
        setState({
            ...state,
            error:true,
            loading:false,
        })
    }

    useEffect(() => {
        // Validamos que loading sea true para evitar la peticion en la primer renderizacion
        if (!!state.loading) {
            setTimeout(() => {
                // validar si el SECURITY_CODE es valido
                if (state.value === SECURITY_CODE ) {
                    onConfirm()
                } else {
                    onError()
                }
            }, 2000);
        }        
    }, [state]);

    const handleClickComprobar = () => {
        setState({
            ...state,
            loading:true,
            error:false,
        });
    }

    const handleChangeCodigoSeguridad = (e) => {
        setState({
            value:e.target.value
        });
    }

    const handleClickEliminar = () => {
        setState({
            ...state,
            deleted:true,
        })
    }
    const handleClickCancelar = () => {
        
        setState({
            ...state,
            confirmed:false,
            value:''
        })
    }
    const handleClickRegresar = () => {
        setState({
            ...state,
            confirmed:false,
            deleted:false,
            value:'',
        })
    }

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
                    onChange={ handleChangeCodigoSeguridad }      
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
