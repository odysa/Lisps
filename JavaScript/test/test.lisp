(define x 1)
(print (* x 2 (+ 3 4) (* 1 2) (/ 4 2)))
(print x)

(define (add a b) (+ a b))
(print (add 1 2))

(print (let ((x 2)(y 2)) (+ x y)))