import { createShorthandPropertyAssignment } from "typescript";
import { Stmt, Expr } from "./ast";
import { parse } from "./parser";

// https://learnxinyminutes.com/docs/wasm/

type LocalEnv = Map<string, boolean>;

type CompileResult = {
  wasmSource: string,
};

export function compile(source: string) : CompileResult {
  const ast = parse(source);
  const definedVars = new Set();
  ast.forEach(s => {
    switch(s.tag) {
      case "define":
        definedVars.add(s.name);
        break;
    }
  }); 
  const scratchVar : string = `(local $$last i32)`;
  const localDefines = [scratchVar];
  definedVars.forEach(v => {
    localDefines.push(`(local $${v} i32)`);
  })
  
  const commandGroups = ast.map((stmt) => codeGen(stmt));
  const commands = localDefines.concat([].concat.apply([], commandGroups));
  console.log("Generated: ", commands.join("\n"));
  return {
    wasmSource: commands.join("\n"),
  };
}

function codeGen(stmt: Stmt) : Array<string> {
  switch(stmt.tag) {
    case "define":
      var valStmts = codeGenExpr(stmt.value);
      return valStmts.concat([`(local.set $${stmt.name})`]);
    case "expr":
      var exprStmts = codeGenExpr(stmt.expr);
      return exprStmts.concat([`(local.set $$last)`]);
    default:
      throw new Error("ReferenceError: tag not defined");
  }
}

function codeGenExpr(expr : Expr) : Array<string> {
  switch(expr.tag) {
    case "builtin1":
      const argStmts = codeGenExpr(expr.arg);
      return argStmts.concat([`(call $${expr.name})`]);
    case "builtin2":
      const arg_1 = codeGenExpr(expr.arg_1);
      const arg_2 = codeGenExpr(expr.arg_2);
      return arg_1.concat(arg_2,[`(call $${expr.name})`]);
    case "num":
      return ["(i32.const " + expr.value + ")"];
    case "id":
      return [`(local.get $${expr.name})`];
    
    case "operator":
      //console.log("Here");
      const l = codeGenExpr(expr.left_opr);
      const r = codeGenExpr(expr.right_opr);
      const o = expr.opr;
      // console.log(l);
      // console.log(r);
      // console.log(o);
      var opr_st = "";
      // Checking for operator
      switch(o){
        case '+':
          //console.log("here");
          opr_st =  "(i32.add)";
          break;
        case '*':
          opr_st = "(i32.mul)";
          break;
        case '-':
          //console.log("here");
          opr_st = "(i32.sub)";
          break;
          
      }
      return l.concat(r,opr_st);
    
    default:
      throw new Error("ReferenceError: tag not defined");

    


  }
}
