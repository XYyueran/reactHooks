import { useCallback ,useRef,useEffect,useContext,createContext } from "react";
export const LogContext = createContext({});
export const useLog = () => {
    /* 定义一些公共参数 */
    const message = useContext(LogContext);
    const listenDOM = useRef(null);
  
    /* 分清依赖关系 */
    const reportMessage = useCallback(
      function (data, type) {
        if (type === "pv") {
          // 页面浏览量上报
          console.log("组件 pv 上报", message);
        } else if (type === "click") {
          // 点击上报
          console.log("组件 click 上报", message, data);
        }
      },
      [message]
    );
  
    useEffect(() => {
      const handleClick = function (e) {
        reportMessage(e.target, "click");
      };
      if (listenDOM.current) {
        listenDOM.current.addEventListener("click", handleClick);
      }
  
      return function () {
        listenDOM.current &&
          listenDOM.current.removeEventListener("click", handleClick);
      };
    }, [reportMessage]);
  
    return [listenDOM, reportMessage];
  };