// 这里是js，因为将来是使用node去执行的

// 引入vite导出的build方法，用它来创建
const Vue = require("@vitejs/plugin-vue");
const VueJsx = require("@vitejs/plugin-vue-jsx");
const { defineConfig, build } = require("vite");
const path = require("path");
const fsExtra = require("fs-extra");
const pkg = require("../package.json");

const version = pkg.version;

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
// 组件目录
const componentsDir = path.resolve(__dirname, "../src");
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

// 生成package.json（库中的）
const createPackageJson = (name) => {
  const fileStr = `{
    "name": "${name || "hay-ui"}",
    "version": "${version}",
    "main": "${name ? "index.umd.cjs" : "hay-ui.umd.cjs"}",
    "module": "${name ? "index.js" : "hay-ui.js"}",
    "author": "hayesLv",
    "description": "组件库",
    "repository": {
      "type": "git",
      "url": "git+https://github.com/hayeslv/hay-ui.git"
    },
    "keywords": ["vue3", "组件库", "tsx", "UI"],
    "license": "ISC",
    "bugs": {
      "url": "https://github.com/hayeslv/hay-ui/issues"
    }
  }`;

  if (name) {
    // 单个组件，输出对应的package.json
    fsExtra.outputFile(
      path.resolve(outputDir, `${name}/package.json`),
      fileStr,
      "utf-8",
    );
  } else {
    // 全量
    fsExtra.outputFile(
      path.resolve(outputDir, "package.json"),
      fileStr,
      "utf-8",
    );
  }
};

// 但组件按需构建
const buildSingle = async name => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: path.resolve(componentsDir, name),
          name: "index",
          fileName: "index",
          formats: ["es", "umd"],
        },
        outDir: path.resolve(outputDir, name),
      },
    }),
  );

  createPackageJson(name);
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

  // 生成package.json
  createPackageJson();
};

// 执行
const buildLib = async() => {
  // 全量打包
  await buildAll();

  // 按需打包
  fsExtra.readdirSync(componentsDir)
    .filter(name => {
      // 只要目录，不要文件，且目录中包含index.ts
      const componentDir = path.resolve(componentsDir, name);
      const isDir = fsExtra.lstatSync(componentDir).isDirectory();
      return isDir && fsExtra.readdirSync(componentDir).includes("index.ts");
    })
    .forEach(async name => {
      // 此时已经读出来了符合要求的目录，这里开始打包
      await buildSingle(name);
    });
};

buildLib();
