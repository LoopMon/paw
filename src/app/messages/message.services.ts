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
        const [messageDeleted] = this.messageSService.splice(this.messageSService.indexOf(message), 1)
        const messageId = messageDeleted.messageId
        
        return this.http.delete<any>(`${this.baseUrl}/message/${messageId}`).pipe(
            catchError((e) => this.errorHandler(e, 'deleteMessage()')) 
        );  // Faz a requisição DELETE
    }

    updateMessage(message: Message, partialMessage: Partial<Message>) {
        const messageUpdated = this.messageSService[this.messageSService.indexOf(message)]
        console.log(partialMessage);
        
        const messageId = messageUpdated.messageId
        
        return this.http.patch<any>(`${this.baseUrl}/message/${messageId}`, partialMessage).pipe(
            catchError((e) => this.errorHandler(e, 'updateMessage()'))
        )
    }

    getMessages() {
        return this.http.get<any>(`${this.baseUrl}/message`).pipe(
            map((responseRecebida: any) => {
                console.log(responseRecebida);
                
                const messageSResponseRecebida = responseRecebida.objMessageSRecuperadoS

                let transformedCastMessagesModelFrontend: Message[] = []

                for (let msg of messageSResponseRecebida) {
                    transformedCastMessagesModelFrontend.push(
                        new Message(msg.content, 'Lucas', msg._id)
                    )
                }

                this.messageSService = [...transformedCastMessagesModelFrontend]
                responseRecebida.objMessageSRecuperadoS = this.messageSService

                return responseRecebida
            }),
            catchError((e) => this.errorHandler(e, "getMessage()"))
        )
    }
}