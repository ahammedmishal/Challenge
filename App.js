import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TextInput, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

const App = () => {
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPost();
    return () => {};
  }, []);

  const fetchPost = () => {
    const apiURL =
      'https://run.mocky.io/v3/e02251cd-b8c7-4d30-9d61-846ea17351d7';
    fetch(apiURL)
      .then(response => response.json())
      .then(responseJson => {
        setFilterData(responseJson);
        setMasterData(responseJson);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const searchFilter = text => {
    if (text) {
      const newData = masterData.filter(item => {
        const itemData = item.Ingredient
          ? item.Ingredient.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(masterData);
      setSearch(text);
    }
  };

  const FlatList_Header = () => {
    return (
      <View
        style={{
          height: 45,
          width: '100%',
          justifyContent: 'center',
          paddingLeft:10,
          backgroundColor:'#f0f0f0',
          marginTop:10
        }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#30384d',
            fontFamily: 'Montserrat',
          }}>
          Foods
        </Text>
      </View>
    );
  };

  const ItemView = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          width: '50%',
          paddingHorizontal: 10,
          backgroundColor: '#f0f0f0',
          paddingVertical: 10,
        }}>
        <Image
          style={{width1: 150, height: 100, borderRadius: 5}}
          source={{uri: item.imageUrl}}
        />
        <Text style={styles.itemStyle}>{item.Ingredient}</Text>
        <Text>{item['Short text']}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Icon style={styles.searchIcon} name="search" size={16} color="#000" />
        <TextInput
          style={styles.textInputStyle}
          value={search}
          placeholder="Food name"
          placeholderTextColor={'#7e8a9a'}
          underlineColorAndroid="transparent"
          onChangeText={text => searchFilter(text)}
        />
      </View>

      <FlatList
        numColumns={2}
        data={filterData}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={FlatList_Header}
        renderItem={ItemView}
        ListFooterComponent={<View style={{height: 20}} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff',
  },
  itemStyle: {
    fontWeight: 'bold',
    color: '#30384d',
    fontFamily: 'Montserrat-Bold',
    marginVertical: 2,
    fontSize:16
  },
  textInputStyle: {
    height: 40,
    paddingLeft: 8,
    margin: 5,
    backgroundColor: '#f0f0f0',
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '500',
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    elevation: 4,
    width: '80%',
    height: 45,
    borderRadius: 4,
    alignSelf: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    paddingLeft: 15,
  },
});

export default App;
