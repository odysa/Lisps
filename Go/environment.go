package Scheme

type Env interface {
	Get(key string) interface{}
	Set(key string, val interface{})
}

type NestEnvironment struct {
	env    map[string]interface{}
	parent *Env
}

func (n *NestEnvironment) Get(key string) interface{} {
	val, ok := n.env[key]
	if !ok {
		val = (*n.parent).Get(key)
	}
	return val
}

func (n *NestEnvironment) Set(key string, val interface{}) {
	if n.env == nil {
		n.env = make(map[string]interface{})
	}
	n.env[key] = val
}
