<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="/upload"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <div v-if="show">
      <h3>secretKey: {{ secretKey }}</h3>
      <h3 v-if="show">cid: {{ cid }}</h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

import { splitSecret } from '@/utils/sss'
import { uploadEncryptedFileToIPFS } from '@/utils/file'

const imageUrl = ref('')
const show = ref(false)
const cid = ref('')
const secretKey = ref('')

const beforeAvatarUpload: UploadProps['beforeUpload'] = async (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('Avatar picture must be JPG/PNG format!')
  }

  const key = window.crypto.getRandomValues(new Uint8Array(32))
  secretKey.value = key.toLocaleString()

  const cidv1 = await uploadEncryptedFileToIPFS(rawFile, key)
  console.log(`cid = ${cidv1}`)

  imageUrl.value = `http://localhost/ipfs/${cidv1}`
  cid.value = cidv1!
  show.value = true

  const shares = splitSecret(key, 3, 2)
  const sharesJson = JSON.stringify(shares)
  localStorage.setItem(cid.value, sharesJson)

  // const resp = await downloadAndDecrypt(cidv1, key);
  // const blob = new Blob([resp], { type: "image/png" });

  // // 使用 Blob 创建 Data URL
  // imageUrl.value = await new Promise<string>((resolve, reject) => {
  //   const reader = new FileReader();
  //   reader.onload = () => resolve(reader.result as string);
  //   reader.onerror = reject;
  //   reader.readAsDataURL(blob);
  // });
  return false
}
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
