// 此文件由脚本自动生成，请勿手动修改
// 生成时间：2026/4/23 17:13:40
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
export const ARCHIVE_DATA: YearArchive[] = [
  {
    "year": "2026",
    "count": 12,
    "articles": [
      {
        "title": "第01章_C语言入门",
        "path": "/content/biji/backend/c/",
        "date": "2026-04-23",
        "tags": [
          "C语言",
          "学习笔记"
        ],
        "desc": "- **人类语言**：是人与人之间用于沟通的一种方式。例如：中国人与中国人用普通话沟通。而中国人要和英国人交流，可以使用普通话或英语。",
        "icon": "C",
        "iconColor": "#555ab9"
      },
      {
        "title": "后端技术",
        "path": "/content/biji/backend/",
        "date": "2026-04-23",
        "tags": [
          "biji"
        ],
        "desc": "后端技术是指服务器端的开发技术，包括编程语言、框架、数据库等。",
        "icon": "bi",
        "iconColor": "#6b7280"
      },
      {
        "title": "设计模式",
        "path": "/content/biji/design-patterns/",
        "date": "2026-04-23",
        "tags": [
          "biji"
        ],
        "desc": "设计模式是解决软件设计中常见问题的可复用方案。",
        "icon": "bi",
        "iconColor": "#6b7280"
      },
      {
        "title": "文档搭建",
        "path": "/content/biji/doc-build/",
        "date": "2026-04-23",
        "tags": [
          "biji"
        ],
        "desc": "本部分记录了如何使用 VitePress 搭建和配置文档网站。",
        "icon": "bi",
        "iconColor": "#6b7280"
      },
      {
        "title": "JavaScript 学习笔记",
        "path": "/content/biji/frontend/JavaScript/",
        "date": "2026-04-23",
        "tags": [
          "biji"
        ],
        "desc": "",
        "icon": "bi",
        "iconColor": "#6b7280"
      },
      {
        "title": "1. HTML",
        "path": "/content/biji/frontend/",
        "date": "2026-04-23",
        "tags": [
          "biji"
        ],
        "desc": "",
        "icon": "bi",
        "iconColor": "#6b7280"
      },
      {
        "title": "css3 动画有哪些？",
        "path": "/content/biji/interview/css/animation.md",
        "date": "2026-04-23",
        "tags": [
          "biji"
        ],
        "desc": "CSS 动画（CSS Animations）是为层叠样式表建议的允许可扩展标记语言（XML）元素使用 CSS 的动画的模块",
        "icon": "bi",
        "iconColor": "#6b7280"
      },
      {
        "title": "css 中，有哪些方式可以隐藏页面元素？区别?",
        "path": "/content/biji/interview/css/hide_attributes.md",
        "date": "2026-04-23",
        "tags": [
          "biji"
        ],
        "desc": "在平常的样式排版中，我们经常遇到将某个模块隐藏的场景",
        "icon": "bi",
        "iconColor": "#6b7280"
      },
      {
        "title": "css 选择器有哪些？优先级？哪些属性可以继承？",
        "path": "/content/biji/interview/css/selector.md",
        "date": "2026-04-23",
        "tags": [
          "biji"
        ],
        "desc": "CSS 选择器是 CSS 规则的第一部分",
        "icon": "bi",
        "iconColor": "#6b7280"
      },
      {
        "title": "1. Vue3 设计思想",
        "path": "/content/biji/vue/1.md",
        "date": "2026-04-23",
        "tags": [
          "biji"
        ],
        "desc": "> Vue3 是声明式的框架，用起来简单。",
        "icon": "bi",
        "iconColor": "#6b7280"
      },
      {
        "title": "CSS学习笔记_进阶",
        "path": "/content/biji/frontend/CSS-advanced/",
        "date": "2026-01-14",
        "tags": [
          "CSS",
          "学习笔记"
        ],
        "desc": "CSS学习笔记_进阶。",
        "icon": "C3",
        "iconColor": "#264de4"
      },
      {
        "title": "Vscode 常用插件推荐",
        "path": "/content/shiyi/vscoe-plugin.md",
        "date": "2026-01-14",
        "tags": [
          "Vscode、插件"
        ],
        "desc": "推荐一些常用的 Vscode 插件，提高开发效率。",
        "icon": "Vs",
        "iconColor": "#6b7280"
      }
    ]
  },
  {
    "year": "2025",
    "count": 20,
    "articles": [
      {
        "title": "深入理解 JavaScript 执行机制：从预编译到 AO 对象",
        "path": "/content/shiyi/important/",
        "date": "2025-12-25",
        "tags": [
          "JavaScript",
          "执行机制",
          "预编译"
        ],
        "desc": "深入探讨 JavaScript 执行机制的核心原理，包括预编译、AO 对象等关键概念。",
        "icon": "JS",
        "iconColor": "#f7df1e"
      },
      {
        "title": "HTML学习笔记",
        "path": "/content/biji/frontend/html/",
        "date": "2025-12-11",
        "tags": [
          "HTML",
          "学习笔记"
        ],
        "desc": "HTML学习笔记。",
        "icon": "H5",
        "iconColor": "#e34c26"
      },
      {
        "title": "HTML学习笔记_进阶",
        "path": "/content/biji/frontend/html-advanced/",
        "date": "2025-12-11",
        "tags": [
          "HTML",
          "学习笔记"
        ],
        "desc": "HTML学习笔记_进阶。",
        "icon": "H5",
        "iconColor": "#e34c26"
      },
      {
        "title": "第02章_变量与进制",
        "path": "/content/biji/backend/c/第02章_变量与进制.md",
        "date": "2025-01-14",
        "tags": [
          "C语言",
          "学习笔记"
        ],
        "desc": "学习 C 语言中的变量与进制。",
        "icon": "C",
        "iconColor": "#555ab9"
      },
      {
        "title": "第03章_运算符与流程控制",
        "path": "/content/biji/backend/c/第03章_运算符与流程控制.md",
        "date": "2025-01-14",
        "tags": [
          "C语言",
          "学习笔记"
        ],
        "desc": "学习 C 语言中的运算符与流程控制。",
        "icon": "C",
        "iconColor": "#555ab9"
      },
      {
        "title": "第05章_指针",
        "path": "/content/biji/backend/c/第05章_指针(重点).md",
        "date": "2025-01-14",
        "tags": [
          "C语言",
          "学习笔记"
        ],
        "desc": "学习 C 语言中的指针。",
        "icon": "C",
        "iconColor": "#555ab9"
      },
      {
        "title": "第06章_函数",
        "path": "/content/biji/backend/c/第06章_函数.md",
        "date": "2025-01-14",
        "tags": [
          "C语言",
          "学习笔记"
        ],
        "desc": "学习 C 语言中的函数。",
        "icon": "C",
        "iconColor": "#555ab9"
      },
      {
        "title": "第07章_结构体与共用体",
        "path": "/content/biji/backend/c/第07章_结构体与共用体.md",
        "date": "2025-01-14",
        "tags": [
          "C语言",
          "学习笔记"
        ],
        "desc": "学习 C 语言中的结构体与共用体。",
        "icon": "C",
        "iconColor": "#555ab9"
      },
      {
        "title": "第08章_C语言常用函数",
        "path": "/content/biji/backend/c/第08章_C语言常用函数.md",
        "date": "2025-01-14",
        "tags": [
          "C语言",
          "学习笔记"
        ],
        "desc": "学习 C 语言中的常用函数。",
        "icon": "C",
        "iconColor": "#555ab9"
      },
      {
        "title": "第09章_文件操作",
        "path": "/content/biji/backend/c/第09章_文件操作.md",
        "date": "2025-01-14",
        "tags": [
          "C语言",
          "学习笔记"
        ],
        "desc": "学习 C 语言中的文件操作。",
        "icon": "C",
        "iconColor": "#555ab9"
      },
      {
        "title": "第09章_命令模式",
        "path": "/content/biji/design-patterns/command-patterns/",
        "date": "2025-01-14",
        "tags": [
          "设计模式",
          "学习笔记"
        ],
        "desc": "学习命令模式。",
        "icon": "模",
        "iconColor": "#9333ea"
      },
      {
        "title": "第02章_文档搭建",
        "path": "/content/biji/doc-build/assets/",
        "date": "2025-01-14",
        "tags": [
          "文档搭建"
        ],
        "desc": "学习文档搭建。",
        "icon": "文档",
        "iconColor": "#6b7280"
      },
      {
        "title": "第02章_配置",
        "path": "/content/biji/doc-build/configuration/",
        "date": "2025-01-14",
        "tags": [
          "文档搭建"
        ],
        "desc": "学习文档搭建的配置。",
        "icon": "文档",
        "iconColor": "#6b7280"
      },
      {
        "title": "第02章_Frontmatter",
        "path": "/content/biji/doc-build/frontmatter/",
        "date": "2025-01-14",
        "tags": [
          "文档搭建"
        ],
        "desc": "学习文档搭建的Frontmatter。",
        "icon": "文档",
        "iconColor": "#6b7280"
      },
      {
        "title": "快速上手",
        "path": "/content/biji/doc-build/getting-started/",
        "date": "2025-01-14",
        "tags": [
          "文档搭建"
        ],
        "desc": "学习文档搭建的快速上手。",
        "icon": "文档",
        "iconColor": "#6b7280"
      },
      {
        "title": "文档搭建之Markdown",
        "path": "/content/biji/doc-build/markdown/",
        "date": "2025-01-14",
        "tags": [
          "文档搭建"
        ],
        "desc": "学习文档搭建的Markdown。",
        "icon": "文档",
        "iconColor": "#6b7280"
      },
      {
        "title": "文档搭建之页面",
        "path": "/content/biji/doc-build/page/",
        "date": "2025-01-14",
        "tags": [
          "文档搭建"
        ],
        "desc": "学习文档搭建的页面。",
        "icon": "文档",
        "iconColor": "#6b7280"
      },
      {
        "title": "文档搭建之前言",
        "path": "/content/biji/doc-build/preface/",
        "date": "2025-01-14",
        "tags": [
          "文档搭建"
        ],
        "desc": "学习文档搭建的前言。",
        "icon": "文档",
        "iconColor": "#6b7280"
      },
      {
        "title": "文档搭建之团队界面",
        "path": "/content/biji/doc-build/team/",
        "date": "2025-01-14",
        "tags": [
          "文档搭建"
        ],
        "desc": "学习文档搭建的团队界面。",
        "icon": "文档",
        "iconColor": "#6b7280"
      },
      {
        "title": "CSS学习笔记",
        "path": "/content/biji/frontend/CSS/",
        "date": "2025-01-14",
        "tags": [
          "CSS",
          "学习笔记"
        ],
        "desc": "CSS学习笔记。",
        "icon": "C3",
        "iconColor": "#264de4"
      }
    ]
  }
];

// 获取总文章数
export const getTotalArticles = (): number => {
  return ARCHIVE_DATA.reduce((sum, year) => sum + year.count, 0);
};
