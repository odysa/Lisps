from enum import Enum


class TokenType(Enum):
    Identifier = 0
    Literal = 1


class Token:
    def __init__(self, tokenType: TokenType, value) -> None:
        self.type = tokenType
        self.value = value
