import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import TopDestinos from "../screens/TopDestiny";

const Stack = createStackNavigator();

export default function TopDestinyStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="top-destinosS"
                component={TopDestinos}
                options={{title:"Los Mejores destinos"}}
            />
        </Stack.Navigator>
    );
}