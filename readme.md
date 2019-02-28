# tsx.js

tsx.js allowes you to use TypeScript .tsx files without the need of React. This is usefull if you want to use only the jsx-syntax e.g. in combination with custom-elements.

tsx.js is based on Steven Spungins StackOverflow answer, but adds support for HTML Custom-Elements:
https://stackoverflow.com/questions/30430982/can-i-use-jsx-without-react-to-inline-html-in-script


# Example

``` typescript
import { React, jsx, jsxRegister } from './tsx.js';

class customElement extends HTMLElement {
    constructor() {
        super();
        this.appendChild(React.createElement("p", { jsx: "pTag" }));
        jsx.pTag.innerHTML = 'I am a custom element. Click me.';
        // register callback
        jsxRegister(this);
    }
    // callback will trigger when the element is appended to body
    // needed in case of fancy jsx nesting
    jsxCallback() {
        jsx.pTag.onclick = () => {
            alert('Interactive!');
        };
    }
}
customElements.define('custom-element', customElement);

```