# main.py
from typing import Optional
from fastapi import FastAPI
from fastapi.params import Body
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor

app = FastAPI()

class User(BaseModel):
    username: str
    email: str
    password: str
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    organization: Optional[str] = None
    countryName: str = "Poland"
    roleName: str = "User"
    isVerified: bool = False

class Group(BaseModel):
    name: str

try:
    conn = psycopg2.connect(host = 'localhost', database = 'fishcards', user = 'fishcards', password = 'fishcards', cursor_factory = RealDictCursor)
    cursor = conn.cursor()
    print("Database connection was successful!")

except Exception as error:
    print("There was an error while connecting to the database")
    print("Error: ", error)

# Path operation
# Decorator @app.http_method("path")
@app.get("/")
async def root():
    cursor.execute(""" SELECT * FROM "Country" """)
    countries = cursor.fetchall()
    return {"data": countries}

# Users API

@app.get("/users")
async def getAllUsers():
    cursor.execute(""" SELECT * FROM "User" """)
    users = cursor.fetchall()
    return users

@app.get("/users/{userId}")
async def getUser(userId: int):
    cursor.execute(""" SELECT * FROM "User" WHERE "UserId" = %s """, userId)
    user = cursor.fetchone()
    return user

@app.post("/users")
async def registerUser(newUser: User):
    try:
        cursor.execute(""" SELECT register(%s, %s, %s, %s, %s, %s, %s, %s, %s) """, (newUser.username, newUser.password, newUser.email, newUser.countryName, newUser.isVerified, newUser.firstName, newUser.lastName, newUser.organization, newUser.roleName))
    except psycopg2.Error as e:
        cursor.execute(""" ROLLBACK """)
        print(e)

    return {"registerUser": "Works!"}

@app.put("/users/{userId}")
async def updateUser(newUser: User):
    return {"updateUser": "Works!"}
    
@app.delete("/users/{userId}")
async def deleteUser():
    return {"deleteUser": "Works!"}

# Groups API

@app.get("/groups")
async def getAllGroups():
    return {"getAllGroups": "Works!"}

@app.get("/groups/{groupId}")
async def getGroup():
    return {"getGroup": "Works!"}

@app.get("/users/{userId}/groups")
async def getUsersGroups():
    return {"getUserGroups": "Works!"}

@app.post("/group")
async def createGroup(newGroup: Group):
    return {"createGroup": "Works!"}

@app.put("/group/{groupId}")
async def updateGroup(newGroup: Group):
    return {"updateGroup": "Works!"}

@app.put("/users/{userId}/groups/{groupId}")
async def addUserToGroup():
    return {"modifyUserGroup": "Works!"}

@app.delete("/groups/{groupId}")
async def deleteGroup():
    return {"deleteGroup": "Works!"}

# Decks API

# Returns the information about all decks
@app.get("/decks")
async def getAllDecks():
    return {"getAllDecks": "Works!"}

# Returns the information about a deck with id {deckId}
@app.get("/decks/{deckId}")
async def getDeck():
    return {"getDeck": "Works!"}

# Adds card with id {deckId} to the deck with id {cardId}
@app.post("/decks/{deckId}/cards/{cardId}")

# Returns the information about all cards
@app.get("/cards")
async def getAllCards():
    return {"getAllCards": "Works!"}

# Returns the information about a card with id {cardId}
@app.get("/cards/{cardId}")
async def getCard():
    return {"getCard": "Works!"}

# Intelligent API

# Returns {noCards} cards from deck with id: {deckId}
@app.get("/intelligent/decks/{deckId}/cards/{noCards}")
async def getBestCardFromDeck():
    return {"getBestCardFromDeck": "Works!"}
