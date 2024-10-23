import { Component, OnInit, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

import { UserService } from "./user.services";
import { User } from "./user.model";

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './signup.component.html'
})

export class SignUpComponent implements OnInit {
    private userService = inject(UserService)
    myForm!: FormGroup;

    onSubmit() {
        const user = new User(
            this.myForm.value.emailTS,
            this.myForm.value.passwordTS,
            this.myForm.value.firstNameTS,
            this.myForm.value.lastNameTS
        )

        this.userService.addUser(user).subscribe({
            next: (dadosSucess: any) => {
                console.log('signup:',dadosSucess);
            },
            error: (dadosErro) => {
                console.log(`$== !!Error (subscribe): - ${dadosErro.info_extra} ==`);
                console.log(dadosErro);
            }
        })
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            firstNameTS: new FormControl(null, Validators.required),
            lastNameTS: new FormControl(null, [
                Validators.required, 
                Validators.minLength(4),
                Validators.maxLength(16)
            ]),
            emailTS: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")
            ]),
            passwordTS: new FormControl(null, Validators.required)
        });
    }
}