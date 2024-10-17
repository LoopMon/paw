import { Routes } from "@angular/router";
import { SignInComponent } from "./signin.component";
import { SignUpComponent } from "./signup.component";
import { LogOutComponent } from "./logout.component";

// Este path é relativo a "/autenticacao"
// Aqui temos as sub-rotas ("child routes")
export const AUTH_ROUTES: Routes = [
    { path: '', redirectTo: 'signup', pathMatch: 'full' },
    { path: 'signup', 'title': 'Autenticação | SingUp', component: SignUpComponent },
    { path: 'signin', 'title': 'Autenticação | SignIn', component: SignInComponent },
    { path: 'logout', 'title': 'Autenticação | LogOut', component: LogOutComponent }
]