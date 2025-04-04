##概述
事情是这样的：我用tangly1024的NotionNext在vercel构建了一个静态博客
这天想要把Minecraft服务器的状态实时显示在博客上，就去找了https://api.mcstatus.io/ 的svg widget服务，把它嵌入到notion数据库后发现它不会自动更新，只有嵌入那时才刷新一次，后来就变成静态svg了
这令我很苦恼，我又想到可以嵌入页面，并非svg，就使用了code pen和code sandbox的嵌入式网页，但效果不理想，有杂乱的组件，并且与周围环境高度不协调，多次调试后我放弃了。
顺着这条思路发展，我应该可以用vercel做一个静态网页，来实现这个功能，如你所见，我基于React开发了这个vercel示例，实现通过url嵌入一个状态页面而无需对网站源码做任何的更改。

##效果图
![IMG_0842](https://github.com/user-attachments/assets/fbbb038c-5e09-4646-b0f5-ac3669f92f15)

##如何使用？
1.复刻此仓库到您的GitHub账户下
2.修改pages/index.js中的const SERVER_IP = process.env.NEXT_PUBLIC_MC_SERVER || 'mc.neotec.uk'的mc.neotec.uk为您的服务器地址
3.同样方法修改components/StatusWidget.js中的此行
4.推送至vercel部署，具体方法自行百度
5.把得到的网址嵌入到notion页面即可

##许可证
The MIT License.
