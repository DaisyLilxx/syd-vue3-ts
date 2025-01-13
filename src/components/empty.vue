<script setup lang="ts">
// ts写法
const props = withDefaults(
  defineProps<{
    text: string
    hasEmptyBg: boolean
  }>(),
  {
    text: '暂无数据',
    hasEmptyBg: true
  }
)
</script>
<template>
  <!-- emptyBg :带有背景和高度的暂无数据样式 -->
  <!-- emptyNoBg：无背景，无设置高度的暂无数据样式 -->
  <div :class="hasEmptyBg ? 'emptyBg' : 'emptyNoBg'">
    <div class="contWrap">
      <div class="robot"><img src="@/assets/images/robot.png" /></div>
      <div class="text">{{ props.text }}</div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.emptyBg {
  width: 694px;
  height: 1398px;
  background: #ffffff;
  box-shadow: 0px 4px 12px 0px rgba(222, 222, 222, 0.5);
  border-radius: 32px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding: 0 60px;
  text-align: center;
}
.contWrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.emptyNoBg {
  width: 694px;

  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 60px;
  padding-top: 300px;
  text-align: center;
}
.robot {
  width: 287px;
  height: 248px;
  margin-bottom: 54px;
  margin-left: 113px;
}
.text {
  font-weight: 600;
  font-size: 32px;
  color: #2b2b2b;
  line-height: 60px;
}
</style>
