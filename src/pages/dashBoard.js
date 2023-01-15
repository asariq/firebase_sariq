import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

const DashBoard = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image source={require("../images/use2.png")} style={styles.image} />
            <Text style={styles.text1}>Keep all the Shopping Up!!</Text>
            <Text style={styles.text2}>Keep Shopping as we have wide range of products for you and all your needs</Text>
            <Text style={styles.text2}>New User signUp</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
                style={styles.touch}>
                <Text style={styles.text3}>SignUp</Text>
            </TouchableOpacity>
            <Text style={styles.text2}>Already have an account</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("SignIn")}
                style={styles.touch}>
                <Text style={styles.text3}>Log In</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DashBoard;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#243E51"
    },
    image: {
        height: windowHeight * 0.37,
        width: windowWidth * 0.39
    },
    text1: {
        color: "#24a0ed",
        fontWeight: "bold",
        fontSize: 20,
    },
    text2: {
        fontSize: 16,
        color: "white",
        textAlign: "center",
        padding: 10
    },
    touch: {
        height: windowHeight * 0.06,
        width: windowWidth * 0.7,
        backgroundColor: "#24a0ed",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center"
    },
    text3: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18
    },
})