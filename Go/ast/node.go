package ast

import (
	"Scheme/interpreter"
)

type Node interface {
	Eval(env interpreter.Env) interface{}
	Push(*Node)
}
