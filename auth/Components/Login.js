import React from 'react'

const Login = () => {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image style={styles.logo} source={require("./assets/logo.jpg")} />
                <TextInput style={styles.input} placeholder="shreyas" />
                <TextInput style={styles.input} placeholder="shreyasshettigar@gmail.com" />
                <TextInput style={styles.input} placeholder="********" />
                <TextInput style={styles.input} placeholder="********" />

                <Pressable style={styles.btnContainer}>
                    <Text style={styles.text}>Signup</Text>
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
    )
}

export default Login