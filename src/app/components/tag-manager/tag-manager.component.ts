import { Component, OnInit } from '@angular/core'; // ✅ Ajout de OnInit
import { CommonModule } from '@angular/common'; 
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-tag-manager',
  templateUrl: './tag-manager.component.html',
    imports: [CommonModule, RouterModule, FormsModule],
  styleUrls: ['./tag-manager.component.css']
})
export class TagManagerComponent implements OnInit {
  tags: any[] = [];
  tagForm = {
    _id: null,
    nom: '',
    role: '',
    couleur: ''
  };

  constructor(private http: HttpClient, private router: Router) {} // Ajoute le Router si tu as besoin de redirections

  ngOnInit(): void {
    this.getTags();
  }

  getTags() {
    this.http.get<any[]>('http://localhost:5000/api/tags').subscribe(data => {
      this.tags = data;
    });
  }

  saveTag() {
    if (this.tagForm._id) {
      this.http.put(`http://localhost:5000/api/tags/${this.tagForm._id}`, this.tagForm).subscribe(() => {
        this.getTags();
        this.resetForm();
      });
    } else {
      this.http.post('http://localhost:5000/api/tags', this.tagForm).subscribe(() => {
        this.getTags();
        this.resetForm();
      });
    }
  }

  editTag(tag: any) {
    this.tagForm = { ...tag };
  }

  deleteTag(id: string) {
    this.http.delete(`http://localhost:5000/api/tags/${id}`).subscribe(() => {
      this.getTags();
    });
  }

  resetForm() {
    this.tagForm = { _id: null, nom: '', role: '', couleur: '' };
  }
}
