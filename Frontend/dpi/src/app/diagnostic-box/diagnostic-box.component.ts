import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-diagnostic-box',
  imports: [],
  templateUrl: './diagnostic-box.component.html',
  styleUrl: './diagnostic-box.component.css'
})


export class DiagnosticBoxComponent {
  dpiId!: string;
  diagId!: string;


  // we are going to diplay them using their ID or maybe their creation date i still am not sure but for now let's just use the id 
  @Input() ID!: string;

  constructor(private router: Router , private route: ActivatedRoute ) { }
    // retreve the list of the existing diagnostic files 
    

  openDiagnostic(){
    this.dpiId = this.route.snapshot.paramMap.get('id')!;
    this.router.navigate([`/dpi-detail/${this.dpiId}/diagnostic-list/${this.ID}`]);
  }

}
