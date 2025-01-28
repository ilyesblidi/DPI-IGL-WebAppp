import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

interface Doctor {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  adresse: string;
  role: string;
}

interface Soin {
  id: number;
  soin_infirmier: string;
  observation_patient: string;
  date: string;
  admin_medicament_input: {
    advice: string;
  };
}

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule to imports
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {
  doctor: Doctor = {
    first_name: "Medecin",
    last_name: "Medecin",
    email: "medecin2@gmail.com",
    phone: "bnd",
    adresse: "bnd",
    role: "medecin"
  };

  soins: Soin[] = [
    {
      id: 1,
      soin_infirmier: "Treatment A",
      observation_patient: "Patient showing good progress",
      date: "2024-03-15",
      admin_medicament_input: {
        advice: "Take medication after meals"
      }
    },
    {
      id: 2,
      soin_infirmier: "Treatment B",
      observation_patient: "Follow-up required",
      date: "2024-03-16",
      admin_medicament_input: {
        advice: "Take twice daily"
      }
    }
  ];

  isModalOpen = false; // State to control the modal visibility
  newCare: Soin = {
    id: 0,
    soin_infirmier: '',
    observation_patient: '',
    date: '',
    admin_medicament_input: {
      advice: ''
    }
  };

  constructor() {}

  ngOnInit(): void {
    // Fetch the actual data from your API if necessary
  }

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen; // Toggle the modal visibility
  }

  addCare(): void {
    const newId = this.soins.length > 0 ? Math.max(...this.soins.map(s => s.id)) + 1 : 1;
    const careToAdd: Soin = {
      ...this.newCare,
      id: newId,
    };

    this.soins.push(careToAdd);

    // Reset the newCare object and close the modal
    this.newCare = {
      id: 0,
      soin_infirmier: '',
      observation_patient: '',
      date: '',
      admin_medicament_input: {
        advice: ''
      }
    };
    this.toggleModal();
  }
}