import React from 'react'
import './index.css'

//菜单栏+内容部分（侧边栏+内容）  内容部分高度超出时  内容部分滚动
//顶部定高 底部形成css剩余空间 需要底部撑满父元素剩余空间
//顶部定高 是为了固定行高 顶部不能百分比高度 否则行高会变化 导致字体视觉上相对大小变化

//脱离标准流 (BFC)）
//正确做法2. 顶部给浮动 宽度100% 底部高度100%

//注意点 
//原理 BFC 因此会有BFC的缺点 如 底部加上margin-top 会把顶部盒子的上方顶开 margin重叠
//最外层top-middle-sample 需要overflow: hidden 下层需要overflow-y scroll 
//优点是修改顶部高度不会有其他影响


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