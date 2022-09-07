import * as React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { RFValue } from 'react-native-responsive-fontsize'
import HomeScreen from './screen/HomeScreen';
import Popular from './screen/Popular';
import Recommendation from './screen/Recommendation';

export default function App() {
  return (
    <AppContainer />
  );
}

const AppTopNavigator = createMaterialTopTabNavigator({
  RecommendedArticles: {
    screen: Recommendation,
    navigationOptions: {
      tabBarLabel: "Recommended",
      tabBarOptions: {
        tabStyle: { backgroundColor: "#fff" },
        labelStyle: { color: "#000" },
        indicatorStyle: { backgroundColor: "#000" }
      }
    }
  },
  PopularArticles: {
    screen: Popular,
    navigationOptions: {
      tabBarLabel: "Popular",
      tabBarOptions: {
        tabStyle: { backgroundColor: "#fff" },
        labelStyle: { color: "#000" },
        indicatorStyle: { backgroundColor: "#000" }
      }
    }
  }
})

const AppStackNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  AppTopNav: {
    screen: AppTopNavigator,
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: 'white',
      headerTitle: "Recommended Articles",
      headerStyle: {
        backgroundColor: "#500ff9"
      },
      headerTitleStyle: {
        color: "white",
        fontSize: RFValue(18),
        fontWeight: "bold"
      }
    }
  },
  initialRouteName: "Home"
})

const AppContainer = createAppContainer(AppStackNavigator)