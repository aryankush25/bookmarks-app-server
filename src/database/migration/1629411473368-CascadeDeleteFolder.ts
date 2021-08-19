import {MigrationInterface, QueryRunner} from "typeorm";

export class CascadeDeleteFolder1629411473368 implements MigrationInterface {
    name = 'CascadeDeleteFolder1629411473368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."folder" DROP CONSTRAINT "FK_9ee3bd0f189fb242d488c0dfa39"`);
        await queryRunner.query(`ALTER TABLE "public"."folder" ADD CONSTRAINT "FK_9ee3bd0f189fb242d488c0dfa39" FOREIGN KEY ("parentId") REFERENCES "folder"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."folder" DROP CONSTRAINT "FK_9ee3bd0f189fb242d488c0dfa39"`);
        await queryRunner.query(`ALTER TABLE "public"."folder" ADD CONSTRAINT "FK_9ee3bd0f189fb242d488c0dfa39" FOREIGN KEY ("parentId") REFERENCES "folder"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
