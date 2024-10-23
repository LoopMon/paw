import { Component, OnInit, inject } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserService } from "./user.services";
import { User } from "./user.model";

@Component({
    selector: 'app-signin',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './signin.component.html'
})

export class SignInComponent implements OnInit {
    private userService = inject(UserService);
    myFormIn!: FormGroup;

    constructor(private fb: FormBuilder) {}

    minusculoFValidator(control: AbstractControl) {
        const pass = control.value as string;

        if ((pass !== pass?.toLowerCase()) && (pass !== null)) {
            return { minusculoF: true};
        }
        return null;
    }

    onSubmit() {
        this.userService.getUser(new User(
            this.myFormIn.value.emailTS,
            this.myFormIn.value.passwordTS
        )).subscribe({
            next: (dadosSucess: any) => {
                console.log('signin:', dadosSucess);
                this.userService.setUserLogado(dadosSucess)
            },
            error: (dadosErro) => {
                console.log(`$== !!Error (subscribe): - ${dadosErro.info_extra} ==`);
                console.log(dadosErro);
            }
        })
        this.myFormIn.reset();        
    }

    ngOnInit(): void {
        this.myFormIn = this.fb.group({
            emailTS: [
                null, 
                Validators.compose([
                    Validators.required,
                    Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")
                ])
            ],
            passwordTS: [
                null, 
                Validators.compose([
                    Validators.required,
                    Validators.minLength(4),
                    this.minusculoFValidator
                ])
            ]
        })
    }
}