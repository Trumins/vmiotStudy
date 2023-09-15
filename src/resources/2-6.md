# 05 math
VMIOT 支持常用的数学函数。
使用``import math``即可。
### 实例
```
import math
```
#### $\pi$、$e$
```
'''
math.pi             为圆周率常量 = 3.14159265358979323846
math.e              自然常数
'''
print "---------------------------"
print "pi: ",math.pi 
print "e: ",math.e 
print "---------------------------"
```
结果：
```
PRINT: ---------------------------
PRINT: pi:  3.141593
PRINT: e:  2.718282
PRINT: ---------------------------
```
#### 三角函数
```
'''
Trigonometric functions
sin                 正弦函数    math.sin(math.rad(30))  0.5
cos                 余弦函数    math.cos(0.5)   0.87758256
tan                 正切函数    math.tan(0.5)   0.5463024
asin                反正弦函数   math.asin(0.5)  0.52359877
acos                反余弦函数   math.acos(0.5)  1.04719755
atan                反正切函数   math.atan(0.5)  0.463647609
atan2               x / y的反正切值  math.atan2(90.0, 45.0)  1.10714871
'''
print "sin:", math.sin(3.1415926/2)
print "cos:", math.cos(0.5)
print "tan:", math.tan(0.5)
print "asin:", math.asin(0.5)
print "acos:", math.acos(0.5)
print "atan:", math.atan(0.5)
print "atan2:", math.atan2(90.0, 45.0)
```
结果：
```
PRINT: sin: 1.0
PRINT: cos: 0.877583
PRINT: tan: 0.546303
PRINT: asin: 0.523599
PRINT: acos: 1.047198
PRINT: atan: 0.463648
PRINT: atan2: 1.107149
```
#### 双曲函数
```
'''
Hyperbolic functions
sinh                双曲线正弦函数 math.sinh(0.5)  0.5210953
cosh                双曲线余弦函数 math.cosh(0.5)  1.276259652
tanh                双曲线正切函数 math.tanh(0.5)  0.46211715
'''
print "sinh:", math.sinh(0.5)
print "cosh:", math.cosh(0.5)
print "tanh:", math.tanh(0.5)
```
结果：
```
PRINT: sinh: 0.521095
PRINT: cosh: 1.127626
PRINT: tanh: 0.462117
```
#### 指数函数、对数函数
```
'''
Exponential and logarithmic functions
exp                 计算以e为底x次方值  math.exp(2) 2.718281828
log                 计算一个数字的自然对数 math.log(2.71)  0.9969
log10               计算以10为基数的对数 math.log10(100) 2
'''
print "exp:", math.exp(1)
print "log:", math.log(2.71)
print "log10:", math.log10(100)
```
结果：
```
PRINT: exp: 2.718282
PRINT: log: 0.996949
PRINT: log10: 2.0
```
#### 幂函数
```
'''
Power functions
fpow                得到x的y次方 math.fpow(2, 5) 32
sqrt                开平方函数   math.sqrt(16)   4
'''
#建议使用pow
print "fpow:", math.fpow(10,3)
print "pow:", pow(10,3)
print "sqrt:", math.sqrt(100)
```
结果：
```
PRINT: fpow: 1000.0
PRINT: pow: 1000
PRINT: sqrt: 10.0
```
#### 取整、绝对值、余数
```
'''
Nearest integer, absolute value, and remainder functions
abs                 x的绝对值   abs(-100)  100
ceil                不小于x的最大整数   math.ceil(5.8)  6
floor               不大于x的最大整数   math.floor(5.6) 5
modf                把数分为整数和小数   math.modf(15.98)    15 98
fmod               （mod）    取模运算    math.mod(14, 5) 4
'''

print "abs:",abs(-100)
print "ceil:", math.ceil(5.8)
print "floor:", math.floor(5.6)
print "modf:", math.modf(15.98)
print "fmod:", math.fmod(14,5)
```
结果：
```
PRINT: abs: 100
PRINT: ceil: 6.0
PRINT: floor: 5.0
PRINT: modf: (15.0, 0.98)
PRINT: fmod: 4.0
```
#### 随机数
```
'''
random              获取随机数   math.random(100)    获取1-100的随机数
'''

for x in range(10):
    print "x:",x,math.random(10)
```
结果(仅为示例，不具代表性)：
```
PRINT: x: 0 1
PRINT: x: 1 6
PRINT: x: 2 2
PRINT: x: 3 3
PRINT: x: 4 0
PRINT: x: 5 8
PRINT: x: 6 1
PRINT: x: 7 0
PRINT: x: 8 3
PRINT: x: 9 8
```
#### 角度与弧度
```
#deg                 弧度转角度   math.deg(math.pi)   180
#rad                 角度转弧度   math.rad(180)   3.14159265358

print "math.deg(math.pi):",math.deg(math.pi)
print "math.rad(180):",math.rad(180)
```
结果：
```
PRINT: math.deg(math.pi): 180.0
PRINT: math.rad(180): 3.141593
```
#### 最大、最小值
```
#max                 取得参数中最大值    math.max(2.71, 100, -98, 23)    100
#min                 取得参数中最小值    math.min(2.71, 100, -98, 23)    -98

print "math.max(2.71, 100, -98, 23):",math.max(2.71, 100, -98, 23)
print "math.max(2.71, 100, -98, 230):",math.max(2.71, 100, -98, 230)
print "math.max(271, 100, -98, 230):",math.max(271, 100, -98, 230)

print "math.min(2.71, 100, -98, 23):",math.min(2.71, 100, -98, 23)
print "math.min(2.71, -100, -98, 23):",math.min(2.71, -100, -98, 23)
print "math.min(-271, 100, -98, 23):",math.min(-271, 100, -98, 23)
print "math.min(-271, 100, -98, -2300):",math.min(-271, 100, -98, -2300)
```
结果：
```
PRINT: math.max(2.71, 100, -98, 23): 100
PRINT: math.max(2.71, 100, -98, 230): 230
PRINT: math.max(271, 100, -98, 230): 271
PRINT: math.min(2.71, 100, -98, 23): -98
PRINT: math.min(2.71, -100, -98, 23): -100
PRINT: math.min(-271, 100, -98, 23): -271
PRINT: math.min(-271, 100, -98, -2300): -2300
```