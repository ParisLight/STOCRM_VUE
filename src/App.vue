<template>
  <div id="index">
    <div class="container">
      <div class="columns" v-if="!errorFetched">
        <Swiper :slidesPerView="5.5" :grabCursor="true">
          <template #wrapper-start>
            <SwiperSlide
              v-for="(column, columnIndex) in sortedStatusesWithDeals"
              :key="`column-${columnIndex}`"
              class="index__swiper-slide"
            >
              <DealStatus :title="column.title" />
              <DealCard
                class="index__deal-card"
                v-for="(deal, dealIndex) in column.deals"
                :key="`deal-${dealIndex}`"
                :segment="deal.SEGMENT_NAME"
                :contactFio="deal.CONTACT_TITLE"
                :subdivisionDeal="deal.OFFER_CUSTOMER_NAME"
                :dealId="deal.OFFER_ID"
                :city="deal.CITY_NAME"
              />
            </SwiperSlide>
          </template>
        </Swiper>
      </div>
      <div class="index__error" v-if="errorFetched">
        <span>Что то пошло не так...</span>
        <span>Попробуйте перезагрузить страницу</span>
      </div>
    </div>
  </div>
</template>
<script>
import { getStatuses } from "./api/apiStatuses.js";
import { getOffers } from "./api/apiOffers.js";
import DealCard from "./components/DealCard.vue";
import DealStatus from "./components/DealStatus.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

export default {
  name: "App",
  components: {
    DealCard,
    DealStatus,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      statuses: [],
      offers: null,
      errorFetched: false,
    };
  },
  computed: {
    sortedStatuses() {
      return Object.values(this.statuses).sort(
        (firstStatus, secondStatus) => firstStatus.SORT - secondStatus.SORT
      );
    },
    sortedStatusesWithDeals() {
      return this.sortedStatuses.map((column) => ({
        title: column.TITLE,
        deals: this.filteredOffers(column.STATUS_ID),
      }));
    },
  },
  methods: {
    filteredOffers(statusId) {
      if (!this.offers) return [];
      return this.offers.DATA.filter(
        (offer) =>
          offer.OFFER_STATUS_ID === statusId &&
          offer.BOARD_ID === +process.env.VUE_APP_API_ID_FUNNEL
      );
    },
  },
  async created() {
    try {
      const [statuses, offers] = await Promise.all([
        getStatuses(),
        getOffers(),
      ]);
      this.statuses = statuses;
      this.offers = offers;
    } catch (error) {
      console.log(error);
      this.errorFetched = true;
    }
  },
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: #DCDCDC;
  font-family: Arial, Helvetica, sans-serif;
}
.container {
  max-width: 1400px;
  margin: 0 auto;
}
.index {
  &__deal-card {
    &:not(:first-child) {
      margin-top: 5px;
    }
  }
  &__error{
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 5px;
    span{
      color: lightcoral;
      font-size: 16px;
    }
  }
}
</style>
