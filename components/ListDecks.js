import React,{Component} from "react";
import { connect } from "react-redux";
import { View, StyleSheet, FlatList } from "react-native";
import DeckCard from "./DeckCard";  

class ListDecks extends Component{

    static navigationOptions = {
        title: 'Decks',
    };

    render(){
        const { deckIds, navigation } = this.props

        return <View style={styles.container}>
                <FlatList
                    data={deckIds}
                    renderItem={({ item }) => (
                    <DeckCard
                        id={item}
                        navigator={navigation}
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
        marginTop: 10
    }
  });

function mapStateToProps(decks){
  
    return {
        deckIds: Object.keys(decks)
    }
}
export default connect(mapStateToProps)(ListDecks)
