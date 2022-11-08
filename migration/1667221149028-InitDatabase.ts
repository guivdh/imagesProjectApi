import {MigrationInterface, QueryRunner} from "typeorm";

export class InitDatabase1667221149028 implements MigrationInterface {
    name = 'InitDatabase1667221149028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "country" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "label" character varying(255) NOT NULL, CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying(255) NOT NULL, "countryId" uuid, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userFirstName" character varying(255) NOT NULL, "userLastName" character varying(255) NOT NULL, "userPseudo" character varying(255) NOT NULL, "userPassword" character varying(255) NOT NULL, "userEmail" character varying(255) NOT NULL, "userRoleId" uuid, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "label" character varying(255) NOT NULL, "path" character varying(255) NOT NULL, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "establishment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "imageId" uuid, "userId" uuid, "addressId" uuid, CONSTRAINT "PK_149bd9dc1f2bd4e825a0c474932" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "publication" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dishName" character varying(255) NOT NULL, "dishType" character varying(255) NOT NULL, "description" text NOT NULL, "taste" numeric NOT NULL, "presentation" numeric NOT NULL, "quantity" numeric NOT NULL, "price" numeric NOT NULL, "imageId" uuid, "userId" uuid, "establishmentId" uuid, CONSTRAINT "PK_8aea8363d5213896a78d8365fab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" text NOT NULL, "publicationId" uuid, "userId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "like" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "publicationId" uuid, "userId" uuid, CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parameter_categories" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "label_fr" character varying(50) NOT NULL, CONSTRAINT "PK_e975b88096f8d8b38b90e1a031b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parameters" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "logic_value" character varying(50) NOT NULL, "label_fr" character varying(50) NOT NULL, "is_active" boolean NOT NULL, "parameter_category_id" integer, CONSTRAINT "PK_6b03a26baa3161f87fa87588859" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tickets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ticketTitle" character varying(255) NOT NULL, "ticketDescription" text NOT NULL, "ticketCreatedAt" date NOT NULL, "ticketModifiedAt" date NOT NULL, "ticketStatusId" uuid, "ticketCreatedByUserId" uuid, "ticketModifiedByUserId" uuid, CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d87215343c3a3a67e6a0b7f3ea9" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a52455e2cef06f0a3faf30f96a3" FOREIGN KEY ("userRoleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "establishment" ADD CONSTRAINT "FK_6df81fc013784b858cd7ebb4d64" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "establishment" ADD CONSTRAINT "FK_61e853387dd62d598d0adcc71c4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "establishment" ADD CONSTRAINT "FK_52558cfc3173952afd0e49bd6f5" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "publication" ADD CONSTRAINT "FK_c4e1b2a88e15a1361223e7a9663" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "publication" ADD CONSTRAINT "FK_ca72b09f205afc223b9866471fe" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "publication" ADD CONSTRAINT "FK_ea9eb0e2b3edfc1cfada89ea182" FOREIGN KEY ("establishmentId") REFERENCES "establishment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_7a3ab4c780dd39723d6e64048f0" FOREIGN KEY ("publicationId") REFERENCES "publication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_676ba3726d4c84f04b55d1dfdd3" FOREIGN KEY ("publicationId") REFERENCES "publication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_e8fb739f08d47955a39850fac23" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parameters" ADD CONSTRAINT "FK_3008b90e3d356365338cb84eb2e" FOREIGN KEY ("parameter_category_id") REFERENCES "parameter_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_0312a34967067b700c9f0dd0276" FOREIGN KEY ("ticketStatusId") REFERENCES "parameters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_fd5ccecc468e4511eb79161c694" FOREIGN KEY ("ticketCreatedByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_6c49c1b7a5444ba64ab4dd9cda4" FOREIGN KEY ("ticketModifiedByUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_6c49c1b7a5444ba64ab4dd9cda4"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_fd5ccecc468e4511eb79161c694"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_0312a34967067b700c9f0dd0276"`);
        await queryRunner.query(`ALTER TABLE "parameters" DROP CONSTRAINT "FK_3008b90e3d356365338cb84eb2e"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_e8fb739f08d47955a39850fac23"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_676ba3726d4c84f04b55d1dfdd3"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_7a3ab4c780dd39723d6e64048f0"`);
        await queryRunner.query(`ALTER TABLE "publication" DROP CONSTRAINT "FK_ea9eb0e2b3edfc1cfada89ea182"`);
        await queryRunner.query(`ALTER TABLE "publication" DROP CONSTRAINT "FK_ca72b09f205afc223b9866471fe"`);
        await queryRunner.query(`ALTER TABLE "publication" DROP CONSTRAINT "FK_c4e1b2a88e15a1361223e7a9663"`);
        await queryRunner.query(`ALTER TABLE "establishment" DROP CONSTRAINT "FK_52558cfc3173952afd0e49bd6f5"`);
        await queryRunner.query(`ALTER TABLE "establishment" DROP CONSTRAINT "FK_61e853387dd62d598d0adcc71c4"`);
        await queryRunner.query(`ALTER TABLE "establishment" DROP CONSTRAINT "FK_6df81fc013784b858cd7ebb4d64"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a52455e2cef06f0a3faf30f96a3"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d87215343c3a3a67e6a0b7f3ea9"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TABLE "parameters"`);
        await queryRunner.query(`DROP TABLE "parameter_categories"`);
        await queryRunner.query(`DROP TABLE "like"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "publication"`);
        await queryRunner.query(`DROP TABLE "establishment"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "country"`);
    }

}
