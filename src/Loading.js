import React, {Component} from "react";

class Loading extends Component {

    componentWillUnmount() {
        console.log("Desmontado")
    }

    render() {
        return (
            <p>Cargando...</p>
        )
    }
}

export {Loading};