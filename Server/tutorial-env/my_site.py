import jwt
from flask import Flask, request, make_response, render_template
import models.produtos as produtos



app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.template_folder = "views"
# app.config["TEMPLATES_FOLDER"] = "views"
# Armazene as credenciais de usuário em uma lista (na prática, você deve armazená-las em um banco de dados)
users = [{"username": "usuario", "password": "senha"}]

def check_auth(username, password):
    for user in users:
        if user["username"] == username and user["password"] == password:
            return True
    return False

def authenticate():
    return make_response(
        "Você precisa se autenticar para acessar esse recurso", 401,
        {"WWW-Authenticate": 'Bearer realm="Login Required"'}
    )

def generate_token(username):
    return jwt.encode({"username": username}, "secret_key", algorithm="HS256").decode("utf-8")

def verify_token(token):
    try:
        jwt.decode(token, "secret_key", algorithms=["HS256"])
        return True
    except jwt.DecodeError:
        return False

@app.route("/api/login", methods=["POST"])
def login():
    auth = request.authorization
    if not auth or not check_auth(auth.username, auth.password):
        return authenticate()
    token = generate_token(auth.username)
    return {"access_token": token}

@app.route("/api/products", methods=["GET"])
def get_products():
    # auth = request.headers.get("Authorization", None)
    # if not auth or not auth.startswith("Bearer") or not verify_token(auth[7:]):
    #     return authenticate()
    # Aqui você pode buscar produtos em um banco de dados ou em um arquivo
    
    return produtos().get_products()
    

@app.route("/")
def main_page():
    
    return "<h1> Bem vindo!</h2>"

@app.route("/<string:nome>")
def error(nome):
    variavel = nome
    return render_template("error.html", variavel=variavel)


if __name__ == "__main__":
    app.run(debug=True)


