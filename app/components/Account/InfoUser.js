import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {Avatar} from "react-native-elements";
import * as firebase from "firebase";
import { firebaseapp } from "../../utils/firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
export default function InfoUser(props){
    const {userInfo: {uid,photoURL,displayName,email,setLoading,setLoadingText},toastRef} = props; //1 manera
    console.log(props.userInfo);
    const changeAvatar =async () =>{
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        console.log(resultPermission);
        const resultPermissionCamera = resultPermission.permissions.mediaLibrary.status;

        if(resultPermissionCamera==="denied") {
            toastRef.current.show("Es necesario aceptar los permisos de la galeria");
        }else{
            const result =await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,3]
            });
            if(result.cancelled){
                toastRef.current.show("Has cerrado la selección de imagenes");
            }else{
                console.log(result.uri);
                uploadImage(result.uri).then(()=>{
                    updatePhotoUrl();
                }).catch(()=>{
                    toastRef.current.show("error al subir el avatar");
                })
            }
        }
    };
    const uploadImage =async(uri)=>{
        setLoadingText("Actualizando avatar");
        setLoading(true);
        const response=await fetch(uri);
        const blob =await response.blob();
        console.log(JSON.stringify(blob));
        const ref=firebaseapp.storage().ref().child(`avatar/${uid}`);
        return ref.put(blob);
    };
    const updatePhotoUrl = () =>{
        
        firebaseapp.storage().ref(`avatar/${uid}`).getDownloadURL().then(async(response) =>{
            const update = {
                photoURL: response,
            };
            console.log(JSON.stringify(response));
            await firebaseapp.auth().currentUser.updateProfile(update);
            setLoading(false);
        }).catch(()=>{
            toastRef.current.show("Error al actualizar el avatar.");
        })
    };
    return (
        <View style={styles.viewUserInfo}>
           <Avatar
           rounded
           size="large"
           showEditButton
           onEditPress={changeAvatar}
           containerStyle={styles.userInfoAvatar}
           //foto prederterminada, ami no me aparece xd
           source={photoURL ? {uri:photoURL}: require("../../../assets/img/avatar-default.jpg") }
           />
           <View>
               <Text style={styles.displayName}>
                   {displayName ? displayName : "Anónimo"}
               </Text>
               <Text>
                   {email}
               </Text>
           </View>
        </View>
    );
}

const styles =StyleSheet.create({
    viewUserInfo:{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom:30
    },
    userInfoAvatar:{
        marginRight:20,
    },
    displayName : {
        fontWeight: "bold",
        paddingBottom: 5,
    },
});