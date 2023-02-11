from flask import Flask, request, make_response, render_template


class produtos:
    
    def get_products():
      
        products = [
            {"id": 1, "name": "Produto 1"},
            {"id": 2, "name": "Produto 2"},
            {"id": 3, "name": "Produto 3"},
        ]
        return {"products": products}