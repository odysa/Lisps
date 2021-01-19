package utils

func Top(arr *[]string) interface{} {
	res := (*arr)[0]
	*arr = (*arr)[1:]
	return res
}
