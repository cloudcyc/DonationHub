import * as React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions, ScrollView, TextInput, Button, TouchableOpacity,Pressable,FlatList } from 'react-native';

function HomeScreen ({navigation}) {
    const [centreList, setcentreList] = React.useState([]);
    const getActiveCentreAPI = 'https://3yerh8al29.execute-api.ap-southeast-1.amazonaws.com/dev/centres?inputCentreStatus=Active';
    const getCentreList = () => {
        fetch(getActiveCentreAPI).then((response) => response.json()).then((json) => { 
            setcentreList(json);
        }).catch((error) => {
            console.error(error);
        });
    }

    React.useEffect(() => {
        getCentreList();
        
    },[]);
    return(
        // <ScrollView style={styles.root}>
        <View style={styles.root}>
            <View style={styles.containerSearch}>
                <TextInput placeholder='Search Donate Centre'/>
            </View>
            <FlatList 
                        style={styles.list}
                        data={centreList}
                        keyExtractor= {(key) => {
                            return key.centreID;
                        }}
                        ItemSeparatorComponent={() => {
                            return (
                                <View style={styles.separator}/>
                            )
                        }}
                        renderItem={({item}) => {
                            return (
                                
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('LocationDetails',item)}
                                    style={styles.roundButton}>
                                    <Image style={styles.icon} source={{
                                        uri:'https://nics3test8860.s3.ap-southeast-1.amazonaws.com/DonationCentreAsset/'+[item.centreID]+'.jpg',
                                    }}/>
                                    <Text style={styles.locationtitle}>{item.centreName}</Text>
                                    {/* <Text style={styles.locationtitle2}>Phone:      03-2118 8833</Text> */}
                                    <Text style={styles.locationtitle2}>Location:  {item.centreAddress}</Text>
                                </TouchableOpacity>
                            )
                        }}
            >
            </FlatList> 
        </View>  
        // </ScrollView>
    )
};

const styles = StyleSheet.create({

    root:{
        padding:20,
        height:'100%',
    },

    roundButton: {
        width: '100%',
        height: 270,
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 10,
    },

    icon: {
        width:'100%',
        height:150,
        borderRadius:5,
        paddingBottom:5,
    },

    locationtitle: {
        fontWeight:'500',
        padding:5,
        paddingTop: 8,
        fontSize:18
    },

    locationtitle2: {
        fontWeight:'500',
        padding:5,
        paddingTop: 5,
        color:'grey'
    },

    containerSearch:{
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 8,
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
        marginBottom:20,
    },
    //List Design
    list: {
        paddingHorizontal: 17,
        backgroundColor:"#E6E6E6",
      },
    separator: {
        marginTop: 10,
    }

});



export default HomeScreen;