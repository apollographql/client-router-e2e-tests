#!/bin/bash

subgraphs=("products" "users" "pandas")

url_products="http://products:4000/graphql"
url_users="http://users:4000/graphql"
url_pandas="http://pandas:4000/graphql"

schema_products="subgraphs/products/products.graphql"
schema_users="subgraphs/users/users.graphql"
schema_pandas="subgraphs/pandas/pandas.graphql"
