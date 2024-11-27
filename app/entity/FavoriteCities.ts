import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: "favoriteCities" })
export class FavoriteCities {
	@PrimaryGeneratedColumn("uuid")
	id!: string

	@Column({ type: "varchar", nullable: true })
	name!: string | null

	@Column({ type: "varchar", nullable: true })
	country!: string | null

	@Column({ type: "varchar", nullable: true })
  population!: number | null;

	@Column({ type: "varchar", nullable: true })
  imageUrl!: string | null;

	@Column({ type: "varchar", nullable: true })
	latitude!: number | null

	@Column({ type: "varchar", nullable: true })
	longitude!: number | null
}