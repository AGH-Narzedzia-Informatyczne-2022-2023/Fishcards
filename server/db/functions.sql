/*******************************************************************************

  Country functions:

    BOOLEAN doesCountryExist(INTEGER countryId)
        Returns if the country of a specific ID exists in the database.

    BOOLEAN doesCountryExist(TEXT countryName)
        Returns if the country of a specific Name exists in the database.

    INTEGER getCountryIdFromName(TEXT countryName)
        Returns the ID of the country given in countryName or throws an exception if the country doesn't exist.

********************************************************************************/

CREATE OR REPLACE FUNCTION doesCountryExist(countryId INTEGER) RETURNS BOOLEAN AS $$
    BEGIN

        RETURN EXISTS (
            SELECT *
            FROM "Country"
            WHERE "CountryId" = countryId
        );

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION doesCountryExist(countryName TEXT) RETURNS BOOLEAN AS $$
    BEGIN

        RETURN EXISTS (
            SELECT *
            FROM "Country"
            WHERE "Name" = countryName
        );

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION getCountryIdFromName(countryName TEXT) RETURNS INTEGER AS $$
    DECLARE

        countryId INTEGER;

    BEGIN

        countryId = (
            SELECT "CountryId"
            FROM "Country"
            WHERE "Name" = countryName
        );

        IF countryId IS NULL THEN
            RAISE EXCEPTION 'Nonexistent name of the country --> %', countryName
                USING HINT = 'Please check if the country begins with a capital letter and has all diacritics';
        END IF;

        RETURN countryId;

    END;
$$ LANGUAGE plpgsql;

/*******************************************************************************

  Role functions:

    BOOLEAN doesRoleExist(INTEGER roleId)
    BOOLEAN doesRoleExist(TEXT roleName)
        Returns if the role with a specific RoleId/Name exists in the database.

    INTEGER getRoleIdFromName(TEXT roleName)
        Returns the ID of the role given in roleName or throws an exception if the role doesn't exist.

  User functions:

    BOOLEAN doesUserExist(INTEGER userId)
    BOOLEAN doesUserExist(TEXT username)
    BOOLEAN doesUserExist(EMAIL email)
        Returns if the user with a specific Id/Username/Email exists in the database.

    INTEGER getUserIdFromEmail(EMAIL email)
    INTEGER getUserIdFromName(TEXT userName)
        Returns the ID of the user with this Email/Username or throws an exception if the user doesn't exist.

    BOOLEAN login(TEXT userName, TEXT password)
        Returns TRUE if login was successful else throws an exception.

    VOID register(TEXT username, TEXT password, EMAIL email, TEXT countryName)
    VOID register(TEXT username, TEXT password, EMAIL email, TEXT countryName, BOOLEAN notifyMe)
    VOID register(TEXT username, TEXT password, EMAIL email, TEXT countryName, BOOLEAN notifyMe, TEXT firstName)
    VOID register(TEXT username, TEXT password, EMAIL email, TEXT countryName, BOOLEAN notifyMe, TEXT firstName, TEXT lastName)
    VOID register(TEXT username, TEXT password, EMAIL email, TEXT countryName, BOOLEAN notifyMe, TEXT firstName, TEXT lastName, TEXT organization)
    VOID register(TEXT username, TEXT password, EMAIL email, TEXT countryName, BOOLEAN notifyMe, TEXT firstName, TEXT lastName, TEXT organization, TEXT roleName)
    VOID register(TEXT username, TEXT password, EMAIL email, INTEGER countryId)
    VOID register(TEXT username, TEXT password, EMAIL email, INTEGER countryId, BOOLEAN notifyMe)
    VOID register(TEXT username, TEXT password, EMAIL email, INTEGER countryId, BOOLEAN notifyMe, TEXT firstName)
    VOID register(TEXT username, TEXT password, EMAIL email, INTEGER countryId, BOOLEAN notifyMe, TEXT firstName, TEXT lastName)
    VOID register(TEXT username, TEXT password, EMAIL email, INTEGER countryId, BOOLEAN notifyMe, TEXT firstName, TEXT lastName, TEXT organization)
    VOID register(TEXT username, TEXT password, EMAIL email, INTEGER countryId, BOOLEAN notifyMe, TEXT firstName, TEXT lastName, TEXT organization, INTEGER roleId)
        Creates a new user with given information. Throws an exception if CountryName/CountryId or RoleName/RoleId is invalid.

    VOID deleteAccount(INTEGER userId)
    VOID deleteAccount(TEXT userName)
        Deletes an user with this UserId/UserName. Deletes everything that is assigned to this user as well.

    TRIGGER triggerUserInsert()
        This trigger checks if all arguments for inserting an user are correct.
        Trigger runs before insert. It checks if username or email are currently
        in use. Checks the username and password strength etc.

    TRIGGER triggerUserUpdate()
        This trigger checks if all arguments for updating an user are correct.
        Trigger runs before update.

    TRIGGER triggerUserDelete()
        This trigger check if everything assigned to the user was deleted.
        This trigger is deferred, it runs after a transaction.

  Group functions:

    BOOLEAN doesGroupExist(INTEGER groupId)
    BOOLEAN doesGroupExist(TEXT groupName)
        Returns if the group with a specific GroupId/GroupName exists in the database.
Ć
    INTEGER getGroupIdFromName(TEXT groupName)
        Returns the GroupId of the group with the given groupName or throws an exception if the group doesn't exist.

    VOID createGroup(TEXT groupName)
        Creates a group with the given groupName or throws an exception if the group already exists.

    VOID deleteGroup(INTEGER groupId)
    VOID deleteGroup(TEXT groupName)
        Deletes a group with the given groupId/groupName or throws an exception if the group doesn't exist.
        It also deletes everything that was assigned to that group.

    TRIGGER triggerGroupUpdate()
        This trigger ensures that update won't change groupId.
        Trigger runs before update.

    TRIGGER triggerGroupDelete()
        This trigger ensures that everything connected to the group is deleted.
        Trigger is deferred, it runs after a transaction.

  UserGroup functions:

    BOOLEAN doesUserGroupExist(INTEGER userId, INTEGER groupId)
    BOOLEAN doesUserGroupExist(TEXT userName, TEXT groupName)
        Returns if the userId/userName is in groupId/groupName.

    VOID addUserToGroup(INTEGER userId, INTEGER groupId)
    VOID addUserToGroup(TEXT userName, TEXT groupName)
        This function adds an user with userId/userName to the group with groupId/groupName.

    VOID removeUserFromGroup(INTEGER userId, INTEGER groupId)
    VOID removeUserFromGroup(TEXT userName, TEXT groupName)
        This function removes an user userId/userName from the group with groupId/groupName.

********************************************************************************/

CREATE EXTENSION IF NOT EXISTS pgcrypto;

/*******************************************************************************
   Role functions
********************************************************************************/

CREATE OR REPLACE FUNCTION doesRoleExist(roleId INTEGER) RETURNS BOOLEAN AS $$
    BEGIN

        RETURN EXISTS (
            SELECT *
            FROM "Role"
            WHERE "RoleId" = roleId
        );

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION doesRoleExist(roleName TEXT) RETURNS BOOLEAN AS $$
    BEGIN

        RETURN EXISTS (
            SELECT *
            FROM "Role"
            WHERE "Name" = roleName
        );

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION getRoleIdFromName(roleName TEXT) RETURNS INTEGER AS $$
    DECLARE

        roleId INTEGER;

    BEGIN

        roleId = (
            SELECT "RoleId"
            FROM "Role"
            WHERE "Name" = roleName
        );

        IF roleId IS NULL THEN
            RAISE EXCEPTION 'Nonexistent name of the role --> %', roleName
                USING HINT = 'Please check if this role exists';
        END IF;

        RETURN roleId;

    END;
$$ LANGUAGE plpgsql;

/*******************************************************************************
   User functions
********************************************************************************/

CREATE OR REPLACE FUNCTION doesUserExist(userId INTEGER) RETURNS BOOLEAN AS $$
    BEGIN

        RETURN EXISTS (
            SELECT *
            FROM "User"
            WHERE "UserId" = userId
        );

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION doesUserExist(username TEXT) RETURNS BOOLEAN AS $$
    BEGIN

        RETURN EXISTS (
            SELECT *
            FROM "User"
            WHERE "Username" = username
        );

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION doesUserExist(userEmail EMAIL) RETURNS BOOLEAN AS $$
    BEGIN

        RETURN EXISTS (
            SELECT *
            FROM "User"
            WHERE "Email" = userEmail
        );

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION getUserIdFromEmail(email EMAIL) RETURNS INTEGER AS $$
    DECLARE

        userId INTEGER;

    BEGIN

        userId = (
            SELECT "UserId"
            FROM "User"
            WHERE "Email" = email
        );

        IF userId IS NULL THEN
            RAISE EXCEPTION 'Nonexistent email --> %', email
                USING HINT = 'Please check if you registered with this email';
        END IF;

        RETURN userId;

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION getUserIdFromName(userName TEXT) RETURNS INTEGER AS $$
    DECLARE

        userId INTEGER;

    BEGIN

        userId = (
            SELECT "UserId"
            FROM "User"
            WHERE "Username" = userName
        );

        IF userId IS NULL THEN
            RAISE EXCEPTION 'Nonexistent username --> %', userName
                USING HINT = 'Please check if this is your username';
        END IF;

        RETURN userId;

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION register(
    username TEXT,
    password TEXT,
    email EMAIL,
    countryName TEXT,
    isVerified BOOLEAN DEFAULT FALSE,
    firstName TEXT DEFAULT NULL,
    lastName TEXT DEFAULT NULL,
    organization TEXT DEFAULT NULL,
    roleName TEXT DEFAULT 'User'

) RETURNS VOID AS $$
    DECLARE

        roleId INTEGER;
        countryId INTEGER;

    BEGIN

        roleId = getRoleIdFromName(roleName);

        countryId = getCountryIdFromName(countryName);

        INSERT INTO "User" ("RoleId", "CountryId", "Username", "PasswordHash",
                            "Email", "FirstName", "LastName", "Organization",
                            "IsVerified")
                    VALUES (roleId, countryId, username, password,
                            email, firstName, lastName, organization,
                            isVerified);

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION register(
    username TEXT,
    password TEXT,
    email EMAIL,
    countryId INTEGER,
    notifyMe BOOLEAN DEFAULT FALSE,
    firstName TEXT DEFAULT NULL,
    lastName TEXT DEFAULT NULL,
    organization TEXT DEFAULT NULL,
    roleId INTEGER DEFAULT 1

) RETURNS VOID AS $$
    BEGIN

        INSERT INTO "User" ("RoleId", "CountryId", "Username", "PasswordHash",
                            "Email", "FirstName", "LastName", "Organization",
                            "IsVerified", "NotifyMe")
                    VALUES (roleId, countryId, username, password,
                            email, firstName, lastName, organization,
                            false, notifyMe);

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION login(username TEXT, password TEXT) RETURNS BOOLEAN AS $$
    DECLARE

        isLoginSuccessful BOOLEAN;

    BEGIN

        isLoginSuccessful = EXISTS (
            SELECT *
            FROM "User"
            WHERE "Username" = username
            AND "PasswordHash" = crypt(password, "PasswordHash")
        );

        IF isLoginSuccessful THEN
            RETURN TRUE;

        ELSE
            RAISE EXCEPTION 'Invalid username or password'
                USING HINT = 'Please check if you are registered';

        END IF;

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION deleteAccount(userId INTEGER) RETURNS VOID AS $$
    BEGIN

        IF doesUserExist(userId) = FALSE THEN
            RAISE EXCEPTION 'User with this id doesn''t exist --> %', userId
                USING HINT = 'Please check if this is the correct userId';
        END IF;

        DELETE FROM "User"
            WHERE "UserId" = userId;

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION deleteAccount(userName TEXT) RETURNS VOID AS $$
    DECLARE

        userId INTEGER;

    BEGIN

        userId = getUserIdFromName(username);

        DELETE FROM "User"
            WHERE "UserId" = userId;

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION triggerUserInsert() RETURNS TRIGGER AS $$
    BEGIN

        IF (doesUserExist(NEW."Email")) THEN
            RAISE EXCEPTION 'Email is already in use --> %', NEW."Email"
                USING HINT = 'You''ve already created an account with this email';

        ELSEIF (doesUserExist(NEW."Username")) THEN
            RAISE EXCEPTION 'Username is already in use --> %', NEW."Username"
                USING HINT = 'Please try an another username';

        ELSEIF doesCountryExist(NEW."CountryId") = FALSE THEN
            RAISE EXCEPTION 'Nonexistent country --> %', NEW."CountryId"
                USING HINT = 'Please check if you''ve typed the countryId correctly';

        ELSEIF doesRoleExist(NEW."RoleId") = FALSE THEN
            RAISE EXCEPTION 'Nonexistent role --> %', NEW."RoleId"
                USING HINT = 'Please check if you''ve typed the roleId correctly';

        ELSEIF (LENGTH(NEW."Username") < 4) THEN
            RAISE EXCEPTION 'Username must be at least 4 characters long'
                USING HINT = 'Please try an another username';

        ELSEIF (20 < LENGTH(NEW."Username")) THEN
            RAISE EXCEPTION 'Username must be at most 20 characters long'
                USING HINT = 'Please try an another username';

        ELSEIF (NEW."Username" ~ '^[a-zA-Z\d._]+$') = FALSE THEN
            RAISE EXCEPTION 'Username contains invalid characters'
                USING HINT = 'Usernames should consist of characters a-z and A-Z and 0-9 and . _';

        ELSEIF (LENGTH(NEW."PasswordHash") < 8) THEN
            RAISE EXCEPTION 'Password must be at least 8 characters long'
                USING HINT = 'Please try an another password';

        ELSEIF (20 < LENGTH(NEW."PasswordHash")) THEN
            RAISE EXCEPTION 'Password must be at most 20 characters long'
                USING HINT = 'Please try an another password';

        ELSEIF (NEW."PasswordHash" ~ '^[a-zA-Z\d@#$%&!]+$') = FALSE THEN
            RAISE EXCEPTION 'Password check failed'
                USING HINT = 'Passwords should consist of only latin characters, digits and ' ||
                             'special characters from set ''!'' ''@'' ''#'' ''$'' ''%'' ''&''';

        ELSEIF (NEW."PasswordHash" ~ '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#&$%!]).{8,20}$') = FALSE THEN
            RAISE EXCEPTION 'Password security check failed'
                USING HINT = E'Passwords: \n ' ||
                             E'- should consist of at least one lowercase Latin character [a-z]\n' ||
                             E'- should consist of at least one uppercase Latin character [A-Z]\n ' ||
                             E'- should consist of at least one digit [0-9] \n' ||
                             E'- should consist of at least one special character from set ''!'' ''@'' ''#'' ''$'' ''%'' ''&''.\n' ||
                             E'- should be at least 8 characters and at most 20 characters long';

        END IF;

        NEW."PasswordHash" = crypt(NEW."PasswordHash", gen_salt('bf'));

        RETURN NEW;

    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "UserInsert"
    BEFORE INSERT
    ON "User"
    FOR EACH ROW
EXECUTE PROCEDURE triggerUserInsert();

CREATE OR REPLACE FUNCTION triggerUserUpdate() RETURNS TRIGGER AS $$
    BEGIN

        IF NEW."UserId" != OLD."UserId" THEN
            RAISE EXCEPTION 'UserId is invalid'
                USING HINT = 'You cannot modify UserId value';

        ELSEIF NEW."Username" != OLD."Username" AND doesUserExist(NEW."Username") THEN
            RAISE EXCEPTION 'Username is invalid'
                USING HINT = 'There exists an account with this username';

        ELSEIF NEW."Email" != OLD."Email" AND doesUserExist(NEW."Email") THEN
            RAISE EXCEPTION 'Email is invalid'
                USING HINT = 'There exists an account with this email';

        ELSEIF NEW."Email" != OLD."Email" THEN
            NEW."IsVerified" = False;

        END IF;

        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "UserUpdate"
    BEFORE UPDATE
    ON "User"
    FOR EACH ROW
EXECUTE PROCEDURE triggerUserUpdate();

CREATE OR REPLACE FUNCTION triggerUserDelete() RETURNS TRIGGER AS $$
    BEGIN

        RETURN OLD;

    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "UserDelete"
    BEFORE DELETE
    ON "User"
    FOR EACH ROW
EXECUTE PROCEDURE triggerUserDelete();

/*******************************************************************************
   Group functions
********************************************************************************/

CREATE OR REPLACE FUNCTION doesGroupExist(groupId INTEGER) RETURNS BOOLEAN AS $$
    BEGIN

        RETURN EXISTS (
            SELECT *
            FROM "Group"
            WHERE "GroupId" = groupId
        );

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION doesGroupExist(groupName TEXT) RETURNS BOOLEAN AS $$
    BEGIN

        RETURN EXISTS (
            SELECT *
            FROM "Group"
            WHERE "Name" = groupName
        );

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION getGroupIdFromName(groupName TEXT) RETURNS INTEGER AS $$
    DECLARE

        groupId INTEGER;

    BEGIN

        groupId = (
            SELECT "GroupId"
            FROM "Group"
            WHERE "Name" = groupName
        );

        IF groupId IS NULL THEN
            RAISE EXCEPTION 'Nonexistent name of the group --> %', groupName
                USING HINT = 'Please check if this group was created';
        END IF;

        RETURN groupId;

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION createGroup(groupName TEXT) RETURNS VOID AS $$
    BEGIN

        IF doesGroupExist(groupName) THEN
            RAISE EXCEPTION 'This group already exists --> %', groupName
                USING HINT = 'Use the group that was already created';
        END IF;

        INSERT INTO "Group" ("Name")
            VALUES (groupName);

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION deleteGroup(groupId INTEGER) RETURNS VOID AS $$
    BEGIN

        IF doesGroupExist(groupId) = FALSE THEN
            RAISE EXCEPTION 'This groupId doesn''t exist --> %', groupId
                USING HINT = 'Please check if this is the correct userId';
        END IF;

        DELETE FROM "Group"
            WHERE "GroupId" = groupId;

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION deleteGroup(groupName TEXT) RETURNS VOID AS $$
    DECLARE

        groupId INTEGER;

    BEGIN

        groupId = getGroupIdFromName(groupName);

        DELETE FROM "Group"
            WHERE "GroupId" = groupId;

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION triggerGroupUpdate() RETURNS TRIGGER AS $$
    BEGIN

        RETURN NEW;

    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "GroupUpdate"
    BEFORE UPDATE
    ON "User"
    FOR EACH ROW
EXECUTE PROCEDURE triggerGroupUpdate();

CREATE OR REPLACE FUNCTION triggerGroupDelete() RETURNS TRIGGER AS $$
    BEGIN

        RETURN OLD;

    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "GroupDelete"
    BEFORE DELETE
    ON "Group"
    FOR EACH ROW
EXECUTE PROCEDURE triggerGroupDelete();

/*******************************************************************************
   UserGroup functions
********************************************************************************/

CREATE OR REPLACE FUNCTION doesUserGroupExist(userId INTEGER, groupId INTEGER) RETURNS BOOLEAN AS $$
    BEGIN

        RETURN EXISTS (
            SELECT *
            FROM "UserGroup"
            WHERE "UserId" = userId AND "GroupId" = groupId
        );

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION doesUserGroupExist(userName TEXT, groupName TEXT) RETURNS BOOLEAN AS $$
    DECLARE

        userId INTEGER;
        groupId INTEGER;

    BEGIN

        userId = getUserIdFromName(userName);
        groupId = getGroupIdFromName(groupName);

        RETURN doesUserGroupExist(userId, groupId);

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION addUserToGroup(userId INTEGER, groupId INTEGER) RETURNS VOID AS $$
    BEGIN

        IF doesUserGroupExist(userId, groupId) THEN
            RAISE EXCEPTION 'This user is already in this group --> %, %', userId, groupId
                USING HINT = 'Please check if you haven''t already added him';
        END IF;

        INSERT INTO "UserGroup" ("UserId", "GroupId")
            VALUES (userId, groupId);

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION addUserToGroup(userName TEXT, groupName TEXT) RETURNS VOID AS $$
    DECLARE

        userId INTEGER;
        groupId INTEGER;

    BEGIN

        userId = getUserIdFromName(userName);

        groupId = getGroupIdFromName(groupName);

        IF doesUserGroupExist(userId, groupId) THEN
            RAISE EXCEPTION 'This user is already in this group --> %, %', userName, groupName
                USING HINT = 'Please check if you haven''t already added him';
        END IF;

        INSERT INTO "UserGroup" ("UserId", "GroupId")
            VALUES (userId, groupId);

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION removeUserFromGroup(userId INTEGER, groupId INTEGER) RETURNS VOID AS $$
    BEGIN

        IF doesUserExist(userId) = FALSE THEN
            RAISE EXCEPTION 'User with this id doesn''t exist --> %', userId
                USING HINT = 'Please check if this is the correct userId';

        ELSEIF doesGroupExist(groupId) = FALSE THEN
            RAISE EXCEPTION 'Group with this id doesn''t exist --> %', groupId
                USING HINT = 'Please check if this is the correct groupId';

        ELSEIF doesUserGroupExist(userId, groupId) = FALSE THEN
            RAISE EXCEPTION 'This user isn''t a member of this group --> %, %', userId, groupId
                USING HINT = 'Please check if you haven''t already added him';

        END IF;

        DELETE FROM "UserGroup"
            WHERE ("UserId", "GroupId") = (userId, groupId);

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION removeUserFromGroup(userName TEXT, groupName TEXT) RETURNS VOID AS $$
    DECLARE

        userId INTEGER;
        groupId INTEGER;

    BEGIN

        userId = getUserIdFromName(userName);

        groupId = getGroupIdFromName(groupName);

        IF doesUserGroupExist(userId, groupId) = FALSE THEN
            RAISE EXCEPTION 'This user isn''t a member of this group --> %, %', userName, groupName
                USING HINT = 'Please check if you haven''t already added him';
        END IF;

        DELETE FROM "UserGroup"
            WHERE ("UserId", "GroupId") = (userId, groupId);

    END;
$$ LANGUAGE plpgsql;

/*******************************************************************************

  Tag functions:

    BOOLEAN doesTagExist(INTEGER tagId)
    BOOLEAN doesTagExist(TEXT tagName)
        Returns if the tag with a specific tagId/tagName exists in the database.

    INTEGER getTagIdFromName(TEXT tagName)
        Returns the tagId of the tag with name tagName or throws an exception if the name doesn't exist.

    VOID createTag(TEXT tagName);
        Creates a tag with the name tagName or throws an exception if this tag already exists.

    VOID modifyTag(TEXT tagName, TEXT newTagName)
        Modifies a tag with the name tagName and changes the name to newTagName. Throws an exception if the tag with
        the name tagName doesn't exist or when a tag with the name newTagName already exists in the database.

    VOID deleteTag(INTEGER tagId);
    VOID deleteTag(TEXT tagName);
        Deletes a tag with tagId/tagName or throws an exception if it doesn't exist.

    TRIGGER triggerTagUpdate()
        This trigger ensures that update won't change tagId.
        Trigger runs before update.

    TRIGGER triggerTabDelete()
        This trigger ensures that deleting a tag results in deleting all occurrences of this tag in other tables.
        Trigger is deferred, it runs after a transaction.

********************************************************************************/

/*******************************************************************************
   Tag functions
********************************************************************************/

CREATE OR REPLACE FUNCTION doesTagExist(tagId INTEGER) RETURNS BOOLEAN AS $$
    BEGIN

        RETURN EXISTS (
            SELECT *
            FROM "Tag"
            WHERE "TagId" = tagId
        );

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION doesTagExist(tagName TEXT) RETURNS BOOLEAN AS $$
    BEGIN

        RETURN EXISTS (
            SELECT *
            FROM "Tag"
            WHERE "Name" = tagName
        );

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION getTagIdFromName(tagName TEXT) RETURNS INTEGER AS $$
    DECLARE

        tagId INTEGER;

    BEGIN

        tagId = (
            SELECT "TagId"
            FROM "Tag"
            WHERE "Name" = tagName
        );

        IF tagId IS NULL THEN
            RAISE EXCEPTION 'Nonexistent name of the tag --> %', tagName
                USING HINT = 'Please check if this tag exists';
        END IF;

        RETURN tagId;

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION createTag(tagName TEXT) RETURNS VOID AS $$
    BEGIN

        IF doesTagExist(tagName) THEN
            RAISE EXCEPTION 'This tag already exists --> %', tagName
                USING HINT = 'Use the tag that was already created';
        END IF;

        INSERT INTO "Tag" ("Name")
            VALUES (tagName);

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION modifyTag(tagName TEXT, newTagName TEXT) RETURNS VOID AS $$
    BEGIN

        IF doesTagExist(tagName) = FALSE THEN
            RAISE EXCEPTION 'tagName doesn''t exist --> %', tagName
                USING HINT = 'Please check if you typed tagName correctly';

        ELSEIF doesTagExist(newTagName) THEN
            RAISE EXCEPTION 'newTagName already exists --> %', newTagName
                USING HINT = 'Please check if you typed newTagName correctly';

        END IF;

        UPDATE "Tag"
            SET "Name" = newTagName
            WHERE "Name" = tagName;

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION deleteTag(tagName TEXT) RETURNS VOID AS $$
    BEGIN

        IF doesTagExist(tagName) = FALSE THEN
            RAISE EXCEPTION 'tagName doesn''t exist --> %', tagName
                USING HINT = 'Please check if you typed tagName correctly';
        END IF;

        DELETE FROM "Tag"
            WHERE "Name" = tagName;

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION triggerTagUpdate() RETURNS TRIGGER AS $$
    BEGIN

        IF OLD."TagId" != NEW."TagId" THEN
            RAISE EXCEPTION 'Invalid argument --> %', NEW."TagId"
                USING HINT = 'You cannot change the value of TagId';

        END IF;

        RETURN NEW;

    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "TagUpdate"
    BEFORE UPDATE
    ON "Tag"
    FOR EACH ROW
    EXECUTE PROCEDURE triggerTagUpdate();

CREATE OR REPLACE FUNCTION triggerTagDelete() RETURNS TRIGGER AS $$
    BEGIN

        RETURN OLD;

    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "TagDelete"
    BEFORE DELETE
    ON "Tag"
    FOR EACH ROW
    EXECUTE PROCEDURE triggerTagDelete();

/*******************************************************************************

  Card functions:

  Deck functions:

  GroupDeck functions:

  DeckTag functions:
    
********************************************************************************/

