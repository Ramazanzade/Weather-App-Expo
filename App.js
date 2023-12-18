import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://api.weatherapi.com/v1/forecast.json?key=b53d68e3e4894fba901174157231712&q=London&days=7&aqi=no&alerts=no'
        );
        setData(response.data);

      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <View>
        <Text>Error occurred: {error.message}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderitem = ({item}) => {
    const dateString = item.forecast.forecastday.date;
    const dateObject = new Date(dateString);
    const dayOfWeek = dateObject.toLocaleDateString('en-US', { weekday: 'long' });
    return (
      <View>
        <Text style={{ fontSize: 30 }}>{dayOfWeek}</Text>
        <Image
          source={{ uri: `https:${item.forecast.forecastday.day.condition.icon}` }}
          style={{ width: 64, height: 64 }}
        />
        <Text>{item.forecast.forecastday.day.maxtemp_c}</Text>
      </View>
    )
  }


  return (
    <View style={stayle.container}>
      <View>
        <Text style={stayle.text}>{data.location.name}</Text>
        <View style={stayle.view}>
          <Text style={stayle.text1}>{data.location.country}</Text>
          <Text style={stayle.text2}>{data.location.localtime}</Text>
        </View>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <View>
          <View style={{ marginTop: '20%' }}>
            <View style={stayle.tempview}>
              <Text style={stayle.temp}>{data.current.temp_c}</Text>
              <Text style={stayle.tempd}>O</Text>
            </View>
            <View style={stayle.tempview1}>
              <Image
                source={{ uri: `https:${data.current.condition.icon}` }}
                style={{ width: 64, height: 64, marginRight: '5%' }}
              />
              <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '300', marginTop: '10%' }}>{data.current.condition.text}</Text>
            </View>
          </View>
        </View>
        <View style={{ width: 2, backgroundColor: 'gray', height: '100%', marginTop: '10%' }}></View>
        <View style={{ marginTop: '20%' }}>
          <View>
            <Text style={{ color: '#FFFFFF', fontWeight: '300', fontSize: 20 }}>Wind</Text>
            <Text style={{ color: '#FFFFFF', marginTop: '10%', fontSize: 15 }}>{data.current.wind_mph} km</Text>
          </View>
          <View style={{ marginTop: '20%' }}>
            <Text style={{ color: '#FFFFFF', fontWeight: '300', fontSize: 20 }}>Humidity</Text>
            <Text style={{ color: '#FFFFFF', marginTop: '10%', fontSize: 15 }}>%{data.current.humidity}</Text>
          </View>
          <View style={{ marginTop: '20%' }}>
            <Text style={{ color: '#FFFFFF', fontWeight: '300', fontSize: 20 }}>Cloud</Text>
            <Text style={{ color: '#FFFFFF', marginTop: '10%', fontSize: 15 }}>%{data.current.cloud}</Text>
          </View>
        </View>
      </View>
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => renderitem(item)}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <Text>ewghjasgdbwjk</Text>
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
    display: 'flex',
    flexDirection: 'row',
    marginTop: '10%'

  }
})
export default App;
