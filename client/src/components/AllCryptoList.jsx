import React, { Component } from 'react';
import { connect } from 'react-redux';
import Graph from './Graph.jsx';
import { fetchAllCrypto } from '../actions/index.js';

class AllCryptoList extends Component {

  componentWillMount() {
    this.props.fetchAllCrypto();
  }

  formatNum(num) {
    return `$${num.toLocaleString()}`;
  }

  renderCurrency(currencyData) {
    console.log('currency data', currencyData);
    const name = currencyData.name;
    const price = currencyData.price_usd;
    const tradingVolume = currencyData['24h_volume_usd'];
    const marketCap = currencyData.market_cap_usd;
    const fromType= currencyData.symbol;

    return (
      <tr key={fromType}>
        <td>{name}</td>
        <td>{price}</td>
        <td>{tradingVolume}</td>
        <td>{marketCap}</td>
        <td><Graph fromType={fromType} /></td>
      </tr>
      )
  }

  render() {
    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Currency</th>
              <th>Price</th>
              <th>Trading Volume</th>
              <th>Market Cap</th>
              <th>Snap Shot</th>
            </tr>
          </thead>
          <tbody>
            {this.props.allCurrencies.map(this.renderCurrency)}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps( { allCurrencies } ) {
  return { allCurrencies };
}

export default connect(mapStateToProps, {fetchAllCrypto})(AllCryptoList);