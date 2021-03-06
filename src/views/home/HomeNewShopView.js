import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    ActivityIndicator,
    TouchableHighlight,
} from 'react-native';
import Image from 'react-native-image-progress';

export default class HomeNewShopView extends Component{
   
    constructor(props){
        super(props);
    }

    render(){
        let item = this.props.imageOneItem;
        let commonWidth =  Dimensions.get('window').width/2 - 10;
        return (
            <View style={[this.props.borderStyles,styles.container]}>
                <Text style={[this.props.headColorStyles,styles.head]} >{item.head}</Text>
                <Text style={[styles.subTitle,this.props.subTitleStyles]} numberOfLines={1}>{item.subTitle}</Text>
                <View style={styles.midImage}>
                    <View style={{padding:5,backgroundColor:'rgba(0,0,0,0.03)'}}>
                         <Image source={{ uri:item.image }} resizeMode='contain' style={{ width: commonWidth*0.63 - 10, height: 80 }} />
                    </View>
                   <View style={styles.rightImage}>
                        <View style={{margin:2,padding:3,backgroundColor:'rgba(0,0,0,0.03)'}}>
                            <Image source={{ uri:item.secondImage }} resizeMode='contain' style={{ width: commonWidth*0.35 - 10, height: 37 }} />
                        </View>
                        <View style={{margin:2,padding:3,backgroundColor:'rgba(0,0,0,0.03)'}}>
                            <Image source={{ uri:item.thirdImage }} resizeMode='contain' style={{width: commonWidth*0.35 - 10, height: 37 }} />
                        </View>    
                   </View>
                </View>
                <View style={styles.bottomView}>
                    <Text style={styles.bottomTitle}>{item.shopName}</Text>
                </View>
            </View> 
        );
    }

}
 
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        // justifyContent: 'space-between',
        paddingLeft:5,
        paddingRight:5,
        paddingTop:8,
        paddingBottom:5,
    },
    head:{
        width:'100%',
        fontSize:14,
        paddingBottom:3,
    },
    subTitle:{
        width:'100%',
        fontSize:11,
        // backgroundColor:'red',
        paddingBottom:3,
    },
    midImage:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    rightImage:{
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    bottomView:{

    },
    special:{
        fontSize:10,
        paddingLeft:3,
        paddingRight:3,
        paddingBottom:1,
        paddingTop:1,
        color:'#ffffff'
    },
    bottomTitle:{
        color:'#444',
        fontSize:12,
        paddingTop:5,
    },
});