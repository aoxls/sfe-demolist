var fs = require('fs')
  , ejs = require('ejs');


module.exports = function(dir, data) {
  var tpl = fs.readFileSync(__dirname + '/tpl/tpl.ejs').toString()
    , allFiles = []
    , output = ''
    , i = 0;

  data.pages = [];

  //读取文件夹
  allFiles = fs.readdirSync(dir);

  // 将index.html和default.html提到前面
  for (i = 0; i < allFiles.length; i++) {
    var filename = allFiles[i];
    if (filename == 'index.html' || filename == 'default.html') {
      allFiles.splice(i, 1);
      allFiles.unshift(filename);
      break;
    }
  }

  // 读取文件信息
  allFiles.forEach(function (file) {
    if (file.indexOf('.html') > 0 && file.indexOf('__demolist') == -1) {
      var content = fs.readFileSync(dir + '/' + file).toString();
      data.pages.push({
        'filename': file,
        'pagetitle': content.match(/<title>(.*)<\/title>/i)[1]
      });
    }
  });

  // 填充模板
  output = ejs.render(tpl, data);
  // 生成文件
  fs.writeFile(dir + '/__demolist.html', output, function(err) {
    if (err) throw err;
    console.log('__demolist.html生成成功！');
  });
}