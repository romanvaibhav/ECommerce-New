import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './sellers/auth/login/login.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { Store } from '@ngrx/store';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToasterService } from './shopper/services/toaster/toaster.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FooterComponent,HeaderComponent,ToastModule],
  providers:[MessageService,ToasterService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private store: Store) {}
  
  ngOnInit() {
    // Dispatch the action to load the cart when the app initializes
    this.store.dispatch({ type: '[App] App Init' });
  }
  title = 'Ecommerce';
}
