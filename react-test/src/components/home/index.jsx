//todo
import React from 'react'


export default function Home(props) {
  return (
        <div className="box" >
            <div className="item"
                // onClick={() => props.dispatch({
                //   type: 'DESTROY',
                //   payload: {cacheId: 'UserAdd'}
                // })}
            >重置userAdd</div>
            <div className="item"
                //  onClick={() => props.dispatch({
                //   type: 'DESTROY',
                //   payload: {cacheId: 'UserList'}
                // })}
            >清除  缓存列表</div>
        </div>
  )
}