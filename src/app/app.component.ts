import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Message } from './messages/message.model'; 
import { MessageComponent } from './messages/message.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'frontend'
  messageBinding: Message = new Message("Texto da Messagem", "Lucas");
}