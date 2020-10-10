<template>
    <div class="charts-line">
      <minimum-flow-line></minimum-flow-line>
    </div>
</template>

<script>
    import MinimumFlowLine from "../../../commons/MinimumFlowLine";

    export default {
      components: {MinimumFlowLine},
      name: "charts-line"
    }
</script>

<style scoped>
  .charts-line {height: 100%;}
</style>
