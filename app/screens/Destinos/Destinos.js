import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text} from "react-native";
import { Icon } from "react-native-elements";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import DestinyStack from "../../navigations/DestinyStack";


export default function Destinos(props){
    const { navigation } = props;
    const [user, setUser] = useState(null)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            console.log(userInfo);
            setUser(userInfo);
        });
    },[]);


    return(
        <View style={styles.viewBody}>
            <Text>Aquí se mostrarán los destinos...</Text>
            {user && (
                <Icon 
                reverse type="material-community" 
                name="plus" 
                color="#00a680" 
                containerStyle={styles.btnContainer} 
                onPress={() => navigation.navigate("add-destino")}
                />
            )}    
        </View>
    );
}

const styles =StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 2,height: 2
        },
        shadowOpacity: 0.2,
    }
});