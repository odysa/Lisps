(define (acc n) (if (= n 0) 0 (+ n (acc (- n 1)))))
(define (fib n) 
  (cond 
    ((< n 2) n) 
    (else 
      (+ 
        (fib (- n 1)) 
        (fib (- n 2))))))

(define (comb l1 l2)
  (cond
    ((null? l1) l2)
    ((null? l2) l1)
    ((< (car l1) (car l2)) 
      (cons 
        (car l1) 
        (comb (cdr l1) l2)))
    (else 
      (cons 
        (car l2)  
        (comb l1 (cdr l2))))))

(print (comb (list 3 6 8 9) (list 1 4 5 7)))