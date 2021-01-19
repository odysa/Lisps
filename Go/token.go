package Scheme

type tokenType int
const (
	LITERAL = iota
	IDENTIFIER
)
type Token struct {
	Type  tokenType
	Value interface{}
}
