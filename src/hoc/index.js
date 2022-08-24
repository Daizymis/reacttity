import { Component } from "react"

export const decoratorWithNameHight = (height) =>{
    return (WrappedComponent) => {
        return class extends Component {
             state = {
                name: ''
            }
            componentWillMount() {
                let username = localStorage.getItem('myName');
                this.setState({
                    name: username || ''
                })
            }
            render () {
                return (
                    <div>
                        <WrappedComponent name = {this.state.name} {...this.props}/>
                        <p>身高为 {hight || 0}</p>
                    </div>
                )
            }
        }
    }
}