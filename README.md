
# Jokes API

This project is a simple Flask API that serves jokes from a list. It supports returning random jokes and filtering jokes by type. The jokes are taken from https: //github.com/15Dkatz/official_joke_api


## Installation

#### 1. Clone this repository.


```bash
git clone https://github.com/yourusername/jokes-api.git

```
#### 2. Navigate to the project directory.
```bash
cd jokes-api

```
#### 3. Install the required dependencies.
```bash
pip install -r requirements.txt

```

## Usage

##### To start the server, run:
```python
python app.py

```
The server will start, and you can access the API at ` http://localhost:5000/api/random-joke` 


## Endpoints
-  `GET /api/random-joke` : Returns a random joke.
-  ` GET /api/random-joke?type=<joke_type>: `Returns a random joke of - the specified type (e.g., `general` , `knock-knock` , `programming` , or `dad` ).
## Example

##### Request:

```
curl http://localhost:5000/api/random-joke?type=programming

```
##### Response:

```
{
  "type": "programming",
  "setup": "What's the best thing about a Boolean?",
  "punchline": "Even if you're wrong, you're only off by a bit."
}


```
## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.



 
