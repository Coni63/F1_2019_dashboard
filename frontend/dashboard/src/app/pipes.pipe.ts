import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatClass'})
export class formatClassPipe implements PipeTransform {
  transform(value: string): string {
    return value.toLowerCase().replace(/ /g, "");
  }
}

@Pipe({name: 'LapTime'})
export class LapTimePipe implements PipeTransform {
  transform(value: number): string {
    if (value == 0){
      return "N/A"
    }

    let s : number = Math.floor(value) % 60;
    let min : number = Math.floor(value/60);
    let ms : number = Math.floor(1000*(value % 1));

    return min.toString() + ":" + s.toString() + "." + ms.toString();
  }
}

@Pipe({name: 'TimeFormat'})
export class TimeFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value == 0){
      return "Not Started"
    }

    let s : number = Math.floor(value) % 60;
    let min : number = Math.floor(value/60);

    return min.toString() + " min " + s.toString() + " s";
  }
}