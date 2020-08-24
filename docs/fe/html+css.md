# HTML+CSS

## 盒模型

### w3c标准盒模型（默认）

width: content-width

设置方式：`box-sizing: content-box;`

### IE怪异盒模型

width: border-box

在IE盒子模型中，width表示content+padding+border这三个部分的宽度

设置方式：`box-sizing: border-box;`

## 元素

### 块级元素

独占一行，内部可放行内和其他块元素；

宽度自动填满父元素宽度，即使设置了width也独占一行；

width height margin padding 都可以设置

::: tip
form 元素只能容纳其他块元素
:::

常见块级元素：

`<div></div>` 、`<img />` 、`<ul></ul>` 、`<form></form>` 、`<p></p>` 、`<h1></h1>`

### 行内元素（内联元素）

可以和其他内联元素位于一行，只能容纳内联元素或文本，一行放置不下才会换行

行内元素宽度由内容撑开，不能设置`width`和`height`，可以设置`padding-left`和`padding-right`，但`padding-bottom`和`padding-top`没有边距效果

常见内联元素：

`<a></a>` 、`<strong></strong>` 、`<br />` 、`<input />` 、`<img />`、`<em>强调文本</em>` 、`<textarea></textarea>`

### 替换元素

显示内容由属性决定，如：

`<img />`、`<input />` 

### 非替换元素

显示内部内容

如 `<p></p>`

### 行内替换元素

可以设置 `width`、`height`、`padding`、`margin`

`<img /> `、`<input></input>` 、`<textarea></textarea>`

### 块级元素和内联元素转换

但是行内元素和块级元素一样，都拥有盒子模型，当加了css控制以后，块元素可以变为内联元素，内联元素也可以变为块元素。

值|类别|描述|
---|:--:|---
|display: block|	块元素|	可以设置宽高以及内外边距，且都换行。|
|display: inline|	内联元素|	高度，行高以及底边距不可改变，且都在同一行
display: inline-block|	块元素+内联元素|	能设置宽高、内外边距，也能在同一行，可以通过vertical-align:top 属性顶部对齐

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

3.flex

``` css
.parent {
    display: flex;
    display: -webkit-flex;
    height: 200px;
    width: 400px;
    align-items:center;
    justify-content:center;
}
.child {
    width: 50px;
    height: 40px;
}
```

## position 定位

static/relative/absolute/fixed

static 默认文档流布局，忽略 top left right bottom声明

relative 相对于元素原位置做移动，仍在原文档流中占据空间

absolute 相对于有position为relative或absolute的父元素进行偏移，如父容器没设置，相对于body偏移，在标准流中不占据位置

fixed 相对于body，以浏览器窗口做偏移，滚动无影响，流中不占据位置

## px em rem

px 绝对单位，计算机图像虚拟长度，相对于显示屏分辨率，指定dpi可计算成物理长度

em 相对单位，相对于当前元素字体大小，如当前未设置字体大小，会继承父元素字体大小

rem 相对单位，相对于html根元素

## BFC

1）定义：

BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有 Block-level box 参
与， 它规定了内部的 Block-level Box 如何布局，并且与这个区域外部毫不相干。

2）布局规则：

A. 内部的 Box 会在垂直方向，一个接一个地放置。

B. Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠。

C. 每个元素的 margin box 的左边， 与包含块 border box 的左边相接触(对于从左往右的格式化，否则相反)。
即使存在浮动也是如此。

D. BFC 的区域不会与 float box 重叠。

E. BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

F. 计算 BFC 的高度时，浮动元素也参与计算。

3）哪些元素会生成 BFC：

A. 根元素
B. float 属性不为 none
C. position 为 absolute 或 fixed
D. display 为 inline-block， table-cell， table-caption， flex， inline-flex
F. overflow 不为 visible

## 选择器 优先级

- !important 优先级最高
- 内联样式 1000
- id 选择器 0100
- class 类选择器 0010
- 元素选择器和伪元素 0001
- 结合符和通配符选择器 0000

css 3 选择器：属性、伪类、伪元素

### 属性选择器：有该属性的设置为该样式

``` css
a[href] {color:red;}
```

### 伪类用来添加一些选择器的特殊效果

``` css
a:link {color:#FF0000;} /* 未访问的链接 */
a:visited {color:#00FF00;} /* 已访问的链接 */
a:hover {color:#FF00FF;} /* 鼠标划过链接 */
a:active {color:#0000FF;} /* 已选中的链接 */
p:first-child
{
    color:blue;
}
```

### 伪元素选择器 (content属性)

伪元素是通过样式来达到元素效果的，也就是说伪元素不占用dom元素节点

伪元素不属于文档，所以js无法操作它

伪元素属于主元素的一部分，因此点击伪元素触发的是主元素的click事件

原文说块级元素才能有:before, :after，其实是不妥的，大部分行级元素也可以设置伪元素，但是像img可替换元素，因为其外观和尺寸有外部资源决定，那么如果外部资源正确加载，就会替换掉其内部内容，这时伪元素也会被替换掉，但是当外部资源加载失败时，设置的伪元素是可以起作用的。

优点

减少dom节点数
让css帮助解决部分js问题，让问题变得简单

缺点

不利于SEO
无法审查元素，不利于调试

:before和:after常见使用场景

1.清除浮动

清除浮动是前端最常见的问题，有一种做法是使用一个空的页面元素如div来清除浮动，但是这种做法增加毫无语义的页面元素，而且占用dom节点。更可取的做法是利用伪元素来清除浮动：
``` html
            <div class="l-form-row">
                <div class="l-form-label"></div>
                ....
            </div>
            <style>
                .l-form-row:after {
                    clear: both;
                    content: "\0020";
                    display: block;
                    height: 0;
                    overflow: hidden
                }
            </style>
```

这样，class=l-form-row的元素内部任何浮动都能清除掉，不用额外添加无意义的元素。

2.利用attr()来实现某些动态功能

在页面中常见这种问题，页面上加载的图片在无法加载时会显示一个破损图片，直接影响页面的美观；

那么可以通过伪元素配合样式能够让未加载的图片看起来真的像破裂的效果

3.与counter()结合实现序号问题，而不用使用列表元素。具体还要结合css的 counter-increment 和 counter-reset 属性的用法 。

代码如下：

``` html
        <h2></h2>
        <h2></h2>
        <style>
            body {counter-reset:section;}
            h2:before { 
                counter-increment: section; 
                content: "Chapter"  counter(section) ".";
            }
        </style>
```

4.特效使用

利用这两个伪元素，可以实现各种效果，如放大镜、叉叉、箭头、三角符等

``` html
      a {
	    position: relative;
	    display: inline-block;
	    outline: none;
	    text-decoration: none;
	    color: #000;
	    font-size: 32px;
	    padding: 5px 10px;
        }

        a:hover::before, a:hover::after { position: absolute; }
        a:hover::before { content: "\5B"; left: -20px; }
        a:hover::after { content: "\5D"; right:  -20px; }
```



## css 高度塌陷解决

子元素浮动，导致父元素宽高塌陷收缩

1.加一个空div标签清除浮动(缺点：不利于优化，优点：兼容性强)

``` html
<div style="clear:both"></div>
```

2.overflow+zoom（优点：兼容性强。 缺点：对margin属性有影响，不能设负值，设负值无效。负值绝对定位也不可以。）

zoom 缩放设置为 1

``` css
#parent{
     overflow:hidden;
     zoom:1;
}
```

3.after+zoom （最好用的，最推荐的，兼容性也很好）

``` css 
#parent{
    zoom:1
}
#parent:after{
     display:block;
     content:'',
     clear:both;
     height:0;
     overflow:hidden
```

4.让父元素本身也浮动（不推荐，如果也设置浮动，父元素宽度就会随着子元素变化）

``` css
#parent{
    float:left;
}
```

## 可继承不可继承css属性

不可继承的：

display、margin、border、padding、background、height、min-height、max-height、width、min-width、max-width、overflow、position、left、right、top、bottom、z-index、float、clear、table-layout、vertical-align、page-break-after、page-bread-before和unicode-bidi。

所有元素可继承：visibility和cursor。

内联元素可继承：letter-spacing、word-spacing、white-space、line-height、color、font、font-family、font-size、font-style、font-variant、font-weight、text-decoration、text-transform、direction。

终端块状元素可继承：text-indent和text-align。

列表元素可继承：list-style、list-style-type、list-style-position、list-style-image。

表格元素可继承：border-collapse。 

值继承：

后代元素可以继承如color、font-size等属性

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

transparent 透明

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

## 清除浮动

1，父级 div 定义 height

原理：父级 div 手动定义 height，就解决了父级 div 无法自动获取到高度的问题。 简单、代码少、容易掌握 ，但
只适合高度固定的布局. 

2，结尾处加空 div 标签 clear：both

原理：在浮动元素的后面添加一个空 div 兄弟元素，利用 css 提高的 clear：both 清除浮动，让父级 div 能自动获
取到高度 ，如果页面浮动布局多，就要增加很多空 div，让人感觉很不好 . 

3，父级 div 定义 伪类：after 和 zoom

``` css
/*清除浮动代码*/
.clearfix：after{
content：""；
display：block；
visibility：hidden；
height：0；
line-height：0；
clear：both；
}
.clearfix{zoom：1}
```

原理：IE8 以上和非 IE 浏览器才支持：after，原理和方法 2 有点类似，zoom(IE 转有属性)可解决 ie6，ie7 浮动问题 ，
推荐使用，建议定义公共类，以减少 CSS 代码。

4，父级 div 定义 `overflow：hidden`

超出盒子部分会被隐藏，不推荐使用. 

5.双伪元素法：

``` css
.clearfix：before，.clearfix：after {
content： ""；
display： block；
clear： both；
}
.clearfix {
zoom： 1；
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

## less

### less 与 sass 区别

## html 暗黑模式

``` css
html[theme='dark-mode'] {
  filter: invert(1) hue-rotate(180deg);
}

html[theme='dark-mode'] img{
  filter: invert(1) hue-rotate(180deg);
}

html {
  transition: color 300ms, background-color 300ms;
}
```

## 超出文字显示省略号

### 单行文本溢出显示省略号

``` css
p {
    width: 300px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
```

### 多行文本溢出显示省略号

通用

``` css
p{position: relative; line-height: 20px; max-height: 40px;overflow: hidden;}
p::after{content: "..."; position: absolute; bottom: 0; right: 0; padding-left: 40px;
background: -webkit-linear-gradient(left, transparent, #fff 55%);
background: -o-linear-gradient(right, transparent, #fff 55%);
background: -moz-linear-gradient(right, transparent, #fff 55%);
background: linear-gradient(to right, transparent, #fff 55%);
}
```

webkit 浏览器和移动端适用

``` css
p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
```

### display： none；与 visibility： hidden 的区别是什么？

display：none； 使用该属性后，HTML 元素（对象）的宽度、高度等各种属性值都将“丢失”；

visibility：hidden； 使用该属性后，HTML 元素（对象）仅仅是在视觉上看不见（完全透明），而它所
占据的空间位置仍然存在，也即是说它仍具有高度、宽度等属性值。
