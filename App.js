import {React, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Discover from './src/components/Discover/Discover';
import Form from './src/components/Form/Form';
import Plant from './src/components/Plants/Plants';
import Settings from './src/components/Settings/Settings';
import PlantDetails from './src/components/PlantDetails/PlantDetails'

import { Image } from 'react-native';
import DiscoverIcon from './assets/icons/discover.png';
import FormIcon from './assets/icons/add.png';
import PlantIcon from './assets/icons/myplants.png';
import SettingsIcon from './assets/icons/settings.png';

import * as Notifications from 'expo-notifications';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  }),
  handleSuccess: (notificationId) => {
    console.log('Handle Success:', notificationId);
  },
  handleError: (notificationId, error) => {
    console.log('Handle Error:', error);
  }
})


function MainTabNavigator() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let icon;
        if (route.name === 'Discover') {
          icon = DiscoverIcon;
        } else if (route.name === 'Form') {
          icon = FormIcon;
        } else if (route.name === 'Plant') {
          icon = PlantIcon;
        } else if (route.name === 'Settings') {
          icon = SettingsIcon;
        }

        return <Image source={icon} style={{ width: size, height: size, tintColor: color }} />;
      },
      tabBarActiveTintColor: 'green', 
      tabBarInactiveTintColor: 'gray', 
      tabBarStyle: [{ display: 'flex' }, null],
    })}
  >
    <Tab.Screen name="Discover" component={Discover} />
    <Tab.Screen name="Form" component={Form} />
    <Tab.Screen name="Plant" component={Plant} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
  );
}


const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={MainTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="PlantDetails" component={PlantDetails} />
    </Stack.Navigator>
  );
};


export default function App() {

   //listen to received notification
   useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received: ", notification)
      }
    )
    //console.log("subscription: ", subscription)

    return () => {
      subscription.remove()
    }
  }, [])

  //listen to interacted notification
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Tap response: ", response)
      }
    )
    //console.log("Tap subscription: ", subscription)
    return () => {
      subscription.remove()
    }
  }, [])

  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
