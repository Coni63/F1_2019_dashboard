import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

import { interval, Subscription } from 'rxjs';

import * as io from 'socket.io-client';


@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.sass'],
  // providers: [formatClassPipe]
})
export class PositionsComponent implements OnInit {

  socket: SocketIOClient.Socket;
  subscription: Subscription;
  status: any;

  constructor() {
    this.socket = io.connect(environment.call_url);

    const source = interval(environment.refresh_rate_pilots_ms);
    this.subscription = source.subscribe(val => this.socket.emit("give_status"));
  }

  ngOnInit() {
    this.socket.on('status', (msg: any) => {
      this.status = msg.length == 0 ? null : msg;
      //console.log(this.status);
      // this.subscription.unsubscribe();
    });
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setColor(value: number): string {
    // let R1 = 0;
    // let G1 = 255;
    // let B1 = 0;

    // let R2 = 255;
    // let G2 = 0;
    // let B2 = 0;

    // value = Math.min(2*value / 100, 1);

    // let R = Math.floor(R1 * (1-value) + R2 * value);
    // let G = Math.floor(G1 * (1-value) + G2 * value);
    // let B = Math.floor(B1 * (1-value) + B2 * value);

    // let RR = R.toString(16).padStart(2, "0");
    // let GG = G.toString(16).padStart(2, "0");
    // let BB = B.toString(16).padStart(2, "0");
    // return "#"+RR+GG+BB;

    if (value >= 40){
      return "#660000";
    } else if(value >= 30) {
      return "#ff8080";
    } else if(value >= 20) {
      return "#ffbf80";
    } else if(value >= 10) {
      return "#99ddff";
    } else {
      return "#005ce6";
    }

  }

}
