import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Message } from './messages/message.model'; 
import { MessageComponent } from './messages/message.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MessageComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

// ngFor -> CommonModule

export class AppComponent {
  title = 'frontend';
  messageBinding: Message = new Message("Texto da Messagem", "Lucas");

  messageS: Message[] = [
    new Message("Bom dia", "Carlos"),
    new Message("Boa tarde", "Luiz"),
    new Message("Boa noite", "Julio")
  ]

  mostrarElemento: boolean = true;
  onMudaMostrarElemento() {
    this.mostrarElemento = !this.mostrarElemento;
  }

  valorNgSwitch: number = 0;
}

// slide 18 do b2