/**
 * Listener type defines a function that listens for events and takes multiple arguments.
 *
 * @param T - A tuple of arguments that the listener expects.
 */
export type Listener<T extends any[]> = (...args: T) => void

/**
 * EventMap interface defines a mapping of event names to their corresponding argument types.
 * Each event name corresponds to a tuple of arguments.
 */
export interface EventMap {
  [eventName: string | number | symbol]: any[] // A mapping from event names to an array of arguments.
}

/**
 * EventEmitter class implements an event emitter that supports multiple arguments per event.
 * It allows adding, removing, and emitting events.
 *
 * Example usage:
 * ```typescript
 * interface MyEvents {
 *   'user-login': [string, number]; // User login event with username and userId
 *   'data-fetch': [string]; // Data fetch event with URL
 * }
 *
 * const emitter = new EventEmitter<MyEvents>();
 *
 * emitter.on('user-login', (username, userId) => {
 *   console.log(`User ${username} with ID ${userId} logged in`);
 * });
 *
 * emitter.emit('user-login', 'john_doe', 123); // Triggers the event
 * ```
 */
export class EventEmitter<T extends Record<keyof T, any[]>> {
  // A dictionary to store event names and their associated listeners
  private events: { [K in keyof T]?: Listener<T[K]>[] } = {}

  /**
   * Registers a listener for a specific event.
   *
   * @param event - The name of the event to listen for.
   * @param listener - The callback function to execute when the event is emitted.
   *
   * Example:
   * ```typescript
   * emitter.on('user-login', (username, userId) => {
   *   console.log(`User ${username} with ID ${userId} logged in`);
   * });
   * ```
   */
  on<K extends keyof T>(event: K, listener: Listener<T[K]>): EventEmitter<T> {
    // Initialize an empty array for listeners if not already set
    if (!this.events[event]) {
      this.events[event] = []
    }
    // Add the listener to the event's listeners array
    this.events[event]!.push(listener)

    return this
  }

  /**
   * Registers a one-time listener for a specific event.
   * The listener is automatically removed after being invoked once.
   *
   * @param event - The name of the event to listen for.
   * @param listener - The callback function to execute when the event is emitted (only once).
   *
   * Example:
   * ```typescript
   * emitter.once('user-login', (username, userId) => {
   *   console.log(`User ${username} with ID ${userId} logged in for the first time`);
   * });
   * ```
   */
  once<K extends keyof T>(event: K, listener: Listener<T[K]>): EventEmitter<T> {
    // Create a wrapper listener that removes itself after being called once
    const onceListener: Listener<T[K]> = (...args) => {
      listener(...args) // Invoke the original listener
      this.off(event, onceListener) // Remove this one-time listener
    }
    // Register the one-time listener
    this.on(event, onceListener)

    return this
  }

  /**
   * Emits an event and triggers all listeners for that event, passing the provided arguments.
   *
   * @param event - The name of the event to emit.
   * @param args - The arguments to pass to the listeners of the event.
   *
   * Example:
   * ```typescript
   * emitter.emit('user-login', 'john_doe', 123);
   * // This will trigger all listeners for 'user-login' with 'john_doe' and '123' as arguments.
   * ```
   */
  emit<K extends keyof T>(event: K, ...args: T[K]): EventEmitter<T> {
    // Check if the event has listeners, and if so, invoke each listener with the provided arguments
    if (this.events[event]) {
      this.events[event]!.forEach(listener => listener(...args))
    }

    return this
  }

  /**
   * Removes a specific listener for an event.
   *
   * @param event - The name of the event.
   * @param listener - The listener to remove from the event's listeners.
   *
   * Example:
   * ```typescript
   * const listener = (username, userId) => { console.log(`${username} logged in`); };
   * emitter.on('user-login', listener);
   * emitter.off('user-login', listener); // This will remove the listener
   * ```
   */
  off<K extends keyof T>(event: K, listener: Listener<T[K]>): EventEmitter<T> {
    // If the event has listeners, filter out the listener to remove it
    if (this.events[event]) {
      this.events[event] = this.events[event]!.filter(l => l !== listener)
    }

    return this
  }

  /**
   * Removes all listeners for all events.
   * This will clear the entire event registry.
   *
   * Example:
   * ```typescript
   * emitter.offAll(); // Removes all listeners for all events
   * ```
   */
  offAll(): EventEmitter<T> {
    // Clear the events registry completely
    this.events = {}

    return this
  }
}

export default EventEmitter
