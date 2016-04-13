/**
 * home组件
 * @author Linhao Li <linhaoweb@gmail.com>
 */
import React, {
  ActionSheetIOS,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  ListView,
  ScrollView,
  SegmentedControlIOS,
  StatusBar
} from 'react-native';

import Util from '../common/util.js'
import Icon from 'react-native-vector-icons/Ionicons'
import ServiceURL from '../common/service.js'

import LfItem from './lfitem.js'
import ItemDetail from './item_detail.js'

import PublishLost from './publish_lost.js'
import PublishFound from './publish_found.js'
import Search from './search'

class Home extends Component{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
        }
    }

    componentDidMount(){
        this.getData(ServiceURL.baseUrl + ServiceURL.indexUrl,{type:'Lost',direction:'Current'});
    }

    //进入失物详情
    goDetail(row){
        this.props.navigator.push({
            title:'物品详情',
            component:ItemDetail,
            params:{
                row:row
            }
        })
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
    //搜索页面
    goSearch(){
        let navigator = this.props.navigator;
        if(navigator){
            navigator.push({
            name: 'search',
            component: Search,
            });
        }
    }

    //改变首页数据
    change(value){
        if(value == '招领'){
            this.getData(ServiceURL.baseUrl + ServiceURL.indexUrl,{type:'Found',direction:'Current'});
        }else if(value == '失物'){
            this.getData(ServiceURL.baseUrl + ServiceURL.indexUrl,{type:'Lost',direction:'Current'});
        }

    }
    //加载首页数据
    getData(url,obj){
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let that = this;
        Util.post(url,obj,function(data){
            var items = data.results;
            that.setState({
                dataSource:ds.cloneWithRows(items)
            })
        },function(err){
            if(err) alert('加载数据出错😔..');
        })
    }

    render(){
        return (
        <View style={{flex:1}}>
            <StatusBar
              barStyle="light-content"
            />
            <View style={styles.header}>
                <Icon name="ios-search" size={30} style={{color:'#fff'}} onPress={this.goSearch.bind(this)}></Icon>
                <SegmentedControlIOS style={styles.seg} values={['失物', '招领']} tintColor="#fff" selectedIndex={0} onValueChange={this.change.bind(this)}/>
                <Icon name="ios-plus-outline" size={30} style={{color:'#fff'}} onPress={this.goPublish.bind(this)}></Icon>
            </View>
            <ScrollView style={styles.flex_1}>
                <ListView
                dataSource={this.state.dataSource}
                renderRow={(row) => <LfItem row={row} onPress={this.goDetail.bind(this,row)}/>}
                />
            </ScrollView>
        </View>
        )
    }
}
var styles = StyleSheet.create({
    flex_1:{
      flex:1,
    },
    header:{
        height:70,
        paddingTop:20,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#333'
    },
    seg:{
        width:200,
        height:30,
        backgroundColor:'#333',
    }
})

export default Home;
