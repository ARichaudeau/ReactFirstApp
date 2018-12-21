/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppState, Platform, StyleSheet, Text, View, NetInfo, Image, TouchableHighlight, ScrollView, Share, Button} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {appState: AppState.currentState}
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);

    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    });
    NetInfo.addEventListener('connectionChange', this._handleFirstConnectivityChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);

    NetInfo.removeEventListener('connectionChange', this._handleFirstConnectivityChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    }
    this.setState({appState: nextAppState});
  }

  _handleFirstConnectivityChange(connectionInfo) {
    console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
  }

  _onPressImage=()=> {
    //alert ('Joyeux Noel')
    Share.share({
      message: 'Hello',
      title: 'HelloWorld',
      url: 'https://facebook.github.io/react-native/docs/share'
    })
  }


  render() {
    return (
    <ScrollView>
      <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
          <Text style={styles.instructions}>To get started, edit App.js</Text>
          <Text style={styles.instructions}>{instructions}</Text>
          <TouchableHighlight onPress={this._onPressImage}>
            <Image
              style={styles.images}
              source={require('./assets/Noel.png')}/>
          </TouchableHighlight>
            <Image 
              style={styles.images}
              source={{uri: 'http://www.icone-png.com/png/14/13528.png'}}/>
            <Image 
              style={styles.images}
              source={{uri: 'http://www.icone-png.com/png/14/13528.png'}}/>
            <Image 
              style={styles.images}
              source={{uri: 'http://www.icone-png.com/png/14/13528.png'}}/>
            <Button
              style={styles.button}
              title='click'/>

        </View>
      </ScrollView>

    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  images: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },

  button: {
    ...Platform.select({
      ios: {
        color: '#ff0000'
      },
      android: {
        color: '#000099',
      },
    }),
  },

});
