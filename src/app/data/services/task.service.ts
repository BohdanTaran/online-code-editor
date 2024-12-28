import { HttpClient } from '@angular/common/http';
import { inject, Injectable, output } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Task } from '../models/task.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly http = inject(HttpClient);
  private readonly baseApiUrl = environment.baseApiUrl;

  constructor() { }

  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseApiUrl}/tasks`);
  }

  public getOneTask(id: number): Observable<Task | null> {
    return this.getTasks().pipe(
      map((tasks) => {
        return tasks.find((t) => t.id === id) || null;
      })
    )
  }

  public getSolution(language: string, task: Task): Observable<string> {
    return this.getOneTask(task.id).pipe(
      map((t) => {
        if (t && t.solutions[language]) {
          return t.solutions[language].code;
        }
        return "There is not solutions!"
      })
    )
  }

  public checkSolution(language: string, code: string): Observable<{ output: string, error: string | null, status: string }> {
    return this.getTasks().pipe(
      map((tasks) => {
        const task = tasks.find((t) => t.solutions[language]);        
        if (!task) {          
          return {
            output: '',
            error: "Language is not supported!",
            status: "Error",
          };
        }

        const solution = task.solutions[language];
        if (code === solution.code) {
          
          return {
            output: solution.successResponse.output,
            error: null,
            status: solution.successResponse.status,
          };
        } else {
          return {
            output: '',
            error: solution.errorResponse.error,
            status: solution.errorResponse.status,
          };
        }
      })
    );
  }
}
