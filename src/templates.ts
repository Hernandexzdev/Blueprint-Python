export const templatepy = (name:String): string  => {let content = `
from flask import Blueprint, render_template


${name}_bp = Blueprint("${name}", __name__, template_folder="templates")


menu_bp.route("/${name}")
def ${name}():
return render_template("${name}.html")
    `;
    return content;
};

export const templateHTML = (name:String): string  => {let content = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Template ${name}</title>
</head>
<body>
    <h1>Page ${name}</h1>
</body>
</html>
    `;
    return content;
};