// 这里是js，因为将来是使用node去执行的

// 引入vite导出的build方法，用它来创建
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import { defineConfig, build } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 基础配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [
    Vue(),
    VueJsx(),
  ],
});

// 入口文件
const entryFile = path.resolve(__dirname, "./entry.ts");
// 输出目录
const outputDir = path.resolve(__dirname, "../build");

// rollup配置
const rollupOptions = {
  // 外置（不会打包进组件库）
  external: ["vue", "vue-router"],
  output: {
    // iife格式下有全局调用
    globals: {
      vue: "Vue",
    },
  },
};

// 全量构建
const buildAll = async() => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: entryFile,
          name: "hay-ui",
          fileName: "hay-ui",
          formats: ["es", "umd"],
        },
        outDir: outputDir,
      },
    }),
  );
};

// 执行
const buildLib = async() => {
  await buildAll();
};

buildLib();
