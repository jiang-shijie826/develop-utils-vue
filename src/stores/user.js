import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getIp } from "@/api/wall"

export const useUserStore = defineStore('user', () => {
  /**
   * 定义state
   */
  const ip = ref('') || localStorage.getItem('ip')

  /**
   * 定义action
   */
  function getIpAddress() {
    getIp().then(res => {
      ip.value = res.ip
      localStorage.setItem('ip', ip.value)
    })
  }

  return { ip, getIpAddress }
})
