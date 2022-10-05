import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'

const initialValues = {
    name: "",
    email: "",
    password: ""
}

const validationSchema = yup.object({
    name: yup.string().trim().required("Name is required").min(3, "Name should be atleast 3 characters"),
    email: yup.string().trim().required("Email is required").email("Email is invalid"),
    password: yup.string().trim().required("Password is required").min(8, "Password should be atleast 6 characters")
})

const Login = () => {


    const navigation = useNavigation();
    const navigateToLogin = () => {
        navigation.navigate("Signup");
    }

    const navigateToForget = () => {
        navigation.navigate("ForgetPassword");
    }

    const handleSignup = (values, formikActions) => {

        setTimeout(() => {
            console.log(values, formikActions);
            formikActions.resetForm();
            formikActions.setSubmitting(false);

        }, 3000)

    }
    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image style={styles.logo} source={require("../assets/logo.jpg")} />
                <Formik initialValues={initialValues} validationSchema={validationSchema}
                    onSubmit={handleSignup}>
                    {
                        ({ errors, values, touched, isSubmitting, handleSubmit, handleChange, handleBlur }) => {
                            console.log(values);
                            return (
                                <>
                                    <Text style={styles.error}>{touched.name && errors.name ? errors.name : ''}</Text>
                                    <TextInput style={styles.input} onChangeText={handleChange('name')} onBlur={handleBlur('name')} placeholder="shreyas" />

                                    <Text style={styles.error}>{touched.email && errors.name ? errors.email : ''}</Text>
                                    <TextInput style={styles.input} onChangeText={handleChange('email')} onBlur={handleBlur('email')} placeholder="shreyasshettigar@gmail.com" />

                                    <Text style={styles.error}>{touched.password && errors.name ? errors.password : ''}</Text>
                                    <TextInput style={styles.input} secureTextEntry onChangeText={handleChange('password')} onBlur={handleBlur('password')} placeholder="password" />

                                    <Pressable style={[styles.btnContainer, { backgroundColor: isSubmitting ? 'gray' : '#8469cf' }]} onPress={handleSubmit}>
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
                    }
                </Formik>

            </ScrollView >
        </KeyboardAvoidingView>
    )
}

export default Login