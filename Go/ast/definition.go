package ast

import "Scheme/interpreter"

type Definition struct {
	name   *Node
	params *Parameters
	block  *Sequence
}

func (d Definition) Eval(env interpreter.Env) interface{} {
	f := func(args ...interface{}) interface{} {
		e := interpreter.NewNestEnvironment(env)
		// bind args passed to new environment
		for i, a := range args {
			e.Set(d.params.EvalI(env, i), a)
		}
		return d.Block().Eval(e)
	}
	env.Set(d.Name(env), f)
	return d.Name(env)
}

func (d *Definition) Push(node *Node) {
	if val, ok := (*node).(*Parameters); ok {
		d.params = val
	}
	if val, ok := (*node).(*Sequence); ok {
		d.block = val
	}
	panic("Invalid define body")
}

func (d Definition) Block() *Sequence {
	return d.block
}

func (d Definition) Params() *Parameters {
	return d.params
}

func (d Definition) Name(env interpreter.Env) string {
	return (*d.name).Eval(env).(string)
}
