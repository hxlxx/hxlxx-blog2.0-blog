export * from './website-profile'
export * from './user'
export * from './yiyan'
export * from './small-nav'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
