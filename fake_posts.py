import json
from faker import Faker
import random

fake = Faker()

entries = []

for _ in range(100):
    entry = {
        "nome": fake.first_name(),
        "descricao": fake.sentence(),
        "data": fake.iso8601(),
        "registo": str(random.randint(1000000, 9999999)),
        "coments": []
    }

    for _ in range(random.randint(0, 5)):
        comment = {
            "username": fake.first_name(),
            "descricao": fake.sentence()
        }
        entry["coments"].append(comment)

    entries.append(entry)

json_data = json.dumps(entries, indent=2)

with open('entries.json', 'w') as file:
    file.write(json_data)
