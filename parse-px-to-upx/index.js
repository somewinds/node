// 将 px 替换为 upx
// 执行：nodex index.js
var arguments = process.argv.splice(2); // 获取执行时传入的参数
console.log(arguments)
const fs = require('fs');
const path = require('path');
// const newList = [];
const targetPath = './target.js';
fs.readFile(path.join(__dirname, targetPath), 'utf8', function (err, data) {
	if (err) throw err;
	// let list = JSON.parse(data);
	// console.log(data)
	let newData = replacePXToUpx(data);
	// console.log(newData)
	// let newContent = JSON.stringify(newList, null, 4);
	fs.writeFile(targetPath, newData, 'utf8', (err) => {
			if (err) throw err;
			console.log('success done');
	});
	/* for (let i = 0; i < list.length; i++) {
        let result = {};
        let value = list[i].properties;
        result.ID = i + 1;
        result.TYPE = value.FLAG_A;
        result.X = value.X;
        result.Y = value.Y;
        newList.push(result);
    }
 
    let newContent = JSON.stringify(newList, null, 4);
    fs.writeFile('result.json', newContent, 'utf8', (err) => {
        if (err) throw err;
        console.log('success done');
    }); */
});

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