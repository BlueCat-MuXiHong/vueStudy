# 初识VUE

## vue模板语法有2大类:

### 1.插值语法

功能:用于解析标签体内容。功能:用于解析标签体内容.
写法: {{xxx}}.xxx是js表达式,且可以直接读取到data中的所有属性。

### 2.指令语法

写法：`{{xxx}}.xxx是js表达式，且可以直接读取到data中的所有属性。
功能:用于解析标签（包括:标签属性、标签体内容、绑定事件.....) .功能:用于解析标签(包括:标签属性、标签体内容、绑定事件.)。`
举例: `v-bind:href="xxx”或简写为:href="xxx"，xxx同样要写js表达式，且可以直接读取到data中的所有属性。举例：v-BIND：href=“xxx”或简写为：href=“xxx”，xxx同样要写js表达式，且可以直接读取到data中的所有属性。
备注: Vue中有很多的指令，且形式都是: v-????，此处我们只是拿v-bind举个例子。备注：vue中有很多的指令，且形式都是：v-？，此处我们只是拿v-bind举个例子.`

data 与el的2种写法
1.el有2种写法
(1).new Vue时候配置el属性。(1)新Vue时候配置el属性.
(2).先创建Vue实例,随后再通过vm.$mount( ' #root ')指定el的值。

2.data有2种写法
(1).对象式

(2).函数式
如何选择:目前哪种写法都可以，以后学习到组件时，data必须使用函数式，否则会报错。
3.一个重要的原则
由Vue管理的函数，一定不要写箭头函数，一旦写了箭头函数，this就不再是Vue实例了。

# 数据绑定

## 单项数据绑定

**v-bind**：数据只能从data流向页面

```vue
<a :href="url">这是一个链接</a>

el:"#app",
 data:{
 	url:"www.baidu.com"
 }
```

## 双向数据绑定

**v-model**：数据可以从data流向页面，也可以从页面流向date    

**备注：双向绑定一般用在input,select等标签上，v-model:value="aa"可以简写为v-model="aa"，因为取的就是value值**

```vue
<input type="text" v-model:value="inputValue">
el:"#app",
data:{
	inputValue:""
}
```

# 事件处理

## 事件处理

事件的基本使用:

1.使用v-on : xxx或@xxx绑定事件,其中医xx是事件名;

2.事件的回调需要配置在methods对象中,最终会在vm 上;

3.methods中配置的函数,不要用箭头函数!否则this就不是vm了;

4.methods中配置的函数，都是被Vue所管理的函数，this的指向是vm或组件实例对象;

5.@click="demo”和@click="demo($event)”效果一致，但后者可以传参;

```vue
<button @click="showData">不传参数</button>
<button @click="showData2('带参数')">传参数</button>
<button @click="showData3()">访问data中的数据</button>
el:"#app",
data:{
	name:"sss"
},
methods:{
    showData(){
    	alert('你好')
    },
    showData2(arg){
    	alert(arg)
    },
    showData3(){
    	alert(this.name)
    }
}
```

## 事件修饰符

vue中的事件修饰符

1.prevent: 阻l止默认事件(常用）

2.stop:阻止事件冒泡（常用)

3.once:事件只触发一次（常用）

4.capture:使用事件的捕获模式

5.self:只有event.target是当前操作的元素时才触发事件

6.passive:事件的默认行为立即执行，无需等待事件回调执行完毕

```vue
<!-- 阻止默认事件（常用） -->
<a href="www.baidu.com" @click.prevent="showInfo1">点我提示信息</a>

<!-- 阻止事件冒泡（常用） -->
<div class="demo1" @click="showInfo2" style="width: 100px;height: 100ox;background-color: #fff111;">
	<button @click.stop="showInfo3">点我</button>
</div>
<!-- 阻止事件冒泡（常用）先阻止冒泡再阻止跳转 -->
<div class="demo1" @click="showInfo2" style="width: 100px;height: 100ox;background-color: #fff111;">
	<a href="www.baidu.com" @click.stop.prevent="showInfo3">点我</button>
</div>

<!-- 事件只触发一次(常用)-->
<button @click.once="showInfo4">点我</button>

<!-- 使用事件的捕获模式 捕获阶段触发，可以消除冒泡-->
<div class="box1" @click.capture="showInfo5"> div1
    <div class="box2" @click="showInfo1">div2</div>
</div>

<!-- 只有event.target是当前操作的元素时才触发事件  也可以阻止冒泡-->
<div class="box1" @click.self="showInfo1"> div1
    <div class="box2" @click="showInfo2">div2</div>
</div>


el:"#app",
data:{
},
methods:{
    showInfo1(){
    	alert("1")
    },
    showInfo2(){
    	alert("2")
    },
    showInfo3(){
    	alert("3")
    },
    showInfo4(){
    	alert("4")
    }
}
```

## 键盘事件

```vue
1.vue中常用的按健别名:
	回车=>enter
	删除=>delete(捕获“删除”和"退格”健)
	退出=>esc
	空格=>space
	换行=>tab 必须配合keydown使用
	上=> up
	下 =>down
	左=>left
	右=>right
2.Vue未提供别名的按健，可以使用按健原始的key值去绑定，但注意要转为kebab-case(短横线命名)
3.系统修饰键（用法特殊）:ctrl、alt、 shift、meta
	(1).配合keyup使用:按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
	(2).配合keydown使用:正常触发事件。
4.也可以使用keyCode去指定具体的按键（不推荐)
5.Vue. config.keyCodes.自定义键名=键码,可以去定制按健别名
<!-- 键盘事件 -->
<div class="keycode1">
    <input v-model="name" type="text" placeholder="按下回车提示输入" @keyup.enter="showkeycode1">
</div>
<!-- 组合键 -->
<div class="keycode2">
    <input type="text" @keyup.ctrl.y="showkeycode1">
</div>
data:{
name:"sss"
},
methods:{
	showkeycode1(){
		alert(this.name)
	}
}
```

## 计算属性

```vue
插值写法：
<body>
    <div id="app">
        姓：<input type="text" v-model="firstName"><br>
        名：<input type="text" v-model="lastName"><br>
        <!-- slice截取 -->
        姓名：<span>{{firstName.slice(0,3)+lastName}}</span>
    </div>
</body>
<script>
    new Vue({
        el:"#app",
        data:{
            firstName:'张',
            lastName:'三'
        }
    })
</script>
methods写法
<body>
    <div id="app">
        姓：<input type="text" v-model="firstName"><br>
        名：<input type="text" v-model="lastName"><br>
        姓名：<span>{{fullName()}}</span>
    </div>
</body>
<script>
    new Vue({
        el:"#app",
        data:{
            firstName:'张',
            lastName:'三'
        },methods:{
            fullName(){
                return this.firstName + this.lastName
            }
        }
    })
</script>
计算属性写法
<body>
    <div id="app">
        姓：<input type="text" v-model="firstName"><br>
        名：<input type="text" v-model="lastName"><br>
        姓名：<span>{{fullName}}</span>
    </div>
</body>
<script>
    const vm = new Vue({
        el:"#app",
        data:{
            firstName:'张',
            lastName:'三'
        },methods:{
            fullName1(){
                return this.firstName + this.lastName
            }
        },computed:{
            // get有什么作用?当有人读取fullName时.get就会被调用，且返回值就作为fullName的值
            fullName:{
                //get什么时候调用?1.初次读取fullName时。2.所依赖的数据发生变化时。
                get(){
                    console.log("get被调用")
                    return this.firstName+this.lastName
                },
                //当fullName被修改时
                set(value){
                    const arr = value.split('-')
                    this.firstName=arr[0];
                    this.lastName=arr[1];
                }
            }
            //简写前提，只读不改
            fullName(){
                return this.firstName+this.lastName
            }
        }

    })
</script>
```

计算属性是不能开启异步任务的如定时器

## 监视属性

```vue
<body>
    <div id="app2">
        <h2>今天天气很{{info}}</h2>
        <button @click="changeWeather(isHost)">点击切换天气</button>
    </div>
</body>
<script>
    const vm = new Vue({
        el:'#app2',
        data:{
            isHost:true,
            bumbers:{
                a:1,
                b:2
            }
        },
        methods: {
            changeWeather(isHost){
                this.isHost = !isHost
            }
        },
        computed:{
            info(){
                return this.isHost? "炎热":"寒冷"
            }
        },
        //(1).vue中的watch默认不监测对象内部值的改变(一层）。
        //(2).配置deep:true可以监测对象内部值改变（多层）。备注:
            //(1).Vue自身可以监测对象内部值的改变，但Vue提供的watch默认不可以!
            //(2).使用watch时根据数据的具体结构,决定是否采用深度监视。
        watch:{
            // isHost:{
            //     //对一个属性进行监测，当改变到一定的值后，执行后续操作
            //     immediate:true,//初始化时让handler调用一下
            //     handler(newValue,oldValue){
            //         console.log('ishostb被修改',newValue,oldValue)
            //     }
            // },
            info:{
                //对一个属性进行监测，当改变到一定的值后，执行后续操作
                immediate:true,//初始化时让handler调用一下
                handler(newValue,oldValue){
                    console.log('info被修改',newValue,oldValue)
                }
            },
            //深度监视
            //监视多级结构的某个属性变化 
            'bumbers.a':{
                handler(){
                    console.log("a被改变了")
                }
            },
            bumbers:{
                handler(){
                    deep:true,//深度监视开启，监视所有属性的变化
                    console.log("bumbers改变了")
                }
            },
            //简写
            //前提是没有别的配置项，如immediate deep
            info1(newValue,oldValue){
                console.log('info被修改',newValue,oldValue)
            },
        }   
    })
    //在vm之外的
    vm.$watch('isHost',{
        //对一个属性进行监测，当改变到一定的值后，执行后续操作
        immediate:true,//初始化时让handler调用一下
                handler(newValue,oldValue){
                    console.log('ishostb被修改',newValue,oldValue)
                }
    })
    //简写
    vm.$watch('isHost',function(newValue,oldValue){
        console.log('ishostb被修改',newValue,oldValue)
    })
```

监视属性和计算属性的区别

```vue
<body>
    <div id="app">
        姓：<input type="text" v-model="firstName"><br>
        名：<input type="text" v-model="lastName"><br>
        姓名：<span>{{fullName}}</span>
    </div>
</body>
<script>
    const vm = new Vue({
        el:"#app",
        data:{
            firstName:'张',
            lastName:'三',
            fullName:''
        },methods:{
           
        },
        watch:{
            firstName(newValue){
                setTimeout(() => {
                    this.fullName = newValue + this.lastName  
                }, 1000);
            },
            lastName(newValue){
                this.fullName = this.firstName+newValue
            }

        }
        /**computed和watch之间的区别:
        1.computed能完成的功能,watch都可以完成。
        2.watch能完成的功能，computed不一定能完成，例如: watch可以进行异步操作。两个重要的小原则:
            1.所被Vue管理的函数，最好写成普通函数，这样this的指向才是vm或组件实例对象。
            2.所有不被Vue所管理的函数（定时器的回调函数、ajax的回调函数等），最好写成箭头函数，这样this的指向才是vm或组件实例对象。
        **/
    })
</script>
```

## 绑定样式

```vue
<head>
    <style>
        .div1{
            width: 100px;
            height: 100px;
            color: rebeccapurple;
        }
        .div2{
            width: 100px;
            height: 100px;
        }
        .div3{
            width: 100px;
            height: 100px;
        }
        .redColor{
            background-color: red;
        }
        .greenColor{
            background-color: green;
        }
        .pinkColor{
            background-color: pink;
        }
    </style>
</head>
<body>
    <div id="class1">
        <!-- 绑定class样式--字符串写法--适用于样式的类名不确定，需要动态绑定 -->
        <div class="div1" :class="div1Class" @click="changeColor">div1</div>
        <br>
        <!-- 绑定class样式--数组写法--适用于样式的个数不确定，名字不确定 -->
        <div class="div2" :class="div2Class">div2</div>
        <br>
        <!-- 绑定class样式--对象写法--适用于样式个数确定，名字确定，但是动态决定用不用 -->
        <div class="div3" :class="div3Class">div3</div>
        <br>
        <!-- 绑定class样式--数组写法-->
        <div class="div3" :style="{fontSize:fintSize+'px'}">div4</div>
        <br>
        <div class="div3" :style="{div5}">div5</div>
        <br>
        <div class="div3" :style="[div5,div5_1]">div6</div>
    </div>
</body>

<script>
    const vm = new Vue({
        el:'#class1',
        data:{
            div1Class:'normal',
            div2Class:["redColor","greenColor","pinkColor"],
            div3Class:{
                greenColor:false,
                redColor:true
            },
            div5:{
                fintSize:20,
                color:'green',
            },
            div5_1:{
                backgroundColor:'red'
            }
        },
        methods: {
            changeDiv1Color(){
                const styleArr = ["redColor","greenColor","pinkColor"]
                let i = Math.floor(Math.random()*3)
                this.redColor = styleArr[i]
            },
            changeDiv1Color(){
                const styleArr = ["redColor","greenColor","pinkColor"]
                let i = Math.floor(Math.random()*3)
                this.redColor = styleArr[i]
            }
        }
    })
</script>
```

## 条件渲染

```vue
<body>
    <div id="tiaojian">
        <!-- v-show  相当于 display=none -->
        <!-- 频率变化高的 最好用v-show -->
        <div v-show="isShow">v-show</div> 
        <div v-if="isShow">v-if</div>
        <div v-if="1===1">1===1</div>
        <br>
        <button @click="changeValue(isShow)">点击显示</button>
        <br>
        <!-- v-if v-else-if v-else 要挨在一起  v-else里面不用写条件，写了也没用 -->
        <div>{{num}}</div>
        <div v-if="num===4">num到达4</div>
        <div v-else-if="num===5">num到达5</div>
        <div v-else>num到达？</div>
        <br>
        <button @click="numAdd()">点击+1</button>

        <!-- v-if与template的配合使用 template不能和v-show一起使用-->
        <template v-if="num===1">
            <h1>h1</h1>
            <h1>h2</h1>
            <h1>h3</h1>
        </template>
    </div>
</body>
<script>
    const vm = new Vue({
        el:"#tiaojian",
        data:{
            isShow:true,
            num:0
        },methods: {
            changeValue(val){
                this.isShow = !val
            },
            numAdd(){
                this.num=this.num+=1
            }
        }
    })
</script>
```

## 列表渲染

```vue
<body>
    <div id="list1">
        <!-- 遍历数组 -->
        <ul>
            <li v-for="(p,index) in person" :key="index">{{p.id}}-{{p.name}}-{{p.age}}</li>
        </ul>
        <!-- 遍历对象 -->
        <ul>
            <li v-for="(car,index) of carInfo" :key="index">
                {{car}}----{{index}}
            </li>
        </ul>
        <!-- 遍历字符串 -->
        <ul>
            <li v-for="(str,index) in helloStr" :key="index">
                {{str}}----{{index}}
            </li>
        </ul>
        <!-- 遍历指定次数 -->
        <ul>
            <li v-for="(num,index) in 5" :key="index">
                {{num}}----{{index}}
            </li>
        </ul>
    </div>
</body>
<script>
    const vm = new Vue({
        el:"#list1",
        data:{
            person:[
                {id:'001',name:'张三',age:17},
                {id:'002',name:'李四',age:12},
                {id:'003',name:'王五',age:17}
            ],
            carInfo:{
                name:'audi',
                price:'123',
                coler:"red"
            },
            helloStr:'helloStr'
        },methods: {
        }
    })
</script>
```

### 列表渲染--key原理

```vue
<body>
    <div id="list1">
        <!-- 遍历数组 -->
        <ul>
            <li v-for="(p,index) in persons" :key="index">
                {{p.id}}-{{p.name}}-{{p.age}} <input type="text">
            </li>
        </ul>
        <br>
        <button @click="add">添加人员</button>
    </div>
</body>
<script>
    const vm = new Vue({
        el:"#list1",
        data:{
            persons:[
                {id:'001',name:'张三',age:17},
                {id:'002',name:'李四',age:16},
                {id:'003',name:'王五',age:15}
            ]
        },methods: {
            add(){
                const p = {id:'004',name:'刘六',age:40}
                this.persons.unshift(p)//头部追加---会出问题
                //this.persons.push(p)//尾部追加---不会出问题
                
                /**
                1.虚拟DOM中key的作用:
                    key是虚拟DOM对象的标识，当状态中的数据发生变化时，Vue会根据[新数据]生成[新的虚拟DOM]
                    随后Vue进行[新虚拟DOM] 与[旧虚拟DOM] 的差异比较，比较规则如下:
                2.对比规则:
                    (1).旧虚拟DOM中找到了与新虚拟DOM相同的key:
                        @.若虚拟DOM中内容没变，直接使用之前的真实DOM!
                        @.若虚拟DOM中内容变了，则生成新的真实DOM，随后替换掉页面中之前的真实DOM。
                    (2).旧虚拟DOM中未找到与新虚拟DOM相同的key
                        创建新的真实DOM，随后渲染到到页面
                3.用index作为key可能会引发的问题:
                    1.若对数据进行:逆序添加、逆序删除等破坏顺序操作:
                        会产生没有必要的真实DOM更新 ==> 界面效果没问题，但效率低.
                    2.如果结构中还包含输入类的DOM:
                        会产生错误DOM更新 ==> 界面有问题。
                4，开发中如何选择key?:
                    1.最好使用每条数据的唯一标识作为key，比如id、于机号、身份证号、学号等唯一值.
                    2.如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示,
                        使用index作为key是没有问题的.
                **/
            }
        }
    })
</script>
```

以index为key的话上述代码会出现一种情况，输入信息的情况下，输入框中的东西会错位

![](C:\Users\muxihongQAQ\Desktop\vueStudy\笔记\imgs\微信截图_20230421010518.png)

![](C:\Users\muxihongQAQ\Desktop\vueStudy\笔记\imgs\微信截图_20230421010432.png)

原因：

![](C:\Users\muxihongQAQ\Desktop\vueStudy\笔记\imgs\微信截图_20230421010726.png)

如果以id作为key

![](C:\Users\muxihongQAQ\Desktop\vueStudy\笔记\imgs\微信截图_20230421010850.png)

## 列表过滤

```vue
<body>
    <div id="list2">
        <h2>人员列表</h2>
        <input type="text" placeholder="请输入名字" v-model="keyword">
        <!-- 遍历数组 -->
        <ul>
            <li v-for="(p,index) in filters" :key="index">{{p.id}}-{{p.name}}-{{p.age}}</li>
        </ul>
    </div>
</body>
<script>
    //用watch实现
    /**
    const vm = new Vue({
        el:"#list2",
        data:{
            keyword:"",
            persons:[
                {id:'001',name:'马冬梅',age:17,sex:"女"},
                {id:'002',name:'周冬雨',age:12,sex:"女"},
                {id:'003',name:'周杰伦',age:17,sex:"男"},
                {id:'003',name:'马天宇',age:17,sex:"男"}
            ],
            filters:[]
        },methods: {
            
        },
        watch:{
            keyword:{
                immediate:true,
                handler(val){
                    this.filters = this.persons.filter((p)=>{
                    return p.name.indexOf(val)!==-1;
                })
                }
            }
        }
        
    })
    **/
    const vm = new Vue({
        el:"#list2",
        data:{
            keyword:"",
            persons:[
                {id:'001',name:'马冬梅',age:17,sex:"女"},
                {id:'002',name:'周冬雨',age:12,sex:"女"},
                {id:'003',name:'周杰伦',age:17,sex:"男"},
                {id:'003',name:'马天宇',age:17,sex:"男"}
            ]
        },methods: {
            
        },computed:{
            filters(){
                return this.persons.filter((p)=>{
                    return p.name.indexOf(this.keyword)!==-1;
                })
            }
        }
        
    })
</script>
```

plus版

```vue
<body>
    <div id="list2">
        <h2>人员列表</h2>
        <input type="text" placeholder="请输入名字" v-model="keyword">
        <button @click="sortType = 2">年龄降序</button>
        <button @click="sortType = 1">年龄升序</button>
        <button @click="sortType = 0">原顺序</button>
        <!-- 遍历数组 -->
        <ul>
            <li v-for="(p,index) in filters" :key="p.id">{{p.id}}-{{p.name}}-{{p.age}}</li>
        </ul>
    </div>
</body>
<script>
    const vm = new Vue({
        el:"#list2",
        data:{
            keyword:"",
            sortType:0,//0-原顺序  1-降序  2-升序
            persons:[
                {id:'001',name:'马冬梅',age:30,sex:"女"},
                {id:'002',name:'周冬雨',age:12,sex:"女"},
                {id:'003',name:'周杰伦',age:15,sex:"男"},
                {id:'003',name:'马天宇',age:22,sex:"男"}
            ]
        },methods: {
            
        },computed:{
            filters(){
                const arr = this.persons.filter((p)=>{
                    return p.name.indexOf(this.keyword)!==-1;
                })
                //判断是否需要排序
                if(this.sortType){
                    arr.sort((p1,p2)=>{
                        return this.sortType === 1 ? p2.age-p1.age:p1.age-p2.age
                    })
                }
                return arr;
            }
        }
        
    })
</script>
```

## vue如何监测

```vue
<body>
    <div id="list4">
        <!-- 
            vue监视数据的原理:
                1. vue会监视data中所有层次的数据
                2．如何监测对象中的数据?
                    通过setter实现监视,且要在new Vue时就传入要监测的数据。
                    (1).对象中后追加的属性,Vue默认不做响应式处理
                    (2).如需给后添加的属性做响应式,请使用如下API:
                        vm.$set(target.propertyName/index. value) 或
                        vm.set(target.propertyName/index. value)
                3.如何监测数组中的数据?
                    通过包裹数组更新元素的方法实现,本质就是做了两件事:
                        (1).调用原生对应的方法对数组进行更新。
                        (2).重新解析模板,进而更新页面。
                4.在Vue修改数组中的某个元素一定要用如下方法:
                    1.使用这些API:push()、pop()、shift()、unshift()、splice().sort()、reverse()
                    2.vue.set()或vm.$set()
                特别注意:Vue.set()和 vm.$set(）不能给vm或 vm的根数据对象添加属性!! !
         -->

        <h1>学生信息</h1>
        <button @click="student.age++">年龄+1</button><br>
        <button @click="addSex">添加性别属性，默认男</button><br>
        <button @click="student.sex='女'">修改性别</button><br>
        <button @click="addFriend">在列表首位添加一个朋友</button><br>
        <button @click="updateFirstFriend">修改第一个朋友的姓名</button><br>
        <button @click="addHobby">添加一个爱好</button><br>
        <button @click="updateFirstHobby">修改第一个爱好为开车</button><br>
        <button @click="removeSmoke">删除抽烟爱好</button><br>
        <h3>学生姓名：{{student.name}}</h3>
        <h3>学生年龄：{{student.age}}</h3>
        <h3 v-if="student.sex">学生性别：{{student.sex}}</h3>
        <h3>学生爱好</h3>
        <ul>
            <li v-for="(h,index) in student.hobby" ::key="index">{{h}}</li>
        </ul>
        <h3>学生的朋友</h3>
        <ul>
            <li v-for="(friend,index) in student.friends" ::key="index">{{friend.name}}</li>
        </ul>
    </div>
</body>
 <script>
    const vm = new Vue({
        el:"#list4",
        data:{
            student:{
                name:'tom',
                age:18,
                hobby:['抽烟','喝酒','烫头'],
                friends:[
                    {name:'tom',age:19},
                    {name:'jay',age:34}
                ]
            }
        },
        methods: {
            addSex(){
                //Vue.set(this.student,'sex',"男")
                this.$set(this.student,'sex','男')
            },
            addFriend(){
                this.student.friends.unshift({name:'jack',age:11})
            },
            updateFirstFriend(){
                this.student.friends[0].name="张三"
            },
            addHobby(){
                this.student.hobby.push('学习')
            },
            updateFirstHobby(){
                //this.student.hobby.splice(0,1,'开车')
                //this.$set(this.student.hobby,0,'开车')
                Vue.set(this.student.hobby,0,'开车')
            },
            removeSmoke(){
                this.student.hobby = this.student.hobby.filter((h)=>{
                    return h!=='抽烟'
                })
            }

        }
    })
</script>
```

## v-model详解

```vue
<body>
    <div id="form">
        <form @submit.prevent="sumbit">
            <!-- 点击账号二字，也能获取焦点 -->
            <!-- <label for="demo1">账号：</label>
            <input type="text" id="demo1"> -->

            <!-- 
                收集表单数据:
                若:<input type="text"/>，则v-model收集的是value值，用户输入的就是value值。
                若:<input type="radio" />，则v-model收集的是value值，且要给标签配置value值.
                若:<input type="checkbox"/>
                    1.没有配置input的value属性。那么收集的就是checked（勾选or未勾选,是布尔值)
                    2.配置input的value属性:
                        (1)v-model的初始值是非数组，那么收集的就是checked（勾选or未勾选,是布尔值)
                        (2)v-model的初始值是数组,那么收集的的就是value组成的数组
                备注:v-model的三个修饰符:
                    lazy:失夫焦点再收集数据
                    number:输入字符串转为有效的数字
                    trim:输入首尾空格过滤
             -->

            账号：<input type="text" v-model="userInfo.account"><br>
            密码：<input type="password" v-model="userInfo.password"><br>
            <!-- v-model.number 只收集数字 -->
            年龄：<input type="number" v-model.number="userInfo.age"><br>
            性别：
            男<input type="radio" name="sex" v-model="userInfo.sex" value="man">
            女<input type="radio" name="sex" v-model="userInfo.sex" value="woman"> <br>
            爱好：
            学习<input type="checkbox" v-model="userInfo.hobby" value="学习">
            睡觉<input type="checkbox" v-model="userInfo.hobby" value="睡觉">
            吃饭<input type="checkbox" v-model="userInfo.hobby" value="吃饭"><br>
            所属校区
            <select v-model="userInfo.city">
                <option value="">请选择校区</option>
                <option value="beijing">北京</option>
                <option value="shanghai">上海</option>
                <option value="wuhan">武汉</option>
                <option value="guiyang">贵阳</option>
            </select><br>
            其他信息
            <!-- v-model.lazy 失去焦点后收集 -->
            <textarea v-model.lazy="userInfo.otherInfo"></textarea><br>
            <input type="checkbox" v-model="userInfo.agree">阅读并接受 <a href="http://www.baidu.com">《用户协议》</a><br>
            <button >提交</button>
        </form>
    </div>
</body>
<script>
    const vm = new Vue({
        el:'#form',
        data:{
            userInfo:{
                account:'',
                password:'',
                age:'',
                sex:'man',
                hobby:[],
                city:'beijing',
                otherInfo:"",
                agree:''
            }
        },
        methods: {
            sumbit(){
                console.log(JSON.stringify(this.userInfo))
            }
        }
    })
</script>
```

## 过滤器

```vue
    <script src="../js/vue.js"></script>
    <script src="../js/day.js"></script>
</head>
<body>
    <div id="filter1">
        <!-- 
            过滤器:
                定义:对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）。
                语法:
                1.注册过滤器:Vue.filter(name, callback)或new Vue{filters:{0}
                2.使用过滤器:{{ xxx│过滤器名}}或v-bind:属性=“xxx|过滤器名"
            备注:
                1.过滤器也可以接收额外参数、多个过滤器也可以串联
                2.并没有改变原本的教据,是产生新的对应的数据
         -->
        
        <h2>显示格式化后的时间</h2>
        <!-- 计算属性实现 -->
        <h3>现在是：{{formatTime}}</h3>
        <!-- methods实现 -->
        <h3>现在是：{{getFormatTime()}}</h3>
        <!-- 过滤器实现1 -->
        <h3>现在是：{{time | timeFormat}}</h3>
        <!-- 过滤器实现2 -->
        <h3>现在是：{{time | timeFormat2('YYYY/MM/DD HH:mm:ss')}}</h3>
        <!-- 过滤器实现3 过滤器串联 -->
        <h3>现在是：{{time | timeFormat2('YYYY/MM/DD HH:mm:ss') | mySlice}}</h3>
        <!-- 过滤器实现4  很罕见-->
        <h3 :x="url | mySlice">截取url</h3>
    </div>
</body>
<script>
    //全局过滤器
    Vue.filter('mySlice',function(val){
        return val.slice(0,4)
    })
    const vm = new Vue({
        el:'#filter1',
        data:{
            time:1682354981215,
            url:'www.baidu.com'
        },
        methods: {
           getFormatTime(){
                return dayjs(this.time).format("YYYY-MM-DD HH:mm:ss")
           }
        },
        computed:{
            formatTime(){
                return dayjs(this.time).format("YYYY-MM-DD HH:mm:ss")
            }
        },
        //局部过滤器
        filters:{
            // 过滤器的第一个参数永远是管道符前面的参数
            timeFormat(val){
                return dayjs(val).format("YYYY-MM-DD HH:mm:ss")
            },
            timeFormat2(val,formatStr){
                return dayjs(val).format(formatStr)
            },
            mySlice(value){
                return value.slice(0,4)
            }
        }
    })
</script>
```

## 内置指令

```vue
<head>
	<style>
        [v-cloak]{
            display: none;
        }
    </style>
</head>
<body>
    <!-- 
        我们学过的指令:
            v-bind-:单向绑定解析表达式,可简写为·:XXX
            v-model:双向数据绑定
            v-for:遍历数组/对象/字符串· 
            v-on:·绑定事件监听,可简写为@
            v-if:·条件渲染（动态控制节点是否存存在) 
            v-else:条件渲染(动态控制节点是否存存在)
            v-show:条件渲染(动态控制节点是否展示)
            v-text:向其节点中渲染文本内容 与插值语法的区别  v-text会替换掉节点中的内容，{{xx}}不会
            v-html:渲染HTML结构的内容 v-html会替换掉所有内容 注意：v-html可能会导致xss攻击
            v-cloak:本质是一个属性，vue实例创建完成并接管容器后，
                会删除v-cloak属性 使用[v-cloak]{display: none;}解决网速慢时的{{xx}}的问题
            v-once:所在节点在初次动态渲染后，视为静态内容，以后数据改变不会在更新
            v-pre:跳过所在节点的编译过程
     -->
    <div id="v_text">
        <!--  -->
        <span v-text="name"></span>
        <span v-html="name1"></span>
        <span v-cloak>{{name2}}</span>
        <span v-once>{{name3}}</span>
        <span v-pre>{{name3}}</span>
    </div>
       
</body>
<script>
    new Vue({
        el:"#v_text",
        data:{
            name:"111",
            name1:"<h3>111</h3>",
            name2:"222",
            name3:"333"
        }
    })
</script>
</html>
```

## 自定义指定

```vue
<body>
    <!-- 
        
     -->
    <div id="root">
        <!-- 需求1 定义一个v-big指令，其节点内容放大10倍 -->
        <h2 v-text="n"></h2><br>
        <h2 v-big="n"></h2><br>
        <!-- 需求2 定义一个v-fbing指令，和v-bind功能类似，但可以让其所绑定的input元素默认获取焦点 -->
        <input type="text" v-fbind:value="n">
    </div>
       
</body>
<script>
    new Vue({
        el:"#root",
        data:{
            n:11
        },
        directives:{
            // big函数什么时候会被调用：
                // 1.指令与元素成功绑定
                // 2.指令所在的模板被重新解析时。
            big(element,binding){
                //此处的this时只window
                element.innerText = binding.value*10
            },
            //完整写法
            // 'big':function(element,binding){
            //     element.innerText = binding.value*10
            // },
            fbind:{
                //指令与元素成功绑定时（一上来）
                bind(element,binding){
                    element.value = binding.value
                },
                //指令所在元素被插入页面时
                inserted(element,binding){
                    element.focus()//默认有焦点
                },
                //指令所在的模板被重新解析时
                update(element,binding){
                    element.value = binding.value
                    element.focus()//默认有焦点
                }
            }
        }
    })
</script>
</html>
```

分析生命周期

![img/QQ截图20230506001225.png](C:\Users\muxihongQAQ\Desktop\vueStudy\笔记\imgs\QQ截图20230506001225.png)

![](C:\Users\muxihongQAQ\Desktop\vueStudy\笔记\imgs\QQ截图20230506002835.png)

vm的一生(vm的生命周期)∶

​      将要创建===>调用beforeCreate国数。创建完毕===>调用created函数。

​      将要挂载===>调用beforeMount图数。

  (重要)  挂载完毕===>调用mounted函数。=============>【重要的钩子】

​      将要更新===>调用beforeUpdate函数。

​      更新完毕===>调用updated函数。

  (重要)  将要销毁===>调用beforeDestroy函数。========>【重要的钩子】

​      销毁完毕===>调用destroyed豳数。

```vue
<body>
    <!-- 
        常用的生命周期钩子:
            1.mounted:发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。
            2.beforeDestroy:清除定时器、解绑自定义事件、取消订阅消息等【收尼工作】。
        关于销毁Vue实例
            1.销毁后借助vue开发者工具看不到任何信息。
            2.销毁后自定义事件会失效,但原生DOM事件依然有效
            3.一般不会再beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了。
     -->


    <div id="life3">
        <h2 :style="{opacity:opacity}">111111111</h2>
        <button @click="opacity=1">透明度设置为1</button>
        <button @click="stop()">点我停止变换</button>
    </div>
    
</body>
<script>
    const vm = new Vue({
        el:"#life3",
        data:{
            opacity:1
        },
        methods: {
             stop(){
                // clearInterval(this.timer)
                this.$destroy()
             }  
        },
        mounted() {
            this.timer = setInterval(()=>{
                console.log('setInterval')
                this.opacity-=0.01
                if(this.opacity<=0){
                    this.opacity=1
                }
            },16)
        },
        //清除前
        beforeDestroy() {
            console.log("即将清除vm")
            clearInterval(this.timer)
        },
    })
</script>
</html>
```

## 组件

```vue
<body>
    <!-- 
        vue中使用组什的三大步骤:
            一、定义组件(创建组件)
            二、注册组件
            三、使用组件(写组件标签)
        一、如何定义一个组件?
            使用Vue. extend(options)创建，其中options和new Vue(options)时传入的那个options儿乎一·样，但也有点区别;
            区别如下:
                1.el不要写，为什么?—---最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。
                2.data必须写成函数。为什么?——避免组件被复用时，数据存在引用关系。
            备注:使用template可以配置组件结构
        二、如何注册组件?
            1.局部注册:靠new vue的时候传入components选项
            2.全局注册:靠vue.component( '组件名',组件)
        三、编写组件标签:
        <school></school>
     -->
    <div id="appComponents">
        <h1>{{msg}}</h1>
        <hr>
        <school></school>
        <hr>
        <student></student>
        <hr>
        <hello></hello>
    </div>
</body>
<script>
    //组件编写是一定不要编写el,因为所有组件最终都会被一个vm管理
    //创建school组件
    const school = Vue.extend({
        template:`
            <div id="appComponents">
                <h2>学校名称：{{schoolName}}</h2>
                <h2>学校地址：{{address}}</h2>
                <button @click="showSchoolName">点我提示学校名</button>
            </div>
        `,
        data() {
            return {
                schoolName:"红枫五小",
                address:"清镇"
            }
        },
        methods: {
            showSchoolName(){
                alert(this.schoolName)
            }
        },
    })
    //创建student组件
    const student = Vue.extend({
        template:`
            <div id="appComponents">
                <h2>学生名称：{{studentName}}</h2>
                <h2>学生年龄：{{studentAge}}</h2>
            </div>
        `,
        data() {
            return {
                studentName:"张三",
                studentAge:18
            }
        },
    })
    //创建hello组件
    const hello = Vue.extend({
        template:`
            <div id="appComponents">
                <h2>你好啊：{{studentName}}</h2>
            </div>
        `,
        data() {
            return {
                studentName:"张三"
            }
        },
    })
    //全局注册，全部的vm都能用
    Vue.component('hello',hello)
    //创建vm
    new Vue({
        el:'#appComponents',
        data:{
            msg:'hello'
        },
        components:{
            //注册组件(局部注册)
            school:school,
            student:student
            //简写
            //school,
            //student
        }
    })
</script>
```

## 组件命名注意点

```vue
<body>
    <!-- 
        几个注意点:
        1.关于组件名:
            一个单词组成:
                第一种写法(首字母小写):school
                第二利写法(首字母大写): School
            多个单词组成:
                第一种写法(kebab-case命名):my-school
                第二种写法(CamelCase命名):MySchool（需要Vue脚手架支持)
        备注:
        (1).组件名尽可能回避HTML中已有的元素名称,例如:h2、H2都不行。
        (2).可以使用name配置项指定组件在开发者工具中呈现的名字.

        2.关于组件标签:
            第一种写法:<school></school>第二种写法: <school/>
        备注:不用使用脚手架时,<schoo1/>会导致后续组件不能演染。

        3.一个简写方式:
        const school = Vue.extend(options）可简写为: const school = options
     -->
    <div id="appComponents">
        <h1>{{msg}}</h1>
        <hr>
        <my-school></my-school>
    </div>
</body>
<script>
    //组件编写是一定不要编写el,因为所有组件最终都会被一个vm管理
    //创建school组件
    const school = Vue.extend({
        template:`
            <div id="appComponents">
                <h2>学校名称：{{schoolName}}</h2>
                <h2>学校地址：{{address}}</h2>
                <button @click="showSchoolName">点我提示学校名</button>
            </div>
        `,
        data() {
            return {
                schoolName:"红枫五小",
                address:"清镇"
            }
        },
        methods: {
            showSchoolName(){
                alert(this.schoolName)
            }
        },
    })
    //创建vm
    new Vue({
        el:'#appComponents',
        data:{
            msg:'hello'
        },
        components:{
            //school
            //组件名有多个单词时
            'my-school':school
        }
    })
</script>
```

## 组件的嵌套

```vue
<body>
    <!-- 
        

     -->
    <div id="appComponents">
        <h1>{{msg}}</h1>
        <hr>
        <app></app>
    </div>
</body>
<script>
    //创建student组件
    const student = Vue.extend({
        template:`
            <div>
                <h2>学生名称：{{studentName}}</h2>
                <h2>学生年龄：{{studentAge}}</h2>
            </div>
        `,
        data() {
            return {
                studentName:"张三",
                studentAge:18
            }
        },
    })
    //创建hello组件
    const hello = Vue.extend({
        template:`
            <div id="appComponents">
                <h2>你好啊：{{studentName}}</h2>
            </div>
        `,
        data() {
            return {
                studentName:"张三"
            }
        },
    })
    //创建school组件
    const school = Vue.extend({
        template:`
            <div>
                <h2>学校名称：{{schoolName}}</h2>
                <h2>学校地址：{{address}}</h2>
                <student></student>
                <hello></hello>
                <button @click="showSchoolName">点我提示学校名</button>
            </div>
        `,
        data() {
            return {
                schoolName:"红枫五小",
                address:"清镇"
            }
        },
        methods: {
            showSchoolName(){
                alert(this.schoolName)
            }
        },
        components:{
            //局部注册
            student,
            hello
        }
    })
    //定义app组件
    const app = Vue.extend({
        template:`
            <div>
                <school></school>
                <student></student>
            </div>
        `,
        components:{
            school,
            student
        }
    })
    //创建vm
    new Vue({
        el:'#appComponents',
        data:{
            msg:'hello'
        },
        components:{
            //局部注册
            app
        }
    })
</script>
```

## components构造函数

```vue
<body>
    <!-- 
        关于VueComponent:
            1.school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的。

            2.我们只需要写<school/>或<school></school>，Vue解析时会帮我们创建school组件的实例对象，
                即vue帮我们执行的:new VueComponent(options)-
            
            3.特别注意:每次调用vue.extend，返回的都是一个全新的VueComponent! !!!
            
            4.关于this指向:
                (1).组件配置中:
                    data函数、methods中的函数、watch中的函数、computed中的函数它们的this均是【vueComponent实例对象】.
                (2).new vue()配置中:
                    data函数、methods中的函数、watch中的函数、computed中的函数它们的this均是【Vue实例对象】。
            5. VueComponent的实例对象，以后简称vc（也可称之为:组件实例对象）。
                vue的实例对象,以后简称vm。
     -->
    <div id="appComponents">
        <h1>{{msg}}</h1>
        <hr>
        <school></school>
        <hello></hello>
    </div>
</body>
<script>
    //创建school组件
    const school = Vue.extend({
        template:`
            <div>
                <h2>学校名称：{{schoolName}}</h2>
                <h2>学校地址：{{address}}</h2>
                <button @click="showSchoolName">点我提示学校名</button>
            </div>
        `,
        data() {
            return {
                schoolName:"红枫五小",
                address:"清镇"
            }
        },
        methods: {
            showSchoolName(){
                alert(this.schoolName)
            }
        }
    })
    //创建hello组件
    const hello = Vue.extend({
        template:`
            <div id="appComponents">
                <h2>你好啊：{{studentName}}</h2>
            </div>
        `,
        data() {
            return {
                studentName:"张三"
            }
        },
    })
    console.log('@',school)
    console.log('@',hello)
    console.log('@',hello===school)
    //创建vm
    new Vue({
        el:'#appComponents',
        data:{
            msg:'hello'
        },
        components:{
            //局部注册
            school,
            hello
        }
    })
</script>
```

组件的内置关系--没看

单文件组件

node.js配置

npm配置淘宝镜像

```
1、持久使用
npm config set registry https://registry.npm.taobao.org
// 配置后可通过下面方式来验证是否成功
npm config get registry
// 或
npm info express
3、通过cnpm使用
npm install -g cnpm --registry=https://registry.npm.taobao.org
// 使用
cnpm install express 
```

创建项目

cmd命令行输入

```tex
vue create my-project
```

![](C:\Users\muxihongQAQ\Desktop\vueStudy\笔记\imgs\11111.png)

创建完毕后，执行启动项目

```
 $ cd vue_test
 $ npm run serve
```

脚手架的文件结构

![](C:\Users\muxihongQAQ\Desktop\vueStudy\笔记\imgs\QQ截图20230508233236.png)

## 标签属性：ref

```vue
<template>
  <div>
    <!-- 
        #ref属性
            1.被用来给元素或子组件注册引用信息(id的替代者)
            2.应用在html标签上获取的是真实DO元素，应用在组件标签上是组件实例对象（vc)
            3.使用方式:
                打标识: <h1 ref="xxx">.....</h1>或<School ref="xxx"></School>获取: this.$refs.xxx
     -->
    <h1 v-text="msg" ref="title"></h1>
    <button @click="showDom" ref="btn">点我输出上方的Dom元素</button>
    <School ref="sch"></School>
  </div>
</template>

<script>
import School from './components/School'
export default {
    name:'App',
    components:{
        School
    },
    data() {
        return {
            msg:'welcome'
        }
    },
    methods: {
        showDom(){
            console.log(this.$refs.title)//真是的dom元素
            console.log(this.$refs.btn)//真是的dom元素
            console.log(this.$refs.sch)//School的实例对象
        }
    },
}
</script>
```

## porps属性

```vue
<template>
  <div>
    <Student name="李四" sex="女" age="18"></Student>
    <hr>
    <Student name="张三" sex="男" v-bind:age="20"></Student>
    <hr>
    <Student></Student>
  </div>
</template>


<template>
  <!-- 
    配置项props
      功能:让组件接收外部传过来的数据
      (1).传递数据:
          <Demo name=""xxx""/>
      (2).按收数据:
          第一种方式（只接收）∶props: [ "name "]
          第二种方式（限制类型):props:{name:Number}
          第三种方式(限制类型、限制必要性、指定默认值)∶
          props:{
            name:{
              type:String, 
              required:true //必填
            },
            age:{
              type:Number,
              default:99 //默认值
            },
            sex:{
              type:String,
              required:true
            }
          }
        备注: props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，
        若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。
   -->
  <div class="student">
    <h1>{{ msg }}</h1>
    <h2>学生姓名:{{ name }}</h2>
    <h2>学生性别:{{ sex }}</h2>
    <h2>学生年龄:{{ MyAge+1 }}</h2>
    <button @click="chanageVlue">尝试修改prop的值</button>
  </div>
</template>

<script>
export default {
    name:'Student',
    data() {
        return {
            // name:"Bob",
            // sex:'男',
            // age:18,
            msg:'i am student',
            MyAge:this.age
        }
    },
    methods: {
      chanageVlue(){
        //this.age = 100 //最好别改prop的值
        //如果要改在data中定义一个属性
        this.MyAge = 100
      }
    },
    props:['name','age','sex'] //简单接收

    //接收的同时对类型做限制
    // props:{
    //   name:String,
    //   sex:String,
    //   age:Number
    // }

    //接收的同时对类型进行限制，默认值的指定，必要性的限制
    // props:{
    //   name:{
    //     type:String, 
    //     required:true //必填
    //   },
    //   age:{
    //     type:Number,
    //     default:99 //默认值
    //   },
    //   sex:{
    //     type:String,
    //     required:true
    //   }
    // }
}
</script> 
```

## mixin混入

两个或多个共享一个配置

```vue
mixin.js
export const mixin = {
    methods: {
        showName(){
            alert(this.name)
        }   
    },
    mounted() {
        console.log("你好")
    }
}
export const mixin2 = {
    data() {
        return {
            x:100,
            y:100
        }
    },
}


<div class="student">
    <!-- 
      功能:可以把说个组件共用的配置提取成一个混入对象使用方式:
        第一步定义混合。例如:
        {data(){}，methods:{}}
        第二步使用混入。例如:
        (1)-全局混入: Vue.mixin(xxx)
        (2)-局部混入:mixins: [ " xxx"]
     -->


    <h2>老师姓名:{{ name }}</h2>
    <h2>学生性别:{{ sex }}</h2>
    <h2>学生年龄:{{ age }}</h2>
    <button @click="showName">提示名字</button>
  </div>
</template>

<script>
import {mixin,mixin2} from '../mixin'
export default {
    name:'Teacher',
    data() {
        return {
            name:"Bob",
            sex:'男',
            age:18
        }
    },
    mixins:[mixin,mixin2] 
}
</script> 
```

## 插件

```
功能:用于增强Vue
本质:包含instal方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据-
定义插件:
对象.install = function (vue，options) {111。添加全局过滤器
vue.filter(... .)
112添加全局指令Vue.directive(....)1/ 3.配置全局混入(合)Vue.mixin(....)
1/4。添加实例方法
Vue.prototype.$myMethod = function O i.-)vue.prototype.$myProperty = xXXX
}
使用插件:Vue.use(）

```

## scoped样式

```
<template>
  <div class="student">
    <h2>学生姓名:{{ name }}</h2>
    <h2>学生性别:{{ sex }}</h2>
    <h2>学生年龄:{{ age }}</h2>
  </div>
</template>

<script>
export default {
    name:'Student2',
    data() {
        return {
            name:"Bob",
            sex:'男',
            age:18
        }
    }
}
</script> 

<style scoped lang="css">  //scoped 局部生效
  .student{
      background-color: azure;
  }
</style>
```

## 浏览器本地存储

### localStorage

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>localStorage</title>
</head>
<body>
    <h2>localStorage</h2>
    <button onclick="saveData()">点我保存一个数据</button>
    <button onclick="readData()">点我读取一个数据</button>
    <button onclick="removeData()">点我删除一个数据</button>
    <script>
        let p={
            name:'www',
            age:18
        }
        function saveData(){
            window.localStorage.setItem("msg",'hello')
            window.localStorage.setItem("object",JSON.stringify(p))
        }
        function readData(){
            var item = window.localStorage.getItem("msg");
            console.log(item)
            //如果没有值的话，读出来是null
        }
        function removeData(){
            //根据key删除
            window.localStorage.removeItem("msg")
            //全删
            window.localStorage.clear()
        }
    </script>
</body>
</html>
```

### sessionStorage

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SessionStorage</title>
</head>
<body>
<h2>sessionStorage</h2>
<button onclick="saveData()">点我保存一个数据</button>
<button onclick="readData()">点我读取一个数据</button>
<button onclick="removeData()">点我删除一个数据</button>
<script>
  let p={
    name:'www',
    age:18
  }
  function saveData(){
    window.sessionStorage.setItem("msg",'hello')
    window.sessionStorage.setItem("object",JSON.stringify(p))
  }
  function readData(){
    var item = window.sessionStorage.getItem("msg");
    console.log(item)
    //如果没有值的话，读出来是null
  }
  function removeData(){
    //根据key删除
    window.sessionStorage.removeItem("msg")
    //全删
    window.sessionStorage.clear()
  }
</script>
</body>
</html>
```

## 自定义事件



## 事件总线

1. 一种组件间通信的方式，适用于任意组件间通信。

2. 安装全局事件总线：

   ```js
   new Vue({
   	......
   	beforeCreate() {
   		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
   	},
       ......
   }) 
   ```

3. 使用事件总线：

   1. 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件自身。

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.$bus.$on('xxxx',this.demo)
      }
      ```

   2. 提供数据：`this.$bus.$emit('xxxx',数据)`

4. 最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件。

## 消息订阅与发布

1. 一种组件间通信的方式，适用于任意组件间通信。

2. 使用步骤：

   1. 安装pubsub：`npm i pubsub-js`

   2. 引入: `import pubsub from 'pubsub-js'`

   3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身。

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
      }
      ```

   4. 提供数据：`pubsub.publish('xxx',数据)`

   5. 最好在beforeDestroy钩子中，用`PubSub.unsubscribe(pid)`去取消订阅。

## nextTick

1. 语法：`this.$nextTick(回调函数)`
2. 作用：在下一次 DOM 更新结束后执行其指定的回调。
3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。

## 动画效果

略过

## 代理

案例：github用户搜索案例

## 插槽

1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 **父组件 ===> 子组件** 。
2. 分类：默认插槽、具名插槽、作用域插槽

1. 使用方式：

   1. 默认插槽：

      ```vue
      父组件中：
              <Category>
                 <div>html结构1</div>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot>插槽默认内容...</slot>
                  </div>
              </template>
      ```

   2. 具名插槽：

      ```vue
      父组件中：
              <Category>
                  <template slot="center">
                    <div>html结构1</div>
                  </template>
      
                  <template v-slot:footer>
                     <div>html结构2</div>
                  </template>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot name="center">插槽默认内容...</slot>
                     <slot name="footer">插槽默认内容...</slot>
                  </div>
              </template>
      ```

   3. 作用域插槽：

      1. 理解：数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。（games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定）

      2. 具体编码：

         ```vue
         父组件中：
         		<Category>
         			<template scope="scopeData">
         				<!-- 生成的是ul列表 -->
         				<ul>
         					<li v-for="g in scopeData.games" :key="g">{{g}}</li>
         				</ul>
         			</template>
         		</Category>
         
         		<Category>
         			<template slot-scope="scopeData">
         				<!-- 生成的是h4标题 -->
         				<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
         			</template>
         		</Category>
         子组件中：
                 <template>
                     <div>
                         <slot :games="games"></slot>
                     </div>
                 </template>
         		
                 <script>
                     export default {
                         name:'Category',
                         props:['title'],
                         //数据在子组件自身
                         data() {
                             return {
                                 games:['红色警戒','穿越火线','劲舞团','超级玛丽']
                             }
                         },
                     }
                 </script>
         ```

   

## vuex

VUE2中得使用vuex3

import *Vuex* from 'vuex'

*Vue*.use(*Vuex*)



