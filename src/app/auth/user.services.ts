import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./user.model";
import { Observable, catchError, map } from "rxjs";

@Injectable()
export class UserService {
    private baseUrl = "http://localhost:3000"
    private usuarioLogado: User = new User('', '');

    private http = inject(HttpClient)

    errorHandler(e: any, info: string): Observable<any> {
        throw({
            info_extra: info,
            error_SS: e, // error de servidor
            error_CS: "Client-Side : errorHandler : Ocorreu um erro!" // error de cliente
        })
    }

    addUser(user: User): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/user/signup`, user).pipe(
            catchError((e) => this.errorHandler(e, "addUser()"))
        )
    }

    getUser(user: User): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/user/signin`, user).pipe(
            map((response: any) => {
                console.log('front-end, service:',response.objUserRecuperado)
                this.usuarioLogado = new User(
                    response.objUserRecuperado.email,
                    response.objUserRecuperado.password,
                    response.objUserRecuperado.firstName,
                    response.objUserRecuperado.lastName
                )

                return this.usuarioLogado
            }),
            catchError((e) => this.errorHandler(e, "getUser()"))
        )
    }

    setUserLogado(user: User): void {
        this.usuarioLogado = user
    }

    getUsuarioLogado(): User {
        return this.usuarioLogado;
    }

    isUsuarioLogado(): boolean {
        return this.usuarioLogado && this.usuarioLogado.email !== '';
    }
}