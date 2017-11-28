var a = 1;
// exprots.a = a;
export var b = 2;  //es6只能暴露声明式变量,相当于暴露的是对象{b:2}
export let c = 3;
export default a;  //可以暴露变量，接受可以直接用变量接受

