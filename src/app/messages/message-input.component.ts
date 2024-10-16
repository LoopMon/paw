import { FormsModule, NgForm } from "@angular/forms";
import { Component, inject } from "@angular/core";

import { MessageService } from "./message.services";
import { Message } from "./message.model";

@Component ({
    selector: "app-message-input",
    standalone: true,
    imports: [FormsModule],
    templateUrl: "./message-input.component.html",
    styles: `input.ng-invalid.ng-touched { border: 1px solid red; }`
})

export class MessageInputComponent {
    private messageService = inject(MessageService);

    onSubmit(form: NgForm) {
        console.log("MessageInputComponent:");
        console.log(form);
        const messageAux = new Message(form.value.myContentngForm, 'Lucas');
        this.messageService.addMessage(messageAux);
        form.resetForm();
    }
}