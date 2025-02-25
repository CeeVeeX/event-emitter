# EventEmitter

`EventEmitter` 是一个简单的事件驱动模型实现，允许你注册事件监听器、发射事件、移除监听器以及处理一次性事件。它支持多个参数的事件监听器，并且能够灵活处理事件发射。

## 特性

- 支持多个事件监听器
- 支持一次性监听器（`once`）
- 支持移除特定事件监听器
- 支持移除所有事件监听器
- 强类型支持，适用于 TypeScript

## 安装

你可以将 `EventEmitter` 类直接复制到你的项目中，或者将其放入一个 TypeScript 模块文件中使用。

###### 如果你使用包管理工具可以直接使用指令添加到项目中
```bash
# 使用 npm
npm install @cv-pack/event-emitter

# 使用 yarn
yarn add @cv-pack/event-emitter

# 使用 pnpm
pnpm add @cv-pack/event-emitter
```

## 使用示例

### 1. 基本用法

```typescript
// 定义事件类型
interface MyEvents {
  'user-login': [string, number] // 用户登录事件，带有用户名和用户ID
  'data-fetch': [string] // 数据获取事件，带有URL
}

// 创建一个 EventEmitter 实例
const emitter = new EventEmitter<MyEvents>()

// 注册事件监听器
emitter.on('user-login', (username, userId) => {
  console.log(`User ${username} with ID ${userId} logged in`)
})

// 触发事件
emitter.emit('user-login', 'john_doe', 123) // 输出：User john_doe with ID 123 logged in
```

### 2. 使用一次性监听器

```typescript
// 注册一次性事件监听器
emitter.once('user-login', (username, userId) => {
  console.log(`First-time login for user ${username} with ID ${userId}`)
})

// 触发事件，监听器会被调用一次
emitter.emit('user-login', 'john_doe', 123) // 输出：First-time login for user john_doe with ID 123
// 再次触发事件，不会调用监听器
emitter.emit('user-login', 'jane_doe', 456)
```

### 3. 移除事件监听器

```typescript
// 定义监听器
function loginListener(username: string, userId: number) {
  console.log(`User ${username} logged in`)
}

// 注册事件监听器
emitter.on('user-login', loginListener)

// 移除事件监听器
emitter.off('user-login', loginListener)

// 触发事件，监听器已被移除，不会触发
emitter.emit('user-login', 'john_doe', 123)
```

### 4. 移除所有监听器

```typescript
// 注册多个事件监听器
emitter.on('user-login', (username, userId) => {
  console.log(`User ${username} logged in`)
})
emitter.on('data-fetch', (url) => {
  console.log(`Fetching data from ${url}`)
})

// 移除所有监听器
emitter.offAll()

// 触发事件，不会触发任何监听器
emitter.emit('user-login', 'john_doe', 123)
```

## API

### `on(event: string, listener: Function): EventEmitter<T>`
- **event**: 事件名称
- **listener**: 事件监听器函数
- **返回值**: 返回 `EventEmitter` 实例，支持链式调用。

### `once(event: string, listener: Function): EventEmitter<T>`
- **event**: 事件名称
- **listener**: 一次性事件监听器函数
- **返回值**: 返回 `EventEmitter` 实例，支持链式调用。
- **描述**: 注册一个一次性事件监听器，监听器只会在事件触发时执行一次，然后被自动移除。

### `emit(event: string, ...args: any[]): EventEmitter<T>`
- **event**: 事件名称
- **args**: 事件的参数列表，会传递给所有监听器
- **返回值**: 返回 `EventEmitter` 实例，支持链式调用。
- **描述**: 触发指定事件并调用所有监听器，传递相应的参数。

### `off(event: string, listener: Function): EventEmitter<T>`
- **event**: 事件名称
- **listener**: 要移除的事件监听器
- **返回值**: 返回 `EventEmitter` 实例，支持链式调用。
- **描述**: 移除指定事件的某个监听器。

### `offAll(): EventEmitter<T>`
- **返回值**: 返回 `EventEmitter` 实例，支持链式调用。
- **描述**: 移除所有事件的所有监听器。

## 类型定义

`EventEmitter` 类是完全类型安全的，支持 TypeScript 类型检查。你可以为每个事件定义事件名和对应的参数类型，确保事件参数传递的正确性。

### 示例：定义自定义事件类型

```typescript
interface MyEvents {
  'user-login': [string, number] // 用户登录事件
  'data-fetch': [string] // 数据获取事件
}

const emitter = new EventEmitter<MyEvents>()

// 注册事件监听器
emitter.on('user-login', (username, userId) => {
  console.log(`User ${username} with ID ${userId} logged in`)
})

// 触发事件
emitter.emit('user-login', 'john_doe', 123) // 正确，类型匹配
// emitter.emit('user-login', 'john_doe'); // 错误，参数数量不匹配
```

## 贡献

欢迎提出问题或提交 Pull Request 来改进此项目！你可以通过 GitHub 提交 Issues 或 Pull Requests。

## License

MIT License
