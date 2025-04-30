from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Player(BaseModel):
    id: int
    name: str
    team: str
    gamesPlayed: int
    oes: float
    odes: float
    avgPlusMinus: float

@app.get("/api/players")
def get_players():
    with open("data.json", "r") as f:
        players = json.load(f)
    return players