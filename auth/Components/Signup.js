import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Formik } from 'formik'

const initialValues = {
    name: "",
    email: "",
    password: ""
}

const Login = () => {

    const navigation = useNavigation();
    const navigateToLogin = () => {
        navigation.navigate("Signup");
    }

    const navigateToForget = () => {
        navigation.navigate("ForgetPassword");
    }
    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image style={styles.logo} source={require("../assets/logo.jpg")} />
                <Formik initialValues={initialValues} validationSchema={ }>
                    {
                        () => (
                            <>
                                <TextInput style={styles.input} placeholder="shreyas" />
                                <TextInput style={styles.input} placeholder="shreyasshettigar@gmail.com" />
                                <TextInput style={styles.input} placeholder="password" />

                                <Pressable style={styles.btnContainer}>
                                    <Text style={styles.text}>Signup</Text>
                                </Pressable>
                                <View style={styles.linkcontainer}>
                                    <Pressable>
                                        <Text style={styles.linkText} onPress={navigateToLogin}>Login</Text>
                                    </Pressable>
                                    <Pressable>
                                        <Text style={styles.linkText} onPress={navigateToForget}>Forgot password ?</Text>
                                    </Pressable>

                                </View>
                            </>
                        )
                    }
                </Formik>

            </ScrollView >
        </KeyboardAvoidingView>
    )
}

export default Login