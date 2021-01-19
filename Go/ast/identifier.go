package ast

import "Scheme/interpreter"

type Identifier struct {
	val string
}

func (i Identifier) Eval(env interpreter.Env) interface{} {
	return env.Get(i.val)
}

func (i Identifier) Push(node *Node) {
	panic("invalid expr")
}
