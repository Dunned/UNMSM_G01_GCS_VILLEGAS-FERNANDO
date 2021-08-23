import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Restaurantes from "../screens/Restaurantes";

const Stack = createStackNavigator();

export default function RestaurantsStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="restaurantsS"
                component={Restaurantes}
                options={{ title:"Restaurantes "}}
            />
            <Stack.Screen
                name="add-restaurant"
                component={Restaurantes}
                options={{ title:"Añadir Restaurante "}}
            />
        </Stack.Navigator>
    );
}