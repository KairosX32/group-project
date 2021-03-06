import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  _id: string;
  client: Client;
  clients: Client[];

  constructor(private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    //get id from url
    this._id = this.route.snapshot.params['id'];
    //get client
    this.clientService.getClient(this._id)
      .subscribe(client => this.client = client);
  }

  onDeleteClick() {
    if(confirm('Are you sure?')) {
      this._id = this.route.snapshot.params['id'];
      this.clientService.deleteClient(this._id).subscribe(message => {
        console.log(message);
        
      });
      this.flashMessage.show('Client removed', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
      this.clientService.getClients()
      .subscribe(clients => this.clients = clients);
    }
  }
}
