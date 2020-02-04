# 白鹭引擎保存截图跨域问题

这是一个完整的白鹭(egret)demo。演示了在白鹭 html5 中，在使用白鹭 api `RenderTexture.drawToTexture`进行截图时，如何避免跨域，成功截图并显示到页面上。

## 先说结论

关键字：**canvas**&**anonymous**。

### step1

渲染引擎切换到 canvas。在 index.html 中，修改 renderMode:

```js
egret.runEgret({
  renderMode: "canvas",
  audioType: 0,
  calculateCanvasScaleFactor: function(context) {
    var backingStore =
      context.backingStorePixelRatio ||
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio ||
      1;
    return (window.devicePixelRatio || 1) / backingStore;
  }
});
```

不要问`canvas`还是`webgl`，问就是`canvas`，稳定压倒一切。

### step2

在 Main.ts 的 createChildren 方法第一行，加上下面这句：

```js
egret.ImageLoader.crossOrigin = "anonymous";
```

就这一行关键代码，搞定！
**这行代码通样可以使 RES 在获取跨域资源时生效。**

## 截图跨域问题的背景

跨域问题在开发阶段往往是不出现的，因为在开发阶段，所有的文件，素材，后台请求一般都部署在本地或者集中在一台服务器中。但到了 UAT 阶段后，会要求页面文件，素材等进行隔离，最常见的情况就是素材统一集中到 cdn 中，这时就比较容易出现跨域问题。

## 参考链接

[白鹭官方 api](http://developer.egret.com/cn/apidoc/index/name/egret.RenderTexture)

[白鹭官方教学示例-动态截屏](http://developer.egret.com/cn/example/egret2d/index.html#040-bitmap-draw)
