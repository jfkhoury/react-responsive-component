# Responsive Component

A responsive React component that takes a media query and renders its children only if the query matches. Handles changes if you resize your browser or flip your device...

## Implementation

Works natively with `Window.matchmedia` api that takes a media query and returns a `MediaQueryList` object representing the parsed result. [read more](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)

| Feature   |   Chrome | Firefox (Gecko) | Internet Explorer  | Opera  | Safari |
|:----------:|:-------------:|:------:|:-------------:|:------:|:-------------:|
| Basic support |  9    |    6.0 (6.0)     |    10       |       12.1  |  5.1 |


For older browsers, it falls back to Paul Irish's implementation of `matchMedia`: [read more](https://github.com/paulirish/matchMedia.js/)

### How to use this awesome piece of code?

[Try it out on codepen](http://codepen.io/jfkhoury/pen/MegmwV)

All you need to do is wrap your content (React Components or jsx or html...) for the specific screen/device you are trying to target, and set the media query accordingly:

```javascript
    import { ResponsiveComponent } from "react-responsive-component";
    ...
    <ResponsiveComponent query="only screen and (max-width: 480px)">
        <HamburgerBtn userId={userId} />
    </ResponsiveComponent>

    <ResponsiveComponent query="only screen and (min-width: 480px)">
        <ProfileDropDown userId={userId} />
    </ResponsiveComponent>
```

#### Optional props

You can pass a `tag` props to specify the tagname of the responsive component wrapper.

```javascript
    <ResponsiveComponent query="tv" tag="ul">
        <li>This feature is not supported on TVs yet :(</li>
    </ResponsiveComponent>
```
