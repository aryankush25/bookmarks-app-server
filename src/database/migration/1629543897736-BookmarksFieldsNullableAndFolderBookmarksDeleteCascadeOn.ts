import {MigrationInterface, QueryRunner} from "typeorm";

export class BookmarksFieldsNullableAndFolderBookmarksDeleteCascadeOn1629543897736 implements MigrationInterface {
    name = 'BookmarksFieldsNullableAndFolderBookmarksDeleteCascadeOn1629543897736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."bookmark" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."bookmark" ALTER COLUMN "imageUrl" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."bookmark" ALTER COLUMN "imageUrl" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."bookmark" ALTER COLUMN "description" SET NOT NULL`);
    }

}
