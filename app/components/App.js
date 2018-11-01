import Gooact, { render, Component } from '../gooact';
import Report from './Report';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'big report',
            items: this.initData()
        }

        this.getData();
      }
      
    initData() {
        return [];
    }  

    addData(item) {
        const newItems = [].concat(this.state.items);
        newItems.push(item);
        this.setState({
          input: this.state.name,
          items: newItems,
        });        
    }

    getData() {
        var self = this;
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => {
            self.setState({
                name: 'to do report',
                items: json
            });
        })  
    }

    render() {
        return <Report name={this.state.name} items={this.state.items} />
    }
}

export default App;