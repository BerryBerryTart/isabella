# Isabella

Created with Django and React.js

## Why The Name Isabella?
It's a play on words! Isabelle is a secratary in the popular video game 'Animal Crossing.' And thus, this minimal app is meant to help organise and keep track of things!

### Features
- Reactive layout
- Ability to mark notes complete
- CRUD functionality
- Sort notes by classification

### Requirements
- Python3
- Pip3
- Node.js

### Installation
```sh
python -m venv env
env/bin/activate # On Windows use `env\Scripts\activate`
git clone {this project}
cd isabella
pip install -r requirements.txt
npm install
npm run dev
python manage.py migrate
python manage.py runserver
```

### Preview
![Basic Layout](/demo/demo1.PNG)
<br>
<em>Basic Layout</em>

![Editing A Card](/demo/demo2.PNG)
<br>
<em>Editing A Card</em>