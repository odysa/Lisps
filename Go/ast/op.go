package ast

import "Scheme"

type Op struct {
	val string
}

func (o Op) Eval(env Scheme.Env) interface{} {
	return env.Get(o.val)
}

func (o Op) Push(node *Node) {
	panic("invalid expr")
}
