# 12 google proto buffer
VMIOT 内置支持 google proto buffer 消息的构建与解析。

#### 特性
对于VMIOT中的 google proto buffer：
1. 建议第一个字段采用字符串或者整数，可以使用``readFirstField()``读取第一个字段的值，这样第一个字段可以表示消息的类型，分析消息的类型无需解包
2. 支持 ``int32``、``uint32``、``int64``、``double``、``bool``
3. 支持``string``，可以当``bytes``使用
4. 支持message
5. 支持required、optional、repeated

为了保持简单,VMIOT简化了proto文件的定义,采用一个简单的格式串定义:
1. ``\xhh``  hh是字段的编号 （不需要字段的名称）
2. 字段的类型：
   * i(int32) 
   * I(uint32) 
   * q(int64) 
   * f(double) 
   * b(bool) 
   * s(string) 
   * m(message,是一个dict)
3. 字段的属性：
   * r:required 
   * ?:optional 
   * *:repeated (注意repeated是支持pack打包的)
    
举例: ``"\x01ir"`` 表示字段编号为1，是一个整数类型，是必须存在的

VMIOT中使用``{}``对象映射消息对象，要求一个消息采用一个``dict``表示，格式串存放在``protofmt``字段中：
```
MessageFormat2 = "\x01ir\x02i?\x03fr\x04s?"
MessageFormat1 = "\x01ir\x02i?\x03fr\x04s?\x05m?\x06i*\x07b*\x08m*"
```
解码支持第三种格式：id与名字直接对应。这样解码成功后，可以直接方便通过名字访问。 

VMIOT同时支持，对于dict对象，如果是访问，属性不存在，那么返回None，避免出现字段不存在的问题。
```
#d["somename"]
#d.somename
```
作为一个轻量级结构，这两种形式都被允许。

#### 打包、直接读取
1. ``def googlepack(dictobj)``：打包对象
2. ``def readFirstField()``：无需解包读取第一个字段的值，不认识则返回None；需要设置``protofmt``字段

```
def TestPack():		
	googleobj2 = {}
	googleobj2["protofmt"] = MessageFormat2
	googleobj2[1] = 100
	googleobj2[2] = 2
	googleobj2[3] = 2.0111111
	googleobj2[4] = "h"

	googleobj = {}
	googleobj["protofmt"] = MessageFormat1
	googleobj[1] = 100000
	googleobj[3] = 42.000117
	googleobj[4] = "111"
	googleobj[5] = googleobj2
	googleobj[6] = [1,2,3,4,5,999]
	googleobj[7] = [True,False,True,False,False]
	googleobj[8] = [googleobj2,googleobj2]
	#print "googleobj2: ",googleobj2
	#print "googleobj: " ,googleobj
	return googlepack(googleobj)

result = TestPack()
print "readFirstField:",result.readFirstField()
```
VMIOT下的运行结果：
```
PRINT: readFirstField: 100000
```
#### 解包
解包的时候，内部的``message``采用``string``返回，用户需要再次提供格式串进行解析。

可以采用如下两种写法进行处理：
1. ``fmtstrobj.googleunpack(googledata)``
2. ``googledata.googledataunpack(fmtstrobj)``
   
```
def TestUnpack(result):		
	newdict = result.googledataunpack(MessageFormat1)
	print "newdict: ",newdict

	submsg = MessageFormat2.googleunpack(newdict[5])
	print "submsg:",submsg

	#MessageFormat2 = "\x01ir\x02i?\x03fr\x04s?"
	nameDict = {}
	nameDict[1] = "one"
	nameDict[2] = "two"
	nameDict[3] = "three"
	nameDict[4] = "four"
	#ConvertFIDToNames(submsg,nameDict)

	#更快速
	namesTuple = (None,"one","two","three","four")	
	ConvertFIDToNamesEx(submsg,namesTuple)
	print "submsg:",submsg
	print "one:",submsg.one
	print "two:",submsg.two
	print "three:",submsg.three
	print "four:",submsg.get("four")
	
	#如果第一个字段是大于0的无符号数，或者非空的字符串，那么返回，否则返回None
	#可以用来判定一个googlebuffer的类型，以便可以选择合适的类型进行解析处理
	print "readFirstField: ",result.readFirstField()

TestUnpack(result)
```
VMIOT下的运行结果：
```
PRINT: newdict:  {8:['\x08d\x10\x02\x19\x0e\xfb\x98j\xc1\x16\x00@"\x01h', '\x08d\x10\x02\x19\x0e\xfb\x98j\xc1\x16\x00@"\x01h'], 7:[True, False, True, False, False], 6:[1, 2, 3, 4, 5, 999], 5:'\x08d\x10\x02\x19\x0e\xfb\x98j\xc1\x16\x00@"\x01h', 4:'111', 3:42.0001
PRINT: 17, 1:100000}
PRINT: submsg: {4:'h', 3:2.011111, 2:2, 1:100}
PRINT: submsg: {'one':100, 'two':2, 'three':2.011111, 'four':'h'}
PRINT: one: 100
PRINT: two: 2
PRINT: three: 2.011111
PRINT: four: h
PRINT: readFirstField:  100000
```
(其中，``ConvertFIDToNamesEx``为将数据下标转换为名字的函数，方便使用：)
```
def ConvertFIDToNamesEx(Msg,namesTuple):
	keys = Msg.keys()
	for k in keys:
		if k < namesTuple.len():
			key = namesTuple[k]
			Msg[key] = Msg[k]
			del Msg[k]
	return Msg
```

#### 多消息的数组问题
字符串的数组与消息的数据打包的结果是一致的，因此可以使用字符串的数据代替消息的数组。
```
# 返回打包后的二进制数据
def BuildSimpeMessage_BIN(code,info):
	googleobj = {}
	googleobj["protofmt"] = "\x01ir\x02sr"
	googleobj[1] = code
	googleobj[2] = info
	return googlepack(googleobj)

# 返回包含了数据的字典对象
def BuildSimpeMessage_OBJ(code,info):
	googleobj = {}
	googleobj["protofmt"] = "\x01ir\x02sr"
	googleobj[1] = code
	googleobj[2] = info
	return googleobj

# 测试消息的数组和字符串的数组在打包后是否产生相同的二进制数据。
def TestGPSMessageArray():
	xxBIN = BuildSimpeMessage_BIN(200,"xx")
	yyBIN = BuildSimpeMessage_BIN(300,"yy")

	xxOBJ = BuildSimpeMessage_OBJ(200,"xx")
	yyOBJ = BuildSimpeMessage_OBJ(300,"yy")


	googleobj1 = {}
	googleobj1["protofmt"] = "\x01s*"
	googleobj1[1] = [xxBIN,yyBIN,yyBIN]

	bin1 = googlepack(googleobj1)
	print "BIN1: ",bin1.tohex()

	googleobj2 = {}
	googleobj2["protofmt"] = "\x01m*"
	googleobj2[1] = [xxOBJ,yyOBJ,yyOBJ]

	bin2 = googlepack(googleobj2)
	print "BIN2: ",bin2.tohex()

	print "bin1 == bin2 : ", bin1 == bin2
	assert bin1 == bin2

TestGPSMessageArray()	
```
VMIOT下的运行结果：
```
PRINT: BIN1:  0A0708C801120278780A0708AC02120279790A0708AC0212027979
PRINT: BIN2:  0A0708C801120278780A0708AC02120279790A0708AC0212027979
PRINT: bin1 == bin2 :  True
```