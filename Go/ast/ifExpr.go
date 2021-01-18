package ast

import "Scheme/utils"

type IfExpr struct {
	predicate   Node
	consequent  Node
	alternative Node
}

func (i IfExpr) eval() interface{} {
	if utils.IsTrue(i.predicate.eval()) {
		return i.consequent.eval()
	}
	return i.alternative.eval()
}
