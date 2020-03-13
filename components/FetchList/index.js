import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  // ScrollView,
  // ActivityIndicator,
} from 'react-native';

const SERVER_URI = 'http://192.168.1.108:9001';
const DOCUMENT_LIST_URI = `${SERVER_URI}/api/cms/documents?page=1&limit=10&total=null&cid=1&mid=1`;
export default class FetchList extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  componentDidMount() {
    return fetch(DOCUMENT_LIST_URI)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.results,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return this.renderLoadingView();
    }

    return (
      <View>
        <FlatList data={this.state.dataSource} renderItem={this.renderDocuments} keyExtractor={({id}, index) => `${id}`} style={styles.list} />
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  renderDocuments({item}) {
    const imageSRC = Array.isArray(item.covers) ? `${SERVER_URI}${item.covers[0]}` : `${SERVER_URI}${item.covers}`;
    return (
      <View style={styles.container}>
        <Image style={styles.thumbnail} source={{uri: imageSRC}} />

        <View style={styles.rightContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.desc}>{item.desc}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  desc: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
    marginRight: 10,
  },
  list: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});
