import React, { Component } from 'react'
import workspaceDefault from '@/assets/img/mobile/icon-workbench.png';
import workspaceActive from '@/assets/img/mobile/icon-workbench-click.png';
import myDefault from '@/assets/img/mobile/my.png';
import myActive from '@/assets/img/mobile/my-click.png';

export default class index extends Component {
    constructor(props) {
        super(props);
    }
  render() {
      let footMenu = [
        {
          img: workspaceDefault,
          imgActive: workspaceActive,
          name: '工作台',
          url: '/workbench'
        },
        {
          img: myDefault,
          imgActive: myActive,
          name: '我的',
          url: '/my'
        }
      ];
    return (
      <div>
          <p>工作台</p>
          {
            footMenu.map(item => {
            <div key={item.id}>
                <img src={item.img} className="img-nav" />
                <div>
                    {item.name}
                </div>
            </div>
            })
          }
      </div>
    )
  }
}
