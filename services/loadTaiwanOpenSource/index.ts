import fs from 'fs'

interface Attraction {
  Add: string
  Changetime: string
  Class1: string
  Class2: string
  Class3: string
  Description: string
  Gov: string
  Id: string
  Keyword: string
  Level: string
  Map: string
  Name: string
  Opentime: string
  Orgclass: string
  Parkinginfo_Px: number | null
  Parkinginfo_Py: number | null
  Parkinginfo: string
  Picdescribe1: string
  Picdescribe2: string
  Picdescribe3: string
  Picture1: string
  Picture2: string
  Picture3: string
  Px: number
  Py: number
  Region: string
  Remarks: string
  Tel: string
  Ticketinfo: string
  Toldescribe: string
  Town: string
  Travellinginfo: string
  Website: string
  Zipcode: string
  Zone: string
}

interface AttractionData {
  XML_Head: {
    Listname: string
    Language: string
    Updatetime: string
    Infos: { Info: Attraction[] }
  }
}

const basePath = './docs/台灣/_開源資料'

function imageMarkDownTemplate(url: string) {
  return url ? `![${url}](${url})` : ''
}

function hideTitleIfEmpty(title: string, value: string) {
  if (!value) return ''
  return title + '\n' + value
}

;(async () => {
  const response = await fetch(
    `https://media.taiwan.net.tw/XMLReleaseALL_public/scenic_spot_C_f.json`,
  )

  const data: AttractionData = await response.json()

  const attractions = data.XML_Head.Infos.Info

  attractions.forEach(
    ({
      Add,
      Description,
      Name,
      Opentime,
      Picture1,
      Picture2,
      Picture3,
      Region,
      Remarks,
      Tel,
      Toldescribe,
      Town,
      Travellinginfo,
      Ticketinfo,
      Website,
    }) => {
      const newPath = Region
        ? `${basePath}/${Region}/${Town ?? '其它'}`
        : `${basePath}/${'其它'}`

      if (!fs.existsSync(newPath)) {
        fs.mkdirSync(newPath, { recursive: true })
      }

      const title = Name.replace(/\//g, ' ')

      const content = `# ${title}

${imageMarkDownTemplate(Picture1)}
${imageMarkDownTemplate(Picture2)}
${imageMarkDownTemplate(Picture3)}

## 介紹

${Toldescribe ?? Description}
${Remarks}

${hideTitleIfEmpty('## 交通資訊', Travellinginfo)}

${hideTitleIfEmpty('## 營業時間', Opentime)}

${hideTitleIfEmpty('## 售票資訊', Ticketinfo)}


## 聯絡資訊
${hideTitleIfEmpty('### 電話', Tel)}
${hideTitleIfEmpty('### 地址', Add)}
${hideTitleIfEmpty('### 官方網站', Website)}

::: info
以上資料來自 [數位發展部 - 觀光資訊資料庫](https://data.gov.tw/dataset/7777#downloadJSON=true)
:::`

      fs.writeFileSync(`${newPath}/${title}.md`, content, 'utf-8')
    },
  )
})()
