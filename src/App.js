import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Coins from './components/Coins';
import './App.css';

const App = () => {

    const [ coins, setCoins ] = useState([]);
    const [ search, setSearch ] = useState('')

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then(respond => {
                setCoins(respond.data);
                console.log(respond.data)
            })
            .catch(error => {
                alert(error);
            })
    }, []);

    const handleChange = e => {
        setSearch(e.target.value)
    }
    
    const filteredSearch = coins.filter(coin => {
        return coin.name.toLowerCase().includes(search.toLowerCase())
    });

    return (
        <div className="coin-app">
            <div className="coin-search" >
                <h1 className="coin-text" >Search a Currency</h1>
                <form>
                    <input type="text" placeholder="Search" className="coin-input" onChange={handleChange} />
                </form>
            </div>
            <div className="table-names-right">
                <p>Crypto Name</p>
                <p>Crypto Code</p>
                <p>Price</p>
                <p>Volume</p>
                <p>Price Change</p>
                <p>Market Cap</p>
            </div>

            {filteredSearch.map(coin => {
                return (
                    <Coins 
                        key={coin.id} 
                        name={coin.name} 
                        image={coin.image} 
                        symbol={coin.symbol} 
                        marketcap={coin.market_cap} 
                        price={coin.current_price}
                        priceChange={coin.price_change_percentage_24h}
                        volume={coin.total_volume}
                        />
                );
            })}
        </div>
    )
}

export default App;
