import { React, jsx, jsxRegister } from './tsx.js';
class customElement extends HTMLElement {
    constructor() {
        super();
        this.appendChild(React.createElement("div", null,
            React.createElement("h1", null, "Custom Element"),
            React.createElement("p", { jsx: "pTag" })));
        jsx.pTag.innerHTML = `I am a ${jsx.pTag.nodeName}-tag. Click me!`;
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
