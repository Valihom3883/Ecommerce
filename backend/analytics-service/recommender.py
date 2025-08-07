import tensorflow as tf
from tensorflow_recommenders import tasks
import tensorflow_recommenders as tfrs

class ProductRecommender(tf.keras.Model):
    def __init__(self, user_model, product_model, products):
        super().__init__()
        self.user_model = user_model
        self.product_model = product_model
        self.task = tasks.Retrieval(
            metrics=tfrs.metrics.FactorizedTopK(
                products.batch(128).map(self.product_model)
            )
        )

    def compute_loss(self, features, training=False):
        user_embeddings = self.user_model(features["user_id"])
        product_embeddings = self.product_model(features["product_id"])

        return self.task(user_embeddings, product_embeddings)
