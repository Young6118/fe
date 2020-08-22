# HTML+CSS

## 不定宽高DIV，水平竖直居中

1. css方法

``` css
.parent {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
.parent .child {
    display: inline-block;
    vertical-align: middle;
}
```

2.css3方法

``` css
.parent {
    display: relative;
}
.parent .child {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
}
```

## 三栏布局

``` css
.main::after{
    content:'';
    display: block;
    clear: both;
}
.left{
    float: left;
    width: 300px;
    height: 100px;
    background: #631D9F;
}
.right{
    float: right;
    width: 300px;
    height: 100px;
    background: red;
}
.center{
    margin-left: 300px;
    margin-right: 300px;
    background-color: #4990E2;
}
```

## 三角形

高宽设置为0，边框粗细设置为上边框0，颜色透明；左右边框粗细40px，颜色透明；下边框粗细40px，红色。得到箭头向上红色三角形。

``` css
div {
    width: 0;
    height: 0;
    border-width: 0 40px 40px;
    border-style: solid;
    border-color: transparent transparent red;
}
```

需要带边框？使用伪元素，相对于三角形顶点绝对定位，留出1px宽

``` css
div:after {
    content: "";
    position: absolute;
    top: 1px;
    left: -38px;
    border-width: 0 38px 38px;
    border-style: solid;
    border-color: transparent transparent yellow;
}
```

三角形箭头，向下多1px

``` css
div:after {
    content: "";
    position: absolute;
    top: 2px;
    left: -38px;
    border-width: 0 38px 38px;
    border-style: solid;
    border-color: transparent transparent #fff;
}
```

右直角三角形，设置左boder为0，左直角三角形，设置右border为0。

## 1px 边框

通常，我们使用css去设置1像素边框时候，由于1px并非物理像素，也就是手机dpr和px不一致，所以会造成与设计稿边框粗细不一致的问题。

### 解决方法 1：伪类+transform

底部画一个变框

``` css
.border-line {
    position: relative;
    border: none;
}
/* 注意做transform变化的原点是(0,0) */
.border:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    background: #cccccc;
    width: 100%;
    height: 1px;
    transform: scaleY(0.5);
    -webkit-transform: scaleY(0.5);
    transform-origin: 0 0;
    -webkit-transform-orgin: 0 0;
}
```

一周画变框且带有圆角

``` css
.border:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    border: 1px solid #cccccc;
    border-radius: 26px;
    width: 200%;
    height: 200%;
    transform: scaleY(0.5);
    -webkit-transform: scaleY(0.5);
    transform-origin: left top;
    -webkit-transform-orgin: left top;
}
```

### 解决方法 2：rem + viewport

dpr devicePixelRatio

当前显示设备的物理像素分辨率与 CSS 像素分辨率的比率

``` javascript
(function () {
    // 设计稿尺寸
    var designWidth = 360;
    // 获取设备宽度
    var clientWidth = window.screen.width;
    // 获取设备像素比例
    var dpr = window.devicePixelRatio;
    // 创建空 meta 元素
    var viewportEle = document.createElement('meta');
    // 实际像素数 比例 * 设备宽度
    // 设置根节点元素字体大小，rem的依据；如果屏幕宽度超出设计稿尺寸，字体设置为20px，否则，字体设置为 20 * 物理比例 * 设备宽度 / 设计稿尺寸
    document.documentElement.style.fontSize = clientWidth > designWidth ? '20px' : 20 * dpr * clientWidth / designWidth + 'px';
    // 设置元素 name
    viewportEle.name = 'viewport';
    // 设置元素内容
    viewportEle.content = `initial-scale=${1.0 * 1 / dpr}, maximum-scale=${1.0 * 1 / dpr}, minimum-scale=${1.0 * 1 / dpr}, user-scale=no, width=device-width`;
    // 获取第一个 meta 元素
    var metaEle = document.getElementsByTagName('meta')[0]
    // 在其父元素内最前方已有的 meta 元素前面插入设置视图宽度的元素
    metaEle.parentNode.insertBefore(viewportEle, metaEle)
})()
```

样式

``` css
.border-line {
    border-bottom: 1px solid #cccccc;
}
```

避免浏览器自动放大字体大小的问题

``` css
html {
    text-size-adjust: none;
}
```

## 移动端适配

### rem

#### 第一步，需要设置视口的缩放比例

适用于 dpr 为 1 的情况

``` css
<!-- dpr = 1-->
<meta name="viewport" content="width=device-width; initial-scale=1; maximum-scale=1; minimum-scale=1; user-scalable=no;">
```

但实际上，devicePixelRatio 并不是 1，需要我们通过 js 获取后，用 1 除以设备像素比例，得到真实的缩放比，再设置到 viewport 中。

``` javascript
 //下面是根据设备dpr设置viewport
 var dpr = window.devicePixelRatio || 1
 var scale = 1 / dpr
 viewport.setAttribute(
    "content",
    "width=device-width" +
    ",initial-scale=" +
     scale +
    ", maximum-scale=" +
     scale +
    ", minimum-scale=" +
     scale +
    ", user-scalable=no"
)
```

:::tip

- viewport标签只对移动端浏览器有效，对PC端浏览器是无效的

- 当缩放比例为100%时，逻辑像素 = CSS 像素宽度 = 理想视口的宽度 = 布局视口的宽度

- 单独设置initial-scale或 width都会有兼容性问题，所以设置布局视口为理想视口的最佳方法是同时设置这两个属性

- 即使设置了user-scalable = no，在Android Chrome浏览器中也可以强制启用手动缩放
:::

#### 第二步，设置 rem 基准值

##### 原生 js

``` javascript
// set 1rem = 逻辑像素（设备独立像素） / 10
function setRemUnit () {
    var rem = document.documentElement.clientWidth / 10
    // 375/10 = 37.5
    docEl.style.fontSize = rem + 'px'
}
setRemUnit()
```

将html节点的font-size设置为页面clientWidth(布局视口)的1/10，即：1rem = 布局视口的1/10

::: tip
 例如：在iphone6下：docEl.clientWidth=设备独立像素（逻辑像素）= 布局视口宽度 = 理想窗口宽度 = 375。此时：1rem = 375/10 +px = 37.5px
:::

##### postcss-pxtorem将单位转化为 rem

``` javascript
module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
        rootValue: 37.5,
        propList: ['*', '!font-size'],
        selectorBlackList: ['van-circle__layer', 'ignore'],
    }
  }
}
```

`rootValue`是转换`px`的基准值，参考设备`iPhone6`，设备宽度`375px`

规则：基准值=当前设备宽度的`1/10`

基准值设置代码中，在`iPhone6`设备设置的`html`—&gt;`font-size` 也为`37.5px`

但是设计稿尺寸`750px`大小，所以量取设计稿量尺寸的时候需要除以`2`

:::warning
css样式和js代码有一定的耦合性

必须将改变font-size的代码放在css样式之前
:::

### vw

`vw` `Viewport` 视窗的长度单位，`window.innerWidth/window.innerHeight`

- `vw`：是`Viewport's width`的简写,`1vw`等于`window.innerWidth`的`1%`
- `vh`：和`vw`类似，是`Viewport's height`的简写，`1vh`等于`window.innerHeihgt`的`1%`
- `vmin`：`vmin`的值是当前`vw`和`vh`中较小的值
- `vmax`：`vmax`的值是当前`vw`和`vh`中较大的值

使用`PostCSS`的插件`postcss-px-to-viewport`，直接在代码中写 `px`

``` javascript
{
    loader: 'postcss-loader',
    options: {
        plugins: ()=>[
            require('autoprefixer')({
                browsers: ['last 5 versions']
            }),
            require('postcss-px-to-viewport')({
                viewportWidth: 375, //视口宽度（数字)
                viewportHeight: 1334, //视口高度（数字）
                unitPrecision: 3, //设置的保留小数位数（数字）
                viewportUnit: 'vw', //设置要转换的单位（字符串）
                selectorBlackList: ['.ignore', '.hairlines'], //不需要进行转换的类名（数组）
                minPixelValue: 1, //设置要替换的最小像素值（数字）
                mediaQuery: false//允许在媒体查询中转换px（true/false）
            })
       ]
}
```

### 搭配 vw 和 rem

给根元素大小设置随着视口变化而变化的vw单位，这样就可以实现动态改变其大小

限制根元素字体大小的最大最小值，配合body加上最大宽度和最小宽度

``` css
// rem 单位换算：定为 75px 只是方便运算，750px-75px、640-64px、1080px-108px，如此类推
$vm_fontsize: 75; // iPhone 6尺寸的根元素大小基准值
@function rem($px) {
     @return ($px / $vm_fontsize ) * 1rem;
}
// 根元素大小使用 vw 单位
$vm_design: 750;
html {
    font-size: ($vm_fontsize / ($vm_design / 2)) * 100vw; 
    // 同时，通过Media Queries 限制根元素最大最小值
    @media screen and (max-width: 320px) {
        font-size: 64px;
    }
    @media screen and (min-width: 540px) {
        font-size: 108px;
    }
}
// body 也增加最大最小宽度限制，避免默认100%宽度的 block 元素跟随 body 而过大过小
body {
    max-width: 540px;
    min-width: 320px;
}
```

### px 适配

px+flex+百分比

新闻，社区等可阅读内容较多的场景直接使用px单位，传统的响应式布局依然是很好的选择，`px`方案可以让大屏幕手机展示出更多的内容，更符合人们的阅读习惯

::: tip
对视觉组件种类较多，视觉设计对元素位置的相对关系依赖较强的移动端页面：`vw + rem`
:::
