import React, { useEffect, useState } from 'react'

const SECURITY_CODE = 'paradigma';

export const UseState = ( { name } ) => {

    // ESTADOS COMPUESTOS
    const [state, setState] = useState({
        value:'',
        error:false,
        loading:false
    })

    // ESTADOS INDEPENDIENTES
    // estado del valor del input
    // const [value, setValue] = useState('');
    // estado del SECURITY_CODE 
    // const [error, setError] = useState(false);
    // estado de carga
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Validamos que loading sea true para evitar la peticion en la primer renderizacion
        if (!!state.loading) {
            setTimeout(() => {
                // validar si el SECURITY_CODE es valido
                if (state.value === SECURITY_CODE ) {
                    setState({
                        ...state,
                        loading:false,
                    })
                } else {
                    setState({
                        ...state,
                        error:true,
                        loading:false
                    })
                }
            }, 2000);
        }        
    }, [state.loading]);

    const handleClick = () => {
        setState({
            ...state,
            loading:true,
            error:false
        });
    }

    const handleChange = (e) => {
        setState({
            value:e.target.value
        });
    }
    
    
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
                onChange={ handleChange }      
                placeholder='Codigo de seguridad' 
                value={state.value}
            />

            <button
                onClick={ handleClick }
            >
                Comprobar
            </button>
        </div>
    )

}
