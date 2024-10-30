class SnippetGenerator {
    constructor() {
        this.currentLanguage = 'javascript';
        this.currentCategory = 'function';
    }

    generateInputs() {
        const template = TEMPLATES[this.currentLanguage][this.currentCategory];
        const container = document.getElementById('dynamicInputs');
        container.innerHTML = '';

        template.inputs.forEach(input => {
            const wrapper = document.createElement('div');
            wrapper.className = 'input-wrapper';

            const label = document.createElement('label');
            label.textContent = input.label;

            const inputElement = input.type === 'textarea' 
                ? document.createElement('textarea')
                : document.createElement('input');
            inputElement.id = input.id;
            inputElement.type = input.type;

            inputElement.addEventListener('input', () => this.updatePreview());

            wrapper.appendChild(label);
            wrapper.appendChild(inputElement);
            container.appendChild(wrapper);
        });
    }

    updatePreview() {
        const template = TEMPLATES[this.currentLanguage][this.currentCategory];
        let code = template.template;

        template.inputs.forEach(input => {
            const value = document.getElementById(input.id).value;
            code = code.replace(`{{${input.id}}}`, value);
        });

        const preview = document.getElementById('snippetPreview');
        preview.textContent = code;
        Prism.highlightElement(preview);
    }

    saveSnippet() {
        const snippets = JSON.parse(localStorage.getItem('savedSnippets') || '[]');
        snippets.push({
            language: this.currentLanguage,
            category: this.currentCategory,
            code: document.getElementById('snippetPreview').textContent,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('savedSnippets', JSON.stringify(snippets));
        this.displaySavedSnippets();
    }

    displaySavedSnippets() {
        const snippets = JSON.parse(localStorage.getItem('savedSnippets') || '[]');
        const container = document.getElementById('snippetsList');
        container.innerHTML = '';

        snippets.forEach((snippet, index) => {
            const snippetElement = document.createElement('div');
            snippetElement.className = 'saved-snippet';
            snippetElement.innerHTML = `
                <pre><code class="language-${snippet.language}">${snippet.code}</code></pre>
                <button onclick="generator.deleteSnippet(${index})">Delete</button>
            `;
            container.appendChild(snippetElement);
        });

        // 코드 하이라이팅 적용
        document.querySelectorAll('pre code').forEach(block => {
            Prism.highlightElement(block);
        });
    }

    deleteSnippet(index) {
        const snippets = JSON.parse(localStorage.getItem('savedSnippets') || '[]');
        snippets.splice(index, 1);
        localStorage.setItem('savedSnippets', JSON.stringify(snippets));
        this.displaySavedSnippets();
    }
} 