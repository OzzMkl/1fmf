import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Importamos componentes
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  //Declaramos rutas
  {path: '', component: HomeComponent},//asignamos pagina principal
  {path: 'Formulario-FMF', component: FormComponent}//direccion del formulario

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
