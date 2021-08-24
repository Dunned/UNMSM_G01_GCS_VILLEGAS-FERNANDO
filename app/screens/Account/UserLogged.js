import React, {useState,useEffect,useRef} from "react";
import {StyleSheet, View, Text} from "react-native";
import {Button} from "react-native-elements";
import Toast from "react-native-easy-toast";

import * as firebase from "firebase";
import Loading from "../../components/Loading";
import InfoUser from "../../components/Account/InfoUser"
import AccountOptions from "../../components/Account/AccountOptions";
export default function UserLogged(){
    const [userInfo, setUserInfo] = useState(null)
    const [loading, setLoading] = useState(false); 
    const [loadingText, setLoadingText] = useState("")  
    const toastRef=useRef();
    useEffect(() => {
        (async()=>{
            const user=await firebase.auth().currentUser;
            setUserInfo(user);
            console.log(user);
        })()
    }, [])
    return(
        <View style={styles.ViewUserInfo}>
            {userInfo && <InfoUser 
                            userInfo={userInfo} 
                            toastRef={toastRef}
                            setLoading={setLoading}
                            setLoadingText={setLoadingText}/>}
            <AccountOptions userInfo={userInfo} toastRef={toastRef}/>
            <Button 
            title="Cerrar Sesión" 
            buttonStyle={styles.btnClosedSession}
            tittleStyle={styles.ClosedSessionText} 
            onPress={()=> firebase.auth().signOut()}/>
            <Toast ref={toastRef} position="center" opacity={0.9}/>
            <Loading text={loadingText} isVisible={loading} />

        </View>
    );
}

const styles =StyleSheet.create({
   ViewUserInfo: {
        minHeight: "100%",
        backgroundColor: "#f2f2f2",
    }, 
    btnClosedSession:{
        marginTop:30,
        borderRadius:0,
        backgroundColor: "#008f39",
        borderTopWidth:1,
        borderTopColor: "#e3e3e3",
        borderBottomWidth:1,
        borderBottomColor: "#e3e3e3",
        paddingTop:10,
        paddingBottom:10,
    },
    ClosedSessionText:{
        color:"#808080",
    },
});