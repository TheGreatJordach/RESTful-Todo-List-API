import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class RegistryDate{
  @CreateDateColumn()
  createAt: Date
  @UpdateDateColumn()
  updateAt: Date
}
