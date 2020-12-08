<script>
import {
  mapState
} from "vuex";

import Horizontal from "./horizontal";

/**
 * Default Layout
 */
export default {
  components: {
    Horizontal
  },
  data() {
    return {}
  },
  computed: mapState(["layout"]),
  mounted() {
    if (this.$route.query.layout) {
      this.$store.dispatch('layout/changeLayoutType', {
        layoutType: this.$route.query.layout
      })
    }
  }
};
</script>

<template>
  <div>
    <!-- Begin page -->
    <Vertical v-if="layout.layoutType === 'vertical'" :layout="layout.layoutType">
      <Nuxt/>
    </Vertical>
    <!-- END layout-wrapper -->

    <Horizontal v-if="layout.layoutType === 'horizontal'" :layout="layout.layoutType">
      <slot/>
    </Horizontal>

    <Detached v-if="layout.layoutType === 'detached'" :layout="layout.layoutType">
      <slot/>
    </Detached>

    <TwoColumn v-if="layout.layoutType === 'two-column'" :layout="layout.layoutType">
      <slot/>
    </TwoColumn>
  </div>
</template>
