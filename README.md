# EventEmitter

[中文文档](README.zh-CN.md)

`EventEmitter` is a simple implementation of the event-driven model that allows you to register event listeners, emit events, remove listeners, and handle one-time events. It supports event listeners with multiple parameters and can flexibly handle event emissions.

## Features
- Can be used in both browsers and Node.js.
- Supports multiple event listeners.
- Supports one-time listeners (`once`).
- Supports removing specific event listeners.
- Supports removing all event listeners.
- Strongly typed, suitable for TypeScript.

## Installation

You can directly copy the `EventEmitter` class into your project or place it in a TypeScript module file for use.

###### If you use a package manager, you can directly add it to your project using the following commands:
```bash
# Using npm
npm install @cv-pack/event-emitter

# Using yarn
yarn add @cv-pack/event-emitter

# Using pnpm
pnpm add @cv-pack/event-emitter
```

## Usage Examples

### 1. Basic Usage

```typescript
// Define event types
interface MyEvents {
  'user-login': (name: string, n: number) => void // User login event with username and user ID
  'data-fetch': (name: string) => void // Data fetch event with URL
}

// Create an EventEmitter instance
const emitter = new EventEmitter<MyEvents>()

// Register an event listener
emitter.on('user-login', (username, userId) => {
  console.log(`User ${username} with ID ${userId} logged in`)
})

// Trigger the event
emitter.emit('user-login', 'john_doe', 123) // Output: User john_doe with ID 123 logged in
```

### 2. Using One-Time Listeners

```typescript
// Register a one-time event listener
emitter.once('user-login', (username, userId) => {
  console.log(`First-time login for user ${username} with ID ${userId}`)
})

// Trigger the event, the listener will be called once
emitter.emit('user-login', 'john_doe', 123) // Output: First-time login for user john_doe with ID 123
// Trigger the event again, the listener will not be called
emitter.emit('user-login', 'jane_doe', 456)
```

### 3. Removing Event Listeners

```typescript
// Define a listener
function loginListener(username: string, userId: number) {
  console.log(`User ${username} logged in`)
}

// Register the event listener
emitter.on('user-login', loginListener)

// Remove the event listener
emitter.off('user-login', loginListener)

// Trigger the event, the listener has been removed and will not be triggered
emitter.emit('user-login', 'john_doe', 123)
```

### 4. Removing All Listeners

```typescript
// Register multiple event listeners
emitter.on('user-login', (username, userId) => {
  console.log(`User ${username} logged in`)
})
emitter.on('data-fetch', (url) => {
  console.log(`Fetching data from ${url}`)
})

// Remove all listeners
emitter.offAll()

// Trigger the events, no listeners will be triggered
emitter.emit('user-login', 'john_doe', 123)
```

## API

### `on(event: string, listener: Function): EventEmitter<T>`
- **event**: The name of the event.
- **listener**: The event listener function.
- **Return value**: Returns the `EventEmitter` instance, supporting method chaining.

### `once(event: string, listener: Function): EventEmitter<T>`
- **event**: The name of the event.
- **listener**: The one-time event listener function.
- **Return value**: Returns the `EventEmitter` instance, supporting method chaining.
- **Description**: Registers a one-time event listener. The listener will only be executed once when the event is triggered and then automatically removed.

### `emit(event: string, ...args: any[]): EventEmitter<T>`
- **event**: The name of the event.
- **args**: The list of event parameters, which will be passed to all listeners.
- **Return value**: Returns the `EventEmitter` instance, supporting method chaining.
- **Description**: Triggers the specified event and calls all listeners, passing the corresponding parameters.

### `off(event: string, listener: Function): EventEmitter<T>`
- **event**: The name of the event.
- **listener**: The event listener to be removed.
- **Return value**: Returns the `EventEmitter` instance, supporting method chaining.
- **Description**: Removes a specific listener for the specified event.

### `offAll(): EventEmitter<T>`
- **Return value**: Returns the `EventEmitter` instance, supporting method chaining.
- **Description**: Removes all listeners for all events.

## Type Definitions

The `EventEmitter` class is fully type-safe and supports TypeScript type checking. You can define the event names and corresponding parameter types for each event to ensure the correctness of event parameter passing.

### Example: Defining Custom Event Types

```typescript
interface MyEvents {
  'user-login': (name: string, n: number) => void // User login event with username and user ID
  'data-fetch': (name: string) => void // Data fetch event with URL
}

const emitter = new EventEmitter<MyEvents>()

// Register an event listener
emitter.on('user-login', (username, userId) => {
  console.log(`User ${username} with ID ${userId} logged in`)
})

// Trigger the event
emitter.emit('user-login', 'john_doe', 123) // Correct, types match
// emitter.emit('user-login', 'john_doe'); // Error, incorrect number of parameters
```

## Contribution

Welcome to submit issues or pull requests to improve this project! You can submit issues or pull requests via GitHub.

## License

MIT License
