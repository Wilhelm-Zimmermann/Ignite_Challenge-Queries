import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateOrdersAndGender1632071023037 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `CREATE TABLE "gender"(
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "name" varchar(89) NOT NULL,
          PRIMARY KEY ("id")
        )`
      )

      await queryRunner.query(
        `CREATE TABLE "orders"(
          "user_id" uuid NOT NULL,
          "game_id" uuid NOT NULL,
          CONSTRAINT "PK_wlmasdk23JSq342jh123gj"
          PRIMARY KEY ("user_id","game_id")
        )`
      )

      await queryRunner.query(
        `ALTER TABLE "games" ADD COLUMN "gender_id" uuid`
      );

      await queryRunner.query(
        `ALTER TABLE "games" 
        ADD CONSTRAINT "FK_p0nn0oixeiw2fq3jivj6vnsu" FOREIGN KEY ("gender_id") REFERENCES "gender"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
      );

      await queryRunner.query(
        `ALTER TABLE "orders"
        ADD CONSTRAINT "FK_wlsnnsadasesdfiw2fq3jivj6vnsu" FOREIGN KEY
        ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
      );

      await queryRunner.query(
        `ALTER TABLE "orders"
        ADD CONSTRAINT "FK_slea023kasdn0oiadf2fq3jivj6vnsu" FOREIGN KEY
        ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
      );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
