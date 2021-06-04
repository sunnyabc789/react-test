import React, { useReducer, useCallback } from "react";
import CacheContext from "./CacheContext";
import cacheReducer from "./cacheReducer";
import * as cacheTypes from "./cache-types";
function KeepAliveProvider(props) {
  let [cacheStates, dispatch] = useReducer(cacheReducer, {});
  const mount = useCallback(
    ({ cacheId, element }) => {
      if (cacheStates[cacheId]) {
        let cacheState = cacheStates[cacheId];
        if (cacheState.status === cacheTypes.DESTROY) {
          let doms = cacheState.doms;
          doms.forEach((dom) => dom.parentNode.removeChild(dom));
          dispatch({ type: cacheTypes.CREATE, payload: { cacheId, element } });
        }
      } else {
        dispatch({ type: cacheTypes.CREATE, payload: { cacheId, element } });
      }
    },
    [cacheStates]
  );
  let handleScroll = useCallback(
    (cacheId, { target }) => {
      if (cacheStates[cacheId]) {
        let scrolls = cacheStates[cacheId].scrolls;
        scrolls[target] = target.scrollTop;
      }
    },
    [cacheStates]
  );

  // 1.缓存的会在provider这里渲染出来 有个位置关系的问题 还有外层多了两个div 样式破坏
  // 渲染-缓存流程如下
  // BrowserRouter 这个只起到一个加监听器的作用 具体上下树是Route在执行
  // KeepAliveProvider 第一次渲染 cacheStates 是空的
  // 来到withKeepAlive这个 传入的是 component
  // withKeepAlive useEffect 会dispatch 一份缓存 id: CREATE element: component
  // cacheStates改变  执行下面的逻辑  渲染element: component
  // mounted以后 ref钩子起作用 dispatch id: CREATED doms 此时 element也还在 因为解构了旧的
  // 切换路由 注意结构 是 KeepAliveProvider Route WithKeepAlive Component
  // 因此路由切换 WithKeepAlive卸载 WithKeepAlive上树
  // 此时有一个问题 第一次渲染 在cache_${cacheId}下 切换路由 为何element没了
  // element消失原理 doms的指针被缓存起来了
  // 如果执行了 ref.current.appendChild(dom), cache_${cacheId}下 根本不会有节点 如果不执行就会有 
  // appendChild 会劫持dom 把一个节点剪切到另一个上面去 不是复制
  return (
    <CacheContext.Provider
      value={{ mount, cacheStates, dispatch, handleScroll }}
    >
      {props.children}
      {Object.values(cacheStates)
        .filter((cacheState) => cacheState.status !== cacheTypes.DESTROY)
        .map(({ cacheId, element }) => {
          console.log(element, "element===");
          return (
            <div
              id={`cache_${cacheId}`}
              key={cacheId}
              ref={(dom) => {
                let cacheState = cacheStates[cacheId];
                if (
                  dom &&
                  (!cacheState.doms || cacheState.status === cacheTypes.DESTROY)
                ) {
                  let doms = Array.from(dom.childNodes);
                  dispatch({
                    type: cacheTypes.CREATED,
                    payload: { cacheId, doms },
                  });
                }
              }}
            >
              {element}
            </div>
          );
        })}
    </CacheContext.Provider>
  );
}
export default KeepAliveProvider;
