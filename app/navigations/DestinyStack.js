import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Destinos from "../screens/Destinos";

const Stack = createStackNavigator();

export default function DestinyStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="destinosS"
                component={Destinos}
                options={{ title:"Destinos "}}
            />
            <Stack.Screen
                name="add-destino"
                component={Destinos}
                options={{ title:"Añadir Destino "}}
            />
        </Stack.Navigator>
    );
}