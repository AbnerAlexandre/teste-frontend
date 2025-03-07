import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeveloperService } from '@services';
import { Developer } from '@models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
})
export class ProfileEditComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  developerId!: string;

  constructor(
    private fb: FormBuilder,
    public developerService: DeveloperService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      cellnumber: ['', Validators.required],
      city: ['', Validators.required],
      academicFormation: ['', Validators.required],
      skills: ['', Validators.required], // Aqui pode ser string separada por vírgula
      githubUsername: [''],
      avatarUrl: [''],
    });
  }

  ngOnInit(): void {
    this.developerId = this.route.snapshot.paramMap.get('id')!;
    this.developerService.getById(this.developerId).subscribe((request) => {
      const { data } = request;

      // Preenche o formulário com os dados recebidos
      this.form.patchValue({
        name: data.name,
        email: data.email,
        cellnumber: data.cellnumber,
        city: data.city,
        academicFormation: data.academicFormation,
        skills: Array.isArray(data.skills) ? data.skills.join(', ') : data.skills,
        githubUsername: data.githubUsername,
        avatarUrl: data.avatarUrl,
      });
    });
  }

  submit(): void {
    this.submitted = true;

    if (this.form.invalid) return;

    const formValue = this.form.value;

    const developer: Developer = {
      ...formValue,
      skills: formValue.skills.split(',').map((skill: string) => skill.trim()),
    };

    this.developerService.update(this.developerId, developer).subscribe({
      next: (response) => {
        alert('Cadastro atualizado com sucesso!');
        this.router.navigate(['/developer/view', this.developerId]);
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
          email: githubData.email || this.form.get('email')?.value,
        });
      },
      error: () => {
        alert('Usuário do GitHub não encontrado!');
      },
    });
  }

  get f() {
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
