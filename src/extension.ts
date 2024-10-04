import * as vscode from 'vscode';
import { registerBlueprintCommand } from './commandHandler';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "bp" is now active!');
    registerBlueprintCommand(context);
}

export function deactivate() {}
