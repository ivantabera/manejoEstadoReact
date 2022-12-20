//Crear un objeto de estado inicial 
const initialState = {
    value:'',
        error:false,
        loading:false,
        deleted:false,
        confirmed:false
}

//crear la funcion de flecha reducer que recibe el state y la action
//crear la misma funcion  validando el action.type es igual a  ERROR y 
//retornamos el objeto con el nuevo estado dependiendo de la accion.type
const reducer = (state, action) => {
    if(action.type === 'CONFIRM') {
        return {
                ...state,
                error:false,
                loading:false,
                confirmed:true,
            }
    } else if(action.type === 'ERROR') {
        return {
            ...state,
            error:true,
            loading:false,
        }
    } else if(action.type === 'COMPROBAR') {
        return {
            ...state,
            loading:true,
            error:false,
        }
    } else if(action.type === 'CODIGO') {
        return {
            value: e.target.value
        }
    } else if(action.type === 'ELIMINAR') {
        return {
            ...state,
            deleted:true,
        }
    } else if(action.type === 'CANCELAR') {
        return {
            ...state,
            confirmed:false,
            value:''
        }
    } else if(action.type === 'REGRESAR') {
        return {
            ...state,
            confirmed:false,
            deleted:false,
            value:''
        }
    } else {
        return {
            ...state
        }
    }
}


//crear la misma funcion pero creando un switch que compruebe el action.type
const reducerSwitch = (state, action) => {
    switch(action.type) {
        case 'CONFIRM':
            return {
                ...state,
                error:false,
                loading:false,
                confirmed:true,
            }
        case 'ERROR':
            return {
                ...state,
                error:true,
                loading:false,
            }
        case 'COMPROBAR':
            return {
                ...state,
                loading:true,
                error:false,
            }
        case 'CODIGO':
            return {
                value: e.target.value
            }
        case 'ELIMINAR':
            return {
                ...state,
                deleted:true,
            }
        case 'CANCELAR':
            return {
                ...state,
                confirmed:false,
                value:''
            }
        case 'REGRESAR':
            return {
                ...state,
                confirmed:false,
                deleted:false,
                value:''
            }
        default:
            return {
                ...state
            }
    }
}


//crear la  funcion reducerObject pero recibe solo el state y  retornamos implicitamente un objeto clave '' : {}
const reducerObject = (state) => ({
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
        value: e.target.value
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
const reducerO = (state, action) => {
    if(reducerObject(state)[action.type]) {
        return reducerObject(state)[action.type];
    } else {
        return state;
    }
}
