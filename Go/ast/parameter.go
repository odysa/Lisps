package ast

import "Scheme/interpreter"

type Parameters struct {
	children []*Node
}

func (p Parameters) Eval(env interpreter.Env) interface{} {
	panic("cannot eval")
}

func (p *Parameters) Push(node *Node) {
	p.children = append(p.children, node)
}

func (p Parameters) EvalI(env interpreter.Env, i int) interface{} {
	return (*p.children[i]).Eval(env)
}
