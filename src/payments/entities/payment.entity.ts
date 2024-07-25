import { Asset } from "src/assets/entities/asset.entity"
import { Comment } from "src/comments/entities/comment.entity"
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

export enum PaymentStatuses {
    Pending = "pending",
    Success = "success",
    Cancelled = "cancelled",
    Refunded = 'refunded'
}

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    paymentId: string;

    @Column()
    summ: number;

    @Column({ type: "enum", enum: PaymentStatuses, default: PaymentStatuses.Pending })
    status: PaymentStatuses

    @ManyToOne(() => User, (user) => user.orders, { onDelete: "CASCADE" })
    @JoinColumn({ name: "buyer_id" })
    buyer: User

    @ManyToOne(() => Asset, (asset) => asset.purchases, { onDelete: "CASCADE" })
    @JoinColumn({ name: "asset_id" })
    asset: Asset

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
