---
title: What is passive event listeners
date: "2021-06-04T11:41:03.284Z"
tags:
- js
- event listeners
- passive events
---

# What are passive event listeners ?

Passive event listeners are useful to improve scrolling on touch devices. Since browsers can't know if any event listener will prevent scrolling, ex. by using `event.preventDefault()`, or not, so they wait until listeners finish execution before scrolling which in turn can cause delays. To fix this problem Passive event listeners were introduced which hints browsers that the event listener will not prevent scrolling.

## How to Use passive event listeners ?

```js
//app.routes

function onTouchStart(evt) {
  evt.preventDefault(); // (2)
}

document.addEventListener('touchstart', onTouchStart, {
  passive: true  //(1)
});
```
1. That's all it's just a flag `passive`. Set it to true on any touch or scroll events.
2. If you use Prevent default when `passive` flag is set to `true` browser will do nothing other than generating a console warning.
