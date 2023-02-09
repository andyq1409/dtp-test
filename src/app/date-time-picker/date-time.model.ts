import { NgbTimeStruct, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { DatePipe } from "@angular/common";

export interface NgbDateTimeStruct extends NgbDateStruct, NgbTimeStruct {}

export class DateTimeModel implements NgbDateTimeStruct {
  year!: number;
  month!: number;
  day!: number;
  hour!: number;
  minute!: number;
  second!: number;

  timeZoneOffset!: number;

  public constructor(init?: Partial<DateTimeModel>) {
    Object.assign(this, init);
  }

  public static fromLocalString(dateString: string): DateTimeModel {
    let date = new Date(dateString);

    const isValidDate = !isNaN(date.valueOf());

    if (!dateString || !isValidDate) {
      date = new Date(1800,1,1,0,0,0);
    }

    return new DateTimeModel({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
      timeZoneOffset: date.getTimezoneOffset()
    });
  }

  private isInteger(value: any): value is number {
    return (
      typeof value === "number" &&
      isFinite(value) &&
      Math.floor(value) === value
    );
  }

  public toString(): string {
    if (
      this.isInteger(this.year) &&
      this.isInteger(this.month) &&
      this.isInteger(this.day)
    ) {
      const year = this.year.toString().padStart(4, "0");
      const month = this.month.toString().padStart(2, "0");
      const day = this.day.toString().padStart(2, "0");

      if (!this.hour) {
        this.hour = 0;
      }
      if (!this.minute) {
        this.minute = 0;
      }
      if (!this.second) {
        this.second = 0;
      }
      if (!this.timeZoneOffset) {
        this.timeZoneOffset = new Date().getTimezoneOffset();
      }

      const hour = this.hour.toString().padStart(2, "0");
      const minute = this.minute.toString().padStart(2, "0");
      const second = this.second.toString().padStart(2, "0");

      const tzo = -this.timeZoneOffset;
      const dif = tzo >= 0 ? "+" : "-";
  /*      pad = function(num) {
          const norm = Math.floor(Math.abs(num));
          return (norm < 10 ? "0" : "") + norm;
        };*/


      const tzoh = Math.abs(tzo/60).toString().padStart(2, "0");
      const tzom = Math.abs(tzo%60).toString().padStart(2, "0");

      const isoString = year + "-" + month + "-" + day + "T" +
                        hour + ":" + minute + ":" + second +
                        dif + tzoh + tzom;
      return isoString;
    }

    return "";
  }
}
