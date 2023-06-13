import re
import json

# Regex pattern to capture names
regex_pattern = r'Filiação:\s(.*?)(?:\s+e|,\w)'

def process_entry(entry):
    scope_content = entry["ScopeContent"]
    match = re.search(regex_pattern, scope_content)
    if match:
        filiacao = match.group(0)
        entry["Filiacao"] = filiacao[len("Filiação: "):-2]
    else:
        entry["Filiacao"] = None


# Function to process the JSON file and write new data to a file
def process_json_file(input_file_path, output_file_path):
    with open(input_file_path, "r", encoding="utf-8") as input_file:
        data = json.load(input_file)

    for entry in data:
        process_entry(entry)

    with open(output_file_path, "w", encoding="utf-8") as output_file:
        json.dump(data, output_file, indent=4, ensure_ascii=False)

    print(f"New data written to: {output_file_path}")

# Example usage
input_json_file = "db.json"
output_json_file = "new_db.json"
process_json_file(input_json_file, output_json_file)
