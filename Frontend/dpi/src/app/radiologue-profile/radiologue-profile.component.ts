import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Pour les formulaires

interface RadiologyReport {
  patientName: string;
  examType: string;
  date: string;
  results: string;
  images: string[]; // Pour stocker les fichiers image
}

@Component({
  selector: 'app-radiologue-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './radiologue-profile.component.html',
  styleUrls: ['./radiologue-profile.component.css']
})
export class RadiologueProfileComponent implements OnInit {
  radiologist = {
    firstName: 'Radiologue',
    lastName: 'Expert',
    email: 'radiologue@example.com',
    phone: '123-456-789',
    specialty: 'Radiologie'
  };

  reports: RadiologyReport[] = [];
  newReport: RadiologyReport = {
    patientName: '',
    examType: '',
    date: '',
    results: '',
    images: []
  };

  isModalOpen = false;

  constructor() {}

  ngOnInit(): void {
    this.reports = [
      {
        patientName: 'John Doe',
        examType: 'Chest X-ray',
        date: '2025-01-01',
        results: 'No abnormalities detected. Lungs are clear.',
        images: ['https://i.ibb.co/jWD1Ct3/e-komm.png'] // Replace with a real URL
      },
      {
        patientName: 'John Doe',
        examType: 'Chest X-ray',
        date: '2025-01-01',
        results: 'No abnormalities detected. Lungs are clear.',
        images: [] // Add actual files here if needed
      },
      {
        patientName: 'Jane Smith',
        examType: 'MRI Brain Scan',
        date: '2025-01-02',
        results: 'Mild swelling observed in the frontal lobe. Further evaluation recommended.',
        images: [] // Add actual files here if needed
      },
      {
        patientName: 'Ali Ahmed',
        examType: 'Abdominal Ultrasound',
        date: '2025-01-03',
        results: 'Gallbladder shows signs of inflammation. Diagnosis: Cholecystitis.',
        images: [] // Add actual files here if needed
      }
    ];
  }

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  addReport(): void {
    this.reports.push({ ...this.newReport });
    this.newReport = {
      patientName: '',
      examType: '',
      date: '',
      results: '',
      images: []
    };
    console.log(this.reports);
    this.isModalOpen = false;
  }

  handleFileUpload(event: any): void {
    const files = Array.from(event.target.files) as File[];
    this.newReport.images = files.map(file => URL.createObjectURL(file));
    console.log(this.newReport.images); // To verify the generated URLs
  }

}