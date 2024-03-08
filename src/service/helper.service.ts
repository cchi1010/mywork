import { Injectable } from '@angular/core';
import * as _fmtNum from 'numeral';
import { APPCONSTANT } from 'src/app/app.constant';
import { HasStringValue, PjKeyValue } from 'src/component/components.global';


@Injectable({
    providedIn: 'root'
})
export class HelperService {
    static weekdayString = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    static monthString = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    // 把参数时间与当前时间的间隔用'hh:mm:ss'表示出来
    // 原则上，参数时间在当前时间的后面。
    static toLeftTimeString(t?: Date): string {
        if (t == null) {
            return '';
        }
        const d = new Date();
        const second = Math.floor((t.getTime() - d.getTime()) / 1000);
        return HelperService.convertSecondToHMSString(second);
    }

    static daysBetween(d1?: Date, d2?: Date): number {
        if (d1 == null || d2 == null) {
            return 0;
        }
        return Math.floor((d1.getTime() - d2.getTime()) / APPCONSTANT.OneDayMilliSecond);
    }

    static hoursBetween(d1?: Date, d2?: Date): number {
        if (d1 == null || d2 == null) {
            return 0;
        }
        return Math.floor((d1.getTime() - d2.getTime()) / (1000 * 60 * 60));
    }

    static minutesBetween(d1?: Date, d2?: Date): number {
        if (d1 == null || d2 == null) {
            return 0;
        }
        return Math.floor((d1.getTime() - d2.getTime()) / (1000 * 60));
    }

    // 从信用卡的到期字符串转换为日期类型
    static generateFromCardExpirate(expirate?: string): Date {
        if (!HasStringValue(expirate)) {
            return new Date();
        }
        let month: number = Number.parseInt(expirate!.slice(0, 2)) - 1;
        let year: number = Number.parseInt(expirate!.slice(3)) + 2000;
        return new Date(year, month);
    }
    static formatDateTime(di?: Date | string, fmt?: string): string {
        let d: Date;
        if ((typeof di) == 'string') {
            d = new Date(di as string);
        } else {
            d = di as Date;
        }
        if (d == null) {
            return '';
        }
        if (fmt == null || fmt.length == 0) {
            fmt = 'yyyy-MM-dd';
        }
        const o: PjKeyValue<number | string> = {
            'M+': d.getMonth() + 1, // 月份
            'd+': d.getDate(), // 日
            'h+': d.getHours(), // 小时
            'm+': d.getMinutes(), // 分
            's+': d.getSeconds(), // 秒
            'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
            'S': d.getMilliseconds(), // 毫秒
            'w+': HelperService.weekdayString[d.getDay()],
            'X+': HelperService.monthString[d.getMonth()],
        };
        if (/(y+)/.test(fmt)) {
            let yRegResult = (/(y+)/.exec(fmt));
            if (yRegResult != null && yRegResult.length > 1) {
                fmt = fmt.replace(yRegResult[1], (d.getFullYear() + '').substring(4 - yRegResult[1].length));
            }

        }
        for (const k in o) {
            const reg = new RegExp('(' + k + ')');
            if (reg.test(fmt)) {
                let regResult = reg.exec(fmt);
                if (regResult != null && regResult.length > 0) {
                    fmt = fmt.replace(regResult[1], (regResult[1].length === 1) ? (o[k] + '') : (('00' + o[k]).substring(('' + o[k]).length)));
                }
            }
        }
        return fmt;
    }

    static convertSecondToHMSString(second: number): string {
        if (second <= 0) {
            return '00d:00h:00m';
        }
        const hh = Math.floor(second / 3600);
        const mm = Math.floor((second / 60 % 60));
        const ss = Math.floor((second % 60));
        return (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
    }

    // 
    static formatNumber(v: number | string, fmt: string | undefined): string {
        if (fmt == null || fmt.length == 0) {
            fmt = APPCONSTANT.NUMBER_FORMAT;
        }
        return _fmtNum(v).format(fmt);
    }

    // 判断当前时间是不是在d之后的hours小时之内
    static isAfter(di: Date | string, hours: number): boolean {
        let d: Date;
        if ((typeof di) == 'string') {
            d = new Date(di as string);
        } else {
            d = di as Date;
        }
        const comparedTime = d.getTime() + hours * 60 * 60 * 1000;
        const nowTime = (new Date()).getTime();
        return nowTime > comparedTime;
    }

    static formatAMPM(di: Date|string,fmt?:string) {
        let d: Date;
        if ((typeof di) == 'string') {
            d = new Date(di as string);
        } else {
            d = di as Date;
        }
        let hours = d.getHours();
        let minutes = d.getMinutes();
        let seconds = d.getSeconds();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const minuteStr = Number(d.getMinutes()) < 10 ? '0' + minutes : minutes;
        if (fmt=='hh:mm:ss'){
            return hours + ':' + minuteStr +':' + (seconds < 10 ? '0' + seconds : seconds) + ' ' + ampm;
        }

        return hours + ':' + minuteStr + ' ' + ampm;
    }

}