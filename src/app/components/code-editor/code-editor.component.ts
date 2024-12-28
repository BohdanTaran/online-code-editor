import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskService } from '../../data/services/task.service';
import { TaskDescriptionComponent } from "./task-description/task-description.component";
import { CodeEditorWindowComponent } from "./code-editor-window/code-editor-window.component";
import { map, Observable } from 'rxjs';
import { Task } from '../../data/models/task.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [TaskDescriptionComponent, CodeEditorWindowComponent, AsyncPipe],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeEditorComponent {
  private readonly taskService = inject(TaskService);

  private tasks$: Observable<Task[]> = this.taskService.getTasks();

  public activeTask$: Observable<Task | null> = this.tasks$.pipe(
    map((tasks) => tasks.length > 0 ? tasks[0] : null)
  );
}
