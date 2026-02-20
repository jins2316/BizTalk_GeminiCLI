document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const targetAudience = document.getElementById('targetAudience');
    const convertButton = document.getElementById('convertButton');
    const outputText = document.getElementById('outputText');
    const copyButton = document.getElementById('copyButton');

    // Function to call the backend API
    const convertText = async () => {
        const text = inputText.value;
        const target = targetAudience.value;

        if (!text) {
            alert('변환할 텍스트를 입력해주세요.');
            return;
        }

        convertButton.disabled = true;
        convertButton.textContent = '변환 중...';

        try {
            const response = await fetch('http://127.0.0.1:5000/api/convert', { // Assuming Flask runs on 5000
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text, target: target }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'API 요청 실패');
            }

            const data = await response.json();
            outputText.value = data.converted_text;
        } catch (error) {
            console.error('Error during conversion:', error);
            outputText.value = `오류 발생: ${error.message}. 잠시 후 다시 시도해주세요.`;
        } finally {
            convertButton.disabled = false;
            convertButton.textContent = '변환하기';
        }
    };

    // Event listener for convert button
    convertButton.addEventListener('click', convertText);

    // Event listener for copy button
    copyButton.addEventListener('click', () => {
        if (outputText.value) {
            navigator.clipboard.writeText(outputText.value)
                .then(() => {
                    alert('변환된 텍스트가 복사되었습니다!');
                })
                .catch(err => {
                    console.error('클립보드 복사 실패:', err);
                    alert('텍스트 복사에 실패했습니다.');
                });
        } else {
            alert('복사할 텍스트가 없습니다.');
        }
    });
});
