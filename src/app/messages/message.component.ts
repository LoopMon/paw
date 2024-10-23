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
    possoEditar = false
    messageEdit = ""
    @Output() outputMessage = new EventEmitter<string>();

    constructor(private messageServiceObj: MessageService) {}
    
    onEdit() {
        this.possoEditar = !this.possoEditar;
        this.messageEdit = this.messageVarClasse().content;
    }

    onConfirmEdit() {
        this.messageVarClasse().content = this.messageEdit;
        this.possoEditar = !this.possoEditar;

        this.messageServiceObj.updateMessage(this.messageVarClasse(), { content:this.messageVarClasse().content })
            .subscribe({
                next: (response) => {
                    console.log("Mensagem atualizada com sucesso:", response);
                },
                error: (error) => {
                    console.error("Erro ao atualizar a mensagem:", error);
                }
            })
    }

    onDelete() {
        this.messageServiceObj.deleteMessage(this.messageVarClasse()).subscribe({
            next: (response) => {
                console.log("Mensagem deletada com sucesso:", response);
            },
            error: (error) => {
                console.error("Erro ao deletar a mensagem:", error);
            }
        });
    }
}

