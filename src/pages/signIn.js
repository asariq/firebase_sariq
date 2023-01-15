import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Alert
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/config";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

const SignIn = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        if (email != "" && password != "") {

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {

                    alert("logged in")
                    navigation.navigate("Content")
                })
                .catch((error) => {
                    const errorMessage = error?.message;
                    Alert.alert("LoginFailed", errorMessage)
                });
        }
        else
            Alert.alert("Fill all details")
    }

    return (
        <View style={styles.container}>

            <Text style={styles.text1}>Sign In</Text>
            
            <View style={styles.inputView}>
                <Icon2 name="mail" color={"white"} size={22} />
                <TextInput
                 autoCapitalize="none"
                    value={email}
                    onChangeText={(text) => { setEmail(text) }}
                    style={styles.input} />
            </View>

            <View style={styles.inputView}>
                <Icon3 name="form-textbox-password" color={"white"} size={22} />
                <TextInput
                    value={password}
                    onChangeText={(text) => { setPassword(text) }}
                    style={styles.input} />
            </View>

            <TouchableOpacity
                onPress={() => login()}
                style={styles.touch}>
                <Text style={styles.text3}>Sign In</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignIn;
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#243E51"
    },
    text1: {
        color: "#24a0ed",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "left",
        width: windowWidth * 0.8
    },
    input: {
        height: windowHeight * 0.06,
        width: windowWidth * 0.7,

    },
    touch: {
        height: windowHeight * 0.06,
        width: windowWidth * 0.8,
        backgroundColor: "#24a0ed",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        marginTop: windowHeight * 0.1
    },
    text3: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18
    },
    inputView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 2,
        borderColor: "white"
    }
})