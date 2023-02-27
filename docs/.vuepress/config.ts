import { searchPlugin } from "@vuepress/plugin-search";
import { defaultTheme, SidebarConfig, SidebarGroup } from "vuepress";
import glob from "glob";

const nodes: SidebarConfig = [];

glob
  .sync("docs/**/*.md")
  .map((path) =>
    path
      .replace(".md", "")
      .replace("docs/", "")
      .replace("/index", "")
      .replace("/README", "")
      .replace("index", "")
      .replace("README", "")
  )
  .sort()
  .forEach((path) =>
    path.split("/").forEach((name, index, array) => {
      let children = nodes as SidebarGroup[];

      for (let i = 0; i < index; i++) {
        children = children.find(({ text }) => text === array[i])
          ?.children as SidebarGroup[];
      }

      const child = children.find(({ text }) => text === name);

      if (!child) {
        children.push({ text: name, children: [], collapsible: true });
      }
    })
  );

function findTheEndOfSidebar(nodes: SidebarGroup[], path: string = "") {
  return nodes.map(({ children, text, collapsible }) =>
    children.length
      ? {
          text,
          collapsible,
          children: findTheEndOfSidebar(
            children as SidebarGroup[],
            `${path}/${text}`
          ),
        }
      : `${path}/${text}`
  );
}

const sidebar = findTheEndOfSidebar(nodes as SidebarGroup[]);

module.exports = {
  base: "/tour_info_zh-tw/",
  title: "歡迎到旅遊資訊專案",
  description:
    "專門給台灣人國內外旅遊資訊收集專案，觀迎提交 PR 擴充資訊，也歡迎發 Issues 討論",
  plugins: [searchPlugin()],
  theme: defaultTheme({
    repo: "ronny1020/tour_info_zh-tw",
    docsDir: "docs",
    sidebar,
  }),
};
