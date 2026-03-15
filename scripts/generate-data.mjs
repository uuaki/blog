import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 解析 frontmatter
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/
  const match = content.match(frontmatterRegex)

  if (!match) return {}

  const frontmatter = {}
  const lines = match[1].split('\n')
  let currentKey = null
  let currentArray = null

  lines.forEach(line => {
    // 处理数组项（以 - 开头）
    if (line.trim().startsWith('-') && currentKey) {
      if (!currentArray) {
        currentArray = []
        frontmatter[currentKey] = currentArray
      }
      const value = line.trim().slice(1).trim()
      currentArray.push(value)
      return
    }

    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim()
      let value = line.slice(colonIndex + 1).trim()

      // 重置数组状态
      currentKey = key
      currentArray = null

      // 处理中括号数组格式 [item1, item2]
      if (value.startsWith('[') && value.endsWith(']')) {
        const arrayContent = value.slice(1, -1)
        // 支持中文逗号和英文逗号
        frontmatter[key] = arrayContent
          .split(/[,，]/)
          .map(item => item.trim())
          .filter(item => item) // 过滤空字符串
        return
      }

      // 如果值为空，可能是多行数组的开始
      if (!value) {
        return
      }

      // 移除引号
      value = value.replace(/^["']|["']$/g, '')

      frontmatter[key] = value
    }
  })

  return frontmatter
}

// 从内容中提取第一个标题
function extractTitle(content) {
  // 移除 frontmatter
  content = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '')

  // 查找第一个一级标题
  const h1Match = content.match(/^#\s+(.+)$/m)
  if (h1Match) return h1Match[1].trim()

  // 如果没有一级标题，查找第二级标题
  const h2Match = content.match(/^##\s+(.+)$/m)
  if (h2Match) return h2Match[1].trim()

  return null
}

// 从内容中提取描述
function extractDescription(content) {
  // 移除 frontmatter
  content = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '')

  // 移除标题
  content = content.replace(/^#+\s+.+$/gm, '')

  // 移除代码块
  content = content.replace(/```[\s\S]*?```/g, '')

  // 移除行内代码
  content = content.replace(/`[^`]+`/g, '')

  // 移除链接
  content = content.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')

  // 移除图片
  content = content.replace(/!\[([^\]]*)\]\([^\)]+\)/g, '')

  // 获取第一个非空段落
  const paragraphs = content.split('\n\n')
  for (const para of paragraphs) {
    const cleaned = para.trim().replace(/\n/g, ' ')
    if (cleaned.length > 10) {
      return cleaned.slice(0, 100) + (cleaned.length > 100 ? '...' : '')
    }
  }

  return ''
}

// 从路径推断标签
function inferTagFromPath(filePath, contentDir) {
  const relativePath = path.relative(contentDir, filePath)
  const parts = relativePath.split(path.sep)

  // 路径格式通常是: 分类/子分类/文章/index.md
  if (parts.length >= 2) {
    // 使用第一层目录作为标签
    const firstDir = parts[0]

    // 映射目录名到友好的标签名
    const tagMap = {
      'juanzhi': '卷帙',
      'zhaji': '杂记',
      'shiyi': '拾遗',
      'tags': '标签',
      'frontend': '前端',
      'backend': '后端',
    }

    return tagMap[firstDir] || firstDir
  }

  return '未分类'
}

// 递归读取目录下的所有 markdown 文件
function getMarkdownFiles(dir) {
  const files = []

  function walk(currentPath) {
    const items = fs.readdirSync(currentPath)

    items.forEach(item => {
      const fullPath = path.join(currentPath, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        walk(fullPath)
      } else if (item.endsWith('.md')) {
        // 排除 content 直接子目录下的 index.md（这些是分类索引页）
        const relativePath = path.relative(dir, fullPath)
        const pathParts = relativePath.split(path.sep)

        // 如果路径深度大于 1，说明是文章页面，不是分类索引页
        if (pathParts.length > 2 || (pathParts.length === 2 && pathParts[1] !== 'index.md')) {
          files.push(fullPath)
        }
      }
    })
  }

  walk(dir)
  return files
}

// 主函数
function generateData() {
  const contentDir = path.join(__dirname, '../docs/content')
  const files = getMarkdownFiles(contentDir)

  console.log(`🔍 找到 ${files.length} 个文件，开始处理...`)

  const articles = []

  files.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf-8')
      const frontmatter = parseFrontmatter(content)

      // 从 frontmatter 或内容中获取标题
      let title = frontmatter.title
      if (!title) {
        title = extractTitle(content)
      }

      // 如果还是没有标题，跳过这个文件
      if (!title) {
        console.log(`⚠️  跳过（无标题）: ${path.relative(contentDir, file)}`)
        return
      }

      // 生成相对路径
      const relativePath = path.relative(path.join(__dirname, '../docs'), file)
      // 转换为 URL 路径，移除 index.md
      const urlPath = '/' + relativePath
        .replace(/\\/g, '/')
        .replace(/index\.md$/, '')

      // 获取或推断其他信息
      const date = frontmatter.date || new Date().toISOString().split('T')[0]
      let tags = frontmatter.tag || frontmatter.tags || inferTagFromPath(file, contentDir)

      // 统一转换为数组格式
      if (!Array.isArray(tags)) {
        tags = [tags]
      }

      const desc = frontmatter.description || frontmatter.desc || extractDescription(content)

      articles.push({
        title,
        path: urlPath,
        date,
        tags,
        desc,
      })

      console.log(`✓ ${title} (${tags.join(', ')})`)
    } catch (error) {
      console.error(`❌ 处理文件出错 ${file}:`, error.message)
    }
  })

  // 按日期降序排序
  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // 生成标签数据 - 一篇文章可以出现在多个标签下
  const tagMap = new Map()
  articles.forEach(article => {
    article.tags.forEach(tag => {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, [])
      }
      tagMap.get(tag).push(article)
    })
  })

  const tagsData = Array.from(tagMap.entries())
    .map(([tag, articles]) => ({
      tag,
      count: articles.length,
      articles,
    }))
    .sort((a, b) => b.count - a.count)

  // 生成归档数据
  const yearMap = new Map()
  articles.forEach(article => {
    const year = article.date.split('-')[0]
    if (!yearMap.has(year)) {
      yearMap.set(year, [])
    }
    yearMap.get(year).push({
      ...article,
      icon: getIconForTag(article.tags[0]),
      iconColor: getIconColorForTag(article.tags[0]),
    })
  })

  const archiveData = Array.from(yearMap.entries())
    .map(([year, articles]) => ({
      year,
      count: articles.length,
      articles,
    }))
    .sort((a, b) => parseInt(b.year) - parseInt(a.year))

  // 写入 tags.ts
  const tagsContent = `// 此文件由脚本自动生成，请勿手动修改
// 生成时间：${new Date().toLocaleString('zh-CN')}
// 标签文章数据
export interface Article {
  title: string;
  path: string;
  date: string;
  tags: string[];
  desc: string;
}

export interface TagData {
  tag: string;
  count: number;
  articles: Article[];
}

export const TAGS_DATA: TagData[] = ${JSON.stringify(tagsData, null, 2)};

// 导出所有文章（已去重）
export const ALL_ARTICLES: Article[] = ${JSON.stringify(articles, null, 2)};
`

  // 写入 archive.ts
  const archiveContent = `// 此文件由脚本自动生成，请勿手动修改
// 生成时间：${new Date().toLocaleString('zh-CN')}
import { TAGS_DATA } from "./tags";

export interface ArchiveArticle {
  title: string;
  path: string;
  date: string;
  tags: string[];
  desc: string;
  icon?: string;
  iconColor?: string;
}

export interface YearArchive {
  year: string;
  count: number;
  articles: ArchiveArticle[];
}

// 根据标签获取图标
function getIconForTag(tag: string): string {
  const iconMap: Record<string, string> = {
    HTML: "H5",
    CSS: "C3",
    JavaScript: "JS",
    TypeScript: "TS",
    React: "Re",
    Vue: "Vue",
    VitePress: "VP",
    Photoshop: "Ps",
    Illustrator: "Ai",
    Figma: "Fi",
    Design: "De",
    前端: "Fe",
    后端: "Be",
    Node: "No",
    Python: "Py",
    Go: "Go",
    Rust: "Rs",
    C语言: "C",
    设计模式: "模",
    卷帙: "卷",
    杂记: "杂",
    拾遗: "拾",
    墨痕: "墨",
    奇录: "奇",
    逸语: "逸",
  };

  return iconMap[tag] || tag.substring(0, 2);
}

// 根据标签获取图标颜色
function getIconColorForTag(tag: string): string {
  const colorMap: Record<string, string> = {
    HTML: "#e34c26",
    CSS: "#264de4",
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    React: "#61dafb",
    Vue: "#42b883",
    VitePress: "#42b883",
    Photoshop: "#31a8ff",
    Illustrator: "#ff9a00",
    Figma: "#f24e1e",
    Design: "#ff6b6b",
    前端: "#3b82f6",
    后端: "#10b981",
    Node: "#68a063",
    Python: "#3776ab",
    Go: "#00add8",
    Rust: "#000000",
    C语言: "#555ab9",
    设计模式: "#9333ea",
    卷帙: "#8b5cf6",
    杂记: "#f59e0b",
    拾遗: "#10b981",
    墨痕: "#6366f1",
    奇录: "#ec4899",
    逸语: "#14b8a6",
  };

  return colorMap[tag] || "#6b7280";
}

// 从标签数据生成归档数据
export const ARCHIVE_DATA: YearArchive[] = ${JSON.stringify(archiveData, null, 2)};

// 获取总文章数
export const getTotalArticles = (): number => {
  return ARCHIVE_DATA.reduce((sum, year) => sum + year.count, 0);
};
`

  // 写入文件
  const utilsDir = path.join(__dirname, '../docs/.vitepress/theme/utils')
  fs.writeFileSync(path.join(utilsDir, 'tags.ts'), tagsContent, 'utf-8')
  fs.writeFileSync(path.join(utilsDir, 'archive.ts'), archiveContent, 'utf-8')

  console.log('\n✅ 数据生成成功！')
  console.log(`📊 共找到 ${articles.length} 篇文章`)
  console.log(`🏷️  共有 ${tagsData.length} 个标签`)
  console.log(`📅 共有 ${archiveData.length} 个年份`)

  // 显示标签统计
  if (tagsData.length > 0) {
    console.log('\n标签统计：')
    tagsData.forEach(({ tag, count }) => {
      console.log(`  ${tag}: ${count} 篇`)
    })
  }
}

// 辅助函数
function getIconForTag(tag) {
  const iconMap = {
    HTML: "H5",
    CSS: "C3",
    JavaScript: "JS",
    TypeScript: "TS",
    React: "Re",
    Vue: "Vue",
    VitePress: "VP",
    Photoshop: "Ps",
    Illustrator: "Ai",
    Figma: "Fi",
    Design: "De",
    前端: "Fe",
    后端: "Be",
    Node: "No",
    Python: "Py",
    Go: "Go",
    Rust: "Rs",
    C语言: "C",
    设计模式: "模",
    卷帙: "卷",
    杂记: "杂",
    拾遗: "拾",
    墨痕: "墨",
    奇录: "奇",
    逸语: "逸",
  }
  return iconMap[tag] || tag.substring(0, 2)
}

function getIconColorForTag(tag) {
  const colorMap = {
    HTML: "#e34c26",
    CSS: "#264de4",
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    React: "#61dafb",
    Vue: "#42b883",
    VitePress: "#42b883",
    Photoshop: "#31a8ff",
    Illustrator: "#ff9a00",
    Figma: "#f24e1e",
    Design: "#ff6b6b",
    前端: "#3b82f6",
    后端: "#10b981",
    Node: "#68a063",
    Python: "#3776ab",
    Go: "#00add8",
    Rust: "#000000",
    C语言: "#555ab9",
    设计模式: "#9333ea",
    卷帙: "#8b5cf6",
    杂记: "#f59e0b",
    拾遗: "#10b981",
    墨痕: "#6366f1",
    奇录: "#ec4899",
    逸语: "#14b8a6",
  }
  return colorMap[tag] || "#6b7280"
}

// 运行
generateData()
