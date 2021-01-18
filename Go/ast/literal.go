package ast

import "strconv"

type Literal struct {
	value string
}

func (l Literal) eval() interface{} {
	num, err := strconv.Atoi(l.value)
	if err != nil {
		return l.value
	}
	return num
}
