import fs from 'fs'

export function writeJsonToFile(path, data) {
    const newFileData = JSON.stringify(data)
    fs.writeFileSync(path, newFileData);

}

export function readJsonFromFile(path) {

    const fileData = fs.readFileSync(path);
    // fileData is not an array its just a string
    const jsonValue = JSON.parse(fileData)

    return jsonValue
}