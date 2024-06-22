
document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('form-container');
    const addRowButton = document.getElementById('add-row');
    const downloadButton = document.getElementById('download-config');

    function createRow(config, parentElement) {
        const row = document.createElement('div');
        row.classList.add('row');
        createInput(config, row, ["root"]);
        parentElement.appendChild(row);
    }

    function createInput(config, parentElement, labels) {
        const column = document.createElement('div');
        column.classList.add('column');
        // also add parent labels to aggregate
        labels.forEach(className => {
            column.classList.add(className);
        });

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
            for (const optionKey in config.options) {
                const option = document.createElement('option');
                option.value = optionKey;
                option.textContent = optionKey;
                input.appendChild(option);
            }
            input.addEventListener('change', (event) => {
                const selectedOption = event.target.value;
                const selectedConfig = config.options[selectedOption];
                const elements = parentElement.getElementsByClassName(config.label);
                const classArray = Array.from(labels);
                classArray.push(config.label)
                Array.from(elements).forEach(element => {
                    element.remove();
                });
                if (selectedConfig instanceof Array) {
                    selectedConfig.forEach(item => {
                        createInput(item, parentElement, classArray);
                    });
                }
            });
        }

        if (input) {
            column.appendChild(input);
            parentElement.appendChild(column);
        }
    }

    addRowButton.addEventListener('click', () => {
        createRow(NickelConfigOptions, formContainer);
    });

    downloadButton.addEventListener('click', async function () {
        const rows = formContainer.querySelectorAll('.row');
        const config = [];
        rows.forEach(row => {
            const select = row.querySelector('select');
            const selectedOption = select.value;
            if (selectedOption) {
                const inputs = Array.from(row.querySelectorAll('input, select')).slice(1);
                const inputValues = inputs.map(input => input.value).filter(value => value);
                config.push({ [selectedOption]: inputValues });
            }
        });
        const configText = JSON.stringify(config, null, 2);

        const zip = new JSZip();

        const response = await fetch('assets/KoboRoot.tgz');
        if (!response.ok) {
            alert('Failed to download KoboRoot.tgz');
            return;
        }

        const blob = await response.blob();
        zip.file('KoboRoot.tgz', blob);

        // // Add .nickel.png file from user input
        // const fileInput = document.getElementById('nickelPng');
        // const file = fileInput.files[0];
        // if (file) {
        //     zip.file('.adds/.nickel.png', file);
        // } else {
        //     alert('Please upload a .nickel.png file.');
        //     return;
        // }

        // Add config file
        zip.file('.adds/nm/config', configText);

        // Generate zip and trigger download
        zip.generateAsync({ type: 'blob' }).then(function (content) {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = 'nickelmenuconfig.zip';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    });


    createRow(NickelConfigOptions, formContainer);
});
