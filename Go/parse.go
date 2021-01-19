package Scheme

import (
	"Scheme/utils"
)

func Parse(tokens *[]string) Expression {
	res := make([]Expression, 0)
	for len(*tokens) > 0 {
		res = append(res, parseToken(tokens))
	}
	return res
}

func parseToken(tokens *[]string) Expression {
	if len(*tokens) == 0 {
		panic("invalid expression")
	}
	token := utils.Top(tokens)

	if token == "(" {
		res := make([]Expression, 0)
		for (*tokens)[0] != ")" {
			next := parseToken(tokens)
			res = append(res, next)
		}
		if len(*tokens) == 0 {
			panic("missing )")
		}
		utils.Top(tokens)
		return res
	}
	if token == ")" {
		panic("unexpected )")
	}
	if token == "'" {
		ret := make([]Expression, 0, 4)
		ret = append(ret, "quote")
		nextPart := parseToken(tokens)
		ret = append(ret, nextPart)
		return ret
	}
	return token
}
