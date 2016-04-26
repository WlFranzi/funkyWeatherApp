//import code
var React = require('react-native');
var Api = require('./src/api');

var {
  View,
  Text,
  MapView,
  AppRegistry,
  StyleSheet
} = React;

//componets
var funkyWeatherApp = React.createClass({
  getInitialState: function() {
    return {
      pin: {
        latitude: 0,
        longitude: 0
      },
      city: '',
      C: '',
      F: '',
      description: ''
    };
  },
    render: function() {

      return <View style={styles.container}>
      <MapView 
      annotations={[this.state.pin]}
      onRegionChangeComplete={this.onRegionChangeComplete} 
      style={styles.map}>
      </MapView>   
      <View style={styles.textWrapper}>
      <Text style={styles.header}>{this.state.city}</Text>
      <Text style={styles.temp}>{this.state.F}</Text>
      <Text style={styles.temp}>{this.state.C}</Text>
      <Text style={styles.description}>{this.state.description}</Text>
      </View>
      </View>
    },
    onRegionChangeComplete: function(region) {
      this.setState({
        pin: {
          latitude: region.latitude,
          longitude: region.longitude
        }
      });
      Api(region.latitude, region.longitude)
        .then((data) => {
          console.log(data),
          this.setState(data);
        });
    }
});

//styles
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    // backgroundColor: ''
  },
  map: {
    flex: 2,
    marginTop: 30
  },
  textWrapper: {
    backgroundColor: "#ff1d8e",
    borderWidth: 3,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 38,
    fontWeight: 'bold'
  },
  temp: {
    fontSize: 20
  },
  description: {
    fontStyle: 'italic',
    fontSize: 25
  }
});


AppRegistry.registerComponent('funkyWeatherApp', () => funkyWeatherApp);
