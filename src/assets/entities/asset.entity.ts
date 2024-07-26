import { Comment } from "src/comments/entities/comment.entity";
import { AssetCategories, AssetPixelSize, Genres } from "src/helpers/assets.enum";
import { Payment } from "src/payments/entities/payment.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    @OneToMany(() => Comment, comment => comment.asset)
    comments: Comment[]

    @OneToMany(() => Payment, payment => payment.asset)
    purchases: Payment[]

    @Column({ default: 0 })
    views: number

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

    @Column("text", { array: true, nullable: true })
    tags: string[]

    @Column({ type: "enum", enum: AssetCategories, array: true, default: [AssetCategories.Environment] })
    categories: AssetCategories[]

    @Column({ nullable: true })
    pixelArtSize: AssetPixelSize

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
