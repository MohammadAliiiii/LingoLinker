function getText() {
    const inputTextArea = document.getElementById('inputText').value;
    const selectedOption = document.getElementById('languages').value;
    console.log(selectedOption)
    console.log('Input Text:', inputTextArea);

    const url = 'https://text-translator2.p.rapidapi.com/translate';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'a2daf54f03msh626f0f8687cc823p19aeefjsn5d5a8907a071',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
        },
        body: new URLSearchParams({
            source_language: 'en',
            target_language: selectedOption,
            text: inputTextArea,
        }),
    };

    (async () => {
        try {
            const response = await fetch(url, options);
            const result = await response.text();
            console.log('Raw API Response:', result);

            // Check if the response is valid JSON
            let decodedResponse;
            try {
                decodedResponse = JSON.parse(result);
                console.log('Parsed JSON Response:', decodedResponse);
                
                // Access the translated text from the response
                const translatedText = decodedResponse.data.translatedText;
                console.log('Translated Text:', translatedText);
                document.getElementById('convertedText').textContent = translatedText;

            } catch (jsonError) {
                // If it's not JSON, try decoding as plain text
                decodedResponse = decodeURIComponent(result);
                console.log('Decoded Text Response:', decodedResponse);
            }
        } catch (error) {
            console.error(error);
        }
    })();
}
