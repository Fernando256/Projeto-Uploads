CREATE DATABASE `project_upload` COLLATE utf8_general_ci;

CREATE TABLE project_upload.comments (
	id_comment INT auto_increment NOT NULL,
	comment TEXT NOT NULL,
	id_upload INT NOT NULL,
	id_user INT NOT NULL,
	CONSTRAINT comments_PK PRIMARY KEY (id_comment)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

CREATE TABLE project_upload.uploads (
	id_upload INT auto_increment NOT NULL,
	title VARCHAR(255) NOT NULL,
	description TEXT NULL,
	date_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	ext_archive varchar(100) NOT NULL,
	id_user INT NOT NULL,
	CONSTRAINT uploads_PK PRIMARY KEY (id_upload)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

CREATE TABLE project_upload.users (
	id_user INT auto_increment NOT NULL,
	name varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	CONSTRAINT users_PK PRIMARY KEY (id_user)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

ALTER TABLE uploads ADD CONSTRAINT FOREIGN KEY (id_user) REFERENCES users(id_user);
ALTER TABLE comments ADD CONSTRAINT FOREIGN KEY (id_user) REFERENCES users(id_user);
ALTER TABLE comments ADD CONSTRAINT FOREIGN KEY (id_upload) REFERENCES uploads(id_upload);