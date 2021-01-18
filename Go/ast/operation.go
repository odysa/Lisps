package ast

type opFunc func(a, b int) int

var opMap = map[string]opFunc{
	"+": func(a, b int) int {
		return a + b
	},
	"-": func(a, b int) int {
		return a - b
	},
	"*": func(a, b int) int {
		return a * b
	},
	"/": func(a, b int) int {
		return a / b
	},
	"%": func(a, b int) int {
		return a % b
	},
	">": func(a, b int) int {
		if a > b {
			return 1
		}
		return 0
	},
	"<": func(a, b int) int {
		if a > b {
			return 0
		}
		return 1
	},
}

type Operation struct {
	op   string
	nums []int
}

func (o *Operation) eval() interface{} {
	res := o.nums[0]
	f := opMap["op"]
	for i, _ := range o.nums {
		res = f(res, o.nums[i])
	}
	return res
}
