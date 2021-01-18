package ast

type Node interface {
	eval() interface{}
}
