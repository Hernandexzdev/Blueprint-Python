import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { templatepy, templateHTML } from './templateManager';

export function createBlueprint(result: string) {
    let directorioProyecto: string | undefined;
    let routeFolder: string | undefined;
    let routeBlueprint: string | undefined;

    if (vscode.workspace.workspaceFolders) {
        directorioProyecto = vscode.workspace.workspaceFolders[0].uri.fsPath;

        routeBlueprint = path.join(directorioProyecto, 'blueprints');
        routeFolder = path.join(routeBlueprint, result);

        if (!fs.existsSync(routeBlueprint)) {
            fs.mkdirSync(routeBlueprint);
        }

        if (!fs.existsSync(routeFolder)) {
            fs.mkdirSync(routeFolder);
            
            // Creación del archivo Python
            const routeFilePy = path.join(routeFolder, `${result}.py`);
            const pyContent = templatepy(result);
            fs.writeFileSync(routeFilePy, pyContent);
            
            // Creación de la carpeta y archivo HTML
            const routeTemplate = path.join(routeFolder, 'templates');
            fs.mkdirSync(routeTemplate);

            const routeFileHTML = path.join(routeTemplate, `${result}.html`);
            const htmlContent = templateHTML(result);
            fs.writeFileSync(routeFileHTML, htmlContent);

            vscode.window.showInformationMessage(`The blueprint ${result} created successfully!`);
        } else {
            vscode.window.showErrorMessage(`The blueprint ${result} already exists`);
        }
    }
}
