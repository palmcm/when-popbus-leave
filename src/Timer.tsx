import { TimeHM } from './MainTimers'
interface TimerProp{
    bus: number;
    leaveTime: TimeHM;
    countdown: number;
    faster: boolean;
}
export const Timer = (props:TimerProp) => {
    const {bus, leaveTime, countdown, faster} = props
    return (
        <div className={faster?"faster":""}>
            Line {bus} will leave at {leaveTime.h} : {leaveTime.m}
            <br/>
            Countdown = {countdown/3600000>0 && (Math.floor(countdown/3600000)+" :")} {Math.floor(countdown/60000)%60} : {Math.floor(countdown/1000)%60}
        </div>
    )
}