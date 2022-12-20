import React, { Component } from 'react'
import { Loading } from './Loading';

const SECURITY_CODE = 'paradigma';

class ClassState extends Component{

    constructor(props){
        super(props);

        this.state = {
            value: '',
            error:false,
            loading:false
        }
    }

    componentDidUpdate() {
        console.log("Actualizacion")
        if (!!this.state.loading) {
            setTimeout(() => {
                console.log("actualizando estado");

                if(SECURITY_CODE === this.state.value){
                    this.setState({error:false, loading: false})
                } else {
                    this.setState({error:true, loading:false})
                }

                console.log("terminando validacion")
            }, 3000);
        }  
    }

    render(){

        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>

                <p>Por favor, escribe el codigo de seguridad.</p>

                {
                    (this.state.error && !this.state.loading) && (
                        <p>Error: el código es incorrecto</p>
                    )
                }

                {
                    this.state.loading && (
                        <Loading></Loading>
                    )
                }

                <input 
                    placeholder='Codigo de seguridad' 
                    value={this.state.value}
                    onChange={(event) => {
                        this.setState({value: event.target.value})
                    }}
                />
                <button
                    onClick={() => 
                        this.setState({loading:true})
                    }
                >
                    Comprobar
                </button>
            </div>
        )
    }
}

export {ClassState}