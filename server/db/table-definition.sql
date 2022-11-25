/*******************************************************************************
   Email domain definition
********************************************************************************/

CREATE EXTENSION IF NOT EXISTS citext;

CREATE OR REPLACE FUNCTION isEmailValid(email CITEXT) RETURNS BOOLEAN AS $$
    BEGIN

        IF (email ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$') = FALSE THEN
            RAISE EXCEPTION 'Email is invalid!'
                USING HINT = 'Please check if it is your actual email.';

        END IF;
        RETURN TRUE;

    END;
$$ LANGUAGE plpgsql;

CREATE DOMAIN EMAIL AS CITEXT
  CONSTRAINT "EMAIL_Check" CHECK (isEmailValid(VALUE));

/*******************************************************************************
   Country table definition
********************************************************************************/

CREATE TABLE "Country"
(
    "CountryId"             SERIAL              NOT NULL,
    "Name"                  TEXT                NOT NULL,

    CONSTRAINT "PK_Country" PRIMARY KEY ("CountryId"),
    CONSTRAINT "Unique_Country_Name" UNIQUE ("Name")
);

/*******************************************************************************
   Role table definition
********************************************************************************/

CREATE TABLE "Role"
(
    "RoleId"                SERIAL              NOT NULL,
    "Name"                  TEXT                NOT NULL,

    CONSTRAINT "PK_Role" PRIMARY KEY ("RoleId"),
    CONSTRAINT "Unique_Role_Name" UNIQUE ("Name")
);

/*******************************************************************************
   User table definition
********************************************************************************/

CREATE TABLE "User"
(
    "UserId"                SERIAL              NOT NULL,
    "RoleId"                INTEGER             NOT NULL,
    "CountryId"             INTEGER             NOT NULL,
    "Username"              TEXT                NOT NULL,
    "PasswordHash"          TEXT                NOT NULL,
    "Email"                 EMAIL               NOT NULL,
    "FirstName"             TEXT,
    "LastName"              TEXT,
    "Organization"          TEXT,
    "IsVerified"            BOOLEAN             NOT NULL,

    CONSTRAINT "PK_User" PRIMARY KEY ("UserId"),
    CONSTRAINT "Unique_User_Username" UNIQUE ("Username"),
    CONSTRAINT "Unique_User_Email" UNIQUE ("Email")
);

ALTER TABLE "User" ADD CONSTRAINT "FK_User_RoleId"
    FOREIGN KEY ("RoleId") REFERENCES "Role" ("RoleId")
        ON DELETE NO ACTION
        ON UPDATE NO ACTION;

ALTER TABLE "User" ADD CONSTRAINT "FK_User_CountryId"
    FOREIGN KEY ("CountryId") REFERENCES "Country" ("CountryId") 
        ON DELETE NO ACTION
        ON UPDATE NO ACTION;

/*******************************************************************************
   Group table definition
********************************************************************************/

CREATE TABLE "Group"
(
    "GroupId"               SERIAL              NOT NULL,
    "Name"                  TEXT                NOT NULL,

    CONSTRAINT "PK_Group" PRIMARY KEY ("GroupId"),
    CONSTRAINT "Unique_Group_Name" UNIQUE ("Name")
);

/*******************************************************************************
   UserGroup table definition
********************************************************************************/

CREATE TABLE "UserGroup"
(
    "UserId"                INTEGER             NOT NULL,
    "GroupId"               INTEGER             NOT NULL,

    CONSTRAINT "PK_UserGroup" PRIMARY KEY ("UserId", "GroupId")
);

ALTER TABLE "UserGroup" ADD CONSTRAINT "FK_UserGroup_UserId"
    FOREIGN KEY ("UserId") REFERENCES "User" ("UserId")
        ON DELETE CASCADE
        ON UPDATE CASCADE;

ALTER TABLE "UserGroup" ADD CONSTRAINT "FK_UserGroup_GroupId"
    FOREIGN KEY ("GroupId") REFERENCES "Group" ("GroupId")
        ON DELETE CASCADE
        ON UPDATE CASCADE;

/*******************************************************************************
   Tag table definition
********************************************************************************/

CREATE TABLE "Tag"
(
    "TagId"                 SERIAL              NOT NULL,
    "Name"                  TEXT                NOT NULL,

    CONSTRAINT "PK_Tag" PRIMARY KEY ("TagId"),
    CONSTRAINT "Unique_Tag_Name" UNIQUE ("Name")
);

/*******************************************************************************
   Quiz table definition
********************************************************************************/

CREATE TABLE "Deck"
(
    "DeckId"                SERIAL              NOT NULL,
    "Name"                  TEXT                NOT NULL,
    "Description"           TEXT,

    CONSTRAINT "PK_Deck" PRIMARY KEY ("DeckId"),
    CONSTRAINT "Unique_Deck_Name" UNIQUE ("Name")
);

/*******************************************************************************
   Question table definition
********************************************************************************/

CREATE TABLE "Card"
(
    "CardId"                SERIAL              NOT NULL,
    "DeckId"                INTEGER             NOT NULL,
    "Question"              TEXT                NOT NULL,
    "Answer"                TEXT                NOT NULL,

    CONSTRAINT "PK_Card" PRIMARY KEY ("CardId")
);

ALTER TABLE "Card" ADD CONSTRAINT "FK_Card_DeckId"
    FOREIGN KEY ("DeckId") REFERENCES "Deck" ("DeckId")
        ON DELETE CASCADE
        ON UPDATE CASCADE;

/*******************************************************************************
   GroupQuiz table definition
********************************************************************************/

CREATE TABLE "GroupDeck"
(
    "GroupId"               INTEGER             NOT NULL,
    "DeckId"                INTEGER             NOT NULL,

    CONSTRAINT "PK_GroupDeck" PRIMARY KEY ("GroupId", "DeckId")
);

ALTER TABLE "GroupDeck" ADD CONSTRAINT "FK_GroupDeck_GroupId"
    FOREIGN KEY ("GroupId") REFERENCES "Group" ("GroupId")
        ON DELETE CASCADE
        ON UPDATE CASCADE;

ALTER TABLE "GroupDeck" ADD CONSTRAINT "FK_GroupDeck_DeckId"
    FOREIGN KEY ("DeckId") REFERENCES "Deck" ("DeckId")
        ON DELETE CASCADE
        ON UPDATE CASCADE;

/*******************************************************************************
   DeckTag table definition
********************************************************************************/

CREATE TABLE "DeckTag"
(
    "DeckId"                INTEGER             NOT NULL,
    "TagId"                 INTEGER             NOT NULL,

    CONSTRAINT "PK_DeckTag" PRIMARY KEY ("DeckId", "TagId")
);

ALTER TABLE "DeckTag" ADD CONSTRAINT "FK_DeckTag_DeckId"
    FOREIGN KEY ("DeckId") REFERENCES "Deck" ("DeckId")
        ON DELETE CASCADE
        ON UPDATE CASCADE;

ALTER TABLE "DeckTag" ADD CONSTRAINT "FK_DeckTag_TagId"
    FOREIGN KEY ("TagId") REFERENCES "Tag" ("TagId")
        ON DELETE CASCADE
        ON UPDATE CASCADE;
