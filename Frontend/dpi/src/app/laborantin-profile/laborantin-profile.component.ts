import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

interface Laborantin {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  adresse: string;
  role: string;
}

interface Test {
  date: string;
  glycemie: string;
  cholesterol: string;
  pression: string;
  notes: string;
}

@Component({
  selector: 'app-laborantin-profile',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule to imports
  templateUrl: './laborantin-profile.component.html',
  styleUrls: ['./laborantin-profile.component.css']
})
export class LaborantinProfileComponent implements OnInit {
  laborantin: Laborantin = {
    first_name: "Medecin",
    last_name: "Medecin",
    email: "medecin2@gmail.com",
    phone: "bnd",
    adresse: "bnd",
    role: "medecin"
  };

  tests: Test[] = [];
  newTest: Test = {
    date: '',
    glycemie: '',
    cholesterol: '',
    pression: '',
    notes: ''
  };

  isModalOpen = false;

  constructor() {}

  ngOnInit(): void {
    // Fetch the actual data from your API if necessary
  }

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  addTest(): void {
    this.tests.push({ ...this.newTest });
    this.newTest = { date: '', glycemie: '', cholesterol: '', pression: '', notes: '' };
    this.isModalOpen = false;
  }
}