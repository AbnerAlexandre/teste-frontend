import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeveloperService } from '@services';
import { Developer } from '@models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-create',
  templateUrl: './profile-create.component.html',
})
export class ProfileCreateComponent {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    public developerService: DeveloperService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      cellnumber: ['', Validators.required],
      city: ['', Validators.required],
      academicFormation: ['', Validators.required],
      skills: [[], Validators.required],
      githubUsername: [''],
      avatarUrl: [''],
    });
  }

  submit(): void {
    this.submitted = true;

    if (this.form.invalid) return;
  
    const developer: Developer = {
      ...this.form.value,
      skills: this.form.value.skills
        .split(", ")
    };
  
    this.developerService.create(developer).subscribe({
      next: (response) => {
        const createdDeveloper = response.data;
        this.form.reset();
        this.submitted = false;
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/developer/view', createdDeveloper._id]);
      },
    });
  }

  loadGithubData(): void {
    const username = this.form.get('githubUsername')?.value;
    if (!username) {
      alert('Informe o GitHub Username primeiro!');
      return;
    }
  
    this.developerService.getGithubUser(username).subscribe({
      next: (githubData) => {
        this.form.patchValue({
          name: githubData.name || '',
          avatarUrl: githubData.avatar_url || '',
          city: githubData.location || '',
          email: githubData.email || this.form.get('email')?.value
        });
      },
      error: () => {
        alert('Usuário do GitHub não encontrado!');
      },
    });
  }
  

  get f () {
    return this.form.controls;
  }

  getFirstError(controlName: string, viewName: string): string | null {
    const errors = this.f[controlName].errors;
    if (errors) {
      const firstErrorKey = Object.keys(errors)[0] as 'required' | 'minlength' | 'maxlength' | 'email';
      const details = errors[firstErrorKey];
      return this.developerService.returnFormError(firstErrorKey, viewName, details);
    }
    return null;
  }
}
