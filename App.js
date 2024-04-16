import "react-native-gesture-handler";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './Screens/HomeScreen';
import FixtureScreen from "./Screens/FixtureScreen";
import StandingScreen from "./Screens/StandingScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./Screens/ProfileScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import AboutScreen from "./Screens/AboutScreen";
import * as Font from 'expo-font';
import { useEffect, useState } from "react";
import ForumScreen from "./Screens/ForumScreen";
import NewsScreen from "./Screens/NewsScreen";
import ClubScreen from "./Screens/ClubScreen";
import DrawerContent from "./DrawerContent";
import LogInScreen from "./Screens/LogInScreen";

async function loadFonts() {
  await Font.loadAsync({
    'JockeyOne': require('./assets/JockeyOne-Regular.ttf'),
  });
}

const Stack = createNativeStackNavigator();

// export default function App() {
  
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName='Home' screenOptions={{headerStyle:{backgroundColor:'#E73725'}, headerTintColor:'#fff'}}>
//         <Stack.Screen name="Home" component={HomeScreen} options={{title:'Home'}}/>
//         <Stack.Screen name="About Us" component={AboutScreen} options={{title:'About Us'}}/>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

const Drawer = createDrawerNavigator(); 

const DrawerNavigator = () => {
  return(
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props}/>} screenOptions={{headerStyle:{backgroundColor:'#E73725'}, drawerLabelStyle:{fontSize:20,fontFamily:'JockeyOne'}, headerTintColor:'#fff', headerTitleStyle:{fontFamily:'JockeyOne', fontSize:25}, drawerActiveTintColor:'#E73725'}}>
        <Drawer.Screen name="Home" component={HomeScreen} options={{}}/>
        <Drawer.Screen name="Fixture" component={FixtureScreen} options={{}}/>
        <Drawer.Screen name="Standing" component={StandingScreen} options={{}}/>
        {/* <Drawer.Screen name="Forum" component={ForumScreen} options={{}}/> */}
        <Drawer.Screen name="News" component={NewsScreen} options={{}}/>
        <Drawer.Screen name="Clubs" component={ClubScreen} options={{}}/>
        <Drawer.Screen name="About Us" component={AboutScreen} options={{}}/>
      </Drawer.Navigator>
  )
}

// export default function App(){
//   return(
//     <NavigationContainer>
//       <Drawer.Navigator screenOptions={{headerStyle:{backgroundColor:'#E73725'}, headerTintColor:'#fff'}}>
//         <Drawer.Screen name="Fixture" component={FixtureScreen}/>
//         <Drawer.Screen name="Standing" component={StandingScreen}/>
//       </Drawer.Navigator>
//     </NavigationContainer>
//   )
// }

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return(
      <Tab.Navigator screenOptions={{headerStyle:{backgroundColor:'#E73725'},headerTintColor:'#fff', tabBarActiveTintColor:'#E73725', tabBarLabelStyle:{fontSize:15, fontFamily:'JockeyOne'},headerTitleStyle:{fontSize:35, color:'#000', fontFamily:'JockeyOne'}}}>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarIcon: () => <Ionicons name="person" size={25}/>,}}/>
        <Tab.Screen name="PANEKA" component={DrawerNavigator} options={{tabBarIcon: () => <Ionicons name="home" size={25}/>, tabBarLabel:"Home"}}/>
        <Tab.Screen name="Forum" component={ForumScreen} options={{tabBarIcon: () => <Ionicons name="chatbubbles" size={25}/>,}}/>
      </Tab.Navigator>
  )
}

export default function App(){

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      await loadFonts();
      setFontsLoaded(true);
    }
    load();
  }, []);

  if (!fontsLoaded) {
    // Return a loading indicator or placeholder
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  return(
    // <NavigationContainer>
    //   <Tab.Navigator screenOptions={{headerStyle:{backgroundColor:'#E73725'}, headerTintColor:'#fff', tabBarActiveTintColor:'#000'}}>
    //     <Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarIcon: () => <Ionicons name="person" size={25}/>}}/>
    //     <Tab.Screen name="My Team" component={MyTeamScreen} options={{tabBarIcon: () => <Ionicons name="" size={25}/>}}/>
    //     <Tab.Screen name="Settings" component={SettingsScreen} options={{tabBarIcon: () => <Ionicons name="settings" size={25}/>}}/>
    //   </Tab.Navigator>
    // </NavigationContainer>

    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabNavigator" screenOptions={{headerShown: false}}>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="Login" component={LogInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
