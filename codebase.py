import os

# List of files to collect
files_to_collect = [
    "global.css", "index.html", "setupTypeScript.js",
    "app.svelte", "main.js", "preload.js",
    "Topbar.svelte", "index.js"
]

def find_files(directory, filenames, depth=2):
    file_paths = []
    for root, dirs, files in os.walk(directory):
        if root[len(directory):].count(os.sep) < depth:
            for file in files:
                if file in filenames:
                    file_paths.append(os.path.join(root, file))
    return file_paths

def collect_files(file_paths, output_file):
    with open(output_file, 'w', encoding='utf-8') as txt_file:
        for file_path in file_paths:
            txt_file.write(f"Title: {os.path.basename(file_path)}\n")
            try:
                with open(file_path, 'r', encoding='utf-8') as file:
                    txt_file.write(file.read())
            except UnicodeDecodeError:
                txt_file.write("Error: Could not decode file content.\n")
            txt_file.write("\nEND OF CODE\n\n")

if __name__ == "__main__":
    directory = os.getcwd()  # Current working directory of the script
    output_file = os.path.join(directory, "output.txt")

    file_paths = find_files(directory, files_to_collect)
    collect_files(file_paths, output_file)
    print(f"Output written to {output_file}")
