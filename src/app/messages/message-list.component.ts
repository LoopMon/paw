import { FormsModule } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

import { MessageComponent } from "./message.component";

import { MessageService } from "./message.services";
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
    messageS: Message[] = [];

    constructor(private messageService: MessageService){}

    ngOnInit(): void {
        // messageS aponta para o array messageSService que armazena os dados
        // this.messageS = this.messageService.getMessages();
        this.messageService.getMessages()
            .subscribe({
                next: (dadosSucess: any) => {
                    console.log(dadosSucess.myMsgSucess);
                    console.log({ content: dadosSucess.objMessageSRecuperadoS[0].content });
                    console.log({ id: dadosSucess.objMessageSRecuperadoS[0].messageId });

                    this.messageS = dadosSucess.objMessageSRecuperadoS
                },
                error: (dadosErro) => {
                    console.log(`$== !!Error (subscribe): - ${dadosErro.info_extra} ==`);
                    console.log(dadosErro);                    
                }
            })
    }
}