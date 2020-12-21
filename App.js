import React from 'react';
import {StyleSheet,Image} from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import ReadScreen from './screens/ReadScreen';
import WriteScreen from './screens/WriteScreen'; 
import LoginScreen from './screens/LoginScreen';


export default function App() {
  return (
    <AppContainer />
  );
}

const TabNavigator = createBottomTabNavigator({
  Write:{screen:WriteScreen},
  Read : {screen:ReadScreen}
},
{
defaultNavigationOptions:({navigation})=>({
tabBarIcon:({})=>{

  const routeName = navigation.state.routeName

  if(routeName === "Write"){
    return(
      <Image source = {require("./assets/write.png")}  style={styles.image}/>
    );
  }  
  else if(routeName === "Read"){
    return(
      <Image source = {require("./assets/read.png")}  style={styles.image}/>
    );
  }
}
})
})

const switchNavigator = createSwitchNavigator({
  LoginScreen:{screen:LoginScreen},
  TabNavigator:{screen:TabNavigator},
})

const AppContainer  = createAppContainer(switchNavigator);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width:30,
    height:30
  }
});



