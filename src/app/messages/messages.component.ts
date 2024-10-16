import { Component } from "@angular/core";
import { MessageInputComponent } from "./message-input.component";
import { MessageListComponent } from "./message-list.component";

@Component({
    selector: "app-messages",
    standalone: true,
    imports: [
        MessageListComponent,
        MessageInputComponent
    ],
    template: `
        <div class="row">
            <app-message-input></app-message-input>
        </div>
        <hr />
        <div class="row">
            <app-message-list></app-message-list>
        </div>
    `
})

export class MessagesComponent {
    
}