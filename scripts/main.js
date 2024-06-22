document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('form-container');
    const addRowButton = document.getElementById('add-row');
    const downloadButton = document.getElementById('download-config');

    function createInput(config, parentElement, labels) {
        const column = document.createElement('div');
        column.classList.add('column', ...labels);

        let input;
        if (config.placeholder) {
            input = document.createElement('input');
            input.type = 'text';
            input.placeholder = config.placeholder;
        } else if (config.file) {
            input = document.createElement('input');
            input.type = 'file';
        } else if (config.options) {
            input = document.createElement('select');
            input.innerHTML = '<option value="">Select an option</option>';
            for (const [optionKey] of Object.entries(config.options)) {
                const option = document.createElement('option');
                option.value = optionKey;
                option.textContent = optionKey;
                input.appendChild(option);
            }
            input.addEventListener('change', (event) => {
                const selectedOption = event.target.value;
                const selectedConfig = config.options[selectedOption];
                const elements = parentElement.getElementsByClassName(config.label);
                Array.from(elements).forEach(element => element.remove());
                if (Array.isArray(selectedConfig)) {
                    selectedConfig.forEach(item => {
                        createInput(item, parentElement, [...labels, config.label]);
                    });
                }
            });
        }

        if (input) {
            column.appendChild(input);
            parentElement.appendChild(column);
        }
    }

    function createRow(config, parentElement) {
        const row = document.createElement('div');
        row.classList.add('row');
        createInput(config, row, ["root"]);
        parentElement.appendChild(row);
    }

    function gatherConfig() {
        const config = [];
        const rows = formContainer.querySelectorAll('.row');
        rows.forEach(row => {
            const select = row.querySelector('select');
            const selectedOption = select.value;
            if (selectedOption) {
                const inputValues = Array.from(row.querySelectorAll('input, select'))
                    .slice(1)
                    .map(input => input.value)
                    .filter(value => value);
                config.push([selectedOption, ...inputValues].join(':'));
            }
        });
        return config.join('\n');
    }

    async function downloadConfig() {
        const configText = gatherConfig();
        const zip = new JSZip();
        const response = await fetch('assets/KoboRoot.tgz');
        if (!response.ok) {
            alert('Failed to download KoboRoot.tgz');
            return;
        }
        const blob = await response.blob();
        zip.file('KoboRoot.tgz', blob);
        zip.file('.adds/nm/config', configText);
        const content = await zip.generateAsync({ type: 'blob' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(content);
        a.download = 'nickelmenuconfig.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    addRowButton.addEventListener('click', () => createRow(NickelConfigOptions, formContainer));
    downloadButton.addEventListener('click', downloadConfig);
    createRow(NickelConfigOptions, formContainer);
});
