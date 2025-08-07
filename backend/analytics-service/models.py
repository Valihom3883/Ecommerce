import tensorflow as tf

user_model = tf.keras.Sequential([
    tf.keras.layers.StringLookup(
        vocabulary=["_UNKNOWN", "user1", "user2"]),
    tf.keras.layers.Embedding(3, 32)
])

product_model = tf.keras.Sequential([
    tf.keras.layers.StringLookup(
        vocabulary=["_UNKNOWN", "product1", "product2"]),
    tf.keras.layers.Embedding(3, 32)
])
