import React, { Component } from 'react'

class ClassState extends Component{

    constructor(props){
        super(props);

        this.state = {
            error:true,
            loading:false
        }
    }


    render(){

        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>

                <p>Por favor, escribe el codigo de seguridad.</p>

                {
                    this.state.error && (
                        <p>Error: el código es incorrecto</p>
                    )
                }

                {
                    this.state.loading && (
                        <p>Cargando...</p>
                    )
                }

                <input placeholder='Codigo de seguridad' />
                <button
                    onClick={ () => this.setState( { loading:true } ) }
                >
                    Comprobar
                </button>
            </div>
        )
    }
}

export {ClassState}