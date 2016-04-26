//import code
var React = require('react-native');
var Api = require('./src/api');

var {
  View,
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

      return <MapView 
      annotations={[this.state.pin]}
      onRegionChangeComplete={this.onRegionChangeComplete} 
      style={styles.map}></MapView>
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
  map: {
    flex: 1
  }
});


AppRegistry.registerComponent('funkyWeatherApp', () => funkyWeatherApp);
