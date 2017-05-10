# JS coding exercise

## Installation and execution

You are in the process (good luck!) for a JS developer position, so you know what to do with this, right?.

## The problem

As you already know from your previous research for this position, most insurance-related online businesses rely at one point or another on filling up a form of some sort.
In this particular case, the API returns the following structure representing a questionset:

> A questionset is an array of questions

> A question is an object with the following fields:

> * question: a text field that contains the text that is presented to the user
> * type: a text field that contains a question type (text, number, calendar, etc)
> * groups: an optional array of groups (see group definition below)
> * id: a string containing the question's id. It can only contain lowercase letters. Please note that these ids are not unique, but any given question can be uniquely identified knowing its question id and the group(s) that contain it.

> A group is an object with the following fields:

> * questions: an array of questions as described above
> * trigger: a value that makes the questions in the group visible (for instance: if you answered that you have claims with your previous insurer, you will be required to fill more questions about your claims)

The answers for a given questionset are a hash where the keys correspond to questions, following these rules:

> * If a question is not inside a group, its key is its id
> * If a question is inside a group, its key is the key of its "parent" question concatenated with a hyphen (``-``), the value of its trigger, another hyphen, and the question id. (one example could be: ``ownsCar-YES-carImported-YES-countryOfOrigin``)


``flattenTree(questionset, answers)`` is a function that, given a questionset as described above and some answers returns a flattened version of the questionset as an array of objects with the following fields;

> * text: the value of the corresponding ``question`` field of the input question
> * type: the value of the corresponding ``type`` field of the input question, but  *replacing "integer" with "number"*
> * id: a *unique* string identifying a question. These ids should follow the rules described for answer keys

The output list should not contain any question that is not triggered, and its order should correspond to a pre-order traversal of the input questionset.

## What you need to submit

A ``flattenTree`` implementation following the description above. Fork this repo, write code until happy, send us a link with your repo. Ideally, you should be following the rules below.
The directory examples contains three files:

* ``questionset.json``: is an example of a questionset definition
* ``answers.json``: the user answers as they will be passed onto ``flattenTree``
* ``expectedOutput.json``: the expected result of running ``flattenTree(q, a)`` where ``q`` is the contents of questionset.json above and ``a`` is the contents of ``answers.json`` above

## The rules (it was not going to be _that_ easy)

1. You can assume that the input values are always going to be valid.
1. You can replace this README.md file and document any aspect of your solution as you see fit.
1. Commit early, commit often.
   Please understand that this is our only way of getting an idea of how your development process works.
   Your commits will give us an idea of how you approach TDD, how you write your tests, how you make them pass, how you refactor.
   Don't be ashamed of committing broken code, just commit every significant step in getting to your solution.
1. Write node6 compatible code, but please use ES6. For the sake of simplicity, don't use any transpiler.
1. Use ``lodash-fp`` or ``ramda`` (we use the former, but choice is yours): we want to see a functional style solution.
1. Your solution *must include* at least, one test (use ``ava`` as specified on ``package.json``) that validates the provided examples (available under the directory ``examples``). If there is any inconsistency between the provided examples and any of the text above, *THE EXAMPLES ARE THE ULTIMATE SOURCE OF TRUTH*
