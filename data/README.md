All of the data in this project comes from the Metropolitan Museum of Art. They have lovingly published their data [as a CSV online](https://github.com/metmuseum/openaccess/blob/master/MetObjects.csv). Even just the metadata is too large to be committed to git; before the project can be run, it must be downloaded and inserted into the database using the scripts in this directory.

```bash
$ cd data
$ make metadata.csv # download metadata
$ ./insert_works_into_db.py
$ ./download_image_urls.py
$ ./calculate_vectors.py highlighted
$ ./add_label.py 
```
