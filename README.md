# CRTR: A Social Curation Tool for Museums

### Background

Read [the introductory blogpost here](https://cms633.github.io/updates/peter-pojiang-chaoran-xinwen-project-summary.html). Read [the final design report here](./design-report.pdf).

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

### TODO
- [ ] Artist pages
  - [ ] Support artist images
  - [ ] Scrape better bios from the collection
  - [ ] Show list of artworks
  - [ ] Convert artist 'A|B|C' -> three separate artists 'A', 'B', 'C'
- [ ] Similarity metrics
  - [ ] Use `fasttext` to come up with document vectors for each artwork, reduced in dimensionality
  - [ ] Train VGGNet to predict document vectors based on images
  - [ ] Similarity metrics for Artists as well as collections
  - [ ] Spin off FALCONN tables into separate processes
    - [ ] Update vectors with post-save triggers
    - [ ] Implement vector updates in FALCONN: https://github.com/FALCONN-LIB/FALCONN/issues/2
- [ ] Home Page
  - [ ] Better description
- [ ] Artwork page
  - [ ] Full-size image tiles with [OpenSeadragon](https://openseadragon.github.io/)
- [ ] Account creation
  - [ ] Log in with Facebook
  - [ ] Centralized website that allows viewing collections in each museum participating?
- [ ] In-collection controls
  - [ ] Ordering artworks
  - [ ] Removing artworks
    - [ ] Show a placeholder after deleting that allows for recovery in same edit-session
- [ ] Domain name?
  - [ ] Set up `crtr.peterdowns.com` to demo in the meantime
- [ ] Reach out
  - [ ] Coordinate with the team
  - [ ] Talk to the Barnes Foundation

### Technical Overview / Ideas

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
