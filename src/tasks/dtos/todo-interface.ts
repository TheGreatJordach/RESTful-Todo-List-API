import { VersionTask } from "@versions/entity/version-entity";
import { User } from "@users/entity/user-entity";

export interface TodoInterface {
  readonly title: string;
  readonly description: string;
  readonly versions: VersionTask[]
  readonly user:User
  readonly priority?:boolean
  readonly dueDate?:Date
  readonly status?:Status
}

export enum Status {
  ON_PROGRESS = "ON_PROGRESS",
  FINISHED = "FINISHED",
  NOT_STARTED= "NOT_STARTED",
}
