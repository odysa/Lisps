package ast

import (
	"Scheme/interpreter"
	"strconv"
)

type Literal struct {
	value string
}

func (l Literal) Eval(env interpreter.Env) interface{} {
	num, err := strconv.ParseFloat(l.value, 'E')
	if err != nil {
		return l.value
	}
	return num
}
func (l Literal) Push(node *Node) {
	panic("invalid expr")
}
