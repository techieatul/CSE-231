1) Give three examples of Python programs that use binary operators and/or builtins from this PA, but have different behavior than your compiler
Ans) Example 1:
     (2+3)
     Why my compiler gives different result?
     My compiler cannot handle Parathesized expression. There is no support for it yet. So this code will not pass through the compiler
     
     What can be done to improve the compiler?
     I need to extend my code to handle Paranthesized Expression. In the tree that is formed by lezer, I need to check if I see a ParanthesizedExpression and then get then recur for what is inside
     
     Example 2:
     pow(2,-2)
     
     Why my compiler gives different result?
     My compiler doesn't handle float values. So, the output from my compiler will be 0, but Python will output 0.25
     
     What can be done to improve the compiler?
     I need to add support for float values.
     
     Example 3:
     print("My string")
     
     Why my compiler gives different result?
     My compiler doesn't support strings yet. It onlu supports Number and Expressions
     
     What can be done to improve the compiler?
     I need to add support for string and string expressions.
     
    2) What resources did you find most helpful in completing the assignment?
       Ans) Lezer, https://lezer.codemirror.net/docs/ref/#tree.
            Typescript https://www.typescriptlang.org/docs
            A WASM quick tutorial https://learnxinyminutes.com/docs/wasm/
       
    3) Who (if anyone) in the class did you work with on the assignment? (See collaboration below)
       Ans) I did not collaborate with anyone, but I would like to thank Vignesh Gokul (TA) to explain the assignment.
    
     
     
     
