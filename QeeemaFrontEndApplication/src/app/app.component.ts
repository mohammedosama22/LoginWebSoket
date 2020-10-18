import { Component } from '@angular/core';
import {WebSocketAPI} from "./webSocket";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'QeemaFrontEndApplication';

  //webSocketAPI: WebSocketAPI;
  greeting: any;
  name: string;

  constructor(private  webSocketAPI:WebSocketAPI){}
  ngOnInit() {
   // this.webSocketAPI = new WebSocketAPI(new AppComponent());
    this.connect();
  }
  connect(){
    this.webSocketAPI._connect();
  }

  disconnect(){
    this.webSocketAPI._disconnect();
  }

  sendMessage(){
    this.webSocketAPI._send(this.name);
  }

  handleMessage(message){
    this.greeting = message;
  }
}


