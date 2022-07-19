import { Component } from "react";
import { decoratorWithNameHight } from "../../hoc";

@decoratorWithNameHight(180)
class UglyWorld extends Component {
    render () {
        return <div>bye ugly world my name is {this.props.name}</div>
    }
}
export default UglyWorld;