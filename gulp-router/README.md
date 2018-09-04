 //页面的热加载
   .pipe(connect.reload())
   .on('end', done);
   connect.reload()必须配合.on('end', done);
   不然就会出现不刷新的状态，因为node打开文件必定记得关闭
   
   
   less文件可以注入@import "reset";
   
   移动端适配（ 手机适配方案）
   http://www.cnblogs.com/zyl-Tara/p/5519144.html
   
   __inline和__sprite语法（base64和雪碧图）
   
   .png?__inline   base64
   
   .png?__sprite   雪碧图
   
   
   
 //厂商前缀
  http://www.ydcss.com/archives/94
  
  
  autoprefixer({browsers: '> 0%', cascade: false})
  
  
  autoprefixer的browsers参数详解 （传送门）：
  
  ● last 2 versions: 主流浏览器的最新两个版本
  
  ● last 1 Chrome versions: 谷歌浏览器的最新版本
  
  ● last 2 Explorer versions: IE的最新两个版本
  
  ● last 3 Safari versions: 苹果浏览器最新三个版本
  
  ● Firefox >= 20: 火狐浏览器的版本大于或等于20
  
  ● iOS 7: IOS7版本
  
  ● Firefox ESR: 最新ESR版本的火狐
  
  ● > 5%: 全球统计有超过5%的使用率
  
  3.3、发现上面规律了吗，相信这不难看出，接下来说说各浏览器的标识：
  
  Android for Android WebView.
  
  BlackBerry or bb for Blackberry browser.
  
  Chrome for Google Chrome.
  
  Firefox or ff for Mozilla Firefox.
  
  Explorer or ie for Internet Explorer.
  
  iOS or ios_saf for iOS Safari.
  
  Opera for Opera.
  
  Safari for desktop Safari.
  
  OperaMobile or op_mob for Opera Mobile.
  
  OperaMini or op_mini for Opera Mini.
  
  ChromeAndroid or and_chr
  
  FirefoxAndroid or and_ff for Firefox for Android.
  
  ExplorerMobile or ie_mob for Internet Explorer Mobile.