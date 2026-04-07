import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1775526785151 implements MigrationInterface {
    name = 'Initial1775526785151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying, "email" character varying(50) NOT NULL, "password" character varying(150) NOT NULL, "TypeUser" character varying NOT NULL DEFAULT 'normal_user', "isAccountVerified" boolean NOT NULL DEFAULT false, "verificationToken" character varying, "profileIamge" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Revise" ("id" SERIAL NOT NULL, "comment" character varying(250) NOT NULL, "rating" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "productId" integer, "userId" integer, CONSTRAINT "PK_230ee7a2d318ccd47e773f8a762" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "title" character varying(150) NOT NULL, "description" character varying NOT NULL, "price" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "userId" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Revise" ADD CONSTRAINT "FK_8b129b77544c6f49b44027200c1" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Revise" ADD CONSTRAINT "FK_2899d84492dfad9fa2f12fcef13" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9"`);
        await queryRunner.query(`ALTER TABLE "Revise" DROP CONSTRAINT "FK_2899d84492dfad9fa2f12fcef13"`);
        await queryRunner.query(`ALTER TABLE "Revise" DROP CONSTRAINT "FK_8b129b77544c6f49b44027200c1"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "Revise"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
