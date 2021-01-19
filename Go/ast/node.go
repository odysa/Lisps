package ast

import "Scheme"

type Node interface {
	Eval(env Scheme.Env) interface{}
	Push(*Node)
}
