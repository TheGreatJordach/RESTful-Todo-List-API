import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entity/user-entity";
import { RegistryDate } from "@common/embedded/registry-date";
import { VersionTask } from "@versions/entity/version-entity";

@Entity("todos")
export class TodoTask{

  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title:string
  @Column()
  description:string

  @OneToMany(() => VersionTask, (version) => version.todoTask)
  versions:VersionTask[]
  @OneToMany(() => User, (user) => user.todos,{onDelete:"CASCADE"})
  user:User

  @Column(()=> RegistryDate,{prefix:false})
  registryDate:RegistryDate
}
