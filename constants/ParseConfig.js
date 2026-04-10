import Parse from 'parse/react-native.js'
import AsyncStorage from '@react-native-async-storage/async-storage'

Parse.setAsyncStorage(AsyncStorage)
Parse.initialize(
    'tpCoPv1KmLv0UGPpLg491MSgl8N0XJwOtOGuTdBk', // App ID
    '3hFXxSGLSH5Ht6eHfNtL6yUAH8u8wNaFXUBXVCCO'  // JS Key
)

Parse.serverURL = 'https://parseapi.back4app.com'
export default Parse