# 11 struct
VMIOT 提供了简单易用的 struct。 

### 打包格式
(如下的打包格式，在c中可以使用``c_binpack``、``c_binunpack``来完成。)  

为了更好地与c互操作，VMIOT特别增强了对可变长度的字符串的打包支持(``v``和``V``)。

VMIOT下的struct支持以下几个描述字符:
* x：skip this byte
* b：sign byte 
* B：unsigned byte
* h：sign short
* H：unsigned short
* i：sign int
* I：unsigned int
* q or Q：sign long long(both)
* f：double
* c：1 byte char
* (n)s：固定长度的字符数组 
  
  **在打包时，如果字符串太长，它将被截断，或者根据需要填充空字节，以使其适应。** 

  **在解包时，结果字符串总是具有确切指定数量的字节。**
* v：c字符串
* V：二进制字符串

#### 打包
1. ``structcalcsize`` 计算打包后的结构大小
2. ``pack``         参数有多个位置参数组成,以本机字节序保存结果
3. ``netpack``      参数有多个位置参数组成,以网络字节序保存结构
4. ``packtuple``    参数必须是一个tuple
5. ``netpacktuple`` 参数必须是一个tuple

(注：因为函数的参数最多16个，如果存在非常多的元素，需要先构造一个元组才行)
```
fmtstring = "xbBhHiIqQfc7si"

print "fmtstring     : ",fmtstring
#计算格式串打包以后结果的大小structcalcsize,如果格式串中包含vV,是错误的
print "structcalcsize: ",fmtstring.structcalcsize()

#以本机字节序进行打包
tupleval   = (10,30,40,50,100,200,4000,5000,7.0,'a',"",100)

resultpack      = fmtstring.pack(10,30,40,50,100,200,4000,5000,7.0,'a',"",100)
resultpacktuple = fmtstring.packtuple(tupleval)

assert resultpack == resultpacktuple

print "resultpack length:    ",len(resultpack)
print "resultpack tohex:     ",resultpack.tohex()

resultnetpack      = fmtstring.netpack(10,30,40,50,100,200,4000,5000,7.0,'a',"",100)
resultnetpacktuple = fmtstring.netpacktuple(tupleval)
assert resultnetpack == resultnetpacktuple
print "resultnetpack length: ",len(resultnetpack)
print "resultnetpack tohex:  ",resultnetpack.tohex()
```
VMIOT下的运行结果：
```
PRINT: fmtstring     :  xbBhHiIqQfc7si
PRINT: structcalcsize:  51
PRINT: resultpack length:     51
PRINT: resultpack tohex:      000A1E2800320064000000C8000000A00F00000000000088130000000000000000000000001C40610000000000000064000000
PRINT: resultnetpack length:  51
PRINT: resultnetpack tohex:   000A1E0028003200000064000000C80000000000000FA00000000000001388401C000000000000610000000000000000000064
```
#### 解包
解包函数返回一个元组。

6. ``unpack`` 
7. ``netunpack``

``uppack``和``netunpack``进行解包处理操作，解包函数可以指定数据的起始位置，默认都是从0开始，剩余的数据不少即可，允许有剩余数据(消费前面的数据)。

8. ``unpackExact``
9. ``netunpackExact``

``unpackExact``和``netunpackExact``进行解包处理操作，解包函数可以指定数据的起始位置，默认都是从0开始，剩余的数据应该恰好够(非常严格)

使用格式：
``fmtstring.unpack``、``fmtstring.unpackExact``
```
print "unpack:",fmtstring.unpack(resultpack)
print "netunpack:",fmtstring.netunpack(resultnetpack)

print "unpackExact:",fmtstring.unpackExact(resultpack)
print "netunpackExact:",fmtstring.netunpackExact(resultnetpack)
```
VMIOT下的运行结果：
```
PRINT: unpack: (10, 30, 40, 50, 100, 200, 4000, 5000, 7.0, 'a', '\x00\x00\x00\x00\x00\x00\x00', 100)
PRINT: netunpack: (10, 30, 40, 50, 100, 200, 4000, 5000, 7.0, 'a', '\x00\x00\x00\x00\x00\x00\x00', 100)
PRINT: unpackExact: (10, 30, 40, 50, 100, 200, 4000, 5000, 7.0, 'a', '\x00\x00\x00\x00\x00\x00\x00', 100)
PRINT: netunpackExact: (10, 30, 40, 50, 100, 200, 4000, 5000, 7.0, 'a', '\x00\x00\x00\x00\x00\x00\x00', 100)
```

#### C字符串与二进制字符串
v描述C字符串，它支持以下几个语义(严格区分NULL与空串的含义)：序列化后，采用4个字节表示长度字段
1. NULL or None (字符串空指针)        序列化结果为(4个0) 
   
   00 00 00 00  (后面没有数据体，没有结尾0)
2. 空串(有0结尾的串) 长度是1  序列化结果为:      
   
   00 00 00 01 00 （后面有一个字节的数据体，包括结尾0）
3. 有字符串123                         序列化结果为（  ）  
   
   00 00 00 04 31 32 33 00  （后面有4个字节数据体，包括结尾0）

V描述二进制字符串，它支持以下几个语义:序列化后,采用4个字节表示长度字段
1. NULL or None 表示字符串空指针        序列化结果为(4个0) 
   
   00 00 00 00  (后面没有数据体)
2. 空字符串,就是有一个0结尾的串,长度是0  序列化结果为:      
   
   00 00 00 00 （后面没有数据体）
3. 有字符串123                         序列化结果为（  ）  
   
   00 00 00 03 31 32 33  （后面有3个字节数据体）

**C字符串与二进制串是不同的**，非空指针的字符串的长度至少是1。(这样方便在c中方便重用缓冲区进行结构解析，不涉及拷贝的问题，而固定长度的类型是需要进行拷贝的。)

```
resultpack      = "6s5s".pack("1234567","01230")
print "resultpack:",resultpack
print "6s5s".unpackExact(resultpack)

print "vv.structcalcsize","vv".structcalcsize()
r = "vv".pack("1234567","01230")
print "vvr:",r.len(),r.hex()
print "vv".unpack(r)

r = "VV".pack("1234567","01230")
print "VVr:",r.len(),r.hex()
print "VV".unpack(r)

r = "Vv".pack("1234567","01230")
print "Vvr:",r.len(),r.hex()
print "Vv".unpack(r)

r = "vV".pack("1234567","01230")
print "vVr:",r.len(),r.hex()
print "vV".unpack(r[:])

r = "vV".pack("1234567",None)
print "vVr:",r.len(),r.hex()
print "vV".unpack(r[:])

r = "vV".pack(None,None)
print "vVr:",r.len(),r.hex()
print "vV".unpack(r[:])

r = "vV".pack("",None)
print "vVr:",r.len(),r.hex()
print "vV".unpack(r[:])

r = "vV".pack("","")
print "vVr:",r.len(),r.hex()
print "vV".unpack(r[:])

r = "vv".pack("","")
print "vvr:",r.len(),r.hex()
print "vv".unpack(r[:])

r = "vv".pack("",None)
print "vvr:",r.len(),r.hex()
print "vv".unpack(r[:])
```
VMIOT下的运行结果：
```
PRINT: resultpack: 12345601230
PRINT: ('123456', '01230')
PRINT: vv.structcalcsize 0
PRINT: vvr: 22 08000000313233343536370006000000303132333000
PRINT: ('1234567', '01230')
PRINT: VVr: 20 0700000031323334353637050000003031323330
PRINT: ('1234567', '01230')
PRINT: Vvr: 21 070000003132333435363706000000303132333000
PRINT: ('1234567', '01230')
PRINT: vVr: 21 080000003132333435363700050000003031323330
PRINT: ('1234567', '01230')
PRINT: vVr: 16 08000000313233343536370000000000
PRINT: ('1234567', None)
PRINT: vVr: 8 0000000000000000
PRINT: (None, None)
PRINT: vVr: 9 010000000000000000
PRINT: ('', None)
PRINT: vVr: 9 010000000000000000
PRINT: ('', None)
PRINT: vvr: 10 01000000000100000000
PRINT: ('', '')
PRINT: vvr: 9 010000000000000000
PRINT: ('', None)
```

