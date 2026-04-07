import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  mode: "development",
  entry: "./src/index.js", // Точка входа
  output: {
    filename: "main.js", // Итоговый бандл
    path: path.resolve(import.meta.dirname, "dist"), // Папка dist
    clean: true, // Очищать dist перед сборкой
  },

  devtool: "eval-source-map", // ← для нормальных ошибок в консоли
  devServer: {
    watchFiles: ["./src/template.html"], // ← следить за изменениями в HTML
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
