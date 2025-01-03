import { Component  , OnInit} from '@angular/core';
import {FormGroup,FormControl ,  FormsModule , ReactiveFormsModule} from '@angular/forms';
import {RouterOutlet} from '@angular/router';


    @Component({
        selector: 'app-nouvelle-consultation',
        imports: [  FormsModule  , ReactiveFormsModule ] ,
        templateUrl: './nouvelle-consultation.component.html',
        styleUrls: ['./nouvelle-consultation.component.css']
    })
export class NouvelleConsultationComponent  {

    consultationForm: FormGroup;
    constructor() {
        // Initialize the form directly in the constructor
        this.consultationForm = new FormGroup({
          consultatoinDate: new FormControl(''),
          consultationTime: new FormControl(''),
          consultatoinMedecin: new FormControl(''),
          consultationAntecedents: new FormControl(''),
          cnosultaionResumer: new FormControl(''),
          BilanBiologique: new FormControl(false),
          BilanRadiologique: new FormControl(false),
        });
      }
    

    onSubmit() {
        alert("hello");
    }
    

}
