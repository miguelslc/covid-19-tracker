import React from 'react';
import {Cards, Charts, CountryPicker, News} from './components'
import styles from './App.module.css';
import {fetchData} from './api';
import coronaImage from './image/image.png';

class App extends React.Component {
  
  state = {
    data: {},
    country: ''
  }

  async componentDidMount () {
    const fetchedData = await fetchData();
    this.setState ({data: fetchedData})
    
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  }

  render() {
    const {data, country} = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image}  src={coronaImage} alt="COVID-19" />
        <Cards data={data}/>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <div className={styles.grid_container}>
          <Charts data={data} country={country} />
          <News />
        </div>
      </div>
    )
  }
}

export default App;
