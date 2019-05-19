# react-catchable
React子组件异常导致整个页面崩溃的解决方案

## 安装

使用npm
```shell
npm i react-catchable
```
使用yarn
```shell
yarn add react-catchable
```
## 使用

```jsx
import catchable from "react-catchable";
class XXXComponent extends React.Component{
    render(){
        return <div></div>
    }
}

export default catchable(XXXComponent);
```