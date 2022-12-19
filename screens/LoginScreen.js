import React, { Component } from "react";
import {
    View,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    TextInput,
    Alert,
    TouchableOpacity,
    Text
} from "react-native";

import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";


const appIcon = require("../assets/logo.png");

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            fontsLoaded: false,
            userSignedIn: false
        };
    }
    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this._loadFontsAsync();
    }

    signIn = async (email, password) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.navigation.replace("Dashboard");
            })
            .catch(error => {
                Alert.alert(error.message);
            });
    };


    render() {

        const { email, password } = this.state;

        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />

                <Text style={styles.appTitleText}>Espectagrama</Text>
                <Image source={appIcon} style={styles.appIcon} />

                <TextInput
                    style={styles.textinput}
                    onChangeText={text => this.setState({ email: text })}
                    placeholder={"Digite o email"}
                    placeholderTextColor={"#FFFFFF"}
                    autoFocus
                />
                <TextInput
                    style={[styles.textinput, { marginTop: 20 }]}
                    onChangeText={text => this.setState({ password: text })}
                    placeholder={"Digite a senha"}
                    placeholderTextColor={"#FFFFFF"}
                    secureTextEntry
                />
                <TouchableOpacity
                    style={[styles.button, { marginTop: 20 }]}
                    onPress={() => this.signIn(email, password)}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("RegisterScreen")}
                >
                    <Text style={styles.buttonTextNewUser}>Usuário novo?</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center",
        justifyContent: "center"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appIcon: {
        width: RFValue(200),
        height: RFValue(200),
        resizeMode: "contain",
        marginBottom: RFValue(20)
    },
    appTitleText: {
        color: "white",
        textAlign: "center",
        fontSize: RFValue(40),
        marginBottom: RFValue(20)
    },
    textinput: {
        width: RFValue(250),
        height: RFValue(50),
        padding: RFValue(10),
        borderColor: "#FFFFFF",
        borderWidth: RFValue(4),
        borderRadius: RFValue(10),
        fontSize: RFValue(20),
        color: "#FFFFFF",
        backgroundColor: "#000000"
    },
    button: {
        width: RFValue(250),
        height: RFValue(50),
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: RFValue(30),
        backgroundColor: "white",
        marginBottom: RFValue(20)
    },
    buttonText: {
        fontSize: RFValue(24),
        color: "#000000"
    },
    buttonTextNewUser: {
        fontSize: RFValue(12),
        color: "#FFFFFF",
        textDecorationLine: 'underline'
    }
});