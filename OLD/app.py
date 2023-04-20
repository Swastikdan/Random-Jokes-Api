# Import Flask and necessary modules
import json
from flask import Flask, jsonify, request
import random

# Create a Flask app
app = Flask(__name__)

with open('jokes.json', 'r', encoding='utf-8') as file:
    jokes = json.load(file)

# Create a route to get a random joke
@app.route('/api/random-joke', methods=['GET'])
def get_random_joke():
    # Get the joke type from the query parameters
    joke_type = request.args.get('type')
    
    # If a joke type is specified
    if joke_type:
        # Filter the list of jokes to get the ones with the specified type
        filtered_jokes = [joke for joke in jokes if joke['type'] == joke_type]
        
        # If there are jokes with the specified type
        if filtered_jokes:
            # Return a random joke from the filtered list
            return jsonify(random.choice(filtered_jokes))
        # If there are no jokes with the specified type
        else:
            # Return an error message with status code 404
            return jsonify({"error": "No jokes found for the given type"}), 404
    # If no joke type is specified
    else:
        # Return a random joke from the list of all jokes
        return jsonify(random.choice(jokes))

# Run the app if this file is executed
if __name__ == '__main__':
    app.run(debug=False)
