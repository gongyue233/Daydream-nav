const $siteList=$('.siteList')
const $lastLi = $siteList.find(`li.last`)
const x=localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap=xObject || [
    {logo:'A',url:'https://www.acfun.cn/'},
    {logo:'B',url:'https://www.bilibili.com/'}, 
]   /*创建哈希表保存数据，但是这样不需要在一开始在HTML里设计 A 和 B 站点了 */
const simplifyUrl = (url)=>{
    return url.replace('https://','')
                .replace('http://','')
                .replace('www.','')
                .replace(/\/.*/,'')  //删除 / 开头的内容
}


const render=()=>{
    $siteList.find('li:not(.last)').remove()  //先清空除了新增的 li 再遍历
    hashMap.forEach((node,index)=>{         
    const $li=$(`<li>
          <div class="site">
          <div class="logo">${node.logo}</div>
          <div class="link">${simplifyUrl(node.url)}</div>
          <div class="close">
            <svg class="icon">
                <use xlink:href="#icon-close"></use>
            </svg>
          </div>
        </div>    
    </li>`).insertBefore($lastLi)
    $li.on('click',()=>{window.open(node.url)}) //window.open —— 打开新窗口
    $li.on('click','.close',(e)=>{ //删除功能
        e.stopPropagation()      //阻止冒泡
        hashMap.splice(index,1)  //删除下标的东西
        render()                
    })
})

}

render()
$('.addButton') //监听新增网站的按钮
    .on('click',()=>{
        let url=window.prompt(`请输入您的网址？`) 
        if(url.indexOf('http')!==0){           
            url='https://'+url        }
        hashMap.push({
            logo:simplifyUrl(url)[0],  
            url:url
        });
        render()
    });
window.onbeforeunload=()=>{
    const string = JSON.stringify(hashMap)
    window.localStorage.setItem('x',string) 
     //本地储存设置一个叫 n 的值，值就是string（hashMap的字符串）
}

    