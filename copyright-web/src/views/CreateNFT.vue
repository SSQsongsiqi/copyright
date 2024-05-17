<template>
  <div class="about">
    <h1>Create NFT</h1>
    <span>tokenId: </span>
    <el-input-number v-model="tokenId" :min="1" />

    <span>cid: </span>
    <input v-model="cid" />

    <el-button type="primary" @click="create">创建NFT</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { createNFT } from "@/api/contracts";

const tokenId = ref(0);
const cid = ref("");

const create = async () => {
  // await createNFT(tokenId.value, cid.value);
  console.log(`tokenId=${tokenId.value}, cid=${cid.value}`);
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
