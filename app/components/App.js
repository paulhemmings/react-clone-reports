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

    // https://min-api.cryptocompare.com/data/all/coinlist
    // https://jsonplaceholder.typicode.com/todos

    getData() {
        var self = this;
        fetch('https://min-api.cryptocompare.com/data/all/coinlist')
        .then(response => response.json())
        .then(response => Object.keys(response.Data).map(key => response.Data[key]))
        .then(coins => coins.map(coin => { return {
            name: coin["CoinName"],
            id: coin["Id"],
            image: coin["ImageUrl"],
            trading: coin["IsTrading"],
            symbol: coin["Symbol"],
            supply: coin["TotalCoinSupply"],
            url: coin["Url"]
          }}))
//        .then(coins => coins.map(coin => self.addData(coin)));
         .then(json => {
             self.setState({
                 name: 'coins',
                 items: json
             });
         });          
    }

    render() {
        return <Report name={this.state.name} items={this.state.items} />
    }
}

export default App;