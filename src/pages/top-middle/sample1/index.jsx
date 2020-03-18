import React from 'react'
import './index.css'

//菜单栏+内容部分（侧边栏+内容）  内容部分高度超出时  内容部分滚动
//顶部定高 底部形成css剩余空间 需要底部撑满父元素剩余空间
//顶部定高 是为了固定行高 顶部不能百分比高度 否则行高会变化 导致字体视觉上相对大小变化

//标准流（不用BFC）
//正确做法1. calc计算内容层高度 则此时 顶部高度一旦修改 需要修改两处地方
//注意点 此时container需要overflow-y scroll 否则会子元素超高会顶开
//该方案主要缺点为 顶部高度变化 需要修改两处地方 在大项目中 改两处地方才能生效的写法是坏代码  主项目使用该方案处理内容栏


export default function Sample() {

  let arr = []
  for (let i = 0; i < 1000; i ++) {
    arr.push(i)
  }

  return (
    <div id='top-middle-sample'>
      <div id="top-menu">
        test
      </div>
      <div id="middle-container">
        <div id="test">
        {
          arr.map( i => (
            <div>{i}</div>
          ))
        }
        </div>
      </div>
    </div>
  )
}