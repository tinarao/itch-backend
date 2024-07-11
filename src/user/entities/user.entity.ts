import { Asset } from "src/assets/entities/asset.entity"
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

export enum Roles {
    Artist = "artist",
    GameDeveloper = "game_developer",
    Consumer = "consumer"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column({ unique: true })
    email: string

    @Column({ type: "enum", enum: Roles, default: Roles.Consumer })
    role: Roles

    @Column({ select: false })
    password: string

    @OneToMany(() => Asset, asset => asset.author)
    assets: Asset[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
