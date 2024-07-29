<template>
  <Tip>最后更新 - 2024.07.29</Tip>
  <Title>#路由</Title>
  <Refer :source="[
    { desc: '官方文档', url: 'https://reactrouter.com/en/main' },
    { desc: '官方中文文档', url: 'https://baimingxuan.github.io/react-router6-doc/' },
  ]"></Refer>
  <Text>React 的路由功能需要借助`react-router-dom`这个库（本文以 6 版本为基准）</Text>
  <Code>{{`
    ---bash(安装)
      npm install react-router-dom
    ---
  `}}</Code>
  <Line></Line>

  <Title>##搭建路由</Title>
  <Title>###路由方式</Title>
  <Text>在 react router 中提供了两种不同的路由器：`BrowserRouter`和`HashRouter`来管理单页面应用的路由，一般选前者</Text>
  <Table>
    #路由特点
    |特性|BrowserRouter|HashRouter|
    ------------------
    |URL 结构|干净的 URL，如 `/about`|哈希 URL，如 `/#/about`|
    |路由管理方式|使用 HTML5 History API|使用 URL 哈希部分|
    |服务器配置|需要将所有请求重新向到`index.html`|不需要服务器配置|
    |SEO 友好|是|否|
    |使用场景|现代 Web 应用，需要干净 URL 和 SEO 优化|静态文件服务器，旧浏览器支持，快速开发测试|
  </Table>
  <Line></Line>

  <Title>###定义路由</Title>
  <Text>在以前版本中，使用`Router`组件的方式去声明项目路由，在 6.4 及以上版本中，引入了新的数据层和路由创建方式，即`createBrowserRouter`和`createHashRouter`</Text>
  <Table>
    #定义路由方式
    |特性|BrowserRouter 组件|createBrowserRouter|
    ------------------
    |路由定义方式|使用组件直接定义|使用函数创建路由对象|
    |数据加载和动作|不支持内置的数据加载器和动作|支持内置的数据加载器和动作|
    |适用场景|简单、快速开发|复杂、高级路由配置|
    |配置方式|声明式组件配置|更为灵活的对象和函数配置|
    |路由配置灵活性|较少|更高|
  </Table>
  <Code>{{`
    ---tsx(组件方式)
      import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'  

      const Home = () => <div>Home</div>  
      const About = () => <div>About</div>  
      const Users = () => <div>Users</div>  

      function App() {  
        return (  
          <Router>  
            <Routes>  
              <Route path="/" element={<Home />} />  
              <Route path="/about" element={<About />} />  
              <Route path="/users" element={<Users />} />  
            </Routes>  
          </Router>  
        ) 
      }  
    ---
    ---tsx(函数方式)
        import { createBrowserRouter, RouterProvider } from 'react-router-dom'   

        const Home = () => <div>Home</div>  
        const About = () => <div>About</div>  
        const Users = () => <div>Users</div>   

        const router = createBrowserRouter([  
          { path: "/", element: <Home /> },  
          { path: "/about", element: <About />},  
          { path: "/users", element: <Users />} 
        ])   

        function App() {  
          return (  
            <RouterProvider router={router}></RouterProvider>
          )   
        }  
    ---
  `}}</Code>
  <Line></Line>
  
  <Title>###嵌套路由</Title>
  <Text>为了实现深层子路由，需要将路由嵌套，有两种实现方式：</Text>
  <List>在父组件中再次嵌套`Routes`结构，然后匹配路径设置为匹配父路径及任意子路径（仅组件式使用）</List>
  <List>在父组件中使用`Outlet`声明这部分内容将用子路由组件填充，然后在结构上体现父子路由关系</List>
  <Code>{{`
    ---tsx(嵌套Routes)
      import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'  

      const About = () => <div>About</div>  
      const Users = () => <div>Users</div>  
      const Home = () => {
        return (
          <>
            <div>Home</div>
            <Routes>
              <Route path="about" element={<About />} />
              <Route path="users" element={<Users />} />
            </Routes>
          </>
        )
      }

      function App() {  
        return (  
          <Router>  
            <Routes> 
              {/* 这里必须要显式设置匹配/home及后续任意路由 */}
              <Route path="/home/*" element={<Home />} />
            </Routes>
          </Router>  
        ) 
      }
    ---
    ---tsx(Outlet 组件式)
        import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'  

        const About = () => <div>About</div>  
        const Users = () => <div>Users</div>  
        const Home = () => {
          return (
            <>
              <div>Home</div>
              <Outlet />
            </>
          )
        }

        function App() {  
          return (  
            <Router>  
              <Routes>  
                <Route path="/home" element={<Home />}>
                  <Route path="about" element={<About />} />
                  <Route path="users" element={<Users />} />
                </Route> 
              </Routes>  
            </Router>  
          ) 
        }
    ---
    ---tsx(Outlet 函数式)
      import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'   

      const About = () => <div>About</div>  
      const Users = () => <div>Users</div>   
      const Home = () => {
        return (
          <>
            <div>Home</div>
            <Outlet />
          </>
        )
      }

      const router = createBrowserRouter([  
        { 
          path: "/home", 
          element: <Home />,
          children: [
            { path: 'about', element: <About /> },
            { path: 'users', element: <Users /> }
          ]
        }
      ])   

      function App() {  
        return (  
          <RouterProvider router={router} />
        )   
      }  
    ---
  
  `}}</Code>
  <Line></Line>

  <Title>###动态路由</Title>
  <Text>动态路由可以令一套组件匹配多个路径</Text>
  <List>在`path`属性中以`:`来表示动态参数，它相当于一个路径占位符，可以多个同时使用</List>
  <List>使用`useParams`来获取参数</List>
  
  <Code>{{`
    ---tsx(动态路由)
      import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom'   

      const User = () => {  
        const { id } = useParams()  
        return <h2>User ID: {id}</h2>  
      }  

      const router = createBrowserRouter([  
        // 可同时匹配/user/123 /user/789 ...
        { path: "/user/:id", element: <User /> }
      ])   

      function App() {  
        return (  
          <RouterProvider router={router} />
        )   
      }
    ---
    ---tsx(动态片段)
      import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom'   

      const User = () => {  
        const { id, name } = useParams()  
        return <h2>User ID: {id} User Name: { name }</h2>  
      }  

      const router = createBrowserRouter([  
        // 可匹配如 /user/id/123/name/jack
        { path: "/user/id/:id/name/:name", element: <User /> }
      ])   

      function App() {  
        return (  
          <RouterProvider router={router} />
        )   
      }

    ---
  `}}</Code>
  <Line></Line>
  
  <Title>###路由匹配</Title>
  <Text>路由路径匹配机制是基于路径模式的，它决定了如何将 URL 映射到特定的组件，6 版本中所有的路由匹配都默认是精确匹配，即需要路径完全相同</Text>
  <Text>匹配组件按照路径的特定优先级进行：</Text>
  <List>静态路径：如`/about`，优先级最高</List>
  <List>动态参数：如`/user/:id`，优先级次之</List>
  <List>通配符：如`*`，优先级最低，通常用于 404 页面</List>
  <Code>{{`
    ---tsx(优先度)
      // 路径/teams/new同时满足两个匹配路径，静态路径优先级高，因此匹配的是第二个组件
      <Route path="/teams/:teamId" />
      <Route path="/teams/new" />
    ---
    ---tsx(综合小例子)
      import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'  

      const Home = () => <h2>Home</h2>  
      const About = () => <h2>About</h2>  
      const Users = () => <h2>Users</h2>  
      const NotFound = () => <h2>404 Not Found</h2>  
      const User = () => {  
        const { id } = useParams()  
        return <h2>User ID: {id}</h2>  
      }  

      const App = () => (  
        <Router>  
          <Routes>  
            <Route path="/" element={<Home />} />  
            <Route path="/about" element={<About />} />  
            <Route path="/users" element={<Users />}>  
              <Route path=":id" element={<User />} />  
            </Route>  
            <Route path="*" element={<NotFound />} />  
          </Routes>  
        </Router>  
      )  
    ---
  
  `}}</Code>
  <Line></Line>

  <Title>##路由行为</Title>
  <Title>###加载控制</Title>
  <Text>
    函数式声明方式支持数据加载器[loader](https://baimingxuan.github.io/react-router6-doc/route/loader)和动作[action](https://baimingxuan.github.io/react-router6-doc/route/action)
    以此让路由不仅可以负责视图切换，还能处理数据获取和提交
  </Text>
  <Table>
    #Loader 和 Action
    |特性|Loader|Action|
    ------------------
    |时机|在路由匹配并渲染组件之前触发，即存在异步阻塞会一直阻塞组件渲染|用户提交表单或触发某个动作时触发|
    |用途|在路由渲染之前预先加载数据，通常用于获取数据而非修改数据|处理表单提交或其他用户触发的操作，通常用于提交和修改数据|
    |数据|函数返回数据后，在对应路由组件中使用`useLoaderData`获取数据|函数返回数据后，在对应路由组件中使用`useActionData`获取数据|
    |场景|1. 在页面渲染之前获取所需数据，如获取用户信息<br>2. 将数据获取逻辑从组件中移到路由中，使组件更加纯粹和易于测试<br>3. 预加载数据可以使得页面再首次渲染时就包含所有必要信息，有助于 SEO|1. 在路由中处理表单提交逻辑，如用户登录<br>2. 在路由中处理数据更新逻辑，如编辑用户信息<br>3. 将表单提交逻辑从组件中移到路由中，使组件更加纯粹和易于测试|
  </Table>
  <Code>{{`
    ---tsx(loader例子)
      import { createBrowserRouter, RouterProvider, useLoaderData } from 'react-router-dom'  

      const User = () => {  
        const data = useLoaderData()
        return <h2>{data.userInfo}</h2>  
      }  

      const router = createBrowserRouter([  
        {  
          path: "/user/:id",  
          element: <User />,  
          loader: async ({ params }) => {  
            // 模拟从服务器获取数据  
            const res = await fetch(\`/api/user?id=\${params.id}\`)
            return { userInfo: res }
          }  
        }
      ])  

      const App = () => (  
        <RouterProvider router={router} />  
      )  

    ---
    ---tsx(action例子)
      import { createBrowserRouter, RouterProvider, Form, useActionData } from 'react-router-dom'  

      const Contact = () => {  
        const actionData = useActionData() as any 
        return (  
          <>  
            <h2>Contact</h2>  
            <Form method="post">  
              <label>Name:<input type="text" name="name" /></label>  
              <button type="submit">Submit</button>  
            </Form>  
            {actionData && <p>{actionData.message}</p>}  
          </>  
        )  
      }  

      const router = createBrowserRouter([  
        {  
          path: "/contact",  
          element: <Contact />,  
          action: async ({ request }) => { 
            console.log(request) 
            const formData = await request.formData()  
            const name = formData.get("name")  
            // 模拟将数据提交到服务器  
            return { message: \`Hello, \${name}\` }  
          } 
        }
      ])  

      const App = () => (  
        <RouterProvider router={router} />  
      ) 
    ---
  `}}</Code>
  <Line></Line>

  <Title>###数据传递</Title>
  <Text>路由传递的方式有以下几种方式，可以根据不同的场合适当选取方案</Text>
  <Table>
    #数据传递
    |方案|URL 参数|Query 参数|State 参数|
    ------------------
    |特点|适用于简单的数据传递|可以传递多个键值对，适用于传递较多数据|数据不暴露在 URL 中，适合传递复杂或敏感数据|
    |优势|可以直接分享 URL 获取数据|可以直接分享 URL 获取数据|可以传递任意类型的数据|
    |限制|不适合传递复杂或敏感数据|不适合传递复杂或敏感数据|数据仅在浏览器会话期间有效，刷新页面后数据丢失|
  </Table>
  <Code>{{`
    ---tsx(url参数)
      import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'  

      const User = () => {  
        const { id } = useParams()  
        return <h2>User ID: {id}</h2>  
      }  

      const App = () => (  
        <Router>  
          <nav>  
            <Link to="/user/123">Go to User 123</Link>  
          </nav>  
          <Routes>  
            <Route path="/user/:id" element={<User />} />  
          </Routes>  
        </Router>  
      ) 
    ---
    ---tsx(query 参数)
      import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'  

      const User = () => {  
        const location = useLocation()  
        const queryParams = new URLSearchParams(location.search)  
        const id = queryParams.get('id')  
        return <h2>User ID: {id}</h2>  
      }  

      const App = () => (  
        <Router>  
          <nav>  
            <Link to="/user?id=123">Go to User 123</Link>  
          </nav>  
          <Routes>  
            <Route path="/user" element={<User />} />  
          </Routes>  
        </Router>  
      )  
    ---
    ---tsx(state 参数)
      import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'  

      const User = () => {  
        const location = useLocation()  
        const { id } = location.state || {}  
        return <h2>User ID: {id}</h2>  
      }  

      const App = () => (  
        <Router>  
          <nav>  
            <Link to="/user" state=\{{ id: 123 }\}>Go to User 123</Link>  
          </nav>  
          <Routes>  
            <Route path="/user" element={<User />} />  
          </Routes>  
        </Router>  
      )  
    ---
  `}}</Code>
  <Line></Line>

  <Title>###路由跳转</Title>
  <Text>在 6 版本中，使用[useNavigate](https://baimingxuan.github.io/react-router6-doc/hooks/use-navigate)，常见用法如下：</Text>
  <List>使用`navigate('/path')`跳转到指定路径</List>
  <List>使用`navigate(1)`和`navigate(-1)`分别控制前进和后退，根据数字控制具体步数</List>
  <List>使用`navigate('/path', { replace: true })`替换当前历史记录</List>
  <Code>{{`
    ---tsx(路由跳转)
      import { useNavigate } from 'react-router-dom'  

      const Home = () => {  
        const navigate = useNavigate()  

        const goToAbout = () => {  
          navigate('/about')  
        }  

        return (  
          <div>  
            <h2>Home</h2>  
            <button onClick={goToAbout}>Go to About</button>  
          </div>  
        )  
      }  
    ---
  `}}</Code>
  <Line></Line>

  <Title>###路由信息</Title>
  <Text>使用`useLocation`以获取到 location 对象，其包含以下路由信息：</Text>
  <List>`pattname`：当前路径，如`/about`</List>
  <List>`search`：URL 查询字符串，如`?id=123`</List>
  <List>`hash`：URL 哈希值，如`#section1`</List>
  <List>`state`：通过编程式导航传递的状态对象</List>
  <Code>{{`
    ---tsx(路由信息)
      import { useLocation } from 'react-router-dom'  

      const About = () => {  
        const location = useLocation()  
        console.log(location.pathname)
        console.log(location.search)
        console.log(location.hash)
        console.log(location.state)

        return <h2>About</h2>  
      }  

    ---
  
  `}}</Code>
  



</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const emits = defineEmits([ 'noteContentMounted' ])

onMounted(() => {
  emits('noteContentMounted')
})

</script>



<style lang="less">

</style>