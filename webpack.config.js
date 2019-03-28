const path = require("path");

module.exports = {
    watch: true,
    entry: {
        main: [
            './src/js/index.js', 
            './src/css/style.css'
          ]
        },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/dist"
        },
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader" }
            ]
          }
        ]
    }
}