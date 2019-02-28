import {React, jsx, jsxRegister} from './tsx.js'

class customElement extends HTMLElement {
    constructor() {
    super();
    this.appendChild(
        <div>
            <h1>Custom Element</h1>
            <p jsx="pTag"></p>
        </div>
    );
    
    jsx.pTag.innerHTML = `I am a ${jsx.pTag.nodeName}-tag. Click me!`;
    // register callback
    jsxRegister(this);
    }

    // callback will trigger when the element is appended to body
    // needed in case of fancy jsx nesting
    jsxCallback(){
        jsx.pTag.onclick = ()=>{
            alert('Interactive!');
        }
    }
}

customElements.define('custom-element', customElement);