/**
 * 失物列表项
 */
import React, {
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import Util from '../common/util' //导入工具库
import Service from '../common/service'
import Icon  from 'react-native-vector-icons/Ionicons'

class LfItem extends Component{
    share(){
        alert('share');
    }
    render(){
        let row = this.props.row;
        return (
            <TouchableOpacity style={[styles.row,styles.item]} {...this.props}>
                <View style={[styles.center]}>
                    {row.photo ?
                         <Image source={{uri:Service.baseUrl + Service.imageUrl + row.photo}} style={styles.img}/>
                         :<Image source={require('../images/nophoto.png')} style={styles.img} />
                     }
                </View>
                <View style={[styles.content]}>
                    <View>
                        <Text style={[{width:200},styles.font]} numberOfLines={1}>{row.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.font} numberOfLines={1}>丢失地点：{row.place}</Text>
                    </View>
                    <View >
                        <Text style={styles.font} numberOfLines={1}>丢失时间：{row.time}</Text>
                    </View>
                </View>
                <View>
                    <Icon name="android-share-alt" size={20} borderRadius={0} onPress={this.share.bind(this)}></Icon>
                </View>
            </TouchableOpacity>
        )
    }
}

var styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        justifyContent:'space-around',
    },
    item:{
        height:100,
        borderBottomWidth:Util.pixel,
        marginTop:5,
        marginBottom:5,
        borderColor:'#ccc',
        padding:10,
    },
    font:{
        fontFamily:'HeiTi SC'
    },
    img:{
        width:80,
        height:120,
        resizeMode:Image.resizeMode.contain
    },
    content:{
        marginLeft:20,
        justifyContent:'space-between'
    },
    center:{
        justifyContent:'center',
        alignItems:'center'
    }
});

export default LfItem;
