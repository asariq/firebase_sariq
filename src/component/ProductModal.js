import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
    Button,
    Modal,
    TextInput,
    Alert
}
    from "react-native";
import Close from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';


const { height: windowHeight, width: windowWidth } = Dimensions.get("screen")

const ProductModal = ({ updateItem, addItem, title, modal, itemName,
    itemOffer,
    itemPrice, image ,setModal}) => {

    const [img, setImg] = useState(image)
    const [name, setName] = useState(itemName)
    const [offer, setOffer] = useState(itemOffer)
    const [price, setPrice] = useState(itemPrice)
    const [dataImg, setImgData] = useState({
        filePath: { data: '', uri: '' },
        fileData: '',
        fileUri: ''
    })
    var base64Icon;

    useEffect(() => {
        if (title === "Add Product") {
            setName("")
            setOffer("")
            setPrice("")
            setImg("")
        }
    }, [title])


    const launchImageLibrary = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },

        };
        ImagePicker.launchImageLibrary(options, (response) => {

            if (response.didCancel) {
                Alert.alert('User cancelled image picker');
            } else if (response.error) {
                Alert.alert('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.assets[0].uri };

                setImgData({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.assets[0].uri
                });
            }
        });

    }

    RNFS.readFile(dataImg.fileUri, 'base64')
        .then(res => {
            setImg(res)
        });

    base64Icon = `data:image/jpeg;base64,${img}`


    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
        >
            <View style={styles.modalView}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.addText, { color: "#24a0ed",left:20 }]}> {title}</Text>
                    <Close onPress={()=>setModal(false)} name="closecircleo" color={"White"} size={24} style={{right:50}} />
                </View>
                <TouchableOpacity
                    style={styles.addItem}
                    onPress={() => { launchImageLibrary() }}
                >
                    <Text style={styles.addItemText}>Select Image</Text>

                </TouchableOpacity>
                <View style={styles.imgContainer}>
                    <Image source={{ uri: base64Icon }} style={styles.img} />
                </View>
                <Text style={styles.addText}> Name of Product</Text>
                <TextInput
                    style={styles.addInput}
                    onChangeText={setName}
                    value={name} />

                <Text style={styles.addText}> Price of Product</Text>
                <TextInput
                    style={styles.addInput}
                    onChangeText={setPrice}
                    value={price} />

                <Text style={styles.addText}> Offer Price of Product</Text>
                <TextInput
                    style={styles.addInput}
                    onChangeText={setOffer}
                    value={offer} />
                <Button
                    title={title}
                    onPress={() => title == "Edit Details" ? updateItem({ name, price, offer, img }) : addItem({ name, price, offer, img })}
                />
            </View>

        </Modal>
    )
}
export default ProductModal;

const styles = StyleSheet.create({

    addInput: {
        color: "black",
        backgroundColor: "white",
        width: windowWidth * 0.7,
        marginBottom: windowHeight * 0.025,
        borderRadius: 6
    },
    addItemText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        color: "#24a0ed"
    },

    addItem: {
        height: windowHeight * 0.06,
        width: windowWidth * 0.9,
        backgroundColor: "#243E51",
        marginTop: windowHeight * 0.03,
        marginBottom: windowHeight * 0.03,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
        backgroundColor: "white",
        width: windowWidth * 0.7
    },

    addText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        width: "100%",
        textAlign: "left",
        marginBottom: 4,
        marginLeft: windowWidth * 0.16
    },

    modalView: {
        backgroundColor: "#243E51",
        height: windowHeight * 0.8,
        width: windowWidth * 0.9,
        marginTop: 60,
        marginLeft: windowWidth * 0.05,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8
    },
    image: {
        height: windowHeight * 0.22,
        width: windowWidth * 0.6,

    },
    img: {
        height: windowHeight * 0.22,
        width: windowWidth * 0.7
    },
    imgContainer: {
        position: "relative",
        height: windowHeight * 0.22,
        width: windowWidth * 0.7,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        width: "100%",
        textAlign: "left",
        marginTop: windowHeight * 0.01,
        paddingLeft: windowWidth * 0.05,
        fontWeight: "bold",
        fontSize: 14,
        color: "#24a0ed"
    },

})