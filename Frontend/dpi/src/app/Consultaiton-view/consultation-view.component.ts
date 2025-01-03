import { Component  , OnInit} from '@angular/core';
import {FormGroup,FormControl ,  FormsModule , ReactiveFormsModule} from '@angular/forms';

@Component({
    selector: 'app-consultation-view',
    templateUrl: './consultaion-view.component.html',
    styleUrls: ['./consultation-view.component.css'],
    imports: [  FormsModule  , ReactiveFormsModule] ,
})
export class ConsultationViewComponent  {

    isReadOnly = true;
    isDisabled: boolean = true;
    consultationForm: FormGroup;
    savedata : FormGroup;
    constructor() {
        // Initialize the form directly in the constructor
        this.consultationForm = new FormGroup({
          consultatoinDate: new FormControl(''),
          consultationTime: new FormControl(''),
          consultatoinMedecin: new FormControl(''),
          consultationAntecedents: new FormControl(''),
          cnosultaionResumer: new FormControl(''),
          consultaitonID: new FormControl(''),
          BilanBiologique: new FormControl(false),
          BilanRadiologique: new FormControl(false),
        });

        this.savedata= new FormGroup({
          consultatoinDate: new FormControl(''),
          consultationTime: new FormControl(''),
          consultatoinMedecin: new FormControl(''),
          consultationAntecedents: new FormControl(''),
          cnosultaionResumer: new FormControl(''),
          consultaitonID: new FormControl(''),
          BilanBiologique: new FormControl(false),
          BilanRadiologique: new FormControl(false),
        });
      }

      getDataFromBackEnd(){
        const MockData={
          consultationDate: '2024-12-31',
          consultationTime: '14:30',
          consultatoinMedecin: 'Dr. Jane Doe',
          consultationAntecedents: 'No allergies, past surgery: appendectomy.',
          cnosultaionResumer: 'Routine check-up for diabetes management.',
          consultaitonID: '123',  
          BilanBiologique: true,
          BilanRadiologique: false,
        }

        this.consultationForm.patchValue(MockData);
      }

      ngOnInit(){
        this.getDataFromBackEnd();
      }

      enable(){
        this.isReadOnly = false;
        this.isDisabled = false;
        this.savedata.patchValue(this.consultationForm.value);

      }

      disable(){
        this.isReadOnly = true;
        this.isDisabled = true; 
        this.consultationForm.patchValue(this.savedata.value);
    }
    

    onSubmit() {
        alert("hello");
    }
    

}


