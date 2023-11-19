<template>
  <div class="deal-card">
    <div class="deal-card__row">
      <span class="deal-card__bold-text">Id: {{ dealId }}</span>
    </div>
    <div class="deal-card__row">
      <span>ФИО: {{ contactFio }}</span>
    </div>
    <div class="deal-card__row">
      <span>Подразделение: {{ subdivisionDeal }}</span>
    </div>
    <div class="deal-card__row">
      <span>Сегмент: {{ segment }}</span>
    </div>
    <div class="deal-card__row">
      <span>Город: {{ city }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dealId: {
      type: Number,
      required: true,
      validator: (value) => Number.isInteger(value) && value > 0,
      default: 1
    },
    contactFio: {
      type: String,
      required: true,
      validator: (value) => typeof value === 'string' && value.length,
      default: '-'
    },
    subdivisionDeal: {
      type: String,
      required: true,
      validator: (value) => typeof value === 'string' && value.length,
      default: '-'
    },
    segment: {
      type: String,
      required: true,
      validator: (value) => typeof value === 'string' && value.length,
      default: '-'
    },
    city: {
      type: String,
      required: true,
      validator: (value) => typeof value === 'string' && value.length,
      default: '-'
    }
  }
};
</script>
<style lang="scss" scoped>
.deal-card{
  padding: 5px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  background-color: #fff;
  &__row{
    span{
      font-size: 14px;
    }
  }
  &__bold-text{
    font-weight: 600;
  }
}
</style>
