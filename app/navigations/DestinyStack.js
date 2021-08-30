import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Destinos from "../screens/Destinos/Destinos";
import AddDestino from "../screens/Destinos/AddDestino";

const Stack = createStackNavigator();

export default function DestinyStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="destinos"
                component={Destinos}
                options={{ title:"Destinos "}}
            />
            <Stack.Screen
                name="add-destino"
                component={AddDestino}
                options={{ title:"Añadir nuevo Destino "}}
            />
        </Stack.Navigator>
    );
}