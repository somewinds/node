/* 
处理文件，将文件内的 px替换为upx

如：12px 替换为 24px（倍数系数为2）
执行命令：
node index.js 后可传入多个文件，以空格隔开：
node index.js target.js
node index.js ./target.js
node index.js ./aaa/target.js
node index.js target.js ./aaa/target.js */

const fs = require('fs');
const path = require('path');

function resolve(dir) { // 根目录
	return path.join(__dirname, '..', dir)
}

// 执行：nodex index.js
const arguments = process.argv.splice(2); // 获取执行时传入的参数
// 文件数组遍历
arguments.forEach((filePath, index, filePathList) => {
	fs.stat(filePath, (err, stats) => {
		// console.log(err, stats)
		if (err) {
			console.log(err);
		} else if (stats.isFile()) {
			replaceFile(filePath);
		}
	})
});

// 替换文件
function replaceFile(filePath = './target.js') {
	fs.readFile(resolve(filePath), 'utf8', function (err, data) {
		if (err) throw err;
		let newData = replacePXToUpx(data);
		fs.writeFile(filePath, newData, 'utf8', (err) => {
			if (err) throw err;
			console.log('success done: ' + filePath);
		});
	});
}

/**
 * [replacePXToUpx 快捷替换并换算px至upx]
 * @param {[type]}  str         [被替换的字符串]
 * @param {String}  proportion  [倍数]
 */
function replacePXToUpx(str, proportion = 2) {
	const PX_REGEXP = /(\d+(\.\d+)?)px/g;
	let newStr = str.replace(PX_REGEXP, function (word, letter) {
		// console.log(word, letter);
		return letter * proportion + 'upx'
	})
	return newStr;
}