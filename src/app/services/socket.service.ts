import {EventEmitter, Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    currentDocument = this.socket.fromEvent<Document>('document');
    documents = this.socket.fromEvent<string[]>('documents');
    myEmitter = new EventEmitter();

    constructor(private socket: Socket) {
        socket.on('connect', () => {
            console.log('Connected');
        });
        socket.on('disconnect', function () {
            console.log('Disconnected');
        });
        socket.on('measurement', (data) => {
            this.myEmitter.emit(data);
        });
    }

    sendData(data) {
        this.myEmitter.emit(data);
    }

    newSession(id) {
        this.socket.emit('newUserSession', id);
    }

    closeSession(id) {
        this.socket.emit('closeUserSession', id);
    }
}
