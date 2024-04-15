import React from "react";
import { Text, View, StyleSheet, Switch } from 'react-native';
import { useColorScheme } from "nativewind";
import { DrawerItemList } from "@react-navigation/drawer";
  
export default function DrawerContent(props) {
    const {colorScheme, toggleColorScheme} = useColorScheme();
    //console.log(colorScheme)
    return(
        <View style={{flex:1}}>
            <DrawerItemList {...props}/>
            <View style={styles.darkMode}>
                <Text></Text>
                <Text style={styles.darkMode}>Dark Mode</Text>
                <View>
                    <Switch value={colorScheme=='dark'} onChange={toggleColorScheme} style={styles.switch}/>
                </View>
            </View>
        </View>
    )
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    darkMode: {
        marginLeft:9,
        fontFamily: 'JockeyOne',
        fontSize:20,
        color:'grey',
    },
    switch: {
        marginLeft: 200, 
        marginTop: -28,
    },
    whiteText:{
        color:'#fff',
    },
    blackText:{
        color:'#000',
    }
});
