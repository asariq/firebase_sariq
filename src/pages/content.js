import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    Dimensions,
    Image,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Alert
}
    from "react-native";
import Icon2 from 'react-native-vector-icons/AntDesign';

import { useDispatch, useSelector } from "react-redux";
import ProductModal from "../component/ProductModal"
import { getDbData, deleteData, addData, updateData } from "../redux/slice";

const { height: windowHeight, width: windowWidth } = Dimensions.get("screen")

const Content = () => {

    const dispatch = useDispatch()
    const dataRedux = useSelector((state) => state.api)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [title, setTitle] = useState("Add Product")
    const [name, setName] = useState("")
    const [offer, setOffer] = useState("")
    const [price, setPrice] = useState("")
    const [id, setId] = useState("")
    const [img, setImg] = useState("")

    var imgBase64;

    useEffect(() => {
        dispatch(getDbData())
    }, [])

    useEffect(() => {
        
        var dbAllData = []
        dataRedux.dbData.forEach(doc => {
            let docData = doc.data()
            dbAllData.push(Object.assign(docData, { id: doc.id }))
        })
        setData(dbAllData)
    }, [dataRedux.dbData])

    const updateItem = ({ name, price, offer, img = "" }) => {

        if (name !== "" && price !== "" && offer !== "" && img !== "" && !!img) {
            setModal(false)
            dispatch(updateData({ name, price, offerPrice: offer, id, image: img }))
            dispatch(getDbData())
        }
        else {
            Alert.alert("Fill all Details")
        }
    }

    const addItem = ({ name, price, offer, img = "" }) => {

        if (name !== "" && price !== "" && offer !== "" && img !== "") {
            setModal(false)
            dispatch(addData({ name, price, offerPrice: offer, image: img }))
            dispatch(getDbData())
        }
        else {
            Alert.alert("Fill all Details")
        }
    }

    const deletedItem = (itemId) => {

        dispatch(deleteData(itemId))
        dispatch(getDbData())

    }

    return (
        <View style={styles.container}>
            {
                loading && <ActivityIndicator size="large" color="#00ff00" />
            }

            {!loading && <>
                <View style={styles.topBar}>
                    <View style={styles.heading}>
                        <Text style={styles.headingText}>Shopping App</Text>
                    </View>
                    <View
                        style={styles.bar}>
                        <Icon2 name="shoppingcart" color={"White"} size={24} />
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.addItem}

                    onPress={() => {
                        setModal(true),
                            setTitle("Add Product")
                    }}>
                    <Text style={styles.addItemText}>Add Item</Text>
                </TouchableOpacity>


                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        imgBase64 = `data:image/jpeg;base64,${item.image}`
                        return (
                            <View style={styles.viewCard}>
                                <Image source={{ uri: imgBase64 }} style={styles.image} />
                                <Text style={styles.text}>Product Name:{item.name}</Text>
                                <Text style={styles.text}>Price:{item.price}</Text>
                                <Text style={styles.text}>offer Price:{item.offerPrice}</Text>

                                <View style={styles.buttonView}>
                                    <TouchableOpacity
                                        style={styles.viewButton}

                                        onPress={() => {
                                            setModal(true)
                                            setTitle("Edit Details")
                                            setName(item.name)
                                            setOffer(item.offerPrice)
                                            setPrice(item.price)
                                            setId(item.id)
                                            setImg(item.image)
                                        }} >
                                        <Text>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => deletedItem(item.id)}
                                        style={styles.viewButton}>
                                        <Text>Delete</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        )
                    }}
                />
                
                <View style={styles.centeredView}>
                    {modal && <ProductModal
                        updateItem={updateItem}
                        addItem={addItem}
                        setModal={setModal}
                        title={title}
                        itemName={name}
                        itemOffer={offer}
                        itemPrice={price}
                        modal={modal}
                        image={img}
                    />
                    }
                </View>
            </>
            }

        </View>
    )
}
export default Content;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: "red"
    },
    addItemText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    },
    viewButton: {
        height: windowHeight * 0.04,
        width: windowWidth * 0.38,
        backgroundColor: "#243E51",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center"
    },
    addItem: {
        height: windowHeight * 0.06,
        width: windowWidth * 0.9,
        backgroundColor: "#243E51",
        marginTop: windowHeight * 0.03,
        marginBottom: windowHeight * 0.03,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6
    },
    buttonView: {
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 10
    },
   
    viewCard: {
        height: windowHeight * 0.45,
        width: windowWidth * 0.9,
        elevation: 5,
        backgroundColor: "white",
        borderRadius: 9,
        justifyContent: "center",
        alignItems: "center",
        margin: 12
    },
 
    image: {
        height: windowHeight * 0.22,
        width: windowWidth * 0.6,

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
    topBar: {
        height: windowHeight * 0.06,
        width: windowWidth * 1,
        backgroundColor: "#243E51",
        elevation: 2,
        flexDirection: "row",
        position: "relative",
        left: 0,
        right: 0,
        top: 0,

    },
    bar: {
        height: windowHeight * 0.06,
        width: windowWidth * 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    heading: {
        height: windowHeight * 0.06,
        width: windowWidth * 0.8,
        justifyContent: "center",
        alignItems: "center"
    },
    headingText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 22
    }
})