package ast

import "Scheme/interpreter"

type Sequence struct {
	children []*Node
}

func (s Sequence) Eval(env interpreter.Env) interface{} {
	var res interface{}
	for _, child := range s.children {
		res = (*child).Eval(env)
	}
	return res
}

func (s *Sequence) Push(node *Node) {
	s.children = append(s.children, node)
}
