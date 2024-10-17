import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
    selector: 'app-signin',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './signin.component.html'
})

export class SignInComponent implements OnInit {
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
        console.log(this.myFormIn);
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