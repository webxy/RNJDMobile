import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
    Dimensions,
    TouchableOpacity,
    Animated,
    Navigator
} from 'react-native';
import backIcon from '../assets/images/back.png';
import * as IConstants from './IConstants';

class NavigationBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      // leftTitle和leftImage 优先判断leftTitle (即 文本按钮和图片按钮优先显示文本按钮)
      const { navigator, title, titleView, leftTitle, leftImage, leftAction, rightTitle, rightImage, rightAction, scrollOpacityValue, minOpacity, hideLeft, titleStyle, leftImageStyle, leftTitleStyle, rightTitleStyle, isBarOpacity } = this.props;
      let leftImg = leftImage ? leftImage : (hideLeft ? null : backIcon);

      let PView = isBarOpacity ? Animated.View : View;
      let opacityAnimation = undefined;
      if(scrollOpacityValue)
      {
        opacityAnimation = scrollOpacityValue.interpolate({
            inputRange: [0, 70 - IConstants.HEIGHT_TOP_BAR],
            outputRange: [minOpacity ? minOpacity : 0, 1]
        });
        console.log('透明度:'+opacityAnimation);
      }

      return (
            <PView style={[styles.barView, 
                (scrollOpacityValue && !isBarOpacity) ? styles.clearBg : styles.colorBg, 
                this.props.style,
                isBarOpacity ? {opacity: opacityAnimation, position: 'absolute', left: 0, right: 0, top: 0,} : null]}>
              {
                scrollOpacityValue && !isBarOpacity
                ?
                <Animated.View style={[styles.bgView, {
                    opacity: opacityAnimation
                }]}/>
                :
                null
              }
            	<View style={ styles.showView }>
            		{
                        (leftTitle || leftImg == backIcon)
                        ?
                        <TouchableOpacity style={styles.leftNav} onPress={ ()=>{leftAction ? leftAction() : navigator.pop()} }>
                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                {
                                    leftImg
                                    ?
                                    <Image source={ leftImg } style={leftImageStyle}/>
                                    :
                                    null
                                }
                                <Text style={[styles.barButton, leftTitleStyle]}>{ (leftTitle && leftTitle.length > 0) ? leftTitle : "返回" }</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        (
                            leftImg
                            ?
                            <TouchableOpacity style={styles.leftNav} onPress={ ()=>{leftAction ? leftAction() : navigator.pop()} }>
                                <View style={{alignItems: 'center'}}>
                                    <Image source={ leftImg } style={leftImageStyle}/>
                                </View>
                            </TouchableOpacity>
                            : null
                        )
            		}
		            {
                        title ?
                        <Text style={[styles.title, titleStyle]} numberOfLines={1} ellipsizeMode="tail">{title || ''}</Text>
                        :
                        (titleView ? titleView : null)
		            }
		            {
                        rightTitle ?
                        <TouchableOpacity style={styles.rightNav} onPress={ ()=>{rightAction ? rightAction() : null} }>
                            <View style={{alignItems: 'center'}}>
                            	<Text style={[styles.barButton, rightTitleStyle]}>{rightTitle}</Text>
                            </View>
                        </TouchableOpacity>
		            	: (rightImage ?
		            		<TouchableOpacity style={styles.rightNav} onPress={ ()=>{rightAction ? rightAction() : null} }>
				            	<View style={{alignItems: 'center'}}>
				            		<Image source={ rightImage }/>
				            	</View>
				            </TouchableOpacity>
                            : null
                        )
		            }

		          </View>
            </PView>
        )
    }
}

const styles = StyleSheet.create({
    barView: {
      height: IConstants.HEIGHT_TOP_BAR,
      // backgroundColor: IConstants.COLOR_BAR,
      zIndex: 10,
    },
    colorBg: {
      backgroundColor: IConstants.COLOR_BAR
    },
    clearBg: {
      backgroundColor: 'transparent',
      position: 'absolute',
      left: 0, right: 0, top: 0,
    },
    showView: {
    	flex: 1,
    	alignItems: 'center',
    	justifyContent: 'center',
    	flexDirection: 'row',
    	marginTop: IConstants.HEIGHT_STATUS_BAR,
    	height: IConstants.HEIGHT_NAV_BAR,
    },
    title: {
    	color: 'white',
        fontSize: 17.0,
        maxWidth: Dimensions.get('window').width * 0.6,
    },
    leftNav: {
    	position: 'absolute',
    	top: 2,
    	bottom: 2,
    	left: 0,
        paddingLeft: 10,
        paddingRight: 10,
    	justifyContent: 'center',
        minWidth: 40,
        flexDirection: 'row',
    },
    rightNav: {
    	position: 'absolute',
    	right: 0,
    	top: 2,
    	bottom: 2,
        paddingLeft: 10,
        paddingRight: 10,
    	justifyContent: 'center',
    },
    barButton: {
        color: 'white',
        fontSize: 16,
    },
    bgView: {
      position: 'absolute',
      backgroundColor: IConstants.COLOR_BAR,
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    }
})

export default NavigationBar
