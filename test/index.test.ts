import { beforeEach, describe, expect, it, vi } from 'vitest'
import { EventEmitter } from '../src/index'

// 定义事件类型
interface MyEvents {
  'user-login': [string, number] // 用户登录事件，带有用户名和用户ID
  'data-fetch': [string] // 数据获取事件，带有URL
}

describe('eventEmitter', () => {
  let emitter: EventEmitter<MyEvents>

  beforeEach(() => {
    // 每个测试前初始化一个新的 EventEmitter 实例
    emitter = new EventEmitter<MyEvents>()
  })

  it('should register and emit events correctly', () => {
    const listener = vi.fn()

    // 注册监听器
    emitter.on('user-login', listener)

    // 触发事件
    emitter.emit('user-login', 'john_doe', 123)

    // 验证事件是否被正确触发并传递参数
    expect(listener).toHaveBeenCalledWith('john_doe', 123)
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('should allow multiple listeners for the same event', () => {
    const listener1 = vi.fn()
    const listener2 = vi.fn()

    // 注册两个监听器
    emitter.on('user-login', listener1)
    emitter.on('user-login', listener2)

    // 触发事件
    emitter.emit('user-login', 'john_doe', 123)

    // 验证两个监听器都被调用
    expect(listener1).toHaveBeenCalledWith('john_doe', 123)
    expect(listener2).toHaveBeenCalledWith('john_doe', 123)
    expect(listener1).toHaveBeenCalledTimes(1)
    expect(listener2).toHaveBeenCalledTimes(1)
  })

  it('should remove listeners with off()', () => {
    const listener = vi.fn()

    // 注册监听器
    emitter.on('user-login', listener)

    // 触发事件
    emitter.emit('user-login', 'john_doe', 123)
    expect(listener).toHaveBeenCalledTimes(1)

    // 移除监听器
    emitter.off('user-login', listener)

    // 触发事件，监听器应该不再被调用
    emitter.emit('user-login', 'john_doe', 456)
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('should register a one-time listener with once()', () => {
    const listener = vi.fn()

    // 注册一次性监听器
    emitter.once('user-login', listener)

    // 触发事件，监听器应该被调用一次
    emitter.emit('user-login', 'john_doe', 123)
    expect(listener).toHaveBeenCalledWith('john_doe', 123)
    expect(listener).toHaveBeenCalledTimes(1)

    // 再次触发事件，监听器不应被调用
    emitter.emit('user-login', 'john_doe', 456)
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('should remove all listeners with offAll()', () => {
    const listener1 = vi.fn()
    const listener2 = vi.fn()

    // 注册两个监听器
    emitter.on('user-login', listener1)
    emitter.on('user-login', listener2)

    // 触发事件
    emitter.emit('user-login', 'john_doe', 123)
    expect(listener1).toHaveBeenCalledTimes(1)
    expect(listener2).toHaveBeenCalledTimes(1)

    // 移除所有监听器
    emitter.offAll()

    // 触发事件，应该没有任何监听器被调用
    emitter.emit('user-login', 'john_doe', 456)
    expect(listener1).toHaveBeenCalledTimes(1)
    expect(listener2).toHaveBeenCalledTimes(1)
  })

  it('should handle emitting an event without any listeners gracefully', () => {
    // 注册事件后没有监听器
    expect(() => emitter.emit('user-login', 'john_doe', 123)).not.toThrow()
  })
})
