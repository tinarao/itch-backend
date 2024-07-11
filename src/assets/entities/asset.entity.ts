import { Genres } from "src/helpers/assets.enum";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Asset {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ nullable: true })
    description: string

    @ManyToOne(() => User, (user) => user.assets, { onDelete: "CASCADE" })
    @JoinColumn({ name: "author_id" })
    author: User

    @Column({ default: false })
    free: boolean

    @Column({ nullable: true })
    price: number

    @Column({ nullable: true })
    fileURL: string

    @Column({ nullable: true })
    coverPictureUrl: string

    @Column({ default: false })
    public: boolean

    @Column("text", { array: true, nullable: true })
    imagesURLs: string[]

    @Column({ type: "enum", enum: Genres, default: Genres.PIXEL_ART })
    genre: Genres

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
