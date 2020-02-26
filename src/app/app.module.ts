import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//firebase

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './share/navbar/navbar.component';
import { ListPedidosComponent } from './pages/list-pedidos/list-pedidos.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { AgregarpedidoComponent } from './pages/agregarpedido/agregarpedido.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormulariopedidoComponent } from './components/formulariopedido/formulariopedido.component';
import { HttpClientModule } from '@angular/common/http';



// Imports de material

import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// fomrs
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PedidosService } from './services/pedidos.service';
import { DetallespedidoComponent } from './pages/detallespedido/detallespedido.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListPedidosComponent,
    EstadisticasComponent,
    AgregarpedidoComponent,
    FormulariopedidoComponent,
    DetallespedidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [PedidosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
