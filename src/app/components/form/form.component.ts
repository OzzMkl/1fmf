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
import html2canvas from 'html2canvas';




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
  public age:string;
  public gender:Genero;
  public nationality: Nacionalidad;
  public club: Club;
  public ocu: string;
  public rfcx: string;

  

  constructor( private ngWizarService: NgWizardService) {
    //Asignamos los datas de arrays a una variable para poder recorrerlos
    this.genders = generos;
    this.nationalities = nacionalidades;
    this.clubs = clubes;
   }

  ngOnInit(): void {
    console.log(this.genders);
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
    rfc : new FormControl('')//No es requerido ya que dependemos de la edad del usuario
  })


onSubmit(){
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

}


downloadPDF() {
  // Extraemos el
  const DATA = document.getElementById('htmlData');
  const doc = new jsPDF('p', 'pt', 'a4');
  const options = {
    background: 'white',
    scale: 3
  };
  html2canvas(DATA, options).then((canvas) => {

    const img = canvas.toDataURL('image/PNG');

    // Add image Canvas to PDF
    const bufferX = 15;
    const bufferY = 15;
    const imgProps = (doc as any).getImageProperties(img);
    const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
    return doc;
  }).then((docResult) => {
    docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
  });
}


// public downloadPDF(): void {


//   const doc = new jsPDF();
   
  
//    doc.text('Estos son tus datos!', 10, 10);
//    doc.text('Nombre: '+this.fullName, 10, 20);
//    doc.text('Fecha de nacimiento: '+this.age, 10, 30);
//    doc.text('Genero: '+this.gender.nombre, 10, 40);
//    doc.text('Nacionalidad: '+this.nationality.nombre, 10, 50);
//    doc.text('Club seleccionado: '+this.club.nombre, 10, 60);
//    doc.text('Ocupacion: '+this.ocu, 10, 70);
//    doc.text('RFC: '+this.rfcx, 10, 80);
//    doc.save('MisDatos.pdf');
// }



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
