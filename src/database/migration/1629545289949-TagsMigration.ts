import {MigrationInterface, QueryRunner} from "typeorm";

export class TagsMigration1629545289949 implements MigrationInterface {
    name = 'TagsMigration1629545289949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag" ("id" character varying NOT NULL, "name" text NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "userId" character varying, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag_bookmarks_bookmark" ("tagId" character varying NOT NULL, "bookmarkId" character varying NOT NULL, CONSTRAINT "PK_b555292b8fd0438f6a02c44cf95" PRIMARY KEY ("tagId", "bookmarkId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b115c43e5e5b2dc2b3ad7621e1" ON "tag_bookmarks_bookmark" ("tagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_276a0f4fbe04cc5b9514fa3c91" ON "tag_bookmarks_bookmark" ("bookmarkId") `);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_d0dc39ff83e384b4a097f47d3f5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag_bookmarks_bookmark" ADD CONSTRAINT "FK_b115c43e5e5b2dc2b3ad7621e16" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tag_bookmarks_bookmark" ADD CONSTRAINT "FK_276a0f4fbe04cc5b9514fa3c912" FOREIGN KEY ("bookmarkId") REFERENCES "bookmark"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag_bookmarks_bookmark" DROP CONSTRAINT "FK_276a0f4fbe04cc5b9514fa3c912"`);
        await queryRunner.query(`ALTER TABLE "tag_bookmarks_bookmark" DROP CONSTRAINT "FK_b115c43e5e5b2dc2b3ad7621e16"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_d0dc39ff83e384b4a097f47d3f5"`);
        await queryRunner.query(`DROP INDEX "IDX_276a0f4fbe04cc5b9514fa3c91"`);
        await queryRunner.query(`DROP INDEX "IDX_b115c43e5e5b2dc2b3ad7621e1"`);
        await queryRunner.query(`DROP TABLE "tag_bookmarks_bookmark"`);
        await queryRunner.query(`DROP TABLE "tag"`);
    }

}
