<template>
  <div class="deal-status">
    <div class="deal-status__content">
      <div class="deal-status__title">
        <span>{{ title }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      validator: (value) => typeof value === 'string' && value.length,
      default: '-'
    },
  }
};
</script>
<style lang="scss" scoped>
.deal-status{
  background-color: #fff;
  padding: 5px 10px;
  &__title{
    text-align: center;
    span{
      font-weight: 600;
    }
  }
}
</style>
