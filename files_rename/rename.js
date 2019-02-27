var fs = require("fs");
var path = "files";
fs.readdir(path, function(err, files){
  // 如果当前文件是文件夹呢，需要递归下去，直到文件是单个文件
  console.log(files)
  files.forEach(function(filename, index, files){
    var oldPath = path + '/' + filename;
    fs.stat(oldPath, (err, stats) => {
      if (err) {
        console.log(err);
      } else if (stats.isFile()) { // 判断当前file是否是文件（可能是文件夹）
        // https://blog.csdn.net/buddha_itxiong/article/details/81198313
        // createReadStream 这个api的作用是打开一个可读的文件流并且返回一个fs.ReadStream对象
        /* createReadStream(path, option): 该用来打开一个可读的文件流， 它返回一个fs.ReadStream对象
        @params: path指定文件的路径
        @params: options可选, 是一个JS对象， 可以指定一些选项如：
        let option = {
          flags: 'r', //指定用什么模式打开文件，’w’代表写，’r’代表读，类似的还有’r+’、’w+’、’a’等
          encoding: 'utf8', //指定打开文件时使用编码格式，默认就是“utf8”，你还可以为它指定”ascii”或”base64”
          fd: null, //fd属性默认为null，当你指定了这个属性时，createReadableStream会根据传入的fd创建一个流，忽略path。另外你要是想读取一个文件的特定区域，可以配置start、end属性，指定起始和结束（包含在内）的字节偏移
          mode: 0666,
          autoClose: true //autoClose属性为true（默认行为）时，当发生错误或文件读取结束时会自动关闭文件描述符
        }*/
        // 从文件路径获取文件，创建一个可读流，如 input.txt
        readStream = fs.createReadStream(oldPath);
        console.log(readStream)
        // https://blog.csdn.net/Buddha_ITXiong/article/details/81199173
        // createWriteStream() 有读取操作就有写入操作，改函数的作用就是对文件流进行写入
        /*
        @params: path指定文件的路径
        @params: options可选, 是一个JS对象， 可以指定一些选项如：
        let option = {
          flags: 'w', //指定用什么模式打开文件，’w’代表写，’r’代表读，类似的还有’r+’、’w+’、’a’等
          encoding: 'utf8', //指定打开文件时使用编码格式，默认就是“utf8”，你还可以为它指定”ascii”或”base64”
          fd: null, //fd属性默认为null，当你指定了这个属性时，createReadableStream会根据传入的fd创建一个流，忽略path。另外你要是想读取一个文件的特定区域，可以配置start、end属性，指定起始和结束（包含在内）的字节偏移
          mode: 0666,
          autoClose: true //autoClose属性为true（默认行为）时，当发生错误或文件读取结束时会自动关闭文件描述符
        }*/
        // 创建一个可以写入的流，即 将要写入到文件的路径 output.txt
        writeStream = fs.createWriteStream('new_copy/' + filename);
        // https://blog.csdn.net/Vieri_32/article/details/48376547
        // https://nodeschool.io/zh-cn/
        // http://www.runoob.com/nodejs/nodejs-stream.html √
        // 管道流
        // 管道读写操作
        // 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
        readStream.pipe(writeStream);
      }
    });
  })
  // 重命名
  // RenameFiles(files)
})

function RenameFiles(files){
  // files是名称数组
  files.forEach(function(filename, index, files){
    // console.log(filename)
    // 运用正则替换oldPath中不想要的部分
    var oldPath = path + '/' + filename;
    // 正则意思是，尽可能少的匹配字符串，且后面接上 .(jpg|png)， 之后的字符无限制，
    // 那么第一个 .(jpg|png) 之前的字符串（$1）作为name，拼接(jpg|png)（$2），进行替换新的完整文件名
    var newPath = path + '/' + filename.replace(/^(.+?)\.(jpg|png).*$/, function(all, $1, $2){
      return `${$1}.${$2}`
    });

    // fs.rename(oldPath, newPath, callback)
    fs.rename(oldPath, newPath, function(err){
      if(!err){
        console.log(`原 ${oldPath} 副本替换为 ${newPath} 成功`)
      }
    })
  })
}