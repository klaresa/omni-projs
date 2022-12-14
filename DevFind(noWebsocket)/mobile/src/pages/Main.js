import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import MapView, { Marker, Callout } from "react-native-maps";
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../service/api';

function Main({ navigation }) {
  const [devs, setDevs] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [techs, setTechs] = useState('');

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();
      console.log(granted);
      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: false,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        })
      }
    }
    loadInitialPosition();
  }, []);


  async function loadDevs() {
    const { latitude, longitude } = currentRegion;
    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs
      }
    });

    setDevs(response.data);
  }


  function handleRegionChange(region) {
    setCurrentRegion(region);
  }

  if (!currentRegion) {
      return null;
    }

  return (
      <>
      <MapView onRegionChangeComplete={handleRegionChange} currentRegion={currentRegion} style={styles.map}>
      {devs.map(dev => (
            <Marker key={dev._id} coordinate={{ longitude: dev.location.coordinates[0], latitude: dev.location.coordinates[1] }} >
<Image style={styles.avatar} source={{ uri: dev.avatar_url }} />

  <Callout onPress={() => {
    navigation.navigate('Profile', { github_username: dev.github_username });
  }}>

<View style={styles.callout}>
      <Text style={styles.devName}>{dev.github_username}</Text>
      <Text style={styles.devBio}>{dev.bio}</Text>
      <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
      </View>
      </Callout>
      </Marker>
        ))}
      </MapView>

      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por techs..."
          placeholderTextColor="#999"
              autoCapitalize="words"
                  autoCorrect={false}
                  value={techs} onChangeText={setTechs}
        />
            <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
              <MaterialIcons name="my-location" size={20} color="#FFF" />
            </TouchableOpacity>
      </View>
  </>
  );

}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#fff',
  },
  callout: {
    width: 260,
  },
  devName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  devBio : {
    color: '#666',
    marginTop: 5,
  },
  devTechs: {
    marginTop: 5,
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 50,
    color: '#333',
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2,
  },
  searchForm: {
    position: 'absolute',
    top: 20,
    right: 20,
    left: 20,
    zIndex: 5,
    flexDirection: 'row',
  },
  loadButton: {
    height: 50,
    width: 50,
    backgroundColor: '#8e4dff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,

  }

});
export default Main;




  // o ReactNative nao tem heranca de elementos, portanto cada elemento precisa
  // ter sua propria estilizacao!


