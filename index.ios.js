/**
 * 失物招领 App
 * @author Linhao Li <linhaoweb@gmail.com>
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  Navigator
} from 'react-native';

import Home from './views/home/home'
import Login from './views/person/login'
import Center from './views/person/center'

import Icon  from 'react-native-vector-icons/Ionicons'//引入图标库
class MyProject extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTab:"home"
        }
    }

    /**
     * 选择Tab
     * @param {string} tabName tab名称
     */
    selectTab(tabName){
        this.setState({
            selectedTab:tabName
        });
    }

    /**添加Navigator路由
     * @param {object} component 组件对象
     * @param {string} title 标题
     */
    addNavigator(component,name){
        return (
            <Navigator
               initialRoute={{ name: name, component: component }}
               configureScene={(route) => {
                 return Navigator.SceneConfigs.VerticalDownSwipeJump;
               }}
               renderScene={(route, navigator) => {
                 let Component = route.component;
                 return <Component {...route.params} navigator={navigator} />
              }} />
        )
    }

    render() {
        return (
            <TabBarIOS style={{flex:1}} barTintColor="#fff">
                <Icon.TabBarItemIOS
                    title="首页"
                    iconName="ios-home-outline"
                    selectedIconName="ios-home"
                    onPress={this.selectTab.bind(this,'home')}
                    selected={this.state.selectedTab === 'home'}
                    >
                    {this.addNavigator(Home,'home')}
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                    title="个人"
                    iconName="person"
                    onPress={this.selectTab.bind(this,'person')}
                    selected={this.state.selectedTab === 'person'}
                    >
                    {this.addNavigator(Login,'login')}
                </Icon.TabBarItemIOS>
            </TabBarIOS>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MyProject', () => MyProject);
