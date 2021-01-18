(define (eval exp env)
  (cond ((self-eval? exp) exp)
        ((variable? exp) (look-up-variable exp env))
        ((quoted? exp) (text-of-quotation exp))
        ((assignment? exp) (eval-assignment exp env))
        ((definition? exp) (eval-definition exp env))
        ((if? exp)  (eval-if exp env))
        ((lambda? exp)  (make-procedure (lambda-param exp) (lambda-body exp) env))
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


