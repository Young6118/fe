module.exports = {
    title: 'Young\'s blog',
    description: '周洋的个人网站',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
      ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base: '/fe/', // 这是部署到github相关的配置
    markdown: {
      lineNumbers: false // 代码块显示行号
    },
    themeConfig: {
        nav:[ // 导航栏配置
            {text: '前端基础', link: '/fe/' },
            {text: '微博', link: 'https://baidu.com'}      
        ],
        sidebar: {
            '/fe/': [
              '',     /* /foo/ */
              'vue',
              'JS',  /* /foo/one.html */
              '函数',
              'html+css',
              '面经',
            ],
            // fallback
            '/': [
              '',        /* / */
            ],
        }

    }
  };