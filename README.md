# CRTR: A Social Curation Tool for Museums

### Background

[Read the blogpost here.](https://cms633.github.io/updates/peter-pojiang-chaoran-xinwen-project-summary.html)

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
        * [py-cooperhewitt](https://github.com/cooperhewitt/py-cooperhewitt-roboteyes-colors) for color extraction
        * [Minkowski](http://www.ee.columbia.edu/ln/dvmm/researchProjects/MultimediaIndexing/VisualSEEk/acmmm96/node8.html) distance metric for image similarity
        * [sk-learn](http://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.CountVectorizer.html) for word vectors -> features
* Frontend
    * Frontend components will be created with [React](https://facebook.github.io/react/).
    * Standard HTML/CSS
    
### More Links

- [Barnes Readme](https://github.com/BarnesFoundation/CollectionWebsite/blob/master/ARCHITECTURE.md) for some inspiration


### Timeline
* April 19, 2017 – Initial Project Presentation, feedback
* April 26, 2017 – Short write-up of project progress (Github), brief in-class presentation, possible paper prototype
* May 3, 2017 – Written summary of project progress, draft of Digital Prototype, refinement of prototype, brief presentation & feedback in class
* May 10, 2017 – Presentation of prototypes (dry run), draft of final paper
* May 17, 2017 – Presentations of completed projects, design document completed 

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
