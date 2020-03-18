import React from 'react'
import './index.css'

//菜单栏+内容部分（侧边栏+内容）  内容部分高度超出时  内容部分滚动
//顶部定高 底部形成css剩余空间 需要底部撑满父元素剩余空间
//顶部定高 是为了固定行高 顶部不能百分比高度 否则行高会变化 导致字体视觉上相对大小变化

//定位流（BFC）
//正确做法3. 父容器相对定位 子容器绝对定位 
//缺点 底部需要做top定位 大小为顶部高度  顶部marbin-bottom会失效 还不如标准流 但主项目用了该方案处理侧边栏


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