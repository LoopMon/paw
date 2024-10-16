import { FormsModule } from "@angular/forms";
import { Component, EventEmitter, Input, input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Message } from "./message.model";

@Component({
    selector: 'app-message',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './message.component.html',
    styleUrl: './message.component.css'
})

export class MessageComponent {

    color = 'yellow'

    // @Input() messageVarClasse: Message = new Message("", "");
    
    messageVarClasse = input<Message>(new Message("", ""));
       
    @Output() outputMessage = new EventEmitter<string>();
    
    onEdit() {
        this.outputMessage.emit("Retorno: msg filha p/ o app pai");
    }
}

