import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  addUserForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: [''],
      phone: ['', Validators.required],
      adresse: ['', Validators.required],
      role: ['', Validators.required],
      medecinTraitant: [''],
      numeroSecuriteSocial: [''],
      mutuelle: ['']
    });

    // Watch for role changes
    this.addUserForm.get('role')?.valueChanges.subscribe((role) => this.adjustFormFields(role));
  }

  adjustFormFields(role: string) {
    const medecinTraitantControl = this.addUserForm.get('medecinTraitant');
    const numeroSecuriteSocialControl = this.addUserForm.get('numeroSecuriteSocial');
    const mutuelle = this.addUserForm.get('mutulle');
    if (role === 'patient') {
      medecinTraitantControl?.setValidators(Validators.required);
      numeroSecuriteSocialControl?.setValidators(Validators.required);
      mutuelle?.setValidators(Validators.required);
    } else {
      medecinTraitantControl?.clearValidators();
      numeroSecuriteSocialControl?.clearValidators();
      mutuelle?.clearValidators();
    }

    medecinTraitantControl?.updateValueAndValidity();
    numeroSecuriteSocialControl?.updateValueAndValidity();
    mutuelle?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      console.log('Form Data:', this.addUserForm.value);
    } else {
      console.error('Form is invalid');
    }
  }
}
