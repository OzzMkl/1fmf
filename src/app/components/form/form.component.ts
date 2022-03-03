import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

import { generos } from 'src/app/data/generos';
import { Genero } from 'src/app/models/genero';

import { nacionalidades } from 'src/app/data/nacionalidades';
import { Nacionalidad } from 'src/app/models/nacionalidad';

import { clubes } from 'src/app/data/clubes';
import { Club } from 'src/app/models/club';


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
    //console.log(this.genders)
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
    rfc : new FormControl('')
  })


onSubmit(){
  //concatenamos el nombre
  this.fullName = this.formFMF.get('name').value +' '+this.formFMF.get('firstLastName').value +' '+ this.formFMF.get('secondLastName').value;
  //buscamos el id para traer la informacion completa del modelo
  this.gender = this.genders.find(element => element.id == this.formFMF.get('idGender').value);
  this.nationality = this.nationalities.find(element => element.idN == this.formFMF.get('idNationality').value);
  this.club = this.clubs.find(element => element.id == this.formFMF.get('idClub').value);
  this.ocu = this.formFMF.get('ocupation').value;
  this.rfcx = this.formFMF.get('rfc').value;

}



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
