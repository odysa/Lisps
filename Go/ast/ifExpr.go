package ast

import (
	"Scheme"
	"Scheme/utils"
)

type IfExpr struct {
	children []*Node
}

func (i *IfExpr) Push(node *Node) {
	if len(i.children) >= 3 {
		panic("if statement must at most 3 closes")
	}
	i.children = append(i.children, node)
}

func (i IfExpr) Eval(env Scheme.Env) interface{} {
	if utils.IsTrue((*i.predicate()).Eval(env)) {
		return (*i.consequent()).Eval(env)
	}
	if len(i.children) > 2 {
		return (*i.alternative()).Eval(env)
	}
	return nil
}

func (i IfExpr) predicate() *Node {
	return i.children[0]
}
func (i IfExpr) consequent() *Node {
	return i.children[1]
}
func (i IfExpr) alternative() *Node {
	if len(i.children) < 3 {
		return nil
	}
	return i.children[2]
}
