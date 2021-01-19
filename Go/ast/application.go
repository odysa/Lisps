package ast

import "Scheme"

type Operation struct {
	children []*Node
}

func (o *Operation) Push(node *Node) {
	o.children = append(o.children, node)
}

func (o *Operation) Eval(env Scheme.Env) interface{} {
	f := (*o.op()).Eval(env).(func([]interface{}) interface{})
	args := make([]interface{}, len(o.children))
	for _, v := range o.args() {
		args = append(args, (*v).Eval(env))
	}
	return f(args)
}

func (o Operation) op() *Node {
	return o.children[0]
}

func (o Operation) args() []*Node {
	return o.children[1:]
}
