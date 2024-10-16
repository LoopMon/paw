import { FormsModule } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

import { MessageService } from "./message.services";
import { MessageComponent } from "./message.component";
import { Message } from "./message.model";

@Component ({
    selector: "app-message-list",
    standalone: true,
    imports: [
        FormsModule,
        MessageComponent
    ],
    template: `
        <div class="col-md-8 col-md-offset-2">
            @for (msg of messageS; track $index) {
                <app-message
                    [messageVarClasse]="msg"
                    (outputMessage)="msg.content = $event"
                ></app-message>
            } @empty {
                messageS é uma lista vazia
            }
        </div>
    `
})

export class MessageListComponent implements OnInit {
    messageS: Message[] = [
        new Message("Texto 1 glr", "Luiz"),
        new Message("Texto 2 fml", "Carlos"),
        new Message("Texto 3 povo", "Maria")
    ];

    constructor(private messageService: MessageService){}

    ngOnInit(): void {
        // messageS aponta para o array messageSService que armazena os dados
        this.messageS = this.messageService.getMessages();
    }
}