import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {AppComponent} from './app.component';
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class WebSocketAPI {
  webSocketEndPoint: string = 'http://localhost:8088/ws';
  topic: string = "/topic/getTotalNumberOfUsers";
  stompClient: any;
 /* appComponent: AppComponent;

  constructor(appComponent: AppComponent) {
    this.appComponent = appComponent;
  }*/
  _connect() {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame) {
      _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
        _this.onMessageReceived(sdkEvent);
      });
      //_this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  };

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
  _send(message) {


    const _this = this;
    _this.stompClient.connect({}, function (frame) {
      _this.stompClient.subscribe("/app/getTotalNumberOfUsers", function (sdkEvent) {
        _this.onMessageReceived(sdkEvent);
      });
      //_this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);




    console.log("calling logout api via web socket");
    //this.stompClient.send("/app/getTotalNumberOfUsers", {}, JSON.stringify(message));
  }

  _loginUser(message) {
    debugger
    console.log("calling logout api via web socket");
    this.stompClient.send("/app/soket", {}, JSON.stringify(message));
  }




  onMessageReceived(message) {
    console.log("Message Recieved from Server :: " + JSON.stringify(message.body));
    //this.appComponent.handleMessage(JSON.stringify(message.body));
  }
}
