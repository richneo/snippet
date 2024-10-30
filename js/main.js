const generator = new SnippetGenerator();

// 이벤트 리스너 설정
document.getElementById('languageSelect').addEventListener('change', (e) => {
    generator.currentLanguage = e.target.value;
    generator.generateInputs();
});

document.getElementById('categorySelect').addEventListener('change', (e) => {
    generator.currentCategory = e.target.value;
    generator.generateInputs();
});

document.getElementById('copyBtn').addEventListener('click', () => {
    const code = document.getElementById('snippetPreview').textContent;
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
});

document.getElementById('saveBtn').addEventListener('click', () => {
    generator.saveSnippet();
});

// 초기화
generator.generateInputs();
generator.displaySavedSnippets(); 