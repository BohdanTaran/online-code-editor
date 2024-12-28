import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Task } from '../../../data/models/task.interface';

import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-task-description',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './task-description.component.html',
  styleUrl: './task-description.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDescriptionComponent {
  @Input({ required: true }) task: Task | null = null;
}
