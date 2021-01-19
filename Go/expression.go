package Scheme

type Expression interface{}

func isPrimitive(exp Expression) bool{
	return isInteger(exp) || isInteger(exp)
}

func isNumber(exp Expression) bool {
	_, ok := exp.(float32)
	return ok
}

func isInteger(exp Expression) bool {
	_, ok := exp.(int)
	return ok
}

func isString(exp Expression) bool {
	_, ok := exp.(string)
	return ok
}
