/*
    tsx.js is a TypeScript Module wicht allowes you to use .tsx files without React.
    It is based on Steven Spungins StackOverflow answer (1) but adds support for Custom Elements.

    (1): https://stackoverflow.com/questions/30430982/can-i-use-jsx-without-react-to-inline-html-in-script
*/
export const React = {
    createElement: function (tag, attrs, children) {
        var element;
        // create custom element if exists
        if (customElements.get(tag) === undefined) {
            element = document.createElement(tag);
        }
        else {
            let ce = customElements.get(tag);
            element = new ce();
        }
        for (let name in attrs) {
            if (name && attrs.hasOwnProperty(name)) {
                let value = attrs[name];
                // register element to jsx object
                if (name == 'jsx') {
                    jsx[value] = element;
                }
                if (value === true) {
                    element.setAttribute(name, name);
                }
                else if (value !== false && value != null) {
                    element.setAttribute(name, value.toString());
                }
            }
        }
        for (let i = 2; i < arguments.length; i++) {
            let child = arguments[i];
            element.appendChild(child.nodeType == null ?
                document.createTextNode(child.toString()) : child);
        }
        return element;
    }
};
/* === stuff for custom-element callbacks === */
export let jsx = {};
/*
* jsxRegister:
*   Checks if registered element is appended to DOM an fires callback if so.
*   Needed, since connectedCallback() if custom elements will fire before
*   the element is actually attached to document dom because of jsx compilation.
*/
export function jsxRegister(el) {
    callbacks.push(el);
}
let callbacks = [];
function callback() {
    callbacks = callbacks.filter(function (value, index, arr) {
        let isInBody = isDescendant(document.body, callbacks[index]);
        if (isInBody) {
            callbacks[index].jsxCallback();
        }
        return !isInBody;
    });
}
let observer = new MutationObserver(callback);
observer.observe(document.body, { attributes: true, childList: true, subtree: true });
/*
* isDescendant:
*   Checks if the child-parameter is a child-element of the parent-parameter.
*/
function isDescendant(parent, child) {
    var node = child.parentNode;
    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}
