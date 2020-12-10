import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {io} from 'socket.io-client';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = `https://kanbanboardapi.herokuapp.com`;
//   private url = `http://localhost:3000`;
  private socket = io(`${this.url}`);
  constructor() { 
    // this.setUpConnection();
  }

    joinRoom(data)
    {
        this.socket.emit('join',data);
    }

    newUserJoined()
    {
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('new user joined', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    leaveRoom(data){
        this.socket.emit('leave',data);
    }

    userLeftRoom(){
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('left room', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    sendMessage(data)
    {
        this.socket.emit('message',data);
    }

    newMessageReceived(){
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('new message', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

//   setUpConnection(){
//     this.socket = io(this.url);
//     this.socket.on('message-broadcast',(data:string)=>{
//       if(data){
//         console.log(data);
//         return data;
//       }
//     })
//   }
//   sendMessage(message){
//     this.socket.emit('new-message',message);
//   }

//    getMessages(){
//      let newMessage;
//     this.socket.on('new-message',(message)=>{
//        newMessage = message;
//      })
//      console.log(newMessage);
//      return newMessage;
//     // return Observable.create((observer) => {
//     //     this.socket.on('new-message', (message) => {
//     //         observer.next(message);
//     //     });
//     // });
// }
}
