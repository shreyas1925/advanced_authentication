import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Image, StyleSheet, Text, View, TextInput, Dimensions, Pressable, ScrollView } from 'react-native';

export default function Login() {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image style={styles.logo} source={require("../assets/logo.jpg")} />
                <TextInput style={styles.input} placeholder="shreyasshettigar@gmail.com" />

                <Pressable style={styles.btnContainer}>
                    <Text style={styles.text}>Reset Link</Text>
                </Pressable>
                <View style={styles.linkcontainer}>
                    <Pressable>
                        <Text style={styles.linkText}>Login</Text>
                    </Pressable>
                    <Pressable>
                        <Text style={styles.linkText}>Forgot password ?</Text>
                    </Pressable>
                </View>
            </ScrollView >
        </KeyboardAvoidingView>
    );
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

    logo: {
        width: 100,
        height: 100,
        marginTop: height * 0.2,
        marginBottom: 25,
        alignSelf: 'center'
    },
    input: {
        width: width - 40,
        height: 50,
        fontSize: 20,
        paddingHorizontal: 15,
        borderRadius: 8,
        color: "#000",
        backgroundColor: '#eae9e7',
        marginBottom: 25
    },
    btnContainer: {
        width: width - 40,
        height: 50,
        fontSize: 20,
        borderRadius: 8,
        backgroundColor: '#8469cf',
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        color: '#fff'
    },
    linkText: {
        fontSize: 16,
        color: '#8469cf',

    },
    linkcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});
