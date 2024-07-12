import { Asset } from "src/assets/entities/asset.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Asset, (asset) => asset.comments)
    @JoinColumn({ name: "asset_id" })
    asset: Asset

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({ name: "author_id" })
    author: User

    @Column()
    authorUsername: string

    @Column()
    text: string

    @Column()
    isReply: boolean

    @OneToMany(() => Comment, comment => comment.replyTo)
    replies: Comment[]

    @ManyToOne(() => Comment, comment => comment.replies)
    replyTo: Comment

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}
