<template>
  <input v-model="cid" />
  <div v-if="show">
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
  </div>
  <el-button type="primary" @click="download">download and decrypt</el-button>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { recoverSecret } from "@/utils/sss";
import { downloadAndDecrypt } from "@/utils/file";

const imageUrl = ref("");
const show = ref(false);
const cid = ref("");

const download = async () => {
  const data = await localStorage.getItem(cid.value);
  
  if (data) {
    const shares = JSON.parse(data);
    console.log(shares);

    const key = recoverSecret(shares.slice(0, 2));
    console.log(key);

    const resp = await downloadAndDecrypt(cid.value, key);
    console.log(resp);

    const blob = new Blob([resp], { type: "image/png" });
    // 使用 Blob 创建 Data URL
    imageUrl.value = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
      show.value = true;
    });
  }
};

// const beforeAvatarUpload: UploadProps["beforeUpload"] = async (rawFile) => {
//   const key = window.crypto.getRandomValues(new Uint8Array(32));
//   secretKey.value = key.toLocaleString();
//   const cidv1 = await uploadEncryptedFileToIPFS(rawFile, key);
//   console.log(`cid = ${cidv1}`);
//   imageUrl.value = `http://localhost/ipfs/${cidv1}`;
//   cid.value = cidv1;
//   show.value = true;

//   const resp = await downloadAndDecrypt(cidv1, key);
//   const blob = new Blob([resp], { type: "image/png" });

//   // 使用 Blob 创建 Data URL
//   imageUrl.value = await new Promise<string>((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = reject;
//     reader.readAsDataURL(blob);
//   });
//   return false;
// };
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
