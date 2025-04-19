/**
 * 현재 경로 아래의 모든 txt 파일을 읽음.
 * 파일 이름을 키로 하여 JSON 형식으로 변환하여 반환함.
 * @param {string} directoryName - 텍스트 파일이 있는 디렉토리 이름
 * @param {string} saveFileName - 저장할 JSON 파일의 이름
 * @returns {Object} - 텍스트 파일 이름을 키로 하여 JSON 형식으로 변환한 객체
 */
function txtToJSON(directoryName, saveFileName) {
  // directoryName 경로 아래의 모든 txt 파일을 읽음.
  const fs = require("fs");
  const path = require("path");
  const txtFiles = fs.readdirSync(path.join(process.cwd(), directoryName));

  // 파일 배열을 map 으로 돌리면서 JSON 배열 형식으로 추출함.
  // 이 때, 이 파일들은 한 줄에 하나씩 키워드가 적혀 있는 파일이며 각 키워드를 원소로 삼는 배열로 추출하는 것이 목적임.
  // 예시)
  // 키워드1
  // 키워드2
  // 키워드3
  // 키워드4
  // 키워드5
  // 이런 파일들을 읽어서 아래와 같은 형식의 배열로 추출함.
  // ['키워드1', '키워드2', '키워드3', '키워드4', '키워드5']
  //
  // 빈 줄은 trim으로 없애고, 각 키워드의 길이가 0이하일 때는 원소에 포함하지 않음.

  const jsonObject = {};

  txtFiles.forEach((file) => {
    if (file.endsWith('.txt')) {
      const fileContent = fs.readFileSync(path.join(process.cwd(), directoryName, file), "utf-8");
      const lines = fileContent.split('\n');
      const keywords = lines
        .map(line => line.trim())
        .filter(line => line.length > 0);

      // 파일 이름에서 .txt 확장자 제거
      const fileName = file.replace('.txt', '');
      jsonObject[fileName] = keywords;
    }
  });

  console.log(jsonObject);

  // 이 결과물을 json 파일로 저장함. 이때 json 파일의 이름은 디렉토리 이름과 같으며 저장 위치는 /JSON 폴더 임.

  const jsonFilePath = path.join(process.cwd(), 'JSON', `${saveFileName}.json`);
  fs.writeFileSync(jsonFilePath, JSON.stringify(jsonObject, null, 2));

  return jsonObject;
}

txtToJSON('1.캐릭터', '캐릭터 관련');
txtToJSON('2.배경스토리', '배경스토리 관련');
txtToJSON('3.기타', '기타');
