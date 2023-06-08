import csv
import json

data = []

csv_file = input("Insira o nome do ficheiro de input: ")
with open(csv_file, 'r', encoding='utf-8') as file:
    reader = csv.DictReader(file, delimiter=';')
    for row in reader:
        row['_id'] = row.pop('﻿ID')
        data.append(row)

json_file = input("Insira o nome do ficheiro de output: ")
with open(json_file, 'w', encoding='utf-8') as file:
    json.dump(data, file, indent=4, ensure_ascii=False)

print("CSV convertido para JSON com sucesso!")
