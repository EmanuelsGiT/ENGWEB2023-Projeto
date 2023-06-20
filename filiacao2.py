import re
import json

# Regex pattern to capture names
regex_pattern_filiacao = r'Filiação:\s(.*?)(?:\s+e|,\w)'
regex_pattern_related_material = r'Proc\.(\d+)'

def extract_name(unit_title):
    match = re.search(r'de genere de\s+(.+?)(?:,|$)', unit_title)
    if match:
        return match.group(1)
    else:
        return unit_title

def process_entry(entry, data):
    scope_content = entry.get("ScopeContent", "")
    match_filiacao = re.search(regex_pattern_filiacao, scope_content)
    if match_filiacao:
        filiacao = match_filiacao.group(0)
        entry["Filiacao"] = []

        for entry_data in data:
            if "ScopeContent" in entry_data and filiacao in entry_data["ScopeContent"]:
                entry["Filiacao"].append({"Id": entry_data["_id"], "Title": extract_name(entry_data["UnitTitle"])})

    else:
        entry["Filiacao"] = []

    related_material = entry.get("RelatedMaterial", "")
    match_related_material = re.findall(regex_pattern_related_material, related_material)
    if match_related_material:
        for match in match_related_material:
            for entry_data in data:
                if "UnitId" in entry_data and entry_data["UnitId"].lstrip("0") == match:
                    entry["Filiacao"].append({"Id": entry_data["_id"], "Title": extract_name(entry_data["UnitTitle"])})
                    break

    #entry["Filiacao"] = list({item["_id"]: item["UnitTitle"]} for item in entry["Filiacao"])


# Function to process the JSON file and write new data to a file
def process_json_file(input_file_path, output_file_path):
    with open(input_file_path, "r", encoding="utf-8") as input_file:
        data = json.load(input_file)

    for entry in data:
        process_entry(entry, data)

    with open(output_file_path, "w", encoding="utf-8") as output_file:
        json.dump(data, output_file, indent=4, ensure_ascii=False)

    print(f"New data written to: {output_file_path}")

# Example usage
input_json_file = "db.json"
output_json_file = "new_db2.json"
process_json_file(input_json_file, output_json_file)
