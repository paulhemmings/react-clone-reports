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
          name: this.state.name,
          items: newItems,
        });
    }

    addPrice(symbol, data) {
        const itemCopied = [].concat(this.state.items);
        itemCopied.filter(item => item.symbol == symbol).forEach(coin => coin.price = data.GBP);
        this.setState({
            name: this.state.name,
            items: itemCopied
          });
    }

    handleSelect(app) {
        return (item) => app.getPrice(item.symbol);
    }

    // https://min-api.cryptocompare.com/data/all/coinlist
    // https://jsonplaceholder.typicode.com/todos

    getData() {
        var self = this;
        fetch('https://min-api.cryptocompare.com/data/all/coinlist')
        .then(response => response.json())
        .then(response => Object.keys(response.Data)
                                .map(key => response.Data[key])
                                .filter(coin => coin.IsTrading))
        .then(coins => coins.map(coin => { return {
            name: coin["CoinName"],
            symbol: coin["Symbol"],
            supply: coin["TotalCoinSupply"],
            price: '',
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

    getPrice(symbol) {
        var self = this;
        fetch('https://min-api.cryptocompare.com/data/price?fsym=' + symbol + '&tsyms=GBP,USD,EUR')
        .then(response => response.json())
        .then(json => self.addPrice(symbol, json));
    }

    render() {
        return <Report name={this.state.name} items={this.state.items} onClick={this.handleSelect(this)} />
    }
}

export default App;
