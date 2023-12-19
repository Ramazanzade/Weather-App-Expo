import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ImageBackground, TextInput } from 'react-native';
import axios from 'axios';
const App = () => {
  const days = [
    { id: 1, text: 'Monday' },
    { id: 2, text: 'Tuesday' },
    { id: 3, text: 'Wednesday' },
    { id: 4, text: 'Thursday' },
    { id: 5, text: 'Friday' },
    { id: 6, text: 'Saturday' },
    { id: 7, text: 'Sunday' },
  ];
  const imge = { uri: 'https://w0.peakpx.com/wallpaper/874/459/HD-wallpaper-waiting-for-tomorrow-imge-nature-tomorrow-waiting.jpg' }
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [search, setsearch] = useState('Baku')

  useEffect(() => {
    const fetchData = async () => {
      if (!search) return; 

      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=b53d68e3e4894fba901174157231712&q=${search}&days=7&aqi=no&alerts=no`
        );
        setData(response.data);
        setError(null); // Reset error state on successful fetch
      } catch (error) {
        setError(error);
        setData(null); // Reset data on error
      }
    };

    fetchData();
  }, [search]);
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

  const renderitem1 = (item) => {
    return (
      <View style={{ marginHorizontal: 40 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 15 }}>{item.text}</Text>
      </View>
    )
  }
  const renderitem = (item) => {
    return (
      <View style={{ marginHorizontal: 30, marginTop: 20, marginLeft: 40 }}>
        <Image
          source={{ uri: `https:${item.day.condition.icon}` }}
          style={{ width: 64, height: 64 }}
        />
        <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 10 }}>
          <Text style={{ fontSize: 20, color: '#FFFFFF', textAlign: 'center', marginTop: 20 }}>{item.day.maxtemp_c}</Text>
          <Text style={{ color: '#FFFFFF', fontWeight: '300', marginTop: 15, marginLeft: 5 }}>O</Text>
        </View>

      </View>
    )
  }


  return (
    <ImageBackground source={imge} style={{ flex: 1, width: '100%', height: '100%' }} resizeMode="cover" >
      <View style={stayle.container}>
        <View >
          <TextInput
        onChangeText={(text) => setsearch(text)} // Update the state with setsearch function
            value={search}
            style={{ marginTop: '15%', width: '80%', height: 35, backgroundColor: 'gray', borderRadius: 20, marginHorizontal: '10%', paddingLeft: 20 }}
            placeholder='Search'
          />
        </View>
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

        <View style={{ marginTop: '20%' }}>
          <FlatList
            style={{ marginTop: '20%' }}
            data={days}
            renderItem={({ item }) => renderitem1(item)}
            horizontal={true}
          />
          <FlatList
            style={{}}
            data={data.forecast.forecastday}
            renderItem={({ item }) => renderitem(item)}
            horizontal={true}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const stayle = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'red',
  },
  text: {
    fontSize: 60,
    marginHorizontal: '10%',
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
    flexDirection: 'row',
    marginLeft: '15%'
  },
  tempview1: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '10%'

  }
})
export default App;
