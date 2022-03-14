---
title: 'Example post'
date: '2021-10-25'
tags: ['example-tag', 'guide', 'how-to']
draft: false
summary: 'Example post with headers, lists, images, tables and more! Github Flavored Markdown guide with examples.'
---

# Syntax guide

Here’s an overview of Markdown syntax you can use in your blog posts.

## Headers

```
# Example H1 tag

## Example H2 tag

#### Example H4 tag
```

# Example H1 tag

## Example H2 tag

#### Example H4 tag

```
_A sentence in italic_

**A sentence in bold**

_A sentence in **bold** and italic_
```

_A sentence in italic_

**A sentence in bold**

_A sentence in **bold** and italic_

## Lists

### Unordered

```
- Item 1
- Item 2
  - Item 2a
  - Item 2b
```

- Item 1
- Item 2
  - Item 2a
  - Item 2b

### Ordered

```
1. Item 1
1. Item 2
1. Item 3
   1. Item 3a
   1. Item 3b
```

1. Item 1
1. Item 2
1. Item 3
   1. Item 3a
   1. Item 3b

## Images

```
![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)
Format: ![Alt Text](url)
```

![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)

## Links

```
https://shipsaas.com
[Ship SaaS](https://shipsaas.com)
```

https://shipsaas.com
[Ship SaaS](https://shipsaas.com)

## Blockquotes

```
Frank Zappa:

> A mind is like a parachute.
> It doesn't work if it is not open.
```

Frank Zappa:

> A mind is like a parachute.
> It doesn't work if it is not open.

## Inline code

```
This is an inline `<html> code` element.
```

This is an inline `<html> code` element.

## Syntax highlighting

[GitHub Flavored Markdown](https://help.github.com/articles/basic-writing-and-formatting-syntax/) syntax highlighting:

````
```js:helloWorld.js
function helloWorld(arg) {
  if (arg) {
    console.writeLine(arg)
  }
}
```
````

And here's how it looks:

```js:helloWorld.js
function helloWorld(arg) {
  if (arg) {
    console.writeLine(arg)
  }
}
```

## Task Lists

```
[x] Todo 1 - completed
[x] Todo 2 - completed
[ ] Todo 3 - not completed
```

[x] Todo 1 - completed
[x] Todo 2 - completed
[ ] Todo 3 - not completed

## Tables

You can create tables by assembling a list of words and dividing them with hyphens `-` (for the first row), and then separating each column with a pipe `|`:

```
| Header 1            | Header 2            |
| ------------------- | ------------------- |
| Content from cell 1 | Content from cell 2 |
| More content        | More content        |
```

| Header 1            | Header 2            |
| ------------------- | ------------------- |
| Content from cell 1 | Content from cell 2 |
| More content        | More content        |
