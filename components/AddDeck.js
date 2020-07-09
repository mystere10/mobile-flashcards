import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { addDeck } from "../redux/actions";
import * as api from "../utils/api";
import * as common from "../utils/common";
import { primaryDark, primaryText, primary, secondaryDark, secondary, secondaryText } from "../utils/colors";

class AddDeck extends Component {

    state = {
        title: '',
        showMessage: '',
        temp: null

    }
    componentDidMount(){
        api.getDecks().then(result => this.setState({temp:result}))
    }
    static navigationOptions = {
        title: 'Add Deck',
    };

    handleTitle = (input) => {
        this.setState({ title: input })
    }

    toDeckView = (key) => {
        this.props.navigation.navigate("DeckView", { deckId: key })
    }

    onPress = () => {
        const { title } = this.state
        if (title.trim() !== "") {
            const key = common.generateKey()
            const newDeck = {
                title: title,
                questions: []
            }
            this.props.dispatch(addDeck(newDeck, key))
            
            api.AddDeck({ title: title, questions: [] }, key)

            this.toDeckView(key)

            this.setState(() => ({
                title: '',
                showMessage: ''
            }))
        } else {
            alert('Please a deck title')
        }
    }

    render() {
        const { title } = this.state

        return <View style={[styles.container]}>
            <Text style={styles.deckTitle}>Deck Title {title}</Text>

            <TextInput
                style={styles.input}
                value={title}
                onChangeText={this.handleTitle}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={this.onPress}
            >
                <Text style={{color:secondaryText}}> Create Deck </Text>
            </TouchableOpacity>
        </View>
    } 

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
        marginTop: 20,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    deckTitle:{
        marginBottom:20,
        fontSize:19,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title:{
        fontSize: 25,
        color:primaryText,
    },
    input:{
        padding:5,
        height:40,
        color:primaryText,
        borderColor:primaryDark,
        borderRadius: 4,
        borderWidth: 1,
        fontSize:19
    },
    button:{
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:secondary,
        backgroundColor: '#130f40',
        color:secondaryText,
        borderRadius: 4,
        borderWidth: 1,
        fontSize:19
    }
  });

export default connect()(AddDeck)
