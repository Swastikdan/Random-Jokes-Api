
# Jokes API

This is a Flask app that provides two API routes to get random jokes or a specific joke by ID from two different databases, "jokes.db" and "singleliner.db".


## Installation

#### 1. Clone this repository.


```bash
git clone https://github.com/Swastikdan/Random-Jokes-Api.git

```
#### 2. Navigate to the project directory.
```bash
cd Random-Jokes-Api

```
#### 3. Install the required dependencies.
```bash
pip install -r requirements.txt

```
## Live Preview
You can try out this application live  at the following links:

``` 
https://jokemasterapi.vercel.app/api/jokes

```


``` 
https://jokemasterapi.vercel.app/api/singleliner

```
Please note that the demo version may not have the full functionality of the locally hosted version and may be slower due to the limitations of the hosting platform. Additionally, this demo version is intended for demonstration purposes only and is not intended for use in a production environment.
## Usage

##### To start the server, run:
```python
python app.py

```
The app will start running on ` http://localhost:5000/` 


## API Endpoints
Get a random joke or a specific joke by ID
-  `/api/jokes` 
-  ` /api/singleliner `
Request parameters

| Parameter | Example |Requests |
|----------|----------|----------|
| result	 | int	 | The number of jokes to return. Defaults to 1. |
| id | int | The ID of a specific joke to return. |
	
Example Requests

```
/api/jokes?result=2
```
```
/api/singleliner?id=3bf77
```
Example Response
```
[
  {
    "id": "ee1d3",
    "punchline": "#3 Swim with the sharks,\n#2 Have an account on Ashley Madison, \n#1 riding a street car in Charlotte NC. \n",
    "setup": "The Top Three things for Halloween you can do now in North Carolina:"
  },
  {
    "id": "88720",
    "punchline": "We played smash bros from 12 to 12!",
    "setup": "My girlfriend told me, \"I wanna smash!\""
  }
]
```

```
[
  {
    "id": "3bf77",
    "joke": "Married Couple Friend:hey how's your married life buddy..... Jhon: 20 years before it was like heaven ....... 20 years after no fucks given"
  }
]

```

## Database Schema

The "jokes.db" database has a table called "jokes" with the following columns:

| Column | Type	 | Description |
|----------|----------|----------|
| id | int| The unique ID of the joke. |
| setup| text | The setup of the joke. |
| punchline | text | The punchline of the joke. |

The "singleliner.db" database has a table called "singleliner" with the following columns:

| Column | Type	 | Description |
|----------|----------|----------|
| id | int| The unique ID of the single-liner joke. |
| joke| text | The text of the single-liner joke. |

## Contributing

Contributions are always welcome!

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.


