import React, {Component} from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

    state = {
        sushi: [],
        sushiUserBought: [],
        page: 0,
        balance: 100,
    };

    fetchData = (url) => {
        return fetch(url)
            .then(resp => resp.json())
    };

    componentDidMount() {
        this.fetchData(API)
            .then(data => {
                data.map(item => {
                    item.clicked = false
                });
                this.setState({sushi: [...data]})
            })
    }

    moreSushiHandler = () => {
        this.setState({page: this.state.page + 1})
    };

    buySushiHandler = (sushiItem) => {
        const newBalance = this.state.balance - sushiItem.price;

        if (newBalance >= 0) {
            // sushi clicked update
            const sushi = [...this.state.sushi];
            const clickedSushi = sushi.find(item => item.id === sushiItem.id);
            clickedSushi.clicked = true;

            // sushiUserBought Array update
            const sushiUserBought = [...this.state.sushiUserBought];
            sushiUserBought.push(sushiItem);

            this.setState({
                sushi,
                sushiUserBought,
                balance: newBalance
            })
        }
    };

    render() {
        const page = this.state.page * 4;
        const sushiForRendering = this.state.sushi.slice(page, page + 4);
        return (
            <div className="app">
                <SushiContainer
                    sushi={sushiForRendering}
                    moreSushiHandler={this.moreSushiHandler}
                    buySushiHandler={this.buySushiHandler}/>
                <Table
                    balance={this.state.balance}
                    sushiUserBought={this.state.sushiUserBought}/>
            </div>
        );
    }
}

export default App;