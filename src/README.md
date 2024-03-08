## 前端共享代码
### component: 组件代码
### directive: 指令代码

## 使用方式
### 软链接的方式引入到项目代码中
### angular.json文件中，如下结构中，添加 `"preserveSymlinks"` 对应的行：
```
"projects": {
    "[project name]": {
        "architect": {
            "build": {
                "options": {
                    "preserveSymlinks": true,
                }

            }
        }
    }
```
### 开发人员如果需要提交更新的共享代码
#### 创建自己的分支之后推送到服务器
#### 通知前端项目的主管合并到相应的分支
#### （注意）任何开发人员都从develop分支合并代码，不能从其他个人分支合并代码。
