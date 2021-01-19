package ast

import (
	"Scheme/interpreter"
)

type Op struct {
	val string
}

func (o Op) Eval(env interpreter.Env) interface{} {
	return env.Get(o.val)
}

func (o Op) Push(node *Node) {
	panic("invalid expr")
}
