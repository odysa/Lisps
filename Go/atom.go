package main

import "strconv"

type Atom struct {
	val string
}

func (a Atom) eval() interface{} {
	res, err := strconv.Atoi(a.val)
	if err == nil {
		return res
	}
	return a.val
}
