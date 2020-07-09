import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { connect } from "react-redux";
import { primary, secondary, secondaryText, primaryText, primaryDark, primaryLight, white, } from "../utils/colors";
import { setLocalNotification, clearLocalNotification } from "../utils/common";

class StartQuiz extends Component {
    state = {
        deck: null,
        numberOfQuestions: 0,
        currentQuestion: 0,
        correctAnswer: 0,
        incorrectAnswer: 0,
        showAnswer: false,
        opacity: new Animated.Value(0),
        width: new Animated.Value(0),
        height: new Animated.Value(0),
    }
    static navigationOptions = {
        title: 'Start Quiz',
    };

    componentDidUpdate(){
        const { currentQuestion, numberOfQuestions } = this.state
        if (currentQuestion > numberOfQuestions) {
            clearLocalNotification().then(setLocalNotification)
        }
    }

    componentDidMount() {

        const { decks, navigation } = this.props

        let deckId = navigation.getParam("deckId")
        let deck = decks[deckId]

        let numberOfQuestions = deck.questions.length

        this.setState({
            deck: deck,
            numberOfQuestions: numberOfQuestions,
            currentQuestion: numberOfQuestions === 0 ? 0 : 1,
        })
    }


    onPressCorrect = () => {
        this.setState((prevState) => ({
            correctAnswer: prevState.correctAnswer + 1,
            currentQuestion: prevState.currentQuestion + 1,
            showAnswer: false,
            width: new Animated.Value(0),
            height: new Animated.Value(0)
        }))
    }

    onPressIncorrect = () => {
        this.setState((prevState) => ({
            incorrectAnswer: prevState.incorrectAnswer + 1,
            currentQuestion: prevState.currentQuestion + 1,
            showAnswer: false,
            width: new Animated.Value(0),
            height: new Animated.Value(0)
        }))
    }

    onPressShowAnswer = () => {
        const { width, height } = this.state

        this.setState((prevState) => ({
            showAnswer: !prevState.showAnswer
        }),() => {
            Animated.spring(width, { toValue:380, speed:10})
            .start()
            Animated.spring(height, { toValue:100, speed:5})
            .start()
        })
    }

    onPressRestartQuiz = () => this.setState({
        currentQuestion : 1,
        correctAnswer: 0,
        incorrectAnswer: 0
    })

    onPressGoBack = () => this.props.navigation.goBack()
    calculateResult = () => ((this.state.correctAnswer / this.state.numberOfQuestions) * 100).toFixed(2)

    render() {
        const { deck, numberOfQuestions, currentQuestion, showAnswer, width,height } = this.state

        return <View style={styles.container}>

            {numberOfQuestions === 0 &&
                (<Text>No card found</Text>)
            }

            {currentQuestion > numberOfQuestions &&
                <View>
                    <Text style={styles.title}>your score {this.calculateResult()}%</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onPressRestartQuiz}
                    >
                    <Text> Restart Quiz </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onPressGoBack}
                    >
                    <Text > Go Back </Text>
                    </TouchableOpacity>
                </View>
            }

            {currentQuestion <= numberOfQuestions && numberOfQuestions !== 0 &&
                <View>
                    <Text>{currentQuestion} / {numberOfQuestions}</Text>
                    {!showAnswer
                        ? <Text style={[styles.item]}>Question: {deck.questions[currentQuestion - 1].question}</Text>
                        : <Animated.Text style={[styles.item,{width,height}]}>Answer: {deck.questions[currentQuestion - 1].answer}</Animated.Text>
                    }
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onPressShowAnswer}
                    >
                    <Text style={{color: white}}> ShowAnswer </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onPressCorrect}
                    >
                    <Text style={{color: white}}> CORRECT </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onPressIncorrect}
                    >
                    <Text style={{color: white}}> INCORRECT </Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    item: {
        backgroundColor: primaryLight,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:primaryDark,
        borderRadius: 4,
        borderWidth: 1,
    },
    title:{
        fontSize: 25,
        color:primaryText,
        padding: 20,
    },

    button:{
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:secondary,
        backgroundColor:'#130f40',
        color:secondaryText,
        borderRadius: 4,
        borderWidth: 1,
        fontSize:19
    }
  });

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(StartQuiz)
