# node

#### 处理文件，将文件内的 px替换为upx
如：12px 替换为 24px（倍数系数为2）

#### 执行命令：
node index.js 后可传入多个文件，以空格隔开
```
node index.js target.js

node index.js ./target.js

node index.js ./aaa/target.js

node index.js target.js ./aaa/target.js
```
