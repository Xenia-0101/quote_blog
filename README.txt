To run app:

-- create virtual environment and install required packages

cd .\backend\

python -m venv .venv

.\.venv\Scripts\activate

pip install -r requirements.txt

-- initialise database

flask db init
flask db migrate -m "message"
flask db upgrade


-- initialise frontend

cd ..\frontend\
npm install


-- run backend
npm run start-backend
-- -- to insert initial data, visit: http://127.0.0.1:5000/quotes/insert_initial

-- run app
npm run dev

