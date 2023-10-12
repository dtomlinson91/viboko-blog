---
title: The difference between mod and use in Rust
date: 2023-10-11
icon: devicon-plain:rust
cover: assets/posts/covers/rust/rust-crab.png
image: /assets/posts/covers/rust/rust-crab.png
category:
  - Post
tag:
  - rust
---

![alt](../../../.vuepress/public/assets/posts/covers/rust/rust-crab.png)

This article clarifies the difference between `mod` and `use` in Rust and when to use them.

<!-- more -->


[Chapter 7](https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html) in the Rust Book goes into more detail when creating crates and using `mod` and `use`.

## Summary

Using `use` brings a Rust item into the current namespace. In most cases, using `use` is optional, and can be avoided by referring to the full path of the item you want to access. `use` is primarily used to make code less repetitive & verbose.

Using `mod` defines a module which is a collection of Rust items. When you define a module, you can refer to any item inside it either by its full path, or by using `use` to bring the module into scope.

:::info
There is no need to explicity import crates in Rust using `use`. When you build your crate, Cargo will compile all the crates you have referenced automatically. If you don't use `use`, refer to the item by its full path.
:::

Read on for some code examples on where you would use `use` and `mod`.

## Use

:::note Documentation
[Rust by Example](https://doc.rust-lang.org/stable/rust-by-example/mod/use.html) has some examples on `use`.
:::

Using `use` brings another _item_ into the current _namespace_ by following another _path_.

- An item is some general object such as a function, struct or trait that you need to access.
- A path is module hierarchy you need to follow to access it.
- The current namespace means bringing an item into the current file so you can access it as if it were defined locally.

### Standard Library

Say you want to use the `spawn()` function from the `std` library. In a Rust file you can access it by its full path `std::thread::spawn()`:

:::code-tabs

@tab `example.rs`

```rust
let spawned_thread = std::thread::spawn(|| {
  // some thread code
});
```

:::

But this can be become repetitive if you find yourself using `spawn()` many times in the same file. So you can use `use` to make things more concise:

:::code-tabs

@tab `example.rs`

```rust {1}
use std::thread:spawn;

let spawned_thread = spawn(|| {
  // some thread code
});
```

:::

By bringing `std::thread::spawn` into the current namespace, it can now be accessed with just `spawn()`.

### External Crates

It's tempting to think of `use` like an `import` statement - but this isn't the case.

Say you are using `tungstenite` - a WebSocket inplementation for Rust.

:::code-tabs

@tab `example.rs`

```rust {2-3,8-9}
use std::net::TcpListener;
use std::thread::spawn;
use tungstenite::server::accept;

/// A WebSocket echo server
let server = TcpListener::bind("127.0.0.1:9001").unwrap();
for stream in server.incoming() {
    spawn (move || {
        let mut websocket = accept(stream.unwrap()).unwrap();
        loop {
            let msg = websocket.read_message().unwrap();

            // We do not want to send back ping/pong messages.
            if msg.is_binary() || msg.is_text() {
                websocket.write_message(msg).unwrap();
            }
        }
    });
}
```

:::

You can see from the highlighted lines that using `use` allows you to reference the items directly, without having to type out the full path each time it's used.

But you do not have to use `use`. If you remove lines 2-3 and replace each function call with its full path instead:

:::code-tabs

@tab `example.rs`

```rust {6-7}
use std::net::TcpListener;

/// A WebSocket echo server
let server = TcpListener::bind("127.0.0.1:9001").unwrap();
for stream in server.incoming() {
    std::thread::spawn (move || {
        let mut websocket = tungstenite::server::accept(stream.unwrap()).unwrap();
        loop {
            let msg = websocket.read_message().unwrap();

            // We do not want to send back ping/pong messages.
            if msg.is_binary() || msg.is_text() {
                websocket.write_message(msg).unwrap();
            }
        }
    });
}
```

:::

You can see that this compiles and runs just fine.

:::tip Tip
No matter if you’re using an item from the standard library, an item you’ve written yourself somewhere in your crate or a third party library you’ve imported - using use simply provides a convenient short way to bring items into the current namespace.
:::

## Mod

When creating modules and submodules you use `mod` to declare them so you can utilise them in your crate. This can be confusing, why not simply use use?

In Rust a module is simply a container for zero or more items. It’s a way of grouping items together in a logical way so that your module is easy to navigate.

When you use `mod` you are creating the path where your item is located. This path can then be used with a `use` statement like above.

Without using `mod` you couldn't use `use` from another file. Take the following example:

### Example

Let’s look at the standard library for an example. Say you are re-writing `std:thread` yourself in your own crate.

Consider the following path same as above:

```rust
std::thread::spawn()
```

Here:

| Item Name | Description                     |
| :-------- | :------------------------------ |
| `std`     | Is the crate                    |
| `thread`  | Is a module inside the crate    |
| `spawn`   | Is a function inside the module |

The path `std::thread` has to be defined using `mod` in order for `spawn()` to be accessible from other files/crates. If this was defined in a single file it could look like:

:::code-tabs

@tab `std/lib.rs`

```rust
pub mod thread {
  pub fn spawn() {
    // function body
  }
}
```

:::

Or it could be spread over many files:

```
std
├── lib.rs
└── thread.rs
```

With `std/thread.rs` containing

:::code-tabs

@tab `std/thread.rs`

```rust
pub fn spawn() {
  // function body
}
```

:::

In either case (whether it's defined in `lib.rs` or split over many files), in your `lib.rs` you declare a module `thread`:

:::code-tabs

@tab `std/lib.rs` (single file)

```rust {1}
pub mod thread {
  pub fn spawn() {
    // function body
  }
}
```

@tab `std/lib.rs` (multiple files)

```rust {1}
pub mod thread;
```

:::

:::info
This **defines the path that people can use** to access your function from their own crates. Without using `mod`, there is no path to this function. You can't refer to it using `use` or its full path from another file without `mod`.
:::

### Module Source Filenames

Using `mod` as in:

```rs
pub mod thread;
```

Is known as a [module source filename](https://doc.rust-lang.org/reference/items/modules.html#module-source-filenames). When you use `mod` in this way and compile your crate, Cargo will take the file `thread.rs` and **replace this line with the contents of the file**.

This is what `mod` is used for in Rust. **It is used to define a path to an item**, whether that item is defined in one file, or nested in a file deeper inside the crate.

You **cannot replace** `pub mod thread;` with a `use` statement. However, you can use `use` to refer to any item inside `std:thread` as it has been declared a module.

#### Example

Say you want people to be able to use `spawn()` more easily. You could use `use`:

:::code-tabs

@tab `std/lib.rs`

```rust
pub mod thread;
use thread::spawn; // you've defined thread as a module
```

:::

Using a `use` statement after defining a module in this way means in addition to the path `std::thread::spawn()`, someone using your `std` crate can refer to `spawn` in their own crate:

:::code-tabs

@tab Using `use`

```rs
use std::spawn;

spawn()
```

@tab Using the path

```rs
std::spawn()
```

:::

## Summary

Hopefully this has helped clarify the differences between `mod` and `use` in Rust. If you have any questions, queries or comments, feel free to leave them below.
