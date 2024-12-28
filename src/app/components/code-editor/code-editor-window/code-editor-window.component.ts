import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

import { LanguageComments, Languages } from '../../../data/constants/languages.constants';
import { TaskService } from '../../../data/services/task.service';
import { catchError, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Task } from '../../../data/models/task.interface';

@Component({
  selector: 'app-code-editor-window',
  standalone: true,
  imports: [MatIconModule, MatSelectModule, MatButtonModule, MonacoEditorModule, FormsModule, ReactiveFormsModule],
  templateUrl: './code-editor-window.component.html',
  styleUrl: './code-editor-window.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeEditorWindowComponent implements OnInit {
  @Input({ required: true }) task: Task | null = null;

  private readonly taskService = inject(TaskService);
  private readonly fb = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef)

  public readonly languages = Object.values(Languages);

  public code = LanguageComments[Languages.Javascript];
  public status: string | null = null;
  public output: string | null = null;
  public error: string | null = null;

  public selectLanguageForm = this.fb.group<{ language: FormControl<Languages> }>({
    language: new FormControl<Languages>(Languages.Javascript, { nonNullable: true })
  })

  public editorOptions = {
    theme: 'vs-dark', 
    language: this.selectLanguageForm.controls.language.value,
  };

  ngOnInit(): void {
      this.selectLanguageForm.controls.language.valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe((language) => {
        if (language) {
          this.code = LanguageComments[language];
          this.editorOptions = { ...this.editorOptions, language },
          this.resetMessages();
        }
    })
  }

  public runCode() {
    this.resetMessages();

    const language = this.selectLanguageForm.controls.language.value

    if (this.selectLanguageForm.valid) {
      this.executeCode(language, this.code)
    }
  }

  public cleanCode(): void {
    this.code = LanguageComments[Languages.Javascript];
    this.resetMessages();
    this.cdr.markForCheck();
  }

  public showSolution(): void {
    if (this.selectLanguageForm.valid && this.task) {
      
      const language = this.selectLanguageForm.controls.language.value

      this.taskService.getSolution(language, this.task).pipe(
        tap((solution) => {
          this.code = solution;          
          this.cdr.markForCheck();
        }),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe();
    }
  }

  private resetMessages() {
    this.error = null;
    this.output = null;
}

  private executeCode(language: Languages, code: string): void {
    this.taskService.checkSolution(language, code).pipe(
      tap(({ output, error, status }) => {
        this.output = output,
        this.error = error,
        this.status = status,
        
        this.cdr.markForCheck();
      }),
      catchError((error) => {
        this.error = error,
        this.cdr.markForCheck()

        return [];
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

}
