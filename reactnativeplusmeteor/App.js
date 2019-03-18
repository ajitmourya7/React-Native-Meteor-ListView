/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import Meteor, { withTracker, MeteorListView } from 'react-native-meteor';

Meteor.connect('ws://192.168.0.18:3000/websocket'); //do this only once

class App extends Component<{}> {

    static Newupdate(value){
        Meteor.call('update', value , (err, res) => {
            // Do whatever you want with the response
            console.log('update', err, res);
        });
    }

    static statusCheck(value){
        if (value.status === 'premium'){
            return (<Text  onPress={() => {App.Newupdate(value)}} style={[styles.elementsDATA,styles.green]}>{value.status}</Text>)
        }
        return (<Text onPress={() => {App.Newupdate(value)}} style={[styles.elementsDATA,styles.red]}>{value.status}</Text>)
    };

  renderRow(todo) {
    return (
        <View style={styles.box}>
        <Text style={styles.elementsDATA}>{todo.name}</Text>
            {App.statusCheck(todo)}
        </View>
    )
  }
  render() {
    const { settings, todosReady } = this.props;

    return (
        <View style={styles.container}>
          <Text>{settings.name}</Text>
          {!todosReady && <Text>Not ready</Text>}

            <View style={styles.titleBox}>
                <Text style={[styles.elementsDATA,styles.title,styles.center]}>* User List *</Text>
            </View>

            <View style={styles.titleBox}>
                <Text style={[styles.elementsDATA,styles.title]}>Name</Text>
                <Text style={[styles.elementsDATA,styles.title]}>Status</Text>
            </View>

          <ScrollView>
          <MeteorListView
              collection="Accounts"
              renderRow={this.renderRow}
          />
          </ScrollView>
        </View>
    );
  }
}

export default withTracker(params => {
  const handle = Meteor.subscribe('Accounts');
  Meteor.subscribe('Accounts');

  return {
    todosReady: handle.ready(),
    settings: Meteor.collection('Accounts').find()
  };
})(App);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    box: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'black',
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    elementsDATA: {
        flex: 1,
        color: 'white',
        padding: 10,
        textAlign: 'center'
    },
    titleBox:{
        flex: 1,
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    title: {
        color: 'black',
        fontSize: 20
    },
    green: {
        color: 'green'
    },
    red: {
        color: 'red'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
});
