import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, Inject, Optional } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { OpenaiService } from '../../services/openai.service';
import { User } from '../../models/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIcon } from "@angular/material/icon";
import { CommonModule, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

interface Message {
    text: string;
    isBot: boolean;
    timestamp: Date;
    options?: string[];
}

interface ChatSession {
    id: string;
    title: string;
    messages: Message[];
    createdAt: Date;
}

@Component({
    selector: 'app-ai-chatbot',
    templateUrl: './ai-chatbot.component.html',
    styleUrls: ['./ai-chatbot.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatIcon,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTooltipModule,
        SlicePipe
    ]
})
export class AiChatbotComponent implements OnInit, AfterViewChecked {
    @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

    currentUser: User | null = null;
    messages: Message[] = [];
    userInput: string = '';
    isTyping: boolean = false;
    chatSessions: ChatSession[] = [];
    currentSessionId: string = '';
    showSidebar: boolean = true;
    isExpanded: boolean = false;

    // Fallback responses for when API is unavailable
    private fallbackResponses: { [key: string]: { text: string, options?: string[] } } = {
        'greeting': {
            text: "Hello! I'm your AI Health Assistant. How can I help you today?",
            options: [
                'Check symptoms',
                'Book appointment',
                'Health tips',
                'Emergency info'
            ]
        },
        'error': {
            text: "I'm experiencing technical difficulties right now. Please try again later or contact support.",
            options: ['Try again', 'Contact support']
        }
    };

    constructor(
        private authService: AuthService,
        private openaiService: OpenaiService,
        @Optional() public dialogRef: MatDialogRef<AiChatbotComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {
        this.currentUser = this.authService.currentUserValue;
        this.loadChatSessions();
        this.startNewChat();
    }

    ngAfterViewChecked(): void {
        this.scrollToBottom();
    }

    loadChatSessions(): void {
        const saved = localStorage.getItem('chatSessions');
        if (saved) {
            this.chatSessions = JSON.parse(saved).map((session: any) => ({
                ...session,
                createdAt: new Date(session.createdAt),
                messages: session.messages.map((msg: any) => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp)
                }))
            }));
        }
    }

    saveChatSessions(): void {
        localStorage.setItem('chatSessions', JSON.stringify(this.chatSessions));
    }

    startNewChat(): void {
        const sessionId = Date.now().toString();
        const newSession: ChatSession = {
            id: sessionId,
            title: `Chat ${this.chatSessions.length + 1}`,
            messages: [],
            createdAt: new Date()
        };

        this.chatSessions.unshift(newSession);
        this.currentSessionId = sessionId;
        this.messages = [];

        // Send greeting message
        setTimeout(() => {
            this.addBotMessage(this.fallbackResponses['greeting'].text, this.fallbackResponses['greeting'].options);
        }, 500);

        this.saveChatSessions();
    }

    loadChat(session: ChatSession): void {
        this.currentSessionId = session.id;
        this.messages = session.messages;
    }

    deleteChat(sessionId: string, event: Event): void {
        event.stopPropagation();
        if (confirm('Are you sure you want to delete this chat?')) {
            this.chatSessions = this.chatSessions.filter(s => s.id !== sessionId);
            this.saveChatSessions();

            if (this.currentSessionId === sessionId) {
                if (this.chatSessions.length > 0) {
                    this.loadChat(this.chatSessions[0]);
                } else {
                    this.startNewChat();
                }
            }
        }
    }

    async sendMessage(): Promise<void> {
        if (!this.userInput.trim()) return;

        const userMessage: Message = {
            text: this.userInput,
            isBot: false,
            timestamp: new Date()
        };

        this.messages.push(userMessage);
        this.updateCurrentSession();

        const input = this.userInput.toLowerCase();
        this.userInput = '';

        // Simulate typing
        this.isTyping = true;
        setTimeout(async () => {
            this.isTyping = false;
            await this.generateResponse(input);
        }, 1000 + Math.random() * 1000);
    }

    sendQuickReply(option: string): void {
        this.userInput = option;
        this.sendMessage();
    }

    async generateResponse(input: string): Promise<void> {
        try {
            // Use OpenAI to generate response
            const response = await this.openaiService.generateResponse(input, this.messages);

            // Add the response to chat
            this.addBotMessage(response);
        } catch (error) {
            console.error('Error generating AI response:', error);

            // Fallback to basic response if API fails
            let fallbackResponse = this.fallbackResponses['error'];

            // Check for greetings as fallback
            if (input.match(/\b(hi|hello|hey|greetings)\b/)) {
                fallbackResponse = this.fallbackResponses['greeting'];
            }

            this.addBotMessage(fallbackResponse.text, fallbackResponse.options);
        }
    }

    addBotMessage(text: string, options?: string[]): void {
        const botMessage: Message = {
            text: text,
            isBot: true,
            timestamp: new Date(),
            options: options
        };

        this.messages.push(botMessage);
        this.updateCurrentSession();
    }

    updateCurrentSession(): void {
        const session = this.chatSessions.find(s => s.id === this.currentSessionId);
        if (session) {
            session.messages = [...this.messages];
            // Update title based on first user message
            if (session.messages.length === 2 && !session.messages[0].isBot) {
                session.title = session.messages[0].text.substring(0, 30) + '...';
            }
            this.saveChatSessions();
        }
    }

    scrollToBottom(): void {
        try {
            if (this.messagesContainer) {
                this.messagesContainer.nativeElement.scrollTop =
                    this.messagesContainer.nativeElement.scrollHeight;
            }
        } catch (err) { }
    }

    toggleSidebar(): void {
        this.showSidebar = !this.showSidebar;
    }

    toggleExpand(): void {
        this.isExpanded = !this.isExpanded;
    }

    closeDialog(): void {
        if (this.dialogRef) {
            this.dialogRef.close();
        }
    }

    formatTime(date: Date): string {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}
