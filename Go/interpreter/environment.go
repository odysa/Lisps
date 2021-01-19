package interpreter

type DefinitionMap map[interface{}]interface{}

type Env interface {
	Get(key interface{}) interface{}
	Set(key interface{}, val interface{})
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

func (n *NestEnvironment) Get(key interface{}) interface{} {
	val, ok := n.env[key]
	if !ok {
		val = n.parent.Get(key)
	}
	return val
}

func (n *NestEnvironment) Set(key interface{}, val interface{}) {
	if n.env == nil {
		n.env = make(DefinitionMap)
	}
	n.env[key] = val
}
