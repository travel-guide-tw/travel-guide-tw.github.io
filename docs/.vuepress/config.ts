import { searchPlugin } from "@vuepress/plugin-search";
import { defaultTheme, SidebarConfig, SidebarGroup } from "vuepress";
import glob from "glob";

const sidebar: SidebarConfig = [];

glob
  .sync("docs/**/*.md")
  .map((path) =>
    path
      .replace("docs/", "")
      .replace("/index", "")
      .replace("/README", "")
      .replace("index", "")
      .replace("README", "")
  )
  .sort()
  .forEach((path) =>
    path.split("/").forEach((name, index, array) => {
      let children = sidebar;

      for (let i = 0; i < index; i++) {
        children = (
          children.find(
            (child) => typeof child === "object" && child.text === array[i]
          ) as SidebarGroup
        ).children;
      }

      if (name === ".md") {
        children.push(`/${path.replace(".md", "")}`);
        return;
      }

      if (name.endsWith(".md")) {
        children.push({
          text: `${name.replace(".md", "")}`,
          children: [`/${path.replace(".md", "")}`],
          collapsible: true,
        });
        return;
      }

      const child = children.find(
        (child) => typeof child === "object" && child.text === name
      ) as SidebarGroup;

      if (!child) {
        children.push({ text: name, children: [], collapsible: true });
      }
    })
  );

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
