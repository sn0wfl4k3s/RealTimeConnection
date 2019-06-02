import { Component, OnInit } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private _hub: HubConnection;

  constructor() { }

  ngOnInit() {
    let url: string = `${environment.urlApi}/chatHub`;

    this._hub = new HubConnectionBuilder()
      .withUrl(url)
      .build();
    
    this._hub.start()
    .then(() => {
      console.log("conectado!");
    });

    this._hub.on('ReceiveMessage', (user, message) => {
      console.log(`${user}: ${message}`);
    });
  }

  notificar(): void {
    this._hub.invoke('SendMessage', 'user2', 'hello');
  }

}
