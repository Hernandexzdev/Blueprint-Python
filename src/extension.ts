import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import {  templatepy, templateHTML} from './templates'

let directorioProyecto: string | undefined;
let routeFolder: string | undefined;
let routeFile: string | undefined;
let routeFileHTML: string | undefined;
let routeTemplate: string | undefined;
let routeBlueprint: string | undefined;

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "bp" is now active!');

    let disposable = vscode.commands.registerCommand('bp.blueprint', async () => {
        const result = await vscode.window.showInputBox({
            prompt: 'Please enter your name for the blueprint',
            placeHolder: 'Name',
            value: 'Example',
            validateInput: (value: string) => {
                return value.length > 0 ? undefined : 'You must enter a name';
            }
        });

        if (result !== undefined) {
            try {
                if (vscode.workspace.workspaceFolders) {
                    directorioProyecto = vscode.workspace.workspaceFolders[0].uri.fsPath;
                    
                    routeBlueprint = path.join(directorioProyecto, 'blueprints');
                    routeFolder = path.join(routeBlueprint, result);
                    if (!fs.existsSync(routeBlueprint)) {
                        
                        fs.mkdirSync(routeBlueprint);
                    }
                    console.log(routeBlueprint);
                    console.log(routeFolder);
                    
                    if (!fs.existsSync(routeFolder)) {
                        fs.mkdirSync(routeFolder);
                        routeFile = `${routeFolder}\\${result}.py`
                        let py = templatepy(result);
                        fs.writeFileSync(routeFile, py)
                        console.log('prueba de ruta',routeFile);
                        routeTemplate = `${routeFolder}\\templates`
                        fs.mkdirSync(routeTemplate);
                        routeFile = `${routeTemplate}\\${result}.html`
                        console.log(routeFile);
                        let html = templateHTML(result);
                        fs.writeFileSync(routeFile, html)
                        vscode.window.showInformationMessage(`The blueprint ${result} created successfully!`);
                    } else {
                        vscode.window.showErrorMessage(`The blueprint ${result} already exists`);
                    }
                }
            } catch (error) {
                vscode.window.showErrorMessage('Failed to create blueprint');
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
