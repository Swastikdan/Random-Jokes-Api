from flask import Flask, jsonify, request
import sqlite3

app = Flask(__name__)

# Function to connect to the database
def get_db_connection(db_name):
    conn = sqlite3.connect(db_name)
    conn.row_factory = sqlite3.Row
    return conn

# Route to get a single-liner joke
@app.route('/api/singleliner')
def get_singleliner_joke():
    # Get query parameters
    result = request.args.get('result', default=1, type=int)
    id = request.args.get('id')
    
    # Connect to the database
    conn = get_db_connection('singleliner.db')

    # Fetch the joke by id or by random
    if id:
        joke = conn.execute('SELECT * FROM singleliner WHERE id = ?', (id,)).fetchone()
        jokes = [joke] if joke else []
    else:
        jokes = conn.execute('SELECT * FROM singleliner ORDER BY RANDOM() LIMIT ?', (result,)).fetchall()

    # Close the database connection
    conn.close()
    
    # Return the joke(s) as JSON
    response = {'success': True, 'jokes': [dict(j) for j in jokes]} if jokes else {'success': False}
    return jsonify(response)

# Route to get a joke
@app.route('/api/jokes')
def get_joke():
    # Get query parameters
    result = request.args.get('result', default=1, type=int)
    id = request.args.get('id')
    
    # Check if result exceeds 10
    if result > 10:
        return jsonify({'success': False, 'error': 'Parameter value not allowed. Maximum value for "result" is 10.'})

    # Connect to the database
    conn = get_db_connection('jokes.db')

    # Fetch the joke by id or by random
    if id:
        joke = conn.execute('SELECT * FROM jokes WHERE id = ?', (id,)).fetchone()
        jokes = [joke] if joke else []
    else:
        jokes = conn.execute('SELECT * FROM jokes ORDER BY RANDOM() LIMIT ?', (result,)).fetchall()

    # Close the database connection
    conn.close()

    response = {'success': True, 'jokes': [dict(j) for j in jokes]} if jokes else {'success': False}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=False)
