import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Contact } from '../model/contact.interface';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export default class ContactFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private contactService = inject(ContactService);

  form?: FormGroup;
  contact?: Contact;

  save() {
    if (this.form?.invalid) {
      this.form.markAllAsTouched();
      return;
    } // Validamos el formulario

    const contact = this.form?.value;
    if (this.contact) {
      this.contactService.update(this.contact.id, contact)
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    } else {
      this.contactService.store(contact)
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contactService.show(parseInt(id))
        .subscribe(contact => {
          this.contact = contact;
          this.form = this.fb.group({
            name: [contact.name, [Validators.required]],
            email: [contact.email, [Validators.required, Validators.email]]
          });
        });
    } else {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]]
      });
    }
  }
}
