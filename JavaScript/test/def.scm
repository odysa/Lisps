(define 
  (introduce words)
  (cond 
    ((null? words) 'none' ) 
    (else (display (car words)) (newline) (introduce (cdr words))))
    )

(define me "odysa")
(define lang (list "lisp" "the" "best"))
(define greeting "Hello World")

(introduce (list me greeting lang))