import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Message } from './message.model'
import { Observable, catchError, map } from 'rxjs'

@Injectable()
export class MessageService {
    private baseUrl = 'http://localhost:3000'
    private messageSService: Message[] = []

    private http = inject(HttpClient)

    errorHandler(e: any, info: string): Observable<any> {
        throw({
            info_extra: info,
            error_SS: e, // Pega o server-side error
            error_CS: 'Client-Side : errorHandler : Ocorreu um erro!' // Pega o client-side error
        })
    }

    addMessage(message: Message) {
        this.messageSService.push(message)
        console.log(this.messageSService)

        return this.http.post<any>(`${this.baseUrl}/message`, message).pipe(
            catchError((e) => this.errorHandler(e, 'addMensagem()'))
        )
    }

    deleteMessage(message: Message) {
        this.messageSService.splice(this.messageSService.indexOf(message), 1)
    }

    getMessages() {
        // return this.messageSService
        return this.http.get<any>(`${this.baseUrl}/message`).pipe(
            map((responseRecebida: any) => {
                console.log(responseRecebida);
                console.log({ content: responseRecebida.objMessageSRecuperadoS[0].content });
                console.log({ _id: responseRecebida.objMessageSRecuperadoS[0]._id });
                
                const messageSResponseRecebida = responseRecebida.objMessageSRecuperadoS

                let transformedCastMessagesModelFrontend: Message[] = []

                for (let msg of messageSResponseRecebida) {
                    transformedCastMessagesModelFrontend.push(
                        new Message(msg.content, 'Lucas', msg._id)
                    )
                }

                this.messageSService = [...transformedCastMessagesModelFrontend]
                responseRecebida.objMessageSRecuperadoS = this.messageSService

                console.log({ myMsgSucess: responseRecebida.myMsgSucess });
                console.log({ content: responseRecebida.objMessageSRecuperadoS[0].content });
                console.log({ id: responseRecebida.objMessageSRecuperadoS[0].messageId });

                return responseRecebida
            }),
            catchError((e) => this.errorHandler(e, "getMessage()"))
        )
    }
}