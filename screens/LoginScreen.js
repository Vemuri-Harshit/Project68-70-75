import React from 'react';
import { Text, View, TouchableOpacity,TextInput,Image,StyleSheet,KeyboardAvoidingView,Alert} from 'react-native';
import * as firebase from 'firebase';
import db from '../config.js';

export default class LoginScreen extends React.Component{

    constructor(){
        super();
        this.state={
            email:'',
            password:'',
        }
    }

    login=async(email,passoword)=>{
        if(email && password){
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(email,password);
                 if(response){
                this.props.navigation.navigate('Write');
                            }
            }
            catch(error){
                switch(error.code){
                    case 'auth/user-not-found':Alert.alert("User Does Not exist");
                    break;

                    case 'auth/invalid-email':Alert.alert("Incorrect Email/Password");
                    break;
                }
            }

        }
        else{
            Alert.alert("Please Enter email and Password");
        }

}

    render(){
        return(
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                <View>
                    <Image source={require("../assets/read.png")} style={styles.image}/>
                    <Text style={{textAlign:'center',fontSize:30}}>Story Hub</Text>
                </View>

                <View>
                    <TextInput style={styles.loginBox} placeholder="abc@example.com" keyboardType="email-address" onChangeText={(text)=>{this.setState({email:text})}}/>
                    <TextInput style={styles.loginBox} placeholder="Enter Password" secureTextEntry={true} onChangeText={(text)=>{this.setState({password:text})}}/>
                </View>

                <View>
                    <TouchableOpacity style={styles.loginButton} onPress={()=>{this.login(this.state.email,this.state.password)}}><Text style={styles.text}>Login</Text></TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }


}

const styles = StyleSheet.create({
   loginBox:{
       width:300,
       height:40,
       borderWidth:1.5,
       fontSize:20,
       margin:10,
       paddingLeft:10,
   },
   loginButton:{
    width:90,
    height:30,
    borderWidth:1,
    fontSize:20,
    marginTop:20,
    paddingTop:20,
    borderRadius:7,
},
  image:{
    width:200,
    height:200
  },
  keyboardAvoidingView:{
    alignItems:'center',
    marginTop:20
  },
  text:{
    textAlign:'center',
  }

})