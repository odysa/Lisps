from typing import List
from python.err import ParseError
from python.token import Token, TokenType
from python.utils import is_number


def Tokenize(input):
    return input.replace('(', ' ( ').replace(')', ' ) ').split()


def ParseTokens(tokens):
    if len(tokens) == 0:
        return None
    token = tokens.pop(0)
    if token == '(':
        exprs = []
        while tokens[0] != ')':
            exprs.append(ParseTokens(tokens))
        tokens.pop(0)
        return exprs

    if token == ')':
        raise ParseError

    return token


def categorize(token):
    if isinstance(token, List):
        if token[0] == "\"" and token[-1] == "\"":
            return Token(TokenType.Identifier, token[1:-1])
    if is_number(token):
        return Token(TokenType.Literal, float(token))
    return Token(TokenType.Identifier, token)
