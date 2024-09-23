import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TodoTask } from "@tasks/entity/todo-entity";

@Entity("version")
export class VersionTask {
  @PrimaryGeneratedColumn()
  versionId: number;
  @Column()
  versionNumber: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @ManyToOne(() => TodoTask, (todo) => todo.versions, {onDelete:"CASCADE"})
  todoTask:TodoTask[]

  @CreateDateColumn()
  createAt:Date
}
