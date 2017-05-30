# CRTR: A Social Curation Tool for Museums

### Background

Read [the introductory blogpost here](https://cms633.github.io/updates/peter-pojiang-chaoran-xinwen-project-summary.html). Read [the final design report here](./design-report.pdf).

### Technical Overview

* Backend
    * Python
    * [Django](https://www.djangoproject.com/) because of past experience and ease of development.
    * [Postgres](https://www.postgresql.org/) as primary data store.
        * This supports some [full text search](https://www.postgresql.org/docs/8.3/static/textsearch.html) concepts, which we will use as first stab at implementation. If more complex queries are needed, we'll use [Elasticsearch](elastic.co).
        * [Django-Haystack](http://haystacksearch.org/) can make this easy to implement.
    * [Fast R-CNN](https://github.com/rbgirshick/fast-rcnn#requirements-hardware) implementation for doing some feature extraction. Can hopefully also be used for [similarity search](http://code.flickr.net/2017/03/07/introducing-similarity-search-at-flickr/).
        * Instead of silly hand-rolled, maybe use [FALCONN](https://falconn-lib.org/pdoc/falconn/) for cosine similarity search
        * It would be dope to find a trained version of [this model](https://arxiv.org/pdf/1412.7755v2.pdf)
* Frontend
    * Frontend components will be created with [React](https://facebook.github.io/react/).
    * Standard HTML/CSS

### Installation / Setup

First, install [yarn](https://yarnpkg.com/) and Python 3.5. Then install the Python and Javascript dependencies:

```bash
$ pip install -r requirements.txt
$ yarn install
```

Then set up the database:

```bash
$ ./manage.py migrate
```

Then, check out the instructions in `data/README.md` to learn how to populate the database with the dataset.
