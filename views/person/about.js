
/**
 * 个人中心页
 * @author Linhao Li
 */
 import React, {
     Component,
     StyleSheet,
     Text,
     View,
     Image,
     TouchableOpacity,
     ActionSheetIOS,
     ScrollView,
 } from 'react-native'

import Util from '../common/util.js'
import Service from '../common/service'
import Icon from 'react-native-vector-icons/Ionicons'
import { BlurView, VibrancyView } from 'react-native-blur'

import Login from './login'
import PublishLost from '../home/publish_lost'
import PublishFound from '../home/publish_found'
import Record from './record'
import Advice from './advice'
import Platform from './platform'
import Message from './message'


class About extends Component{
     constructor(props){
         super(props);
         this.state = {

         }
     }

     //返回
     goBack(){
         this.props.navigator.pop();
     }

     //消息记录
     goPlatform(){
         let navigator = this.props.navigator;
         if(navigator){
             navigator.push({
                 name: 'Platform',
                 component: Platform,
             });
         }
     }

     //意见反馈
     goMessage(){
         let navigator = this.props.navigator;
         if(navigator){
             navigator.push({
                 name: 'message',
                 component: Message,
             });
         }
     }
     render(){
         return(
             <ScrollView style={{flex:1}}>
                <View style={{width:Util.size.width,height:Util.size.height * 0.3,backgroundColor:'#fb7e00'}}>
                    <Icon name="ios-arrow-left" style={{position:'absolute',left:20,top:30,color:"#fff"}} size={30} onPress={this.goBack.bind(this)}></Icon>
                </View>
                <View style={{alignItems:'center',marginTop:-Util.size.height*0.12}}>
                    <TouchableOpacity style={{shadowColor:'#151515',
                        shadowRadius:10,
                        shadowOpacity:1}}>
                        <Image style={{width:Util.size.height*0.24,height:Util.size.height*0.24,borderRadius:Util.size.height * 0.12}} source={{uri:'http://macandmaryowen.com/wp-content/uploads/2016/02/lost-found.jpg'}}/>
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent:'center',alignItems:'center',marginTop:20,marginBottom:20}}>
                    <Text style={{fontFamily:'HeiTi SC',fontSize:20,fontWeight:'200'}}>
                        失物招领平台
                    </Text>
                </View>
                <TouchableOpacity style={styles.row} onPress={this.goPlatform.bind(this)}>
                        <View style={{width:30}}>
                            <Icon name="ios-analytics" size={30}></Icon>
                        </View>
                        <Text style={styles.text}>
                            平台介绍
                        </Text>
                        <Icon name="ios-arrow-right"  size={30} style={{position:'absolute',right:20}}></Icon>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row}>
                        <View style={{width:30}}>
                            <Icon name="ios-loop-strong" size={30}></Icon>
                        </View>
                        <Text style={styles.text}>
                            检查更新
                        </Text>
                        <Icon name="ios-arrow-right"  size={30} style={{position:'absolute',right:20}}></Icon>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.row]} onPress={this.goMessage.bind(this)}>
                        <View style={{width:30}}>
                            <Icon name="speakerphone" size={30}></Icon>
                        </View>
                        <Text style={styles.text}>
                            系统消息
                        </Text>
                        <Icon name="ios-arrow-right"  size={30} style={{position:'absolute',right:20}}></Icon>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.row]} onPress={this.goMessage.bind(this)}>
                        <View style={{width:30}}>
                            <Icon name="ios-telephone" size={30}></Icon>
                        </View>
                        <Text style={styles.text}>
                            客服电话：18814116653
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.row]} onPress={this.goMessage.bind(this)}>
                        <View style={{width:30}}>
                            <Icon name="chatbubbles" size={30}></Icon>
                        </View>
                        <Text style={styles.text}>
                            官方微信：华农失物招领
                        </Text>

                </TouchableOpacity>
                <TouchableOpacity style={[styles.row,{marginBottom:50}]} onPress={this.goMessage.bind(this)}>
                        <View style={{width:30}}>
                            <Icon name="ios-people" size={30}></Icon>
                        </View>
                        <Text style={styles.text}>
                            官方微博：Lost&Found
                        </Text>
                </TouchableOpacity>
              </ScrollView>
         )
     }
 }

var styles = StyleSheet.create({
 row:{
     borderColor:'#fff',
     flexDirection:'row',
     borderColor:'#ddd',
     borderTopWidth:Util.pixel,
     padding:10,
     paddingLeft:20,
     alignItems:'center'

 },
 text:{
     fontFamily:"HeiTi SC",
     fontWeight:'300',
     fontSize:18,
     marginLeft:10,
 }
})
export default About
