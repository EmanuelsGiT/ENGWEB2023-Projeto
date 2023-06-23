#!/bin/bash

mongoimport --db Project --collection users --file /data/users.json --jsonArray
mongoimport --db Project --collection inquiricoes --file /data/inquiricoes.json --jsonArray
mongoimport --db Project --collection posts --file /data/posts.json --jsonArray
