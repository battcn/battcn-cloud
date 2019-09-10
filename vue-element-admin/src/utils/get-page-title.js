import defaultSettings from '@/settings'

const title = defaultSettings.title || '西镜科技 | 您身边的合作伙伴'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
