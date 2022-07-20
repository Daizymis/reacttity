import React, { Component } from 'react'
import http from '../../../utils';
import '@/assets/css/menu.scss';
export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: [{
                id: 1,
                flowType: 1,
                muduleName: '合同',
                imgUrl: 'module1'
            },{
                id: 2,
                flowType: 2,
                muduleName: '立项',
                imgUrl: 'module2'
            },{
                id: 3,
                flowType: 3,
                muduleName: '开票',
                imgUrl: 'module3'
            },{
                id: 4,
                flowType: 4,
                muduleName: '结算单',
                imgUrl: 'module4'   
            }]
        }
    }
    componentDidMount() {
        this.getMenus();
    }
    getMenus() {
        http.get('/menus').then(res => {
            if (res.code === 200) {
                this.setState({menus: res.data});
            }
        })
    }
    toList() {

    }
  render() {
    return (
      <div className="flex-wrap">
          <p>菜单</p>
        {
            this.state.menus.map(item => 
                <div key={item.id}>
                    <img src={require(`../../../assets/img/mobile/module1.png`)} className="img-nav" />
                    <div>
                        {item.muduleName}
                    </div>
                </div>
            )
        }
      </div>
    )
  }
}
