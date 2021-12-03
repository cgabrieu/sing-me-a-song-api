CREATE TABLE "recommendations" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"youtubeLink" varchar(255) NOT NULL,
	"score" integer NOT NULL,
	CONSTRAINT "recommendations_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "genres" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "genres_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "recommendations_genres" (
	"id" serial NOT NULL,
	"recommendations_id" integer NOT NULL,
	"genres_id" integer NOT NULL,
	CONSTRAINT "recommendations_genres_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "recommendations_genres" ADD CONSTRAINT "recommendations_genres_fk0" FOREIGN KEY ("recommendations_id") REFERENCES "recommendations"("id");
ALTER TABLE "recommendations_genres" ADD CONSTRAINT "recommendations_genres_fk1" FOREIGN KEY ("genres_id") REFERENCES "genres"("id");



