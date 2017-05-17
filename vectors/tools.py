import falconn
import numpy as np


def create_table(works):
    try:
        vectors = np.array([work.get_vector() for work in works])
        mapping = {i: work.id for i, work in enumerate(works)}
        dataset = np.ndarray(vectors.shape, buffer=vectors, dtype=np.float32)
        n = len(dataset)  # number of items in the dataset
        d = len(dataset[0])  # length of a vector
        p = falconn.get_default_parameters(n, d)
        t = falconn.LSHIndex(p)
        t.setup(dataset)
        return t, mapping
    except Exception as e:
        print('Error creating table:', e)
        return None, {}


def to_ndarray(npa):
    return np.ndarray(
            npa.shape, buffer=npa, dtype=np.float32).astype(np.float32)
