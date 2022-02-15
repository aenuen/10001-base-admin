import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Element Admin'

export default pageTitle => pageTitle ? `${pageTitle} - ${title}` : `${title}`
