import React, {useState, useEffect} from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions, Text } from "react-native";
import { Icon, Avatar, Image, Input, Button} from "react-native-elements"
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import {map, size, filter} from "lodash";
import Mapview from "react-native-maps";
import Modal from "../Modal";

const widthScreen = Dimensions.get("window").width;

export default function AddDestinoForm(props){
    const {toastRef, setIsLoading, navigation} = props;
    const [destinoName, setDestinoName] = useState("");
    const [destinoAddress, setDestinoAddress] = useState("");
    const [destinoDescription, setDestinoDescription] = useState("");
    const [imagesSelected, setImagesSelected] = useState([]);
    //const [isVisibleMap, setIsVisibleMap] = useState(false);

    const addDestino = () =>{
        console.log("OK");
        console.log(imagesSelected);
    };


    return (
        <ScrollView style={styles.scrollView}>
            <ImageDestino imageDestino={imagesSelected[0]}/>
            <FormAdd
                setDestinoName={setDestinoName}
                setDestinoAddress={setDestinoAddress}
                setDestinoDescription={setDestinoDescription}
            />
            <UploadImage toastRef={toastRef} imagesSelected={imagesSelected} setImagesSelected={setImagesSelected}/>

             <Button 
                title="Crear Destino"
                onPress={addDestino}
                buttonStyle={styles.btnAddDestino}
             />
        </ScrollView>
    );
}

function FormAdd(props){

    const {
        setDestinoName,
        setDestinoAddress,
        setDestinoDescription,
        setIsVisibleMap,
      } = props;
    
      return (
        <View style={styles.viewForm}>
          <Input
            placeholder="Nombre del destino"
            containerStyle={styles.input}
            onChange={(e) => setDestinoName(e.nativeEvent.text)} 
          />
          <Input
            placeholder="Dirección"
            containerStyle={styles.input}
            onChange={(e) => setDestinoAddress(e.nativeEvent.text)}
            rightIcon={{
                type: "material-community",
                name: "google-maps",
                color: "#c2c2c2",
                onPress: () => setIsVisibleMap(true),
              }}
          />
          <Input
            placeholder="Descripcion del destino"
            multiline={true}
            inputContainerStyle={styles.textArea}
            onChange={(e) => setDestinoDescription(e.nativeEvent.text)}
          />
        </View>
      );
}

function ImageDestino(props) {
    const { imageDestino } = props;
  
    return (
      <View style={styles.viewPhoto}>
        <Image
          source={
            imageDestino
              ? { uri: imageDestino }
              : require("../../../assets/img/no-image.png")
          }
          style={{ width: widthScreen, height: 200 }}  
        />
      </View>
    );
  }

  
    
    /*const [location, setLocation] = useState(null);
  
    useEffect(() => {
      (async () => {
        const resultPermissions = await Permissions.askAsync(
          Permissions.LOCATION
        );
        const statusPermissions = resultPermissions.permissions.location.status;
  
        if (statusPermissions !== "granted") {
          toastRef.current.show(
            "Tienes que aceptar los permisos de localizacion para crear un restaurante",
            3000
          );
        } else {
          const loc = await Location.getCurrentPositionAsync({});
          setLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          });
        }
      })();
    }, []);
  
    const confirmLocation = () => {
      setLocationRestaurant(location);
      toastRef.current.show("Localizacion guardada correctamente");
      setIsVisibleMap(false);
    };
  
    return (
      <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
        <View>
          {location && (
            <MapView
              style={styles.mapStyle}
              initialRegion={location}
              showsUserLocation={true}
              onRegionChange={(region) => setLocation(region)}
            >
              <MapView.Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                draggable
              />
            </MapView>
          )}
          <View style={styles.viewMapBtn}>
            <Button
              title="Guardar Ubicacion"
              containerStyle={styles.viewMapBtnContainerSave}
              buttonStyle={styles.viewMapBtnSave}
              onPress={confirmLocation}
            />
            <Button
              title="Cancelar Ubicacion"
              containerStyle={styles.viewMapBtnContainerCancel}
              buttonStyle={styles.viewMapBtnCancel}
              onPress={() => setIsVisibleMap(false)}
            />
          </View>
        </View>
      </Modal>
    );*/

function UploadImage(props){
    
    const {toastRef, imagesSelected, setImagesSelected} = props;
    const imageSelect = async () => {
        const resultPermissions = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );

        if(resultPermissions==="denied"){
            toastRef.current.show("Es necesario aceptar los permisos de galeria.", 3000);
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,3],
            });

            if(result.cancelled) {
                toastRef.current.show(
                    "Has cerrado la imagen",2000
                );
            }else {
                setImagesSelected([...imagesSelected, result.uri])
            }
        }
    };

    const removeImage = (image) => {
        Alert.alert(
          "Eliminar Imagen",
          "¿Estas seguro de que quieres eliminar la imagen?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Eliminar",
              onPress: () => {
                setImagesSelected(
                  filter(imagesSelected, (imageUrl) => imageUrl !== image)
                );
              },
            },
          ],
          { cancelable: false }
        );
    };

    return(
        <View style={styles.viewImages}>
            {size(imagesSelected) < 4 && (
            <Icon 
                type="material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={styles.containerIcon}
                onPress={imageSelect}
            />
            )}
            {map(imagesSelected, (imageDestino, index) =>(
                <Avatar
                 key={index}
                 style={styles.miniatureStyle}
                 source={{uri: imageDestino}}
                 onPress={() => removeImage(imageDestino)}
              />
            ))}
        </View>
    );
    
}

const styles = StyleSheet.create({
    scrollView: {
        height: "100%",
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10,
    },
    input: {
        marginBottom: 10,
    },
    textArea: {
        height: 100,
        width: "100%",
        padding: 0,
        margin: 0,
    },
    btnAddDestino: {
        backgroundColor: "#00a680",
        margin: 20,
    },
    viewImages: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3",
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight : 10,
    },
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20,
    },
    mapStyle: {
        width:"100%",
        height:550,
    },
});