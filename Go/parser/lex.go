package parser

import "strings"

func Tokenize(text string) []string {
	// fill with space
	str := strings.ReplaceAll(strings.ReplaceAll(text, "(", " ( "), ")", " ) ")
	splitStr := strings.Split(str, " ")
	return removeEmpty(splitStr)
}

func removeEmpty(s []string) []string {
	var r []string
	for _, str := range s {
		if str != "" {
			r = append(r, str)
		}
	}
	return r
}
