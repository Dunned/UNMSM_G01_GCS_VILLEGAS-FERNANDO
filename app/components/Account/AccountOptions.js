import React from 'react';
import {StyleSheet, View, Text} from "react-native";
import {ListItem} from "react-native-elements";
import {map} from "lodash";
import { black } from 'ansi-colors';
export default function AccountOptions(props){
    const {userInfo,toastRef} =props;
    const menuOptions = generateOptions();
    console.log(menuOptions);
    return (
        
        <View style={styles.list}>
       
            {map(menuOptions,(menu,index)=>(
                <ListItem key={index} 
                tittle={menu.tittle}
                leftIcon={{
                    type: menu.icontype,
                    name: menu.iconNameLeft,
                    color: menu.iconColorLeft,
                }}
                rightIcon={{
                    type:menu.icontype,
                    name:menu.iconNameRigth,
                    color:menu.iconColorRigth,
                }}
                />
                    
                ))}
         </View>         
    );
           
}
function generateOptions(){
    return [
        {
            tittle: "Cambiar nombres y apellidos",
            icontype: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRigth: "chevron-rigth",
            iconColorRigth: "#008f39"
        },
        {
            tittle: "Cambiar email",
            icontype: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ccc",
            iconNameRigth: "chevron-rigth",
            iconColorRigth: "#008f39"
        },
        {
            tittle: "Cambiar contraseña",
            icontype: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRigth: "chevron-rigth",
            iconColorRigth: "#008f39"
        }
        ]
}
const styles =StyleSheet.create({
    list:{
        fontWeight: "bold",
        paddingBottom: 5,
        backgroundColor: "#e3e3e3",
    },
});