import React from 'react'
import './index.css'

//菜单栏+内容部分（侧边栏+内容）  内容部分高度超出时  内容部分滚动
//错误示范 顶部定高 底部100% 百分比宽高相对于父元素（定位元素除外） 则此时高度超过一屏高度

export default function Sample1() {
  return (
    <div id='top-middle-sample'>
      <div id="top-menu">
        test
      </div>
      <div id="middle-container">
        abc
      </div>
    </div>
  )
}