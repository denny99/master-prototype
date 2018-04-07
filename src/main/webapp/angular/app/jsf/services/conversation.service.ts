import {Injectable} from '@angular/core';
import {ConversationAlreadyStartedException} from '../exceptions/conversation-already-started.exception';
import {Conversation} from '../objects/conversation';

@Injectable()
export class ConversationService {
  conversation: Conversation = null;

  constructor() {
  }

  beginConversation(): void {
    if (this.conversation) {
      throw new ConversationAlreadyStartedException();
    }
    this.conversation = new Conversation();
  }

  endConversation(): void {
    this.conversation = null;
  }

  isActive(): boolean {
    return this.conversation !== null;
  }
}
