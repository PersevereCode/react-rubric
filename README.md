# This is a .json file reader that renders an interactive rubric
## Writing the json file:

The general shell of the json file at looks like this:

```
"projectName": <Project Title Here>,
"sections": [<array of section objects>]
```
These are the only two keys in the global scope of the json file.

Each section in the `sections` array is an object with two required keys: `sectionTitle` and `questions`, with an optional `message` key that will display a message to the reader at the top of the section.

```
"sectionTitle": <Title of Section Here>,
"message": <Message to the reader>,
"questions": [<Array of question objects>]
```

In the `questions` array, should be a series of questions either "true/false" questions, or "likert" evaluations, that is, a sliding scale of credit. 

### True/False

The 'boolean' questions are normally laid out with four keys: `criteria`, `type`, and `score`. The `type` getting the value `"boolean"` and a `message`.

```
"criteria": <The successful outcome in the project>,
"type": "boolean",
"message": <The unsuccessful message for the gradebox>
```

* Note: The successful fulfillment of the criteria will result in no notes in the gradebox on the bottom, whereas non-fulfillment will result in the `message` field being noted in the gradebox.

### Likert

The 'likert' questions are normally laid out with three keys: `criteria`, `type`, and `options`. The `type` getting the value `"likert"` and a `message`.

```
"criteria": <The successful outcome in the project>,
"type": "boolean",
"options":<An array of incomplete to complete criteria descriptions>
"message": <The unsuccessful message for the gradebox>
```

The `options` field should be organized from least scored to greatest, with the last description in the array being the highest possible score in the criteria.

```
"description": <The description on the evaluation>,
"score": <The score this particular description results in>
```

* Note: If the Likert criteria is anything less than the highest possible, the gradebox will reflect it below.
