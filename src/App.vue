<script setup>
import { onMounted, ref } from 'vue'
import './assets/newSprint.css'

let currentComponent = ref(null)
let myComponentPath = "./resources/1-1.md"
let currentClass = ref('newSprint')

const options = [
  {
    value: 'github',
    label: 'github'
  },
  {
    value: 'orangeHeart',
    label: 'orangeHeart'
  },
  {
    value: 'night',
    label: 'night'
  },
  {
    value: 'inside',
    label: 'inside'
  },
  {
    value: 'newSprint',
    label: 'newSprint'
  },
  {
    value: 'simpleWHite',
    label: 'simpleWhite'
  }
]

onMounted(async () => {
  const { default: myComponent } = await import(myComponentPath)
  currentComponent.value = myComponent
})

async function handleChange(index) {

  myComponentPath = "./resources/" + index + ".md"

  console.log(currentComponent.value)
  console.log(myComponentPath)
  console.log(index)

  const { default: myComponent } = await import(myComponentPath)
  currentComponent.value = myComponent
}

function toTop() {
  console.log("click to top")
  document.getElementById("content").scrollTop = 0;
}

</script>

<template>
  <div>

    <el-container class="layout-container-demo">

      <!-- 左侧菜单 -->
      <el-aside>
        <el-scrollbar>
          <el-menu active-text-color="#ffd04b" @select="handleChange" default-active="1-1">

            <el-sub-menu index="1">
              <template #title>
                <h4 class="hover-underline-animation">快速上手</h4>
              </template>
              <el-menu-item index="1-1">简介</el-menu-item>
              <el-menu-item index="1-2">安装</el-menu-item>
              <el-menu-item index="1-3">创建新项目</el-menu-item>
              <el-menu-item index="1-4">vmiotman使用说明</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="2">
              <template #title>
                <h4 class="hover-underline-animation">Python基础</h4>
              </template>
              <el-menu-item index="2-1">一切都是对象</el-menu-item>
              <el-menu-item index="2-2">数字类型</el-menu-item>
              <el-menu-item index="2-3">字符串</el-menu-item>
              <el-menu-item index="2-4">列表</el-menu-item>
              <el-menu-item index="2-5">字典</el-menu-item>
              <el-menu-item index="2-6">math</el-menu-item>
              <el-menu-item index="2-7">面向过程编程</el-menu-item>
              <el-menu-item index="2-8">面向对象编程</el-menu-item>
              <el-menu-item index="2-9">函数式编程</el-menu-item>
              <el-menu-item index="2-10">异常处理</el-menu-item>
              <el-menu-item index="2-11">JSON</el-menu-item>
              <el-menu-item index="2-12">struct</el-menu-item>
              <el-menu-item index="2-13">google proto buffer</el-menu-item>
              <el-menu-item index="2-14">netbitsbuf</el-menu-item>
              <el-menu-item index="2-15">xml</el-menu-item>
              <el-menu-item index="2-16">vmiot序列化函数</el-menu-item>
              <el-menu-item index="2-17">哈希函数与校验函数</el-menu-item>
              <el-menu-item index="2-18">时间函数与高精度定时器</el-menu-item>
              <el-menu-item index="2-19">加密函数</el-menu-item>
              <el-menu-item index="2-20">可以激活的内置全局对象</el-menu-item>
            </el-sub-menu>

          </el-menu>
        </el-scrollbar>
      </el-aside>

      <!-- 右侧内容 -->
      <el-container>

        <!-- 头部固定标题 -->
        <el-header style="text-align: center; font-size: 32px">
          <div class="toolbar">
            <span>Vmiot 学习手册</span>
          </div>
          <!-- 工具栏 -->
          <div class="toolbar" style="position:relative;width: 100%;">
            <!-- 主题选择器 -->
            <el-select v-model="currentClass" style="width:125px; position:absolute; right:11%">
              <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <!-- 回到顶部 -->
            <el-button @click="toTop" style="position: absolute; right: 5%;">toTop</el-button>
          </div>
        </el-header>

        <!-- 内容展示 -->
        <el-main id="content">
          <component :is="currentComponent" class="newSprint" />
        </el-main>

      </el-container>

    </el-container>

  </div>
</template>

<style scoped>
.layout-container-demo .el-header {
  position: static;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
  height: 10vh;
  width: 85vw;
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
  height: 100vh;
  width: 15vw;
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 70px;
  height: 90vh;
  width: 85vw;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  height: 10vh;
}

.hover-underline-animation {
  display: inline-block;
  position: relative;
  color: #0087ca;
}

.hover-underline-animation::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #0087ca;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>