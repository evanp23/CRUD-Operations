// import React from "react";

// export default class Counter extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             count : 0
//         };

//         this.delta = this.delta.bind(this);
//     }

//     componentDidMount(){

//     }

//     componentWillUnmount(){

//     }

//     delta() {
//         this.setState((state, props) =>{
//             return {count: state.count + 1}
//         }
//     }

//     render() {
//         return (
//             <div>
//                 <h1>{this.state.count}</h1>
//                 <button onClick={this.delta}>+</button>
//             </div>
//         );
//     }
// }