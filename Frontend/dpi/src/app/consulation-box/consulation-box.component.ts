import { Component, Input } from '@angular/core';
import { DataService } from '../data.service';  
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-consulation-box',
  imports: [],
  templateUrl: './consulation-box.component.html',
  styleUrl: './consulation-box.component.css'
})
export class ConsulationBoxComponent {
@Input() date!: string; // the date to display 
@Input() ID!: number; // id de la consultation 

diagId!: string;
dpiId!: string;
consultId!: string;


  constructor(private dataservice : DataService , private route: ActivatedRoute , private router: Router) { 
     // default date
  }

  ngOnInit() {
    this.dpiId = this.route.snapshot.paramMap.get('id')!;
    this.diagId = this.route.snapshot.paramMap.get('idDiag')!;
  }


  openConsulation() { // route to the consultation page 
        this.router.navigate([`dpi-detail/${this.dpiId}/diagnostic-list/${this.diagId}/consultationview/${this.ID}`]);
      }



}
