<template>
    <el-tree :data="data" :props="defaultProps" accordion @node-click="handleNodeClick" />
</template>
  
<script lang="ts" setup>

interface Tree {
    label: string
    children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
    console.log(data)
}

const data: Tree[] = [
    {
        label: '简介',
    },
    {
        label: '快速上手',
        children: [
            {
                label: '安装',
            },
            {
                label: '创建新项目',
            },
            {
                label: 'vmiotman使用说明',
            },
        ]
    },
    {
        label: '快速上手',
    },
    {
        label: 'Python基础',
        children: [
            {
                label: '一切都是对象',
            },
            {
                label: '数字类型'
            },
            {
                label: '字符串'
            },
            {
                label: '列表'
            },
            {
                label: '字典'
            },
            {
                label: 'math'
            },
            {
                label: '面向过程编程'
            },
            {
                label: '面向对象编程'
            },
            {
                label: '函数式编程'
            },
            {
                label: '异常处理'
            },
            {
                label: 'JSON'
            },
            {
                label: 'struct'
            },
            {
                label: 'google proto buffer'
            },
            {
                label: 'netbitsbuf'
            },
            {
                label: 'xml'
            },
            {
                label: 'vmiot序列化函数'
            },
            {
                label: '哈希函数与校验函数'
            },
            {
                label: '时间函数与高精度定时器'
            },
            {
                label: '杂项'
            },
            {
                label: '加密函数'
            },
            {
                label: 'vmiot可以激活的内置全局对象'
            },
        ],
    },
    {
        label: '任务编程',
        children: [
            {
                label: '多任务基础'
            },
            {
                label: '任务link机制'
            },
            {
                label: '任务局部存储'
            },
            {
                label: '临界区'
            },
            {
                label: 'InterlockedObject'
            },
            {
                label: '任务消息机制'
            },
            {
                label: 'sleepAdv'
            },
            {
                label: 'Async39'
            },
        ]
    },
    {
        label: 'Job编程',
        children: [
            {
                label: 'Job编程'
            },
            {
                label: 'Job消息队列'
            },
            {
                label: '模板'
            },
            {
                label: 'vmiot模块状态与Job状态'
            },
        ]
    },
    {
        label: '文件与IO',
        children: [
            {
                label: '基本IO函数'
            },
            {
                label: '单读多写IO模型'
            },
            {
                label: '文件操作'
            },
            {
                label: '串口编程'
            },
            {
                label: 'GPIO操作'
            },
            {
                label: 'ADC操作'
            },
            {
                label: 'I2C编程'
            },
            {
                label: 'SPI编程'
            },
            {
                label: '杂项'
            },
        ]
    },
    {
        label: '网络编程',
        children: [
            {
                label: '基本网络编程'
            },
            {
                label: 'MQTT编程'
            },
            {
                label: 'HTTP编程'
            },
            {
                label: 'TCP server'
            },
        ]
    },
    {
        label: '配置管理',
        children: [
            {
                label: '系统运基本信息获取'
            },
            {
                label: '内存型配置管理函数'
            },
            {
                label: '系统元信息获取'
            },
            {
                label: '事务IO应用'
            },
            {
                label: '系统持久对象存储'
            },
            {
                label: 'vmiotConfig'
            },
        ]
    },
    {
        label: '系统复位与看门狗',
        children: [
            {
                label: '系统软复位'
            },
            {
                label: '休眠唤醒支持'
            },
            {
                label: '应用程序看门狗'
            },
        ]
    },
    {
        label: 'vmiot与c语言',
        children: [
            {
                label: '使用c拓展函数'
            },
            {
                label: 'vmiot c lib api'
            },
            {
                label: '开发c拓展模块1'
            },
            {
                label: '开发c拓展模块2'
            },
            {
                label: '动态加载c拓展模块'
            },
            {
                label: 'vmiot移植与适配'
            },
            {
                label: '开发vmiot driver'
            },
            {
                label: '开发支持dispose与垃圾回收机制的c模块'
            },
        ]
    },
    {
        label: 'vmiot高级特性',
        children: [
            {
                label: '本机任务集成'
            },
            {
                label: '系统调用API'
            },
            {
                label: 'Call vmiot技术'
            },
            {
                label: 'vmiot与nng'
            },
            {
                label: '动态代码执行技术'
            },
            {
                label: '本机代码集成技术RPC技术'
            },
            {
                label: '杂项'
            },
        ]
    },
    {
        label: 'vmiot与GPS',
        children: [
            {
                label: 'GPS数据源'
            },
            {
                label: 'GPS使用'
            },
            {
                label: 'LBS'
            },
        ]
    },
    {
        label: 'vmiot与视频',
        children: [
            {
                label: 'vmiotavchn音频'
            },
            {
                label: 'NAL基本工具'
            },
            {
                label: 'vmiotavchn视频'
            },
            {
                label: '文件数据源'
            },
            {
                label: '测试数据源'
            },
            {
                label: 'tsdemux使用'
            },
            {
                label: 'tsmuxer使用'
            },
            {
                label: '塞尚平台连接'
            },
        ]
    },
]
const defaultProps = {
    children: 'children',
    label: 'label',
}
</script>
  