package Scheme

type DefinitionMap map[string]interface{}

type Env interface {
	Get(key string) interface{}
	Set(key string, val interface{})
}

type NestEnvironment struct {
	env    DefinitionMap
	parent Env
}

func NewNestEnvironment(parent Env) *NestEnvironment {
	return &NestEnvironment{
		env:    make(DefinitionMap),
		parent: parent,
	}
}

func (n *NestEnvironment) Get(key string) interface{} {
	val, ok := n.env[key]
	if !ok {
		val = n.parent.Get(key)
	}
	return val
}

func (n *NestEnvironment) Set(key string, val interface{}) {
	if n.env == nil {
		n.env = make(DefinitionMap)
	}
	n.env[key] = val
}
