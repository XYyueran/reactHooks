
import {useEffect, useState} from 'react';
const breakPoints = {
    mobile: "(min-width: 480px)",
    ipad: "(min-width: 720px)",
    pc: "(min-width: 1080px)"
  }
type keyBreakPoints = keyof typeof breakPoints;
const  useMulipleMediaQuery =(breakPointNames:keyBreakPoints[]):Record<keyBreakPoints,boolean>=>{
    const [matches,setMatches] = useState(breakPointNames.reduce((res,nextItem)=>{
        res[nextItem] = false;
        return res;
    }))
    const setBreakPointMatchs = (breakPoinName:keyBreakPoints,isMatch:boolean)=>{
        matches[breakPoinName]= isMatch;
        setMatches({...matches});
    }
    useEffect(()=>{
        try{
            const unSubScribes = breakPointNames.reduce((res,breakPointName)=>{
                const breakPoint = breakPoints[breakPointName];
                const mediaQuery =  window.matchMedia(breakPoint);
                setBreakPointMatchs(breakPointName,mediaQuery.matches);
                const handler = (e:any) => setBreakPointMatchs(breakPointName,mediaQuery.matches);
                mediaQuery.addListener(handler);
                res.push(()=>mediaQuery.removeListener(handler));
                return res;
            },[])
            return ()=>{unSubScribes.forEach((callback)=>callback&&callback())} 
        }
        catch(e){
            return;
        }
    },[])
    return matches
}
export default useMulipleMediaQuery;