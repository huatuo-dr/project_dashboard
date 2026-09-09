# 项目看板 (project_dashboard)

个人项目入口看板：卡片展示名称与封面，点击封面新标签打开链接，「复制链接」写入剪贴板。链接全文不在页面展示。支持按名称搜索，无需登录，适配手机与桌面。

## 本地启动

```bash
npm i
npm run dev
```

构建：

```bash
npm run build
npm run preview
```

## 维护项目数据

1. 编辑 `public/projects.json`，追加或修改条目。
2. 把封面图放到 `public/covers/`（文件名建议与项目名一致，如 `日常工具集.png`），并在 JSON 里写相对 `public/` 的路径（例如 `/covers/日常工具集.png`）。
3. 刷新页面即可。

字段约定：

| 字段 | 说明 |
| --- | --- |
| `id` | 稳定唯一 ID |
| `name` | 展示名称，也用于搜索 |
| `url` | 跳转与复制用；页面不显示全文 |
| `cover` | 封面路径 |

## 线上部署

部署方案（GitHub Pages + Actions + `board.huatuo.cloud`）见 [`docs/部署方案文档.md`](docs/部署方案文档.md)。

- 默认：`https://huatuo-dr.github.io/project_dashboard/`
- 自定义域：`https://board.huatuo.cloud/`（DNS / Pages 自定义域需仓库所有者配置）

## 技术栈

Vite + 原生 JS + Tailwind CSS。push `master` 经 GitHub Actions 部署到 Pages。
