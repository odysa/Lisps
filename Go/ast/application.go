package ast

import "Scheme"

type opFunc func(a, b int) int

var opMap = map[string]opFunc{
	"+": func(a, b int) int {
		return a + b
	},
	"-": func(a, b int) int {
		return a - b
	},
	"*": func(a, b int) int {
		return a * b
	},
	"/": func(a, b int) int {
		return a / b
	},
	"%": func(a, b int) int {
		return a % b
	},
	">": func(a, b int) int {
		if a > b {
			return 1
		}
		return 0
	},
	"<": func(a, b int) int {
		if a > b {
			return 0
		}
		return 1
	},
}

type Operation struct {
	children []*Node
}

func (o *Operation) eval(env Scheme.Env) interface{} {
	res := (*o.children[0]).eval(env).(int)
	f := opMap["op"]
	for i, _ := range o.children {
		res = f(res, (*o.children[i]).eval(env).(int))
	}
	return res
}
