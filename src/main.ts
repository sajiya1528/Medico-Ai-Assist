import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

// App Component
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
            BrowserAnimationsModule,
            FormsModule,
            HttpClientModule,
            AppRoutingModule,
            MatButtonModule,
            MatIconModule,
            MatFormFieldModule,
            MatInputModule,
            MatSelectModule,
            MatCardModule,
            MatTableModule,
            MatTooltipModule,
            MatDialogModule
        )
    ]
}).catch(err => console.error(err));
