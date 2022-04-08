export const col2row = (
  data: { id: string; title: string; content: string[] }[]
) => {
  const len = data[0]['content'].length
  const task: any = []
  let row: any = {}
  for (let i = 0; i < len; i++) {
    row = {}
    for (let j = 0; j < data.length; j++) {
      row[data[j]['title']] = data[j]['content'][i]
    }
    task.push(row)
  }
  console.log(task)

  return task
}

export const row2col = (data: any) => {
  console.log(data)
  const keys = Object.keys(data[0])

  return keys.map((key, index) => {
    return {
      id: `${index}`,
      title: key,
      content: data.map((value: any) => value[key]),
    }
  })
}

export const toCSV = (
  data: { id: string; title: string; content: string[] }[]
) => {
  let csv = Object.keys(data[0]).join(',') + '\n'
  data.forEach((metadata) => {
    csv += Object.values(metadata).join(',') + '\n'
  })

  return csv
}

export const downloadCSV = (csv: string) => {
  const blob = new Blob([csv], { type: 'text/csv' })

  const url = window.URL.createObjectURL(blob)

  return url
}
