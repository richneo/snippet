const TEMPLATES = {
    javascript: {
        function: {
            template: `function {{functionName}}({{params}}) {
    {{functionBody}}
}`,
            inputs: [
                { id: 'functionName', label: 'Function Name', type: 'text' },
                { id: 'params', label: 'Parameters', type: 'text' },
                { id: 'functionBody', label: 'Function Body', type: 'textarea' }
            ]
        },
        class: {
            template: `class {{className}} {
    constructor({{constructorParams}}) {
        {{constructorBody}}
    }

    {{methods}}
}`,
            inputs: [
                { id: 'className', label: 'Class Name', type: 'text' },
                { id: 'constructorParams', label: 'Constructor Parameters', type: 'text' },
                { id: 'constructorBody', label: 'Constructor Body', type: 'textarea' },
                { id: 'methods', label: 'Methods', type: 'textarea' }
            ]
        }
    },
    // 다른 언어 템플릿들...
}; 