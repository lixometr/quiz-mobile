<template>
  <main
    class="quiz-body__track flex flex-grow"
    ref="quizTrack"
    :style="{
      transform: `translateX(-${quizTrackTranslate}px)`
    }"
  >
    <quiz-page
      :title="page.title"
      class="quiz-body__page"
      :class="{
        active: currentPage === index
      }"
      title-class="mb-6 sm:mb-16"
      v-for="(page, index) in dynamicPages"
      :key="index"
    >
      <apartment-type-page
        @chosen-apartments-change="updateChosenApartments($event, index)"
        :apartment-types="page.values"
        :is-error="errors[page.id]"
        :max-question-length="maxQuestionLength"
        class="mb-4"
        v-if="page.type === pageTypes.listBox"
      />

      <apartment-price-page
        @update-range-pages="updateRangePages($event, index)"
        :slider-data="{
          ...page.values
        }"
        :is-error="errors[page.id]"
        v-else-if="page.type === pageTypes.range"
      />
    </quiz-page>

    <quiz-page
      :title="phonePage.title"
      class="quiz-body__page"
      :class="{
        active: currentPage === phonePageIndex
      }"
      title-class="mb-6 sm:mb-16"
    >
      <form-page
        @user-phone-change="updateUserPhone($event)"
        @send="$emit('send-user-data')"
        :title="phonePage.text"
        :is-error="errors.phoneError"
      />
    </quiz-page>

    <quiz-page
      :title="successPage.title"
      class="quiz-body__page"
      :class="{
        active: currentPage === successPageIndex
      }"
      title-class="md:mt-16 mb-3 sm:mb-5 text-32px"
    >
      <success-page
        :title="successPage.text"
        :success-page-image="successPageImage"
      />
    </quiz-page>
  </main>
</template>

<script>
import quizPage from "./quiz-page.vue";
import formPage from "./pages/form-page.vue";
import successPage from "./pages/success-page.vue";
import apartmentTypePage from "./pages/apartment-type-page.vue";
import apartmentPricePage from "./pages/apartment-price-page.vue";
import { pageTypes } from "../../constants.js";

export default {
  props: {
    currentPage: {
      type: Number,
      default: 0
    },
    successPageImage: {
      type: String,
      default: ""
    },
    apartmentTypes: {
      type: Array,
      default: function() {
        return [];
      }
    },
    sliderData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    maxQuestionLength: {
      type: Number,
      default: 0
    },
    sliderPages: {
      type: Array,
      default: function() {
        return [
          {
            id: "",
            text: "",
            title: "",
            type: pageTypes.listBox
          }
        ];
      }
    },
    errors: {
      type: Object,
      default: function() {
        return {};
      }
    },
    titles: {
      type: Array,
      default: function() {
        return [];
      }
    },
    subtitles: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      quizPageWidth: 0,
      pageTypes: { ...pageTypes }
    };
  },
  mounted() {
    window.addEventListener("resize", this.updatePageWidth);
    this.updatePageWidth();
  },
  methods: {
    updatePageWidth() {
      this.quizPageWidth = this.$refs.quizTrack.getBoundingClientRect().width;
    },

    updateChosenApartments(apartments, pageIndex) {
      this.$emit("chosen-apartments-change", {
        pageIndex,
        apartments
      });
    },

    updateRangePages(rangeValue, pageIndex) {
      this.$emit("update-range-pages", {
        pageIndex,
        rangeValue
      });
    },

    updateUserPhone(phone) {
      this.$emit("user-phone-change", phone);
    }
  },
  computed: {
    quizTrackTranslate() {
      return this.quizPageWidth * this.currentPage;
    },

    dynamicPages() {
      return this.sliderPages.filter(
        page => page.type !== pageTypes.phone && page.type !== pageTypes.info
      );
    },

    phonePage() {
      return this.sliderPages.find(page => page.type === pageTypes.phone);
    },

    successPage() {
      return this.sliderPages.find(page => page.type === pageTypes.info);
    },

    phonePageTitle() {
      return this.phonePage?.title || "";
    },

    successPageTitle() {
      return this.successPage?.title || "";
    },

    phonePageIndex() {
      return this.sliderPages.findIndex(page => page.type === pageTypes.phone);
    },

    successPageIndex() {
      return this.sliderPages.findIndex(page => page.type === pageTypes.info);
    }
  },
  components: {
    quizPage,
    formPage,
    successPage,
    apartmentTypePage,
    apartmentPricePage
  }
};
</script>
