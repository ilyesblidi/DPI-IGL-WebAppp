import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  providers: [DataService ,],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  addUserForm: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) {
    this.addUserForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: [''],
      phone: ['', Validators.required],
      adresse: ['', Validators.required],
      role: ['', Validators.required],
      medecinTraitant: [''],
      numeroSecuriteSocial: [''],
      mutuelle: [''],
      password: [''],
      password2: ['']
    });

    // Watch for role changes
    this.addUserForm.get('role')?.valueChanges.subscribe((role) => this.adjustFormFields(role));
  }

  adjustFormFields(role: string) {
    const medecinTraitantControl = this.addUserForm.get('medecinTraitant');
    const numeroSecuriteSocialControl = this.addUserForm.get('numeroSecuriteSocial');
    const mutuelle = this.addUserForm.get('mutulle');
    const password = this.addUserForm.get('password');
    const password2 = password?.value;

    medecinTraitantControl?.updateValueAndValidity();
    numeroSecuriteSocialControl?.updateValueAndValidity();
    mutuelle?.updateValueAndValidity();

    if (role === 'patient') {
      medecinTraitantControl?.setValidators(Validators.required);
      numeroSecuriteSocialControl?.setValidators(Validators.required);
      mutuelle?.setValidators(Validators.required);
    } else {
      medecinTraitantControl?.clearValidators();
      numeroSecuriteSocialControl?.clearValidators();
      mutuelle?.clearValidators();
    }

    
    

    
  }



  onSubmit() {

    const medecin = {
      "first_name":this.addUserForm.get('first_name')?.value,
      "last_name":this.addUserForm.get('last_name')?.value,
      "email":this.addUserForm.get('email')?.value,
      "password":this.addUserForm.get('password')?.value,
      "password2":this.addUserForm.get('password')?.value,
      "phone": this.addUserForm.get('phone')?.value,
      "adresse":this.addUserForm.get('adresse')?.value,
      "role":this.addUserForm.get('role')?.value,
  }

    
    if (this.addUserForm.valid) {
      console.log('Form Data:', this.addUserForm.value);
      console.log('Form Data:', medecin);


      if(this.addUserForm.get('role')?.value === 'medecin'){

      this.dataService.addData('users/add', medecin).subscribe({

        next: (response: any) => {
          alert('User added successfully');
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          console.error(error);
          alert('Failed to create DPI');
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
  }
}
