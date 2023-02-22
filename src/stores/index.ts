export * from './website-profile'
export * from './user'
export * from './yiyan'
export * from './app'
export * from './search'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
