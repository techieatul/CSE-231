import {parser} from "lezer-python";
import {TreeCursor} from "lezer-tree";
import {Expr, Stmt} from "./ast";

export function traverseExpr(c : TreeCursor, s : string) : Expr {
  //console.log(c.type.name)
  switch(c.type.name) {
    case "Number":
      return {
        tag: "num",
        value: Number(s.substring(c.from, c.to))
      }
    case "VariableName":
      return {
        tag: "id",
        name: s.substring(c.from, c.to)
      }
    case "CallExpression":
      //console.log("Here");
      c.firstChild();
      //console.log(c.type.name);
      const callName = s.substring(c.from, c.to);
      //console.log(callName);
      c.nextSibling();
      // console.log(c.type.name);
      c.firstChild();
      //console.log(c.type.name);
      var arg_arr = [];
      while(c.nextSibling()){
        arg_arr.push(traverseExpr(c,s));
        c.nextSibling();
      }
      c.parent();
      c.parent();
      if(arg_arr.length!=1 && arg_arr.length!=2){
        throw new Error("ParseError: Argument List is not right");
      }
      if(arg_arr.length==1){
        switch(callName){
          case "print":
            break;
          case "abs":
            break;
          default:
            throw new Error("ParseError: " + callName + " not supported. Valid functions are print and abs");
        }
        return {
          tag: "builtin1",
          name: callName,
          arg: arg_arr[0]
        }

      }

      if(arg_arr.length==2){
        switch(callName){
          case "max":
            break;
          case "min":
            break;
          case "pow":
            break;
          default:
            throw new Error("ParseError: " + callName + " not supported. Valid functions are max, min and pow");
        }
        return {
          tag: "builtin2",
          name: callName,
          arg_1: arg_arr[0],
          arg_2: arg_arr[1]
        }

      }


      
    //   //console.log(callName);
    //   c.nextSibling(); // go to arglist
    //  // console.log(c.type.name);
    //   c.firstChild(); // go into arglist
    //   //console.log(c.type.name);
    //   c.nextSibling(); // find single argument in arglist
    //   //console.log(c.type.name);
      
      //const arg = traverseExpr(c, s);
      // c.parent(); // pop arglist
      // c.parent(); // pop CallExpression
      // return {
      //   tag: "builtin1",
      //   name: callName,
      //   arg: arg
      // }
    
    case "BinaryExpression":
      //console.log("Here");
      c.firstChild();
      const left_expr = traverseExpr(c,s);
      //console.log(left_expr);
      c.nextSibling();
      const op = s.substring(c.from,c.to);
      //console.log(op);
      if(op!="*" && op!="+" && op!="-"){
        throw new Error("ParseError: Invalid operand given. Valid operands are +, -, *");
      }
      c.nextSibling();
      const right_expr = traverseExpr(c,s);
      //console.log(right_expr);
      c.parent();
      return {
        tag: "operator",
        left_opr: left_expr,
        opr: op,
        right_opr: right_expr,
      }
    
    case "UnaryExpression":
      //console.log("Here");
      c.firstChild();
      const unary_op = s.substring(c.from,c.to);
      c.nextSibling();
      if(c.node.type.name != "Number"){
        throw new Error("ParseError: UnaryExpression works for Numbers");
      }

    
      //console.log(expr_type);
      // if(expr_type != "Number"){
      //   throw new Error("ParseError: Unary expression should only have Number");
      // }
      const num = s.substring(c.from,c.to);
      //console.log(num);
      c.parent();
      switch(unary_op){
        case '+':
          console.log("Here  +");
          return {
            tag: "num",
            value: Number(num)
          }
        case '-':
          //console.log("Here  oooo");
          return {
            tag: "num",
            value: -1 * Number(num)
          }
      
        default:
          console.log("Here  oooo");
          throw new Error("ParseError: UnaryExpression allowed are + and -")
      }

      

    default:
      throw new Error("ParseError: Could not parse expr at " + c.from + " " + c.to + ": " + s.substring(c.from, c.to));
  }
}

export function traverseStmt(c : TreeCursor, s : string) : Stmt {
  switch(c.node.type.name) {
    case "AssignStatement":
      c.firstChild(); // go to name
      const name = s.substring(c.from, c.to);
      c.nextSibling(); // go to equals
      c.nextSibling(); // go to value
      const value = traverseExpr(c, s);
      c.parent();
      return {
        tag: "define",
        name: name,
        value: value
      }
    case "ExpressionStatement":
      //console.log("Here");
      c.firstChild();
      const expr = traverseExpr(c, s);
      c.parent(); // pop going into stmt
      return { tag: "expr", expr: expr }
    default:
      //console.log("Here");
      throw new Error("ParseError: Could not parse stmt at " + c.node.from + " " + c.node.to + ": " + s.substring(c.from, c.to));
  }
}

export function traverse(c : TreeCursor, s : string) : Array<Stmt> {
  switch(c.node.type.name) {
    case "Script":
      const stmts = [];
      c.firstChild();
      do {
        stmts.push(traverseStmt(c, s));
      } while(c.nextSibling())
      console.log("traversed " + stmts.length + " statements ", stmts, "stopped at " , c.node);
      return stmts;
    default:
      throw new Error("ParseError: Could not parse program at " + c.node.from + " " + c.node.to);
  }
}
export function parse(source : string) : Array<Stmt> {
  const t = parser.parse(source);
  return traverse(t.cursor(), source);
}
