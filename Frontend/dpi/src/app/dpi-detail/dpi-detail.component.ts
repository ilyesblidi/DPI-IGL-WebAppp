import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { DpiService } from '../dpi.service';

@Component({
  selector: 'app-dpi-detail',
  templateUrl: './dpi-detail.component.html',
  styleUrls: ['./dpi-detail.component.css']
})
export class DpiDetailComponent implements OnInit {
  dpiId!: string;
  dpiData: any;

  constructor(private router: Router, private route:ActivatedRoute, private dpiService: DpiService) {}

  ngOnInit(): void {
    this.dpiId = this.route.snapshot.paramMap.get('id')!;
    this.fetchDpiDetails();
  }

  fetchDpiDetails(): void {
    this.dpiService.getDpiById(this.dpiId).subscribe({
      next: (data) => {
        this.dpiData = data;
      },
      error: (err) => {
        console.error('Error fetching DPI details:', err);
      }
    });
  }

  GoToDiagnostics() {
    this.router.navigate(['/diagnostics']);
  }

  GoToSoins() {
    alert('Go to Soins');
  }

  GoToHospitalisations() {
    alert('Go to Hospitalisations');
  }

  GoToCertificats() {
    alert('Go to Certificats');
  }
}
