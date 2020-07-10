import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { addQuetionToDeck } from "../redux/actions";
import { setLocalNotification, clearLocalNotification } from "../utils/helper";
import {__AddCardToDeck} from "../utils/api";
import { white, purple } from "../utils/colors";

class AddCard extends Component {
    state = {
        answer: '',
        question: '',
        disableButton: true,
    }

    handleAnswer = (input) => this.setState({ answer: input.toLowerCase() })
    handleQuestion = (input) => this.setState({ question: input })

    onCreateCard = () => {
        const  {question, answer} = this.state
        const { navigation, dispatch} = this.props
        const deckId =  this.props.navigation.getParam('deckId')
        dispatch(addQuetionToDeck({ question, answer }, deckId))
        __AddCardToDeck({question, answer}, deckId)

        clearLocalNotification()
        .then(setLocalNotification)

        navigation.navigate("DisplayDeck", deckId)
    }

    render() {
        const { answer, question } = this.state

        return <View style={styles.container}>

            <TextInput
                style={styles.inputField}
                placeholder="Question"
                value={question}
                onChangeText={this.handleQuestion}
            />
            <TextInput
                style={styles.inputField}
                placeholder="Answer"
                value={answer}
                onChangeText={this.handleAnswer}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={this.onCreateCard}
                disabled={answer === '' || question === '' ? true : false}
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
    inputField: {
        height: 45,
        marginVertical: 5,
        padding: 5,
        borderWidth: 1,
        borderColor: purple,
        borderRadius: 2,
    },
    button: {
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: purple,
        borderRadius: 5,
        height: 40
    }
})

export default connect()(AddCard)
