import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity,Image} from 'react-native';
import db from '../config'
import writeScreen from './WriteScreen';




export default class Searchscreen extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        allStories: [],
        lastVisibleStory: null,
        search:''
      }
    }

    fetchMoreTransactions = async ()=>{
      var text = this.state.search.toUpperCase()
      var enteredText = text.split("")

      
      if (enteredText[0].toUpperCase() === writeScreen.state.title){
      const query = await db.collection("stories").where('name','==',text).startAfter(this.state.lastVisibleStory).limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allStories: [...this.state.allStories, doc.data()],
          lastVisibleStory: doc
        })
      })
    }
      else if(enteredText[0].toUpperCase() === writeScreen.state.author){
        const query = await db.collection("stories").where('author','==',text).startAfter(this.state.lastVisibleStory).limit(10).get()
        query.docs.map((doc)=>{
          this.setState({
            allStories: [...this.state.allStories, doc.data()],
            lastVisibleStory: doc
          })
        })
      }
  }

    searchTransactions= async(text) =>{
      var enteredText = text.split("")  
      if (enteredText[0].toUpperCase() ===writeScreen.state.title){
        const story =  await db.collection("stories").where('name','==',text).get()
        story.docs.map((doc)=>{
          this.setState({
            allStories:[...this.state.allStories,doc.data()],
            lastVisibleStory: doc
          })
        })
      }
      else if(enteredText[0].toUpperCase() === writeScreen.state.author){
        const story = await db.collection('stories').where('author','==',text).get()
        story.docs.map((doc)=>{
          this.setState({
            allStories:[...this.state.allStories,doc.data()],
            lastVisibleStory: doc
          })
        })
      }
    }

    componentDidMount = async ()=>{
      const query = await db.collection("stories").limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allStories: [],
          lastVisibleStory: doc
        })
      })
    }
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.searchBar}>
        <TextInput 
          style ={styles.bar}
          placeholder = "Enter The Story Or Author Name"
          onChangeText={(text)=>{this.setState({search:text})}}/>
          <TouchableOpacity
            style = {styles.searchButton}
            onPress={()=>{this.searchTransactions(this.state.search)}}
          >
            <Text>Search</Text>
          </TouchableOpacity>
          </View>
        <FlatList
          data={this.state.allStories}
          renderItem={({item})=>(
            <View style={{borderBottomWidth: 2}}>
              <Text>{"Title : " + item.name}</Text>
              <Text>{"Autor : " + item.author}</Text>
              <Text>{"Date: " + item.date.toDate()}</Text>
            </View>
          )}
          keyExtractor= {(item, index)=> index.toString()}
          onEndReached ={this.fetchMoreTransactions}
          onEndReachedThreshold={0.7}
        /> 
        </View>
      );
    }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20
    },
    searchBar:{
      flexDirection:'row',
      height:40,
      width:'auto',
      borderWidth:0.5,
      alignItems:'center',
      backgroundColor:'grey',
  
    },
    bar:{
      borderWidth:2,
      height:30,
      width:300,
      paddingLeft:10,
    },
    searchButton:{
      borderWidth:1,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'green'
    }
  })