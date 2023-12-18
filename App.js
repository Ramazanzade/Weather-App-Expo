import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://api.weatherapi.com/v1/forecast.json?key=b53d68e3e4894fba901174157231712&q=istanbul&days=7&aqi=no'
        );
        setData(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  // const renderitem = (data)=>{
  //   return(

  //   )
  // }

  return (
    <View style={stayle.container}>
      <View>
        {/* <Text style={stayle.text}>{data && data.location.name}</Text>
        <View style={stayle.view}>
          <Text style={stayle.text1}>{data.location.country}</Text>
          <Text style={stayle.text2}>{data.location.localtime}</Text>
        </View> */}
      </View>
      <View>
        <View>
          <View style={stayle.tempview}>
            <Text style={stayle.temp}>{data.current.temp_c}</Text>
            <Text style={stayle.tempd}>O</Text>
          </View>
          <View style={stayle.tempview1}>
            <Text style={{ color: '#FFFFFF', fontSize: 20 }}>{data.current.condition.text}</Text>
          </View>
        </View>
      </View>

    </View>
  );
};

const stayle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  text: {
    fontSize: 60,
    marginHorizontal: '10%',
    marginTop: '20%',
    color: '#FFFFFF',
    fontWeight: '200'
  },
  text1: {
    marginLeft: '10%',
    color: '#FFFFFF',
    fontWeight: '300'
  },
  view: {
    display: 'flex',
    flexDirection: 'row'
  },
  text2: {
    marginLeft: '5%',
    color: '#FFFFFF',
    fontWeight: '300'
  },
  temp: {
    fontSize: 100,
    marginLeft: '15%',
    color: '#FFFFFF',
    fontWeight: '200',
    marginTop: '30%'
  },
  tempd: {
    fontSize: 20,
    marginTop: "35%",
    color: '#FFFFFF',
    fontWeight: '200'
  },
  tempview: {
    display: 'flex',
    flexDirection: 'row'
  },
  tempview1: {
    marginLeft: '15%',
    fontWeight: '200',
  }
})
export default App;
