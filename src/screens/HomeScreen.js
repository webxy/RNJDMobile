
import React, { Component } from 'react'
import { 
    View, 
    Text, 
    StyleSheet,
    ScrollView, 
    TouchableOpacity, 
    TouchableHighlight,
    StatusBar,
    Animated,
    Dimensions,
    RefreshControl
} from 'react-native'
// import NavigationBar from "../widget/NavigationBar";
import NavigatorOpacityBar from "../widget/NavigatorOpacityBar";
import Swiper from '../widget/Swiper';
import Image from 'react-native-image-progress'; 
import RNSwiper from 'react-native-3d-swiper';
import Carousel from 'react-native-snap-carousel';
import Toast from 'react-native-root-toast';
import SplashScreen from 'react-native-splash-screen';

import * as IConstants from '../widget/IConstants';
import HomeHeaderView from "../views/home/HomeHeaderView";
import HomeFastNewsView from "../views/home/HomeFastNewsView";
import HomeSeckillView from "../views/home/HomeSeckillView";
import HomeSecondOneView from "../views/home/HomeSecondOneView";
import HomeSecondTwoView from "../views/home/HomeSecondTwoView";
import HomeSecondThreeView from "../views/home/HomeSecondThreeView";
import HomeRightOneView from "../views/home/HomeRightOneView";
import HomeNewShopView from "../views/home/HomeNewShopView";

import backtoTop from '../assets/images/backtop.png';
import droptoRec from '../assets/images/drop.png';


// create a component
export  default class HomeScreen extends Component {
    
    // _scrollView = ScrollView;
    constructor(props) {
        super(props)

        this.state = {
            timerValue: new Animated.Value(0),
            scrollY: new Animated.Value(0),
            scrollOffset:0,
            isRefreshing:false,
            currentTime:'',
            headImageList:IConstants.headerImageList,
            menuButtonList:IConstants.menuButtonList,
            fastNewsList:IConstants.fastNewsList,
            secKillList:IConstants.secKillList,
            foundLiveList:IConstants.foundLiveList,
            loveLiveList:IConstants.loveLiveList,
            enjoyQualityList:IConstants.enjoyQualityList,
            twoFirstImageList:IConstants.twoFirstImageList,
            goShoppingList:IConstants.goShoppingList,
            twoSecondImageList:IConstants.twoSecondImageList
        }
        this.endTime = new Date(Date.now() + (3600 * 1000));
    }

    componentDidMount() {
        this.startOpacityAnimation(); 
        //当前时间
        var nowTime = new Date();//(new Date()).valueOf();
        nowTime = nowTime.getHours();
        console.log('当前时间'+nowTime);
        this.setState({currentTime:nowTime});
        
        SplashScreen.hide()
    }

    render() {
        let KscreenWidth = Dimensions.get('window').width;
        let backgroundColor = this.state.scrollY.interpolate({
            inputRange:[0,80],
            outputRange:['transparent','rgb(245,245,245)'],
            extrapolate:'clamp',
        });
        let headView = <HomeHeaderView changedY={this.state.scrollOffset} intelligentVoice={()=>{this.intelligentVoice()}} scanTapped={()=>{this.scanTapped()}} />
        return (
            <View style={styles.container}>
                <Animated.ScrollView style={styles.scrollViewStyle}
                    ref={'_scrollView'}
                    showsVerticalScrollIndicator={false}
                    directionalLockEnabled={true}
                    //onScroll={(event)=>{this.setState({scrollOffset:event.nativeEvent.contentOffset.y})}} 
                    onScroll={Animated.event(
                        [{nativeEvent:{contentOffset:{y:this.state.scrollY}}}],
                        { 
                            //useNativeDriver:true 
                            listener:event=>{
                                this.setState({scrollOffset:event.nativeEvent.contentOffset.y});
                            }
                        } 
                    )}
                    scrollEventThrottle={15}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => {
                                this.setState({isRefreshing: true});
                                setTimeout(()=>{
                                    this.setState({isRefreshing: false});
                                },1500)
                            }}
                            tintColor={'#ff1122'}
                            title={this.state.isRefreshing ? '刷新中....' : '下拉刷新'}
                            titleColor={'#170c08'}
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor={'#fafafa'}
                        />
                    }
                >
                    <Swiper style={styles.swiper} width={KscreenWidth} height={160} showsPagination={true} paginationStyle={{ bottom: 3 }}  autoplay = {true} loop = {true}
                            dot={<View style={{backgroundColor:'#e7e7e7', width: 6, height: 2, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}  
                            activeDot={<View style={{backgroundColor: 'transparent', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, borderStyle:'solid',borderColor:'#ffffff',borderWidth:2}} />}
                            >
                        {
                            this.state.headImageList.map((item, index) => <TouchableHighlight key={index} style={{ flex: 1 }} onPress={() => { this.headImageTapped(item) }}>
                                <View style={{ flex: 1 }}>     
                                    <Image source={{ uri: item.img }} 
                                           style={{ width: KscreenWidth, height: 160 }} 
                                    />
                                </View>
                            </TouchableHighlight>)
                        }
                    </Swiper>
                    {/* menuButton */}
                    <Swiper loop={false} style={styles.swiper} height={150} showsPagination={true} paginationStyle={{ bottom: 2 }} 
                            dot={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 6, height: 6,borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}  
                            activeDot={<View style={{backgroundColor: '#555', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />} 
                            >
                        <View style={styles.slide}>
                            {
                                this.state.menuButtonList.map((item, index) => <TouchableOpacity key={index} style={{ width:KscreenWidth/5 }} onPress={() => { this.menuTapped(index) }}>
                                    <View style={styles.slideItem}>
                                        <Image source={{uri:item.image}} style={styles.slideItemImage} />
                                        <Text style={styles.slideItemTitle}>{item.title}</Text>
                                    </View>
                                </TouchableOpacity>)
                            }
                        </View>
                        <View style={styles.slide}>
                            {
                                this.state.menuButtonList.map((item, index) => <TouchableOpacity key={index} style={{ width:KscreenWidth/5 }} onPress={() => { this.menuTapped(index) }}>
                                <View style={styles.slideItem}>
                                    <Image source={{uri:item.image}} style={styles.slideItemImage} />
                                    <Text style={styles.slideItemTitle}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>)
                            }
                        </View>
                    </Swiper>
                    {/* 京东快报 */}
                       <HomeFastNewsView  fastNewsList={this.state.fastNewsList} />
                    {/* 秒杀 */}
                      <HomeSeckillView  secKillList={this.state.secKillList} currentTime={this.state.currentTime} endTime={this.endTime} moreSecTapped={this.moreSecKillTapped.bind(this)} />
                    {/* 发现 */}
                    <View style={{ flexDirection: 'row',alignItems: 'center'}}>
                       <Animated.View style={[
                                {
                                    opacity: this.state.timerValue.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, 1]
                                        })
                                }]}>
                                {
                                  <HomeSecondTwoView  headColorStyles={{color:'rgb(89,204,127)'}} subTitleStyles={{color:'#666'}} borderStyles={{borderRightWidth:1,borderTopWidth:1,borderBottomWidth:1,borderColor: 'rgba(0,0,0,0.05)'}} imageTwoItem={this.state.foundLiveList[0]} />
                                }
                        </Animated.View>
                        <Animated.View style={[
                                {
                                    opacity: this.state.timerValue.interpolate({
                                            inputRange: [1, 2],
                                            outputRange: [0, 1]
                                        })
                                }]}>
                                {
                                    <HomeSecondOneView  headColorStyles={{color:'orange'}} subTitleStyles={{color:'#666'}} borderStyles={{borderRightWidth:1,borderTopWidth:1,borderBottomWidth:1,borderColor: 'rgba(0,0,0,0.05)'}} imageOneItem={this.state.foundLiveList[1]} />
                                }
                        </Animated.View>
                        <Animated.View style={[
                                {
                                    opacity: this.state.timerValue.interpolate({
                                            inputRange: [2, 3],
                                            outputRange: [0, 1]
                                        })
                                }]}>
                                {
                                    <HomeSecondOneView  headColorStyles={{color:'orange'}} subTitleStyles={{color:'#666'}} borderStyles={{borderTopWidth:1,borderBottomWidth:1,borderColor: 'rgba(0,0,0,0.05)'}} imageOneItem={this.state.foundLiveList[2]} /> 
                                }
                        </Animated.View>
    
                    </View>
                    <View style={{ flexDirection: 'row',alignItems: 'center'}}>
                        <Animated.View style={[
                                    {
                                        opacity: this.state.timerValue.interpolate({
                                                inputRange: [3, 4],
                                                outputRange: [0, 1]
                                            })
                                    }]}>
                                    {
                                        <HomeSecondTwoView  headColorStyles={{color:'red'}} subTitleStyles={{color:'#666'}} borderStyles={{borderRightWidth:1,borderBottomWidth:1,borderColor: 'rgba(0,0,0,0.05)'}} imageTwoItem={this.state.foundLiveList[3]} />
                                    }
                        </Animated.View>
                        <Animated.View style={[
                                    {
                                        opacity: this.state.timerValue.interpolate({
                                                inputRange: [4, 5],
                                                outputRange: [0, 1]
                                            })
                                    }]}>
                                    {
                                        <HomeSecondOneView  headColorStyles={{color:'rgb(199,89,72)'}} subTitleStyles={{color:'#666'}} borderStyles={{borderRightWidth:1,borderBottomWidth:1,borderColor: 'rgba(0,0,0,0.05)'}} imageOneItem={this.state.foundLiveList[4]} />
                                    }
                        </Animated.View>
                        <Animated.View style={[
                                    {
                                        opacity: this.state.timerValue.interpolate({
                                                inputRange: [5, 6],
                                                outputRange: [0, 1]
                                            })
                                    }]}>
                                    {
                                        <HomeSecondOneView  headColorStyles={{color:'rgb(199,89,72)'}} subTitleStyles={{color:'#666'}} borderStyles={{borderBottomWidth:1,borderColor: 'rgba(0,0,0,0.05)'}} imageOneItem={this.state.foundLiveList[5]} />   
                                    }
                        </Animated.View>
              
                    </View>
                    {/* 爱生活 */}
                    <View style={{ justifyContent: 'center',alignItems:'center', width:'100%',height:35,backgroundColor:'rgba(0,0,0,0.05)'}}>
                        <Image source={{uri:'https://m.360buyimg.com/mobilecms/jfs/t2878/152/3484829401/8909/e1cf0ca/578de36bNae7bb54a.png!q70.jpg'}} 
                               style={{width:60,height:18}} 
                        />
                    </View>
                    <View style={{ flexWrap: 'wrap',flexDirection: 'row'}}>
                        {
                            this.state.loveLiveList.slice(0,4).map((item, index)=> <TouchableOpacity key={index} style={{width:KscreenWidth/2 }} onPress={() => { this.liveImageTapped(item) }}>
                                 <HomeSecondTwoView  headColorStyles={{color:'#444'}} subTitleStyles={{color:'rgba(223,92,78,0.7)'}} specialStyle={{backgroundColor:'rgb(223,92,78)'}} borderStyles={{borderRightWidth:1,borderTopWidth:1,borderColor: 'rgba(0,0,0,0.05)'}} imageTwoItem={item} /> 
                            </TouchableOpacity>)
                        }
                    </View>
                    <View style={{ flexDirection: 'row',alignItems: 'center'}}>
                        {
                            this.state.loveLiveList.slice(4,8).map((item, index)=> <TouchableOpacity key={index} style={{ flex: 1 }} onPress={() => { this.liveImageTapped(item) }}>
                               <HomeSecondOneView  headColorStyles={{color:'#444'}} subTitleStyles={{color:'rgba(223,92,78,0.7)'}} specialStyle={{backgroundColor:'rgb(223,92,78)'}} borderStyles={{borderBottomWidth:1,borderRightWidth:1,borderTopWidth:1,borderColor: 'rgba(0,0,0,0.05)'}} imageOneItem={item} /> 
                            </TouchableOpacity>)
                        }   
                    </View>
                    {/* 轮循 */}
                    <Swiper style={styles.swiper} width={KscreenWidth} height={90} showsPagination={true} paginationStyle={{ bottom: 5 }}  autoplay = {true} loop = {true} dotColor="#e7e7e7" activeDotColor={"#fff"} >
                        {
                            this.state.twoFirstImageList.map((item, index) => <TouchableOpacity key={index} style={{ flex: 1 }} onPress={() => { this.headImageTapped(item) }}>
                                <View style={{ flex: 1 , padding:7,backgroundColor:'rgba(0,0,0,0.05)'}}>     
                                    <Image source={{ uri: item.img }} style={{ width: (KscreenWidth - 14), height: 76 ,borderRadius:7}} />
                                </View>
                            </TouchableOpacity>)
                        }
                    </Swiper>
                    {/* 享品质 */}
                    <View style={{ justifyContent: 'center',alignItems:'center', width:'100%',height:35,backgroundColor:'rgba(0,0,0,0.05)'}}>
                            <Image source={{uri:'https://m.360buyimg.com/mobilecms/jfs/t3910/235/1201548030/8292/e6734ea8/586c5dfdNe496351a.png!q70.jpg'}} 
                                style={{width:60,height:18}} 
                            />
                    </View>
                    <View style={{ flexWrap: 'wrap',flexDirection: 'row'}}>
                        {
                            this.state.enjoyQualityList.slice(0,4).map((item, index)=> <TouchableOpacity key={index} style={{width:KscreenWidth/2 }} onPress={() => { this.liveImageTapped(item) }}>
                                 <HomeSecondThreeView  headColorStyles={{color:'#444'}} subTitleStyles={{color:'rgba(44,86,246,0.7)'}} specialStyle={{backgroundColor:'rgb(44,86,246)'}} borderStyles={{borderRightWidth:1,borderTopWidth:1,borderColor: 'rgba(0,0,0,0.05)'}} imageTwoItem={item} /> 
                            </TouchableOpacity>)
                        }
                    </View>
                    <View style={{ flexDirection: 'row',alignItems: 'center'}}>
                        {
                            this.state.enjoyQualityList.slice(4,8).map((item, index)=> <TouchableOpacity key={index} style={{ flex: 1 }} onPress={() => { this.liveImageTapped(item) }}>
                               <HomeSecondOneView  headColorStyles={{color:'#444'}} subTitleStyles={{color:'rgba(44,86,246,0.7)'}} specialStyle={{backgroundColor:'rgb(44,86,246)'}} borderStyles={{borderBottomWidth:1,borderRightWidth:1,borderTopWidth:1,borderColor: 'rgba(0,0,0,0.05)'}} imageOneItem={item} /> 
                            </TouchableOpacity>)
                        }   
                    </View>
                    
                    {/* 逛商场 */}
                    <View style={{ justifyContent: 'center',alignItems:'center', width:'100%',height:35,backgroundColor:'rgba(0,0,0,0.05)'}}>
                            <Image source={{uri:'https://m.360buyimg.com/mobilecms/jfs/t2677/290/3439129728/9956/4d607f09/578de9fcNb59b6153.png!q70.jpg'}} 
                                style={{width:60,height:18}} 
                            />
                    </View>
                    <View style={{ flexWrap: 'wrap',flexDirection: 'row'}}>
                        {
                            this.state.goShoppingList.slice(0,4).map((item, index)=> <TouchableOpacity key={index} style={{width:KscreenWidth/2 }} onPress={() => { this.liveImageTapped(item) }}>
                               <HomeRightOneView  headColorStyles={{color:'#444'}} subTitleStyles={{color:'rgba(142,34,233,0.8)'}} specialStyle={{backgroundColor:'rgb(44,86,246)'}} borderStyles={{borderBottomWidth:1,borderRightWidth:1,borderColor: 'rgba(0,0,0,0.05)'}} imageOneItem={item} /> 
                            </TouchableOpacity>)
                        }   
                    </View>
                    <View style={{ flexWrap: 'wrap',flexDirection: 'row'}}>
                        {
                            this.state.goShoppingList.slice(4,12).map((item, index)=> <TouchableOpacity key={index} style={{width:KscreenWidth/4 }} onPress={() => { this.liveImageTapped(item) }}>
                               <HomeSecondOneView  headColorStyles={{color:'#444'}} subTitleStyles={{color:'rgba(142,34,233,0.8)'}} specialStyle={{backgroundColor:'rgb(142,34,233)'}} borderStyles={{borderBottomWidth:1,borderRightWidth:1,borderColor: 'rgba(0,0,0,0.05)'}} imageOneItem={item} /> 
                            </TouchableOpacity>)
                        }   
                    </View>
                    {/* 轮循 */}
                    <Swiper style={styles.swiper} width={KscreenWidth} height={90} showsPagination={true} paginationStyle={{ bottom: 5 }}  autoplay = {true} loop = {true} dotColor="#e7e7e7" activeDotColor={"#fff"} >
                        {
                            this.state.twoSecondImageList.map((item, index) => <TouchableOpacity key={index} style={{ flex: 1 }} onPress={() => { this.headImageTapped(item) }}>
                                <View style={{ flex: 1 , padding:7,backgroundColor:'rgba(0,0,0,0.05)'}}>     
                                    <Image source={{ uri: item.img }} style={{ width: (KscreenWidth - 14), height: 76 ,borderRadius:7}} />
                                </View>
                            </TouchableOpacity>)
                        }
                    </Swiper>
                    {/* 发现好店 */}
                    <View style={{ justifyContent: 'center',alignItems:'center', width:'100%',height:35,backgroundColor:'rgba(0,0,0,0.05)'}}>
                            <Image source={{uri:'https://m.360buyimg.com/mobilecms/jfs/t3262/58/5673226654/6672/fcc818b3/587c8b2bNec769cc1.png!q70.jpg'}} 
                                style={{width:60,height:18}} 
                            />
                    </View>

                    <View style={{ flexWrap: 'wrap',flexDirection: 'row'}}>
                        {
                            this.state.goShoppingList.slice(8,12).map((item, index)=> <TouchableOpacity key={index} style={{width:KscreenWidth/2 }} onPress={() => { this.liveImageTapped(item) }}>
                               <HomeNewShopView  headColorStyles={{color:'#444'}} subTitleStyles={{color:'rgba(142,34,233,0.8)'}} specialStyle={{backgroundColor:'rgb(44,86,246)'}} borderStyles={{borderBottomWidth:1,borderRightWidth:1,borderColor: 'rgba(0,0,0,0.05)'}} imageOneItem={item} /> 
                            </TouchableOpacity>)
                        }   
                    </View>
                    {/* 优选清单 */}
                    <View style={{ justifyContent: 'center',alignItems:'center', width:'100%',height:35,backgroundColor:'rgba(0,0,0,0.05)'}}>
                            <Image source={{uri:'https://m.360buyimg.com/mobilecms/jfs/t3205/189/6084932005/5424/1f04049d/589a8ce3Nb18b2ded.png!q70.jpg'}} 
                                style={{width:60,height:18}} 
                            />
                    </View>
                    {/* 京东直播 */}
                    <View style={{ justifyContent: 'center',alignItems:'center', width:'100%',height:35,backgroundColor:'rgba(0,0,0,0.05)'}}>
                            <TouchableOpacity  activeOpacity={1} onPress={() => {this.liveListTapped()}}>
                                <Image source={{uri:'https://m.360buyimg.com/mobilecms/jfs/t3772/343/1287610868/4307/19445fcc/5821896aN934a58f3.png!q70.jpg'}} 
                                    style={{width:60,height:18}} 
                                />
                            </TouchableOpacity>
                    </View>
                    <View style={{flex:1,paddingTop:15,paddingBottom:15}}>
                        <RNSwiper
                            minimumScale={0.55}  //scale of out of focus components
                            // opacity of out of focus components
                            overlap={60}  // the degree to which components overlap.  
                            cardWidth={IConstants.width*0.7} // the width of each component
                            duration={100} // animation duration on swipe
                            swipeThreshold={100}// minimum distance to swipe to trigger change in state 
                            onSwipeUp={this.onSwipeUp}
                            onSwipeDown={this.onSwipeDown}
                            onPress={this.onPress}
                            >
                            {
                                this.state.headImageList.slice(0,5).map((item,index) => 
                                    <View style={{ flex: 1}} key={index}>     
                                        <Image resizeMode={'cover'} source={{ uri: item.img }} style={{ width: IConstants.width*0.7, height: IConstants.width*0.35}} />
                                    </View>
                                )
                            }
                        </RNSwiper>
                    </View>
                    
                </Animated.ScrollView>
                {
                    this.state.scrollOffset > 300
                    ?
                    (   this.state.scrollOffset > 300 && this.state.scrollOffset < 700
                        ?
                        <TouchableOpacity  style={styles.dropToRec} activeOpacity={1} onPress={() => { this.refs._scrollView._component.scrollToEnd() }}>
                           <Image source={droptoRec} />
                           <Text style={{fontSize:9,color:'white'}}>{'推荐'}</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity  style={styles.backToTop} activeOpacity={1} onPress={() => { this.refs._scrollView._component.scrollTo({y: 0});{animated: true} }}>
                          <Image source={backtoTop} />
                        </TouchableOpacity>
                    )
                    :
                    null
                }
                {
                    !this.state.isRefreshing
                    ?
                    // <NavigatorOpacityBar minOpacity={0}  hideLeft={true} isBarOpacity={false} scrollOpacityValue={this.state.scrollOffset} titleView={headView} />
                    <Animated.View style={{position:'absolute',top:0,width:IConstants.width,height:64,paddingTop:20,left:0,backgroundColor}}>
                        <HomeHeaderView changedY={this.state.scrollOffset} intelligentVoice={()=>{this.intelligentVoice()}} scanTapped={()=>{this.scanTapped()}} />
                    </Animated.View>
                    :
                    null
                }
                
            </View>
        );
    }

    //扫码
    scanTapped(){
        // this.props.navigation.navigate('ScanScreen',{transition: 'forVertical'});
    }
    //智能语音
    intelligentVoice(){

    }

    /**
     * 
     * @param {直播项轮循图、切换、点击}  
     */
    onSwipeUp(index){
        //parameter returned is the index of active child
    }
      
    onSwipeDown(index){
    //parameter returned is the index of active child
    }
      
    onPress(index){
    //parameter returned is the index of active child
        console.log(index)
        Toast.show(index,{position: Toast.positions.CENTER});
    }

    liveListTapped()
    {
        // this.props.navigation.navigate('LiveVideoListScreen',{ transition: 'forVertical' });
        //  this.props.navigation.navigate('VoiceSearchScreen',{ transition: 'forFadeFromBottomAndroid' }); 
    }

    startOpacityAnimation()
    {
        Animated.timing(this.state.timerValue, {
            toValue: 7,
            duration: 6000
        }).start();
    }

    headImageTapped(item){

    }
    menuTapped(index){
        if(index == 0){
            this.props.navigation.navigate('TransfTestScreen',{transition:'forVertical'})//croseScale
        }
    }
    liveImageTapped(item){
        
    }
    moreSecKillTapped(X){
        if(X == (IConstants.width/5 + 10)*10 - IConstants.width + 24)
        {
            
        }
    }


}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    scrollViewStyle:{

    },
    swiper:{

    },
    slide: {
        flex:1,
        paddingTop:3,
        alignItems: 'center',
        paddingBottom: 13,
        flexWrap:'wrap',
        flexDirection:'row',
        backgroundColor:'rgba(0,0,0,0.05)'
    },
    slideItem:{
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom:5,
        paddingTop:5,
    },
    slideItemImage: {
        width: 40,
        height: 40,
    },
    slideItemTitle:{
        paddingTop:5,
        color: '#999999',
        fontSize: 11,
        backgroundColor: 'transparent'
    },
    backToTop:{
        position:'absolute',
        bottom:10,
        right:5,
        zIndex:20,
        width:44,
        height:44,
        borderRadius:22,
        backgroundColor:'rgb(245,245,245)',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#888',
        borderWidth:1
    },
    dropToRec:{
        position:'absolute',
        bottom:10,
        right:5,
        zIndex:21,
        width:44,
        height:44,
        borderRadius:22,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
        
    },
    card:{
        width:'100%',
        height:200,
    }
});

/**
 * 注意: 如果component 被Animated 包裹 ref调用后面需接 "._component"
 *  Try this to get the ref of the component returns from Animated.createAnimatedComponent method:
 *  ref={(ref) => this.list = ref._component}
 *  Then, calling this.list.scrollTo({x: 0, y: 0}) should work.
 * or: ref={'scrollView'}  , calling this.refs.scrollView._component.scrollTo
 */
