import { TodoTask } from "@tasks/entity/todo-entity";

export interface VersionInterface {
  readonly versionNumber: number;
  readonly title: string;
  readonly description: string;
  readonly todoTask:TodoTask[]
}
