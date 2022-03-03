import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

import { generos } from 'src/app/data/generos';
import { Genero } from 'src/app/models/genero';

import { nacionalidades } from 'src/app/data/nacionalidades';

import { clubes } from 'src/app/data/clubes';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers:[NgWizardService]
})
export class FormComponent implements OnInit {

  public genders : any;
  public nationalities : any;
  public clubs : any;
  public age:any;
  public age2:any;

  constructor( private ngWizarService: NgWizardService) {
    this.genders = generos;
    this.nationalities = nacionalidades;
    this.clubs = clubes;
    this.age = new Date().getFullYear();
    this.age2 = this.formFMF.get('birthdate').value;
   }

  ngOnInit(): void {
    
  }

  //Reactive Form
  formFMF = new FormGroup({//declaramos adentro las variables a usar
    name : new FormControl('',Validators.required),//se usar la clase validators para marcar como requerida los campos
    firstLastName : new FormControl('',Validators.required),
    secondLastName : new FormControl('',Validators.required),
    birthdate : new FormControl('',Validators.required),
    gender : new FormControl('',Validators.required),
    nationality : new FormControl('',Validators.required),
    club : new FormControl('',Validators.required),
    ocupation : new FormControl('',Validators.required),
    rfc : new FormControl('')
  })






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
