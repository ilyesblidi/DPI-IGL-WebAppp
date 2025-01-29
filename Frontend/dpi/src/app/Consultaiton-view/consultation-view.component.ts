import { Component  , OnInit} from '@angular/core';
import {FormGroup,FormControl ,  FormsModule , ReactiveFormsModule} from '@angular/forms';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { mock } from 'node:test';
import { stringify } from 'querystring';

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
    diagId!: string;
    dpiId!: string;
    consultId!: string;

    consultations: Array<{
      id_consultation: number;
      resume: string | null;
      examens_consultations: any[]; // Replace `any` with a specific type if needed
      date_consultation: string;
      diagnostic: number;
      medecin: number;
    }> = [];

    consultation  =  {
      id_consultation: 0,
      date_consultation: '',
      diagnostic: '',
      examens_consultations: null , // You can replace `any[]` with a specific type if needed
      medecin: 0,
      resume: '',
    }
  
    user = {
      name: '',
      surname: '',
      email: '',
      nss: '',
      creationDate: '',
      
      
  
   
    };

    payload = { id_consultation: 0 , resume:{ text : '' , antecedants : []}};
    
    payload2 = { diagnostic : 0};

    constructor(private dataservice : DataService , private route: ActivatedRoute) {
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

       
        
            this.payload2.diagnostic = Number(this.diagId);
            this.dataservice.addData(`consultations/` , this.payload2).subscribe({
              next: (consultList) => {
                console.log(consultList); // Handle the response
                this.consultations = consultList;
                for(let cons of consultList){
                  if(cons.id_consultation == this.consultId){
                    this.consultation = cons;
                    MockData.consultationDate = cons.date_consultation;
                    MockData.consultationTime = cons.date_consultation; 
                    MockData.consultatoinMedecin = cons.medecin;
                    MockData.consultationAntecedents = cons.examens_consultations;
                    MockData.cnosultaionResumer = cons.resume;
                    MockData.consultaitonID = cons.id_consultation.toString();
                    

                    this.consultationForm.patchValue(MockData);

                    break;
                  }
                }

                
                //this.list = consultList;
              },
              error: (err) => {
                alert("No consultations found") ;
                console.error('Error fetching data:', err);
              }
            });


          
        
        



      }

      ngOnInit(){
        this.dpiId = this.route.snapshot.paramMap.get('id')!;
        this.diagId = this.route.snapshot.paramMap.get('idDiag')!;
        this.consultId = this.route.snapshot.paramMap.get('consultid')!;
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

      
      this.payload.id_consultation = Number(this.consultId);
      this.payload.resume.text = this.consultationForm.value.cnosultaionResumer;
      this.payload.resume.antecedants = this.consultationForm.value.consultationAntecedents;
      console.log(this.payload);
      this.dataservice.addData(`consultations/modify/`, this.payload).subscribe({
        next: (consultList) => {
          alert('Resume added successfully');
          this.getDataFromBackEnd();
        },error: (error: any) => {
          console.error(error);
          alert('Failed to create DPI');
        }
      });
     
    

}
}


