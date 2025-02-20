//file config này giúp cấu hình, config lại cách build, run của webpack
//      thay vì sử dụng các config mặc định của webpack

//file này sử dụng theo cú pháp của nodejs:
const path = require('path')// lấy tk path từ nodejs
console.log('__dirname', __dirname);
console.log('path.resolve()', path.resolve());
console.log(`path.resolve(__dirname, 'dist')`, path.resolve(__dirname, 'dist'));
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  // console.log(env.development);//log ra xem thử
  // console.log(env.production);
  const isDevelopment = Boolean(env.development)//đây là cách truyền biến --env
  return {
    mode: isDevelopment ? 'development' : 'production',
    //production thì file render ra trong dist nhìn rất gọn, ngắn hơn         
    //development thì file render ra trong dist nhìn code dài, khó nhìn
    entry: {//entry là nơi các file đầu vào tổng
      app: path.resolve('src/index.js')
      //app là tên file sau khi build xong
      //path.resolve(có thể sử dụng đuồng dẫn tương đối, tuyệt đối), 
      //        hiện đang dùng tương đối
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      //path là 1 công cụ của node.js giúp tìm xử lý các path trong dự án
      //path.resolve(dùng đg dẫn tuyệt đối)
      //filename là tên file sau khi build
      //filename: 'script.js'//tạo file script.js bên trong code giống hệt file app.js
      filename: '[name].[contenthash].js',//dùng như này sẽ lấy tên app ở phần entry đưa xuống
      clean: true
    },
    devtool: isDevelopment ? 'source-map' : false, 
    //=> sẽ giúp việc debug khi lỗi
    //  => này thì ko nên vì sẽ làm làm tăng kích file và làm lộ source code
    module: {
      rules: [
        {
          test: /\.s[ac]ss|css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      }),
      new HtmlWebpackPlugin({
        title: 'Webpack App',// là cái title của file html sau khi build
        filename: 'index.html',
        template: 'src/template.html'//nếu đã code 1 file html và muốn dùng nó thì thêm dòng này
                                      // ko muốn dùng thì bỏ dòng any2
      })
    ],
    devServer: {
      static: {
        directory: 'dist' // Đường dẫn tương đối đến với thư mục chứa index.html
      },
      port: 3000, // Port thay cho port mặc định (8080)
      open: true, // Mở trang webpack khi chạy terminal
      hot: true, // Bật tính năng reload nhanh Hot Module Replacement
      compress: false, // Bật Gzip cho các tài nguyên
      historyApiFallback: true // Set true nếu bạn dùng cho các SPA và sử dụng History API của HTML5
    }
}}
//**chỗ nào dùng đg dẫn tuyệt đối thì ko đc dùng tương đối 
//**chỗ nào dùng đg dẫn tương đối thì vẫn có thể dùng tuyệt đối