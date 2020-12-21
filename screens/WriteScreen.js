import React from 'react'; 
import { StyleSheet, Text, View,TextInput,TouchableOpacity,ScrollView,KeyboardAvoidingView,ToastAndroid,Image} from 'react-native'; 
import firebase from 'firebase';
import db from '../config.js';

export default class WriteStoriesScreen extends React.Component{

    constructor(){
        super();

        this.state = ({
            title:'',
            author:'',
            story:'',            
        })
    }


    submitStory=async()=>{
        db.collection('stories').add({
            name:this.state.title,
            author:this.state.author,
            story:this.state.story,
            date: firebase.firestore.Timestamp.now().toDate(),
    
          });
ToastAndroid.show("Awesome!You have published your Very First Story!",ToastAndroid.SHORT);   

    }

    render(){
        return(
            <View style={{height:1300}}>

            <KeyboardAvoidingView  style = {styles.container} behavior = "padding" enabled/>

            <TextInput style={styles.textIntro}
                placeholder = "Story Title"
                onChangeText={(text)=>{
                    this.setState({title:text.trim().toLowerCase()})
                }}
                value = {this.state.title}
            />

            <TextInput style={styles.textIntro}
                placeholder = "Author"
                onChangeText={(text)=>{
                    this.setState({author:text.trim().toLowerCase()})
                }}
                value = {this.state.author}
            />

            <TextInput  style={styles.textInput} 
                placeholder = "WriteStory here"
                onChangeText={(text)=>{
                    this.setState({story:text})
                }}
                value = {this.state.story}
            />

            <TouchableOpacity onPress = {this.submitStory()} style={styles.button}>
            <Text>Submit</Text>
            </TouchableOpacity>
    
        </View>
        )
    }
}


const styles=StyleSheet.create({
  container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
       },
  textIntro:{
    borderWidth:4,
    borderRadius:2,
    height:50,
    width:1300,
    margin:30
  },  
  textInput:{
       borderWidth:4,
       borderRadius:2,
       height:200,
       width:1300,
       marginLeft:30,
       marginRight:30
  },
  button:{
   backgroundColor:"green",
   borderWidth:2,
   borderRadius:20,
   marginTop:30,
   alignItems:"center",
   justifyContent:"center",
   width:100,
   height:45,
   marginLeft:650
  }
})