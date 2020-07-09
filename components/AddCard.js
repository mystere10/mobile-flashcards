import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { addQuetionToDeck } from "../redux/actions";
import * as api from "../utils/api";
import { primaryText, primaryDark, secondary,secondaryText, white } from "../utils/colors";
import { setLocalNotification, clearLocalNotification } from "../utils/common";

class AddCard extends Component {
    state = {
        answer: '',
        question: ''
    }
    static navigationOptions = {
        title: 'Add Card',
    };

    handleAnswer = (input) => this.setState({ answer: input })
    handleQuestion = (input) => this.setState({ question: input })


    onPress = () => {

        const { navigation, dispatch} = this.props
        const deckId =  this.props.navigation.getParam('deckId')

        let {question, answer} = this.state

        if (question.trim() !== "" && answer.trim() !== "") {

        dispatch(addQuetionToDeck({ question, answer }, deckId))
        api.AddCardToDeck({question, answer}, deckId)

        clearLocalNotification()
        .then(setLocalNotification)

        navigation.navigate("DeckView", deckId)
        }else{
            alert('please enter values')
        }
    }

    render() {
        const { answer, question } = this.state

        return <View style={styles.container}>

            <TextInput
                style={styles.input}
                value={question}
                placeholder="Question"
                onChangeText={this.handleQuestion}
            />
            <TextInput
                style={styles.input}
                value={answer}
                placeholder="Answer"
                onChangeText={this.handleAnswer}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={this.onPress}
            >
            <Text style={{color: white}}> Add Card </Text>
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
    input:{
        padding:5,
        height:40,
        color:primaryText,
        borderColor:primaryDark,
        borderRadius: 4,
        borderWidth: 1,
        fontSize:19
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
        fontSize:19,
        marginVertical: 8,
        marginHorizontal: 16,
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
})

export default connect()(AddCard)
