# React ResponsiveRenderIf

A responsive React component that takes a media query and renders its children only if the query matches. Handles changes if you resize your browser or flip your device.

### Implementation

Works natively with `Window.matchMedia` api that takes a media query and returns a `MediaQueryList` object representing the parsed result. [read more](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)

It works natively with the following browsers:

| Chrome | Firefox | Internet Explorer | Opera | Safari | Safari Mobile | Android |
|:----------:|:-------------:|:------:|:-------------:|:------:|:-------------:|:-----:|:-----:|
|  9    |    6.0     |    10       |       12.1  |  5.1 | 3.0 | 5 |

For older browsers, it falls back to Paul Irish's implementation of `matchMedia`: [read more](https://github.com/paulirish/matchMedia.js/)

### How to use this awesome piece of code?

First install it.
```
$ npm i react-responsive-render-if --save
```

Then `import` into your code as follows (you _are_ using ES6, right? :smirk:):
```javascript
import ResponsiveRenderIf from "react-responsive-render-if";
```

Then all you need to do is wrap your content (JSX or HTML)
and set the `query` for the specific media you are trying to target.
You can use any media query supported by your browser. For a complete listing
see the [Media Queries Level 4](https://drafts.csswg.org/mediaqueries/) spec.

Here we display a different message depending on your screen width:
```html
<ResponsiveRenderIf query="screen and (max-width: 480px)">
    You are reading this on a narrow browser window or a mobile device.
</ResponsiveRenderIf>

<ResponsiveRenderIf query="screen and (min-width: 480px)">
    Ahh, look at all of this screen real estate!
</ResponsiveRenderIf>
```

Or how about this cool trick. You don't want some area of your app to be printed? No problem.
```html
<ResponsiveRenderIf query="screen">
    You are reading this on your screen.
</ResponsiveRenderIf>

<ResponsiveRenderIf query="print">
    Sorry, but you can't print this.
</ResponsiveRenderIf>
```

### Optional props

#### `masqueradeAs`

You can pass a `masqueradeAs` to specify the component to "masquerade as" (i.e. to render as).
If you don't, ResponsiveRenderIf will render a "div", but only when necessary.
'masqueradeAs' can either be a string (such as "div" or "ul"), or a component (like "MyButton").

Let's say you had a component that you used as follows:
```html
<MyButton text="submit" />
```
The following will render the same output, but only when not bing printed
(who needs to print a button on the printer anyway?)
```html
<ResponsiveRenderIf query="not print" masqueradeAs="MyButton" text="submit" />
```

If you don't specify a `masqueradeAs` AND don't specify additional props AND
there is but a single child element, ResponsiveRenderIf adds no additional markup!  In other words,
you pay no price (DOM wise) for using ResponsiveRenderIf. :tada:

For example, the following will NOT render a wrapping div as it wraps a single child element:
```html
<ResponsiveRenderIf query="screen">
    <div>
        <p>It was the best of times.</p>
        <p>It was the worst of times.</p>
    </div>
</ResponsiveRenderIf>
```
but this will:
```html
<ResponsiveRenderIf query="screen">
    <p>It was the best of times.</p>
    <p>It was the worst of times.</p>
</ResponsiveRenderIf>
```
Actually, the two examples above will render the exact same output. The second will wrap the multiple children
masquerading as a "div".

You can even pass additional props to the masqueraded component:
```html
<ResponsiveRenderIf query="screen" masqueradeAs="ol" start="4" classname="my-list">
    <li>This is item four</li>
    <li>This is item five</li>
</ResponsiveRenderIf>
```
which will render the following:
```html
<ol start="4" classname="my-list">
    <li>This is item four</li>
    <li>This is item five</li>
</ol>
```

### Try it out Live!
See it live and in action [on codepen](http://codepen.io/jfkhoury/pen/MegmwV).

### More Examples

What if your code works best when displayed in landscape mode?
```html
<ResponsiveRenderIf query="screen and (orientation:portrait)">
    Please turn your device for optimal viewing
</ResponsiveRenderIf>
```
