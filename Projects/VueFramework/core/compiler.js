const compile = (rootElement) => {
    const elements = rootElement.querySelectorAll('*');
    const bindings = {};

    elements.forEach(element => {
        const bindKey = element.getAttribute('v-bind');
        const modelKey = element.getAttribute('v-model');

        if (bindKey) {
            if (!bindings[bindKey]) {
                bindings[bindKey] = { bindElements: [], modelElements: [] };
            }
            bindings[bindKey].bindElements.push(element);
        }

        if (modelKey) {
            if (!bindings[modelKey]) {
                bindings[modelKey] = { bindElements: [], modelElements: [] };
            }
            bindings[modelKey].modelElements.push(element);
        }
    });

    return bindings;
};

export { compile };