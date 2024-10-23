import { FormsModule, NgForm } from "@angular/forms";
import { Component, inject, OnInit } from "@angular/core";

import { MessageService } from "./message.services";
import { UserService } from "../auth/user.services";
import { Message } from "./message.model";
import { User } from "../auth/user.model";

@Component ({
    selector: "app-message-input",
    standalone: true,
    imports: [FormsModule],
    templateUrl: "./message-input.component.html",
    styles: `input.ng-invalid.ng-touched { border: 1px solid red; }`
})

export class MessageInputComponent implements OnInit {
    private messageService = inject(MessageService);
    private userService = inject(UserService)
    userLogado: User = new User('', '')

    onSubmit(form: NgForm) {
        const messageAux = new Message(form.value.myContentngForm, this.userLogado.email);

        this.messageService.addMessage(messageAux)
            .subscribe({
                next: (dadosSucesso: any) => {
                    console.log(dadosSucesso.myMsgSucess);
                },
                error: (dadosErro) => {
                    console.log(`$== !!Error (subscribe): - ${dadosErro.info_extra} ==`);
                    console.log(dadosErro);
                }
            })
        form.resetForm();
    }

    ngOnInit(): void {
        this.userLogado = this.userService.getUsuarioLogado()
        console.log("foi",this.userLogado);
    }
}