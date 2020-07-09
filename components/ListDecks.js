import React,{Component} from "react";
import { View,Text, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import DeckItem from "./DeckItem";  

class ListDecks extends Component{

    static navigationOptions = {
        title: 'Decks',
        fontSize: 100
    };

    render(){

        const { deckIds } = this.props
        
        return <View style={styles.container}>
                <FlatList
                    data={deckIds}
                    renderItem={({ item }) => (
                    <DeckItem
                        id={item}
                        navigator={this.props.navigation}
                    />
                    )}
                    keyExtractor={item => item}
                />
            </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    title: {
        fontSize: 32,
    },
  });

function mapStateToProps(decks){
  
    return {
        deckIds:Object.keys(decks)
    }
}
export default connect(mapStateToProps)(ListDecks)
