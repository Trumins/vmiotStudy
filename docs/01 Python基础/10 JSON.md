# 10 JSON
VMIOT 提供简单的JSON与VMIOT的python互转的函数。
1. ``def fromjson()``：从json string[一个字符串对象]转换成vmiot object。
2. ``def tojson()``：从VMIOT对象转换成转换成json string。

#### 实例
```
d = {}
d["hello"] = 1
d["hfloat"] = 1.6434
d["VMIOT"] = "ssv"
d["lst"] = [1,23,5.6,"hello"]

jsonString = d.tojson()
print "tojson:",jsonString

jobj = jsonString.fromjson()
print "jobj:",jobj
```
结果：
```
PRINT: tojson: {"lst":[1,23,5.6,"hello"],"VMIOT":"ssv","hfloat":1.6434,"hello":1}
PRINT: jobj: {'hello':1, 'hfloat':1.6434, 'VMIOT':'ssv', 'lst':[1, 23, 5.6, 'hello']}
```