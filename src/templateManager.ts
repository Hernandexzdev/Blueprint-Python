export const templatepy = (name:String): string  => {let content = `
from flask import Blueprint, render_template
${name}_bp = Blueprint("${name}", __name__, template_folder="templates")
    
    
@${name}_bp.route("/${name}", methods=['GET', 'POST'])
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

export const templatemainHTML = (name:String): string => {let content = `
from flask import Flask, render_template, send_from_directory
from blueprints.${name}.${name} import ${name}_bp

app = Flask(__name__)
app._static_folder = 'static'
    

@app.route("/")
def index():
  return "<h1>Hello world with flask</h1>"
    
app.register_blueprint(${name}_bp)

if __name__ == "__main__":
  app.run(debug=True)
    ` 
    return content;
 };