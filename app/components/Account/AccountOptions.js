import React, {useState}from 'react';
import {StyleSheet, View, Text} from "react-native";
import {ListItem} from "react-native-elements";
import {map} from "lodash";
import Modal from '../Modal';
import ChangeDisplayNameForm from './ChangeDisplayNameForm';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from "./ChangePasswordForm";
export default function AccountOptions(props){
    const {userInfo,toastRef,setReloadUserInfo} =props;
    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);
    
    //console.log(menuOptions);
    const selectedComponents= (key)=>{
        switch (key) {
            case "displayName":
                setRenderComponent(<ChangeDisplayNameForm
                 displayName={userInfo.displayName}
                 setShowModal={setShowModal}
                 toastRef={toastRef}
                 setReloadUserInfo={setReloadUserInfo}
                 />
                 );
                setShowModal(true);
                break;
            case "email":
                setRenderComponent(
                    <ChangeEmailForm
                 email={userInfo.email}
                 setShowModal={setShowModal}
                 toastRef={toastRef}
                 setReloadUserInfo={setReloadUserInfo}
                 />
                );
                setShowModal(true);
                break;
            
            case "password":
                setRenderComponent(
                    <ChangePasswordForm 
                    setShowModal={setShowModal} 
                    toastRef={toastRef}
                    setReloadUserInfo={setReloadUserInfo} 
                    />
                );
                setShowModal(true);
                break;
            /*case "password":
                setRenderComponent(
                    <Text>
                        seleccionaste cambiar password
                    </Text>
                );
                setShowModal(true);
                break;*/
        
            default:
                setRenderComponent(null);
                setShowModal(false);
                break;
        }
    }
    const menuOptions = generateOptions(selectedComponents);
    return (
        
        <View>
       
            {map(menuOptions,(menu,index)=>(
                <ListItem 
                key={index} 
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
                containerStyle={styles.menuItem}
                onPress={menu.onPress}
                />
                    
                ))}
                {renderComponent && (
                <Modal isVisible={showModal} setIsVisible={setShowModal}>
                {renderComponent}
                </Modal>)}
                
         </View>         
    );
           
}
function generateOptions(selectedComponents){
    return [
        {
            tittle: "Cambiar nombres y apellidos",
            icontype: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRigth: "chevron-right",
            iconColorRigth: "#008f39",
            onPress: ()=> selectedComponents("displayName")
        },
        {
            tittle: "Cambiar email",
            icontype: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ccc",
            iconNameRigth: "chevron-right",
            iconColorRigth: "#008f39",
            onPress: ()=> selectedComponents("email")
        },
        {
            tittle: "Cambiar contraseña",
            icontype: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRigth: "chevron-right",
            iconColorRigth: "#008f39",
            onPress: ()=> selectedComponents("password")
        }
        ]
}
const styles =StyleSheet.create({
    menuItem:{
        
        paddingBottom: 5,
        backgroundColor: "#e3e3e3",
        
    },
});