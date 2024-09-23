import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RegistryDate } from "@common/embedded/registry-date";
import { TodoTask } from "../../../todo-management/tasks/entity/todo-entity";

@Entity("users")
export class User{
  @PrimaryGeneratedColumn()
  userID: number
  @Column()
  name: string
  @Column({unique:true,nullable:false})
  email: string
  @Column()
  password: string

  @ManyToOne(() => TodoTask, (todo) => todo.user)
  todos:TodoTask[]

  @Column(()=> RegistryDate,{prefix:false})
  registryDate:RegistryDate

}
