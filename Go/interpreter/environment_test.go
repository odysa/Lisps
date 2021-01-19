package interpreter

import (
	"testing"
)

func TestNestEnvironmentSet_Get(t *testing.T) {
	env1 := NewNestEnvironment(nil)
	env1.Set("a", func() int { return 1 })
	if env1.Get("a").(func() int)() != 1 {
		t.Errorf("should be 1, got %v", env1.Get("a").(func() int)())
	}
}

func TestNestEnvironment(t *testing.T) {
	env1 := NewNestEnvironment(nil)
	env1.Set("a", func() int { return 1 })
	env2 := NewNestEnvironment(env1)
	if env1.Get("a").(func() int)() != 1 {
		t.Errorf("should be 1, got %v", env1.Get("a").(func() int)())
	}
	env2.Set("a", func() int { return 2 })
	if env2.Get("a").(func() int)() != 2 {
		t.Errorf("should be 2, got %v", env1.Get("a").(func() int)())
	}
}
