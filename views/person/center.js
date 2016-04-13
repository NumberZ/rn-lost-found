
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
     AlertIOS,
     ScrollView,
 } from 'react-native'

import Util from '../common/util.js'
import ServiceURL from '../common/service'
import Icon from 'react-native-vector-icons/Ionicons'
import { BlurView, VibrancyView } from 'react-native-blur'
import  {ImagePickerManager} from 'NativeModules'

import Login from './login'
import PublishLost from '../home/publish_lost'
import PublishFound from '../home/publish_found'
import Record from './record'
import Advice from './advice'
import About from './about'
import Setting from './setting'

const options = {
  title: '选择头像', // specify null or empty string to remove the title
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: '从相册中选取', // specify null or empty string to remove this button
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  quality: 0.2, // 0 to 1, photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image after selection
  noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
    skipBackup: true, // ios only - image will NOT be backed up to icloud
    path: 'images' // ios only - will save image at /Documents/images rather than the root
  }
};

class Center extends Component{
     constructor(props){
         super(props);
         this.state = {
             userId:this.props.User.id,
             name:this.props.User.name,
             avator:this.props.User.photo,
             phone:this.props.User.telephonenumber,
         }
     }

     //返回
     loginOut(){
         this.props.clean();
         this.props.navigator.pop();
     }

     //设置密码
     goSetting(){
         let navigator = this.props.navigator;
         if(navigator){
             navigator.push({
                 name: 'setting',
                 component: Setting,
                 params:{
                     userId:this.props.User.id,
                 }
             });
         }
     }

     //消息记录
     goRecord(){
         let navigator = this.props.navigator;
         if(navigator){
             navigator.push({
                 name: 'record',
                 component: Record,
                 params:{
                     userId:this.state.userId
                 }
             });
         }
     }

     //意见反馈
     goAdvice(){
         let navigator = this.props.navigator;
         if(navigator){
             navigator.push({
                 name: 'advice',
                 component: Advice,
             });
         }
     }
     //修改头像
     setAvator(){
         let that = this;
         ImagePickerManager.showImagePicker(options, (response) => {
                const formData = new FormData();
                var photo = {
                	uri: response.uri,
                	type: 'image/jpeg',
                	name: 'avactor.jpg',
                };
                formData.append('id',this.state.userId);
                formData.append('pic',photo);
                const opts = {
                    method:'POST',
                    headers:{
                     "Content-Type": "multipart/form-data"
                    },
                    body:formData
                }
                fetch(ServiceURL.baseUrl + ServiceURL.changeAvatorUrl,opts)
                .then((response) => response.text())
                .then((responseText) => {
                    let res = JSON.parse(responseText);
                    if(res.Status === true){
                        that.setState({
                            avator:res.filename
                        });
                    }
                })
                .catch(function(err){
                    alert(err);
                });
            });
     }

     //修改昵称
     setName(){
         let that = this;
         AlertIOS.prompt('修改昵称','',[{
             'text':'取消',
             onPress:function(){

             }
         },{
             text:'确定',
             onPress:function(e){
                 Util.post(ServiceURL.baseUrl + ServiceURL.changeNameUrl,{
                     id:that.state.userId,
                     name:e
                 },function(res){
                     if(res.Status === true){
                         that.setState({
                             name:e
                         });
                     }else{
                         alert('修改失败！');
                     }

                 },function(err){
                     alert(err);
                 });
             }
         }]);
     }

     goAbout(){
         let navigator = this.props.navigator;
         if(navigator){
             navigator.push({
                 name: 'about',
                 component: About,
             });
         }
     }
     //发布消息
     goPublish(){
         let that = this;
         ActionSheetIOS.showActionSheetWithOptions({
             options:[
                 '发布失物信息',
                 '发布招物信息',
                 '取消'
             ],
             cancleButtonIndex:2,
         },function(index){
             if(index === 0){
                 let navigator = that.props.navigator;
                 if(navigator){
                     navigator.push({
                     name: 'publishLost',
                     component: PublishLost,
                     });
                 }
             }else if(index === 1){
                 let navigator = that.props.navigator;
                 if(navigator){
                     navigator.push({
                         name: 'publishFound',
                         component: PublishFound,
                     });
                 }
             }
         });
     }

     render(){
         return(
             <ScrollView style={{flex:1}}>
                <View style={{width:Util.size.width,height:Util.size.height * 0.3}}>
                    <Image style={{width:Util.size.width,height:Util.size.height * 0.3}} source={{uri:ServiceURL.baseUrl + ServiceURL.avatorUrl + this.state.avator}}>
                        <BlurView blurType="light">
                            <View style={{width:Util.size.width,height:Util.size.height * 0.3}}>
                            </View>
                        </BlurView>
                    </Image>
                    <Icon name="ios-gear" style={{position:'absolute',right:10,top:20,color:"#fff"}} size={30} onPress={this.goSetting.bind(this)}></Icon>
                    <Icon name="ios-close-outline" style={{position:'absolute',left:10,top:20,color:"#fff"}} size={30} onPress={this.loginOut.bind(this)}></Icon>
                </View>
                <View style={{alignItems:'center',marginTop:-Util.size.height*0.12}}>
                    <TouchableOpacity onPress={this.setAvator.bind(this)} style={{shadowColor:'#151515',
                        shadowRadius:15,
                        shadowOpacity:0.7}}>
                        <Image style={{width:Util.size.height*0.24,height:Util.size.height*0.24,borderRadius:Util.size.height * 0.12}} source={{uri:ServiceURL.baseUrl + ServiceURL.avatorUrl + this.state.avator}}/>
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent:'center',alignItems:'center',marginTop:20}}>
                    <Text style={{fontFamily:'HeiTi SC',fontSize:20,fontWeight:'200'}} onPress={this.setName.bind(this)}>
                        {(!this.state.name) ? '暂无昵称' : this.state.name}
                    </Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:20}}>
                    <Icon name="social-whatsapp" size={25} style={{color:'#007AFF'}}></Icon>
                    <Text style={{fontFamily:'HeiTi SC',fontSize:16,fontWeight:'200',marginLeft:10,color:'#007AFF'}}>
                        : {this.state.phone}
                    </Text>
                </View>
                <TouchableOpacity style={styles.row} onPress={this.goPublish.bind(this)}>
                        <View style={{width:30}}>
                            <Icon name="compose" size={30}></Icon>
                        </View>
                        <Text style={styles.text}>
                            发布消息
                        </Text>
                        <Icon name="ios-arrow-right"  size={30} style={{position:'absolute',right:20}}></Icon>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row} onPress={this.goRecord.bind(this)}>
                        <View style={{width:30}}>
                            <Icon name="ios-list-outline" size={30}></Icon>
                        </View>
                        <Text style={styles.text}>
                            发布历史
                        </Text>
                        <Icon name="ios-arrow-right"  size={30} style={{position:'absolute',right:20}}></Icon>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row} onPress={this.goAdvice.bind(this)}>
                    <View style={{width:30}}>
                        <Icon name="ios-chatbubble" size={30}></Icon>
                    </View>
                    <Text style={styles.text}>
                        意见反馈
                    </Text>
                    <Icon name="ios-arrow-right"  size={30} style={{position:'absolute',right:20}}></Icon>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.row,{marginBottom:50}]} onPress={this.goAbout.bind(this)}>
                        <View style={{width:30}}>
                            <Icon name="ios-people" size={30}></Icon>
                        </View>
                        <Text style={styles.text}>
                            关于我们
                        </Text>
                        <Icon name="ios-arrow-right"  size={30} style={{position:'absolute',right:20}}></Icon>
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
export default Center
