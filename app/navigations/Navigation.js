import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import DestinyStack from "./DestinyStack";
import FavoriteStack from "./FavoritesStack";
import TopDestinyStack from "./TopDestinyStack";
import SearchStack from "./SearchStack";
import AccountStack from "./CuentaStack";


const Tab = createBottomTabNavigator();

export default function Navigation()
{
    return (
        <NavigationContainer>
            <Tab.Navigator 
            initialRouteName="destinos"
             screenOptions={({route}) => ({
                 tabBarActiveTintColor:"#00a680",
                 tabBarInactiveTintColor:"#646464",
                 tabBarStyle:[
                     {
                        display: "flex"
                     },
                     null
                 ],
                 headerShown:false,
                 tabBarIcon: ({color}) => screenOptions(route,color),
             })}
            >
                <Tab.Screen name = "destinos" component={DestinyStack} options={{title:"Destinos"}}/>
                <Tab.Screen name = "favoritos" component={FavoriteStack} options={{title:"Favoritos"}}/>
                <Tab.Screen name = "top-destinos" component={TopDestinyStack} options={{title:"Top 5"}}/>
                <Tab.Screen name = "busqueda" component={SearchStack} options={{title:"Buscar"}}/>
                <Tab.Screen name = "cuenta" component={AccountStack} options={{title:"Cuenta"}}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

// Se ha diferenciado el nombre de los iconos del tab con los de los Stacks//

function screenOptions(route, color){
    let iconName;
    
    switch(route.name){
        case "destinos":
            iconName = "compass-outline"
            break;
        case "favoritos":
            iconName = "heart-outline"
            break;
        case "top-destinos":
            iconName = "star-outline"
            break;
        case "busqueda":
            iconName = "magnify"
            break;
        case "cuenta":
            iconName = "home-outline"
            break;
        default:
            break;
    }
    return(
        <Icon type="material-community" name={iconName} size={22} color={color} />
    );
}