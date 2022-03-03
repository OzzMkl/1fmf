import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

//Modelos con sus  datas
import { generos } from 'src/app/data/generos';
import { Genero } from 'src/app/models/genero';

import { nacionalidades } from 'src/app/data/nacionalidades';
import { Nacionalidad } from 'src/app/models/nacionalidad';

import { clubes } from 'src/app/data/clubes';
import { Club } from 'src/app/models/club';
//Pdf
import jsPDF from 'jspdf'
//import html2canvas from 'html2canvas';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers:[NgWizardService]
})
export class FormComponent implements OnInit {
  //dataS
  public genders : any;
  public nationalities : any;
  public clubs : any;
  //variables para la credencial
  public fullName:string ='';
  public age: any;
  public age2:any;
  public gender:Genero;
  public nationality: Nacionalidad;
  public club: Club;
  public ocu: string;
  public rfcx: string;
  //patern
  rfcPattern: any = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;

  

  constructor( private ngWizarService: NgWizardService) {
    //Asignamos los datas de arrays a una variable para poder recorrerlos
    this.genders = generos;
    this.nationalities = nacionalidades;
    this.clubs = clubes;
   }

  ngOnInit(): void {
    
  }

  //Reactive Form
  formFMF = new FormGroup({//declaramos adentro las variables a usar
    name : new FormControl('',Validators.required),//se usar la clase validators para marcar como requerida los campos
    firstLastName : new FormControl('',Validators.required),
    secondLastName : new FormControl('',Validators.required),
    birthdate : new FormControl('',Validators.required),
    idGender : new FormControl('',Validators.required),
    idNationality : new FormControl('',Validators.required),
    idClub : new FormControl('',Validators.required),
    ocupation : new FormControl('',Validators.required),
    rfc : new FormControl('', Validators.pattern(this.rfcPattern))//No es requerido ya que dependemos de la edad del usuario
  })

//Capturar formulario
onSubmit(){
  if(this.formFMF.valid){
    //concatenamos el nombre
  this.fullName = this.formFMF.get('name').value +' '+this.formFMF.get('firstLastName').value +' '+ this.formFMF.get('secondLastName').value;
  //buscamos el id para traer la informacion completa del modelo
  this.gender = this.genders.find(element => element.id == this.formFMF.get('idGender').value);
  this.nationality = this.nationalities.find(element => element.idN == this.formFMF.get('idNationality').value);
  this.club = this.clubs.find(element => element.id == this.formFMF.get('idClub').value);
  //lo asignamos a una variable
  this.age = this.formFMF.get('birthdate').value;
  this.ocu = this.formFMF.get('ocupation').value;
  this.rfcx = this.formFMF.get('rfc').value;
  }else{
    console.log('No valido')
  }
  

}


onChange(e:any){//evento que muestra los datos del proveedor al seleccionarlo
  var hoy = new Date();
  this.age = new Date(this.formFMF.get('birthdate').value);
  this.age2 = hoy.getFullYear() - this.age.getFullYear();
  var m = hoy.getMonth() - this.age.getMonth();
  if(m<0 || (m === 0 && hoy.getDate() < this.age.getDate())){
      this.age2--;
  }
  return this.age2;
  
}
//descarga del pdf
 public downloadPDF(): void {
   const doc = new jsPDF();//inicializamos
   //vamos asignando por linea
    doc.text('Estos son tus datos!', 10, 10);
    doc.text('Nombre: '+this.fullName, 10, 20);
    doc.text('Fecha de nacimiento: '+this.age, 10, 30);
    doc.text('Genero: '+this.gender.nombre, 10, 40);
    doc.text('Nacionalidad: '+this.nationality.nombre, 10, 50);
    doc.text('Club seleccionado: '+this.club.nombre, 10, 60);
    doc.text('Ocupacion: '+this.ocu, 10, 70);
    doc.text('RFC: '+this.rfcx, 10, 80);
    doc.save('MisDatos.pdf');
 }



//Esto es del steper
  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };
  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      toolbarExtraButtons: [
        { text: 'Finish', class: 'btn btn-info', event: () => { alert("Finished!!!"); } }
      ],
    }
  };
  
showPreviousStep(event?: Event) {
  this.ngWizarService.previous();
}
showNextStep(event?: Event) {
  this.ngWizarService.next();
}
resetWizard(event?: Event) {
  this.ngWizarService.reset();
}
setTheme(theme: THEME) {
  this.ngWizarService.theme(theme);
}
stepChanged(args: StepChangedArgs) {
  //console.log(args.step);
}
isValidTypeBoolean: boolean = true;
isValidFunctionReturnsBoolean(args: StepValidationArgs) {
  return true;
}
isValidFunctionReturnsObservable(args: StepValidationArgs) {
  return of(true);
}

}
