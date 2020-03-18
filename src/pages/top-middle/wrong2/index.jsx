import React from 'react'
import './index.css'

//菜单栏+内容部分（侧边栏+内容）  内容部分高度超出时  内容部分滚动
//顶部定高 底部形成css剩余空间 需要底部撑满父元素剩余空间
//顶部定高 是为了固定行高 顶部不能百分比高度 否则行高会变化 导致字体视觉上相对大小变化

//错误示范2
// 顶部给相对定位 底部相对定位 底部还给个高度100%
//此时 顶部+底部 高度超过一屏幕高度  底部随便放个内容就出现滚动条 
// 且此时 滚动到底部 无法看到底部内容
//门户系统 晓添贡献

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