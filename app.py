import json
from flask import Flask, jsonify, request
import random

app = Flask(__name__)

with open('jokes.json', 'r', encoding='utf-8') as file:
    jokes = json.load(file)

@app.route('/api/random-joke', methods=['GET'])
def get_random_joke():
    joke_type = request.args.get('type')  # Get the joke type from the query parameters
    if joke_type:
        filtered_jokes = [joke for joke in jokes if joke['type'] == joke_type]
        if filtered_jokes:
            return jsonify(random.choice(filtered_jokes))
        else:
            return jsonify({"error": "No jokes found for the given type"}), 404
    else:
        return jsonify(random.choice(jokes))

if __name__ == '__main__':
    app.run(debug=True)
