
/**
 * 失物详情页面
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
     Linking
 } from 'react-native'

import Util from '../common/util.js'
import ServiceURL from '../common/service'
import Icon from 'react-native-vector-icons/Ionicons'

 class ItemDetail extends Component{

     constructor(props){
         super(props);
         this.state = {

         }

     }

     //返回
     goBack(){
         this.props.navigator.pop();
     }
     delete(){
         let that = this;
         AlertIOS.alert("确定要删除吗？",'',[
             {
                 text:'取消',
                 onPress:function(){

                 }
             },
             {
                 text:'确定',
                 onPress:function(){
                     Util.post(ServiceURL.baseUrl + ServiceURL.deleteUrl,{
                         userAccount:that.props.userId,
                         id:that.props.row.id
                     },function(res){
                         if(res.Status === true){
                             that.props.freshRecord();
                             that.props.navigator.pop();

                         }
                     },function(err){
                         alert(err);
                     })
                 }
             }
         ])
     }
     //弹出选项
     tip(phone){
         ActionSheetIOS.showActionSheetWithOptions({
             options:[
                 '拨打电话',
                 '发送短信',
                 '取消'
             ],
             cancleButtonIndex:2,
         },function(index){
             if(index === 0){
                 return Linking.openURL('tel:'+ phone);
             }else if(index === 1){
                 return alert('发短信');
             }
         });
     }

     render(){
         return (
             <ScrollView style={styles.container}>
                 <View style={{flex:1,justifyContent:'center',alignItems:'center',marginBottom:20,borderBottomWidth:Util.pixel * 1,borderColor:'#ddd'}}>
                     {
                         (!this.props.row.photo) ?
                         <Image style={styles.img} source={require('../images/nophoto.png')}/>
                         :
                          <Image style={styles.img} source={{uri:ServiceURL.baseUrl + ServiceURL.imageUrl + this.props.row.photo}}/>
                     }

                 </View>
                 <Icon name="ios-arrow-left" size={30} style={[{position:'absolute',left:20,top:30},(this.props.row.photo) ? {color:'#fff'} : {color:'#000'}]} onPress={this.goBack.bind(this)}></Icon>
                 <View style={{position:'absolute',right:Util.size.width * 0.15,top:Util.size.height * 0.6,marginTop:-30}}>
                     <TouchableOpacity style={[styles.btn,(this.props.userId) ? {backgroundColor:'#ff4343'} : '']} onPress={(this.props.userId) ? this.delete.bind(this) : this.tip.bind(this,this.props.row.phone)}>
                         {
                             (this.props.userId) ?
                                 <Text style={{color:'#fff',fontSize:20,fontFamily:'HeiTi SC'}}>
                                     删除
                                 </Text>
                            :
                             (this.props.row.type === 'Lost') ?
                                 <Text style={{color:'#fff',fontSize:20,fontFamily:'HeiTi SC'}}>
                                     归还
                                 </Text>
                              :
                              <Text style={{color:'#fff',fontSize:20,fontFamily:'HeiTi SC'}}>
                                  认领
                              </Text>
                         }

                    </TouchableOpacity>
                 </View>
                 <View style={[styles.item,{marginTop:20}]}>
                     <Text style={styles.item_font}>物品名称：{this.props.row.name}</Text>
                 </View>
                 <View style={styles.item}>
                     <Text style={styles.item_font}>丢失时间：{this.props.row.time}</Text>
                 </View>
                 <View style={styles.item}>
                     <Text style={styles.item_font}>丢失地点：{this.props.row.place}</Text>
                 </View>
                 <View style={styles.item}>
                     <Text style={styles.item_font}>物品描述：{this.props.row.description}</Text>
                 </View>
                 <View style={[styles.item,{marginBottom:70}]}>
                     <Text style={styles.item_font}>发布时间：{this.props.row.time}</Text>
                 </View>
             </ScrollView>

         )
     }
 }

var styles = StyleSheet.create({
    container:{
        flex:1
    },
    img:{
        width:Util.size.width,
        height:Util.size.height * 0.6
    },
    btn:{
        width:80,
        height:80,
        borderRadius:40,
        backgroundColor:'#31be67',
        justifyContent:'center',
        alignItems:'center',
        shadowColor:'#151515',
        shadowRadius:10,
        shadowOpacity:1
    },
    item:{
        flex:1,
        marginTop:5,
        marginBottom:10,
        paddingBottom:5,
        borderColor:'#e4e4e4',
        borderBottomWidth:Util.pixel,
        marginLeft:30,
        marginRight:30,

    },
    item_font:{
        fontFamily:'HeiTi SC',
        fontStyle:'italic'
    },
    center:{
        justifyContent:'center',
        alignItems:'center'
    }
})
export default ItemDetail
