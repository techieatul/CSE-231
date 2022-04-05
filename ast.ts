
export type Stmt =
  | { tag: "define", name: string, value: Expr }
  | { tag: "expr", expr: Expr }

export type Expr =
    { tag: "num", value: number }
  | { tag: "id", name: string }
  | { tag: "builtin1", name: string, arg: Expr }
  | { tag: "builtin2", name: string, arg_1: Expr, arg_2: Expr }
  | {tag: "operator", left_opr: Expr, opr: string, right_opr: Expr}