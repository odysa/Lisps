(define (eval exp env)
  (cond ((self-eval? exp) exp)
        ((variable? exp) (look-up-variable exp env))
        ((quoted? exp) (text-of-quotation exp))
        ((assignment? exp) (eval-assignment exp env))
        ((definition? exp) (eval-definition exp env))
        ((if? exp)  (eval-if exp env))
        ((lambda? exp)  (make-procedure (lambda-param exp) (lambda-body exp) env))
        ((let? exp) (eval (let->lambda exp) env))
        ((begin? exp) (eval-sequence (begin-action exp) env))
        ((cond? exp)  (eval (cond->if exp) env))
        ((application? exp) (apply (eval (operator exp) env) (list-of-values (operands exp) env)))
        (else (error "unknow expression"))))

(define (apply procedure arguments)
  (cond ((primitive-procedure? procedure) 
         (apply-primitive-procedure procedure arguments))
        ((compound-procedure? procedure) 
          (eval-sequence 
            (procedure-body procedure) 
            (extend-environment 
              (procedure-param procedure) 
              arguments 
              (procedure-env procedure))))
        (else error "uknown procedure")))

(define (list-of-values exps env )
        (if (no-operands? exps) '()
        (cons 
          (eval (first-operand exps) env) 
          (list-of-values (rest-operands exps) env))))

(define (eval-if-exp env)
  (if
    (true? (eval (if-predicate exp) env))
      (eval (if-consequent exp) env)
      (eval (if-alternative exp) env)))

(define (eval-sequence exps env) 
        (cond ((last-exp? exps) (eval (frist-exp exps) env))
              (else (eval (first-exp exps) env)
                    (eval-sequence (rest-exps exps) env))))

(define (eval-assignment exp env)
        (set-variable-value! 
          (assignment-variable exp) 
          (eval (assignment-value exp) env) env))

(define (self-eval? exp)
        (cond ((number? exp) true)
              ((string? exp) true)
              (else false)))

(define (variable? exp) (symbol? exp))

(define (quoted? exp) (tagged-list? exp 'quote))

(define (text-of-quotation exp) (cadr exp))

(define (tagged-list? exp tag) 
        (if (pair? exp) 
            (eq? (car exp) tag) 
            false))

(define (assignment? exp) (tagged-list? exp 'set ))
(define (assignment-variable exp) (cadr exp))
(define (assignment-value exp) (caddr exp))

(define (definition? exp) (tagged-list? exp 'define ))
(define (definition-variable exp) 
        (if (symbol? (cadr exp))
            (cadr exp)
            (caadr exp)))
(define (definition-value exp) 
        (if (symbol? (cadr exp))
            (caadr exp)
            (make-lambda (cdadr exp) (cddr exp))))

(define (lambda? exp) (tagged-list? exp 'lambda ))
(define (lambda-param exp) (cadr exp))
(define (lambda-body exp) (cddr exp))
(define (make-lambda params body)
        (cons 'lambda (cons params body)))

(define (let? exp) (tagged-list? exp? 'let ))
(define (let-vars-exps exp) (cadr exp))
(define (let-body exp) (caddr exp))
(define (let->lambda exp)
        ((let ((vars-exps (let-vars-exps exp))
               (body (let-body exp)))
              (let ((vars (map car vars-exps))
                     (exps (map cdr vars-exps)))
                (list (make-lambda vars body) exps)))))


(define (if? exp) (tagged-list exp 'if ))
(define (if-predicate exp) (cadr exp))
(define (if-consequent exp) (caddr exp))
(define (if-alternative exp) (if (not (null? (cdddr exp))) (cadddr exp) 'false ))
(define (make-if predicate consequent alternative) (list 'if predicate consequent alternative))


(define (begin? exp) (tagged-list? exp 'begin ))
(define (begin-actions exp) (cdr exp))
(define (last-exp? seq) (null? (cdr seq)))
(define (first-exp seq) (car seq))
(define (rest-exps seq) (cdr seq))
(define (sequence->exp seq)
        (cond ((null? seq) seq)
              ((last-exp? seq) (first-exp seq))
              (else (make-begin seq))))
(define (make-begin seq) (cons 'begin seq))

(define (application? exp) (pair? exp))
(define (operator exp) (car exp))
(define (operands exp) (cdr exp))
(define (no-operands ops) (null? ops))
(define (first-operand ops) (car ops))
(define (rest-operands ops) (cdr ops))


(define (cond? exp) (tagged-list? exp 'cond ))
(define (cond-clauses exp) (cdr exp))
(define (cond-else-clause? clause) (eq? (cond-predicate clause) 'else ))
(define (cond-predicate clause) (car clause))
(define (cond-actions clause) (cdr clause))

(define (cond->if exp) (expand-clauses (cond-clauses exp)))
(define (expand-clauses clauses) 
        (if (null? clauses) 'false 
            (let ((first (car clauses))
                  (rest (cdr clauses)))
              (if (cond-else-clause? first)
                  (if (null? rest)
                      (sequence->exp (cond-actions first))
                      (error "else caluse isn't last"))
                  (make-if (cond-predicate first)
                           (sequence->exp (cond-actions first))
                           (expand-clauses rest))))))