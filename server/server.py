# -*- coding: utf-8 -*-
"""
Created on Thu Nov  2 15:56:09 2017

@author: James Page
"""

import os
from flask import Flask, render_template, request, redirect, url_for, flash
from werkzeug.utils import secure_filename
import sud_detector
import json

UPLOAD_FOLDER = '\puzzles'
ALLOWED_EXTENSIONS = set(['png', 'jpg'])
dir_path = os.path.dirname(os.path.realpath(__file__))

app = Flask(__name__, static_folder="../www/dist", 
            template_folder = "../www")
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/', methods=['POST', 'GET'])
def upload_file():
    puz = []
    if request.method == 'POST':
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            #filename = secure_filename(file.filename)
            print(dir_path)
            #path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            #file.save(dir_path + path)
            puz = sud_detector.train(file)
            return str(puz)
            #return redirect(request.url)
    if request.method == 'GET':
        print('isget')
        if puz != []:
            print('getting puz')
            return json.encode(puz)
        

if __name__ == "__main__":
    app.run()