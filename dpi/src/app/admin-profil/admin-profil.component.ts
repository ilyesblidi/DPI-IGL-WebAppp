import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-profil',
  templateUrl: './admin-profil.component.html',
  styleUrls: ['./admin-profil.component.css']
})
export class AdminProfilComponent implements OnInit {
  admin = {
    name: 'John Doe',
    email: 'admin@example.com',
    phone: '+1 234 567 890',
    role: 'Administrator',
    joinedDate: 'January 15, 2022',
    avatar: 'https://via.placeholder.com/150'
  };

  constructor() {}

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.admin.avatar = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  editProfile(): void {
    alert('Edit profile functionality coming soon!');
  }
}
