import { LeaveTime, leaveTime1, leaveTime4 } from "./leavetime";
import { useEffect, useMemo, useState } from "react";
import { Timer } from "./Timer";

export interface TimeHM {
    h:number;
    m:number;
    s?:number;
}

const getLeaveTimes = (bus:number):LeaveTime => {
    let day:number = new Date().getDay()
    if (day==6) return [];
    if (day!=0) {
        if (bus===1) return leaveTime1;
        if (bus===4) return leaveTime4;
    }
    return [];
}

const getNextTime = (h:number, m:number, leaveTimes:LeaveTime):TimeHM => {
    let leaveTime:TimeHM = {} as TimeHM;
    for (let i=0; i<leaveTimes.length;i++){
        if (h<=leaveTimes[i].h){
            for (let mtime of leaveTimes[i].m){
                if (mtime>m) {
                    leaveTime = {
                        h: leaveTimes[i].h,
                        m: mtime
                    }
                    break;
                }
            }
            if (!leaveTime.h) {
                if (i!=leaveTimes.length-1){
                    leaveTime = {
                        h: leaveTimes[i+1].h,
                        m: leaveTimes[i+1].m[0]
                    }
                }
            }
            break;
        }
    }
    return leaveTime;
}

const calculateDistTime = (now:Date, toTime:TimeHM):number => {
    let toDate:Date = new Date();
    toDate.setHours(toTime.h, toTime.m, 0, 0);
    // console.log(now, toTime, toDate)
    return toDate.getTime()-now.getTime()
}


export const MainTimers = () => {
    const [c1, setCountDown1] = useState(0);
    const [c4, setCountDown4] = useState(0);
    let now = new Date()
    const h = now.getHours()
    const m = now.getMinutes()
    const t1:TimeHM = getNextTime(h,m, getLeaveTimes(1));
    const t4:TimeHM = getNextTime(h,m, getLeaveTimes(4));
    // console.log(c1, c4)
    useEffect(() => {
        const interval = setInterval(
            
            () => {
                setCountDown4(calculateDistTime(now, t4));
                setCountDown1(calculateDistTime(now, t1));
                now = new Date();
            },
            500,
        );

        return () => clearInterval(interval);
    }, [t1]);
    return (
        <div className="maintimer">
            Line {c1<c4 ? 1 : 4} will leave first
           <Timer bus={1} leaveTime={t1} countdown={c1} faster={c1<=c4}/>
           <Timer bus={4} leaveTime={t4} countdown={c4} faster={c4<=c1}/>
        </div>
    )
}