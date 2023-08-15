# Swanton Chat Bot

A chatbot web app for the [Swanton Virtual Assistant](https://github.com/swantonpoppycp/CalPoppy). Its purpose is to answer historical and cultural questions about Swanton Pacific Ranch.

[See it live](https://swantonpoppy.org)

Features include:

- A simplistic chat interface where users send messages to the Swanton Virtual Assistant
    - Messages that can be converted from speech to text
- FAQs that direct visitors toward interesting historical stories about the ranch.
- A simple interactive map to learn about different locations on the ranch.

Legacy repos:

- https://github.com/calpoly-csai/swanton
- https://github.com/EdikusRex/CalPoppy
- https://github.com/ebarruel/CalPoppy-Archive

## Getting Started

1. Clone this repo: `https://github.com/swantonpoppycp/CalPoppy.git`
2. Navigate to folder: `cd CalPoppy`
3. Install dependencies: `npm install`
4. Start the backend server (see section below)
5. Start the development server (in a new terminal in the main CalPoppy directory): `npm start`
6. Open the app in your browser: `http://localhost:3000`

### Running the backend

> (Note that `python` may have to be replaced with `python3`)

1. Navigate to folder: `cd flask-server`
2. Update submodule if KGQA is empty: `git submodule update --init --recursive`

If the submodule won't update, try removing it and then adding it again:
`git rm -r --cached KGQA`
`git submodule add https://github.com/mathurma/KGQA KGQA`

#### On Mac/Linux:

3. Create a virtual environment: `python -m venv venv`
4. Activate the virtual environment: `source venv/bin/activate`
5. Install the requirements.txt file: `pip install -r requirements.txt` or `python -m pip install -r requirements.txt`
6. Run the server: `flask run`

#### On Windows:

3. Create a virtual environment: `python -m venv venv`
4. Activate the virtualenv: `venv\Scripts\activate`
5. Install the requirements.txt file: `pip install -r requirements.txt`
6. Manually install flask and encorewebsm
    * pip install flask
    * pip install -U setuptools wheel
    * pip install -U spacy
    * python -m spacy download en_core_web_sm
7. Run the server: `flask run`

## Updating the Front End

> Note: Ensure to only pull the src folder, changes were made to flask-server, package.json, and other files to make the project compatible to deploy to Google Cloud App Engine.

1. Check out the gcloud config branch: `git checkout gcloud-config`
2. Pull the src folder from master into gcloud-config: `git checkout master -- src`
3. Add, Commit, and push the changes to gcloud-config to trigger the Github Actions workflow to update the website on Google Cloud App Engine
    * `git add src`
        > You can run `git status` here to check that only files in src are the Changes to be committed
    * `git commit -m "Pulled Master frontend"`
    * `git push`
