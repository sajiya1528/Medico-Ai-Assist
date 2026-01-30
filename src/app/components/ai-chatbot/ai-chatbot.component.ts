import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, Inject, Optional } from '@angular/core';
import { AuthService } from '../../services/auth.service';
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

    // Predefined responses for the AI chatbot
    private responses: { [key: string]: { text: string, options?: string[] } } = {
        'greeting': {
            text: "Hello! I'm your AI Health Assistant. How can I help you today?",
            options: [
                'Check symptoms',
                'Book appointment',
                'Health tips',
                'Emergency info'
            ]
        },
        'check symptoms': {
            text: "I can help you understand your symptoms. Please describe what you're experiencing:",
            options: [
                'Fever ',
                'headache',
                'Cough and cold',
                'Stomach pain',
                'Back pain',
                'Other symptoms'
            ]
        },
        'fever': {
            text: "Please tell me your temperature in degrees (fahrenheit).",
            options: ["98-99°F", "100-101°F", "102°F or higher"]
        },
        'fever response': {
            text: "Fever and headache can be symptoms of various conditions like flu, viral infection, or stress. I recommend:\n\n• Rest and stay hydrated\n• Take over-the-counter pain relievers\n• Monitor your temperature\n• If fever persists for more than 3 days, consult a doctor\n\nWould you like to book an appointment with a doctor?",
            
            options: ['Book appointment', 'More health tips', 'Ask another question']
        },
        '98-99°f': {
            text: "Your temperature is between 98 to 99°F. This is normal. No need to worry. Stay hydrated and take rest.",
            options: [
                'Health tips',
                'Book appointment',
                'Ask another question'
            ]
        },
        '100-101°f': {
            text: "Your temperature is between 100 to 101°F. This shows mild fever. Please take rest and drink warm fluids.",
            options: [
                'Health tips',
                'Book appointment',
                'Emergency info'
            ]
        },
        '102°f or higher': {
            text: "Your temperature is 102°F or higher. This is high fever. Please consult a doctor immediately.",
            options: [
                'Book appointment',
                'Emergency info',
                'Ask another question'
            ]
        },
        'headache': {
            text: "For headache, here are some recommendations. Get enough rest, drink plenty of water, and avoid screen time. If pain continues, consult a doctor.",
            options: [
                'Book appointment',
                'More remedies',
                'Ask another question'
            ]
        },
        'cough and cold': {
            text: "For cough and cold, here are some recommendations:\n\n• Get plenty of rest\n• Drink warm fluids\n• Use a humidifier\n• Gargle with salt water\n• Take vitamin C\n\nIf symptoms worsen or persist beyond a week, please consult a doctor.",
            options: ['Book appointment', 'More remedies', 'Ask another question']
        },
        'stomach pain': {
            text: "Stomach pain can have various causes. Here's what you can do:\n\n• Avoid heavy meals\n• Stay hydrated\n• Try peppermint tea\n• Rest in a comfortable position\n\n⚠️ If you experience severe pain, vomiting, or fever, seek immediate medical attention.",
            options: ['Book appointment', 'Emergency info', 'Ask another question']   },
        'back pain': {
            text: "For back pain relief:\n\n• Apply heat or cold packs\n• Gentle stretching exercises\n• Maintain good posture\n• Avoid heavy lifting\n• Consider physiotherapy\n\nIf pain is severe or persistent, I recommend consulting an orthopedic specialist.",
            options: ['Book appointment', 'Exercise tips', 'Ask another question']
        },
        'book appointment': {
            text: "Great! I can help you book an appointment with one of our doctors. You'll be redirected to the appointment booking section. Would you like to proceed?",
            options: ['Yes, book now', 'Not now', 'Ask another question']
        },
        'health tips': {
            text: "Here are some general health tips:\n\n✓ Drink 8 glasses of water daily\n✓ Exercise for 30 minutes daily\n✓ Get 7-8 hours of sleep\n✓ Eat a balanced diet\n✓ Practice stress management\n✓ Regular health check-ups\n\nWhat specific health topic interests you?",
            options: [
                'Nutrition advice',
                'Exercise routines',
                'Mental health',
                'Ask another question'
            ]
        },
        'emergency info': {
            text: "🚨 EMERGENCY INFORMATION\n\nCall emergency services (911/108) immediately if you experience:\n\n• Chest pain or pressure\n• Difficulty breathing\n• Severe bleeding\n• Loss of consciousness\n• Severe allergic reaction\n• Stroke symptoms (FAST)\n\nFor non-emergencies, you can book an appointment with our doctors.",
            options: ['Book appointment', 'Ask another question']
        },
        'nutrition advice': {
            text: "Nutrition Tips:\n\n• Include fruits and vegetables in every meal\n• Choose whole grains over refined grains\n• Limit sugar and processed foods\n• Include lean proteins\n• Healthy fats from nuts and fish\n• Control portion sizes\n\nWould you like specific dietary recommendations?",
            options: ['Weight management', 'Diabetes diet', 'Heart-healthy diet', 'Ask another question']
        },
        'exercise routines': {
            text: "Exercise Recommendations:\n\n🏃 Cardio: 150 minutes/week\n💪 Strength training: 2-3 times/week\n🧘 Flexibility: Daily stretching\n\nBeginner-friendly exercises:\n• Walking\n• Swimming\n• Cycling\n• Yoga\n\nAlways consult a doctor before starting a new exercise program.",
            options: ['More fitness tips', 'Book appointment', 'Ask another question']
        },
        'mental health': {
            text: "Mental Health is Important:\n\n• Practice mindfulness and meditation\n• Maintain social connections\n• Get regular exercise\n• Ensure adequate sleep\n• Seek professional help when needed\n• Practice gratitude\n\nWe have mental health specialists available. Would you like to book a consultation?",
            options: ['Book appointment', 'Stress management tips', 'Ask another question']
        },
        'default': {
            text: "I'm here to help! I can assist you with:\n\n• Symptom checking\n• Health tips and advice\n• Booking appointments\n• Emergency information\n• General health questions\n\nWhat would you like to know?",
            options: [
                'Check symptoms',
                'Health tips',
                'Book appointment',
                'Emergency info'
            ]
        }
    };

    constructor(
        private authService: AuthService,
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
            this.addBotMessage(this.responses['greeting'].text, this.responses['greeting'].options);
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

    sendMessage(): void {
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
        setTimeout(() => {
            this.isTyping = false;
            this.generateResponse(input);
        }, 1000 + Math.random() * 1000);
    }

    sendQuickReply(option: string): void {
        this.userInput = option;
        this.sendMessage();
    }

    generateResponse(input: string): void {
        let response = this.responses['default'];

        // Match user input to responses
        for (const key in this.responses) {
            if (input.includes(key.toLowerCase())) {
                response = this.responses[key];
                break;
            }
        }

        // Check for greetings
        if (input.match(/\b(hi|hello|hey|greetings)\b/)) {
            response = this.responses['greeting'];
        }

        this.addBotMessage(response.text, response.options);
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
