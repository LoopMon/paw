import { FormsModule } from "@angular/forms";
import { Component, EventEmitter, Input, input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Message } from "./message.model";
import { MessageService } from "./message.services";

@Component({
    selector: 'app-message',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './message.component.html',
    styleUrl: './message.component.css'
})

export class MessageComponent {   
    messageVarClasse = input<Message>(new Message("", ""));
       
    @Output() outputMessage = new EventEmitter<string>();

    constructor(private messageServiceObj: MessageService) {}
    
    onEdit() {
        this.outputMessage.emit("Retorno: msg filha p/ o app pai (signal)");
    }

    onDelete() {
        this.messageServiceObj.deleteMessage(this.messageVarClasse())
    }
}

