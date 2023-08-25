
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    vscode.commands.registerCommand('mybc.helloWorld', () => {
        // Read and parse the .bcport file
      ///  const filePath = path.join(context.extensionPath, 'dummy.bcport');
        //const fileContent = fs.readFileSync(filePath, 'utf-8');
        //const keyValuePairs = fileContent.split('\n').map(line => line.trim());

        // Create a webview panel
        const panel = vscode.window.createWebviewPanel(
            'keyValuePairs', // Identifies the type of the webview
            'Key-Value Pairs', // Title of the panel
            vscode.ViewColumn.One, // Editor column to show the panel
            {}
        );

        // Set up the HTML content
        panel.webview.html = getWebviewContent();
        let storedInput = ''; // Initialize a variable to store the user input

        // Handle messages from the webview
        panel.webview.onDidReceiveMessage(message => {
            if (message.command === 'userInput') {
                storedInput = message.value; // Store the received user input
                console.log('Message sent to extension:', storedInput); // Log the message
                vscode.window.showInformationMessage(`User entered: ${storedInput}`);
            }
        });
    });
}

function getWebviewContent(): string {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
            </style>
        </head>
        <body>
            <h1>Key-Value Pairs</h1>

            <button id="submitBtn">Submit</button>
            <input type="text" id="userInput" placeholder="Enter a value">

            <script>
                const vscode = acquireVsCodeApi(); // Get the vscode API object

                const submitBtn = document.getElementById('submitBtn');
                const userInput = document.getElementById('userInput');

                let enteredData = ''; // Initialize a variable to store user input

                submitBtn.addEventListener('click', () => {
                    const value = userInput.value;
                    enteredData = value; // Store the user input
                    vscode.postMessage({ command: 'userInput', value }); // Send the input to extension
                });
            </script>
        </body>
        </html>
    `;
}


