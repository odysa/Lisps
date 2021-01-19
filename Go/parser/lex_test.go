package parser

import (
	"testing"
)

func TestTokenize(t *testing.T) {
	test := "(+ 1 (* 2 3) (- 3 1))"
	expected := []string{"(", "+", "1", "(", "*", "2", "3", ")", "(", "-", "3", "1", ")", ")"}
	ans := Tokenize(test)
	le := len(expected)
	la := len(ans)
	if la != le {
		t.Errorf("expected %q\n", expected)
		return
	}
	for i, c := range ans {
		if c != expected[i] {
			t.Errorf("expected %v got %v \n", expected[i], c)
			return
		}
	}
}
