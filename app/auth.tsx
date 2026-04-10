import React, { useState } from 'react'
import {
    View, Text, TextInput, Button, StyleSheet, TouchableOpacity,
    Alert, ActivityIndicator
} from 'react-native'
import Parse from '../constants/ParseConfig'
import { useRouter } from 'expo-router'

import Feather from '@expo/vector-icons/Feather';
import { Colors } from '../constants/Colors'


export default function AuthScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [currentPlaceholder, setCurrentPlaceholder] = useState('Password');
    const router = useRouter();

    const handleAuth = async () => {
        if (!username || !password) {
            return Alert.alert('Error', 'Please enter both username and password');
        }
        setLoading(true);
        console.log('✅ Start signup')
        try {
            if (isSignUp) {
                const user = new Parse.User();
                user.set('username', username);
                user.set('password', password);
                await user.signUp();
            }
            else {
                await Parse.User.logIn(username, password);
            }
            console.log('✅ Success')
            router.replace('/');
         }
        catch (error: any) {
            console.log('🆘 Error:', error);
            Alert.alert('Error', error.message);
        }
        finally {
            setLoading(false);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: Colors.grey,
        },
        authContainer: {
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 24,
            margin: 24,
            boxShadow: '0px 0px 10px #888888',
            backgroundColor: Colors.white,
            flex: 1,
            paddingTop: 40,
            paddingBottom: 40,
        },
        passwordContainer: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 15,
            height: 50,
        },
        title: {
            fontSize: 24,
            fontWeight: '600',
            marginBottom: 20,
            marginTop: 10,
            alignSelf: 'center',
        },
        input: {
            width: '100%',
            height: 50,
            padding: 10,
            marginBottom: 15,
        },
        passwordInput:
        {
            width: '100%',
            height: 50,
            padding: 10,
        },
        eye: {
            marginLeft: 12,
            padding: 10,
            color: Colors.black
        },
        btn: {
            width: '100%',
            padding: 15,
            backgroundColor: Colors.primary,
            alignItems: 'center',
            marginBottom: 15,
            alignSelf: 'flex-start',
        },
        btnText: {
            color: Colors.white,
        },
        border: {
            borderColor: Colors.primary,
            borderWidth: 2,
        },
        commonText: {
            fontWeight: 600,
            color: Colors.black,
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.authContainer}>
                <View style={{ width: '100%' }}>
                    <Text style={styles.title}>
                        {isSignUp ? 'Create Account' : 'Login'}
                    </Text>
                    <TextInput
                        style={[styles.commonText, styles.input, styles.border]}
                        placeholder='Login'
                        placeholderTextColor={Colors.placeholder}
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize='none'
                        onPress={() => {
                            setCurrentPlaceholder('login')
                        }}
                    />
                    <View style={[styles.passwordContainer, styles.border]}>
                        <TextInput
                            style={[styles.commonText, styles.passwordInput]}
                            placeholder='Password'
                            placeholderTextColor={Colors.placeholder}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!isPasswordVisible}
                        />
                        <Feather
                            style={styles.eye}
                            name="eye-off"
                            size={20}
                            onPress={() => {
                                setIsPasswordVisible(!isPasswordVisible)
                            }}
                        />
                    </View>
                    {
                        isSignUp ?
                            <View style={[styles.passwordContainer, styles.border]}>
                                <TextInput
                                    style={[styles.commonText, styles.passwordInput]}
                                    placeholder='Confirm password'
                                    placeholderTextColor={Colors.placeholder}
                                    value={confirmPassword}
                                    onChangeText={setconfirmPassword}
                                    secureTextEntry={!isConfirmPasswordVisible}
                                />
                                <Feather
                                    style={styles.eye}
                                    name="eye-off"
                                    size={20}
                                    onPress={() => {
                                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                                    }}
                                />
                            </View>
                            :
                            <Text/>
                    }
                </View>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={handleAuth}
                        disabled={loading}
                    >
                        {
                            loading ?
                                <ActivityIndicator color='fff'/>
                                :
                                <Text style={[styles.commonText, styles.btnText]}>
                                    {isSignUp ? 'Sign Up' : 'Login'}
                                </Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setIsSignUp(!isSignUp)
                        setIsPasswordVisible(!isPasswordVisible)
                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                        setconfirmPassword('')
                    }}>
                        <Text style={[styles.commonText]}>
                            {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

