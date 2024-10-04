import * as vscode from 'vscode';
import { createBlueprint } from './folderManager';

export function registerBlueprintCommand(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('bp.blueprint', async () => {
        const result = await vscode.window.showInputBox({
            prompt: 'Please enter your name for the blueprint',
            placeHolder: 'Name',
            value: 'Example',
            validateInput: (value: string) => {
                return value.length > 0 ? undefined : 'You must enter a name';
            }
        });

        if (result) {
            try {
                createBlueprint(result);
            } catch (error) {
                vscode.window.showErrorMessage('Failed to create blueprint');
            }
        }
    });

    context.subscriptions.push(disposable);
}
