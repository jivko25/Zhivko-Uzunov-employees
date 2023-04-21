import Papa from 'papaparse';

export const readFileFromInput = (file, onChangeValue) => {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (res) => {
        const resultObject = res.data.map((item) => {
            const currentDate = new Date(Date.now());
            const formattedDateNow = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1 > 10 ? currentDate.getMonth() + 1 : `0${currentDate.getMonth() + 1}`}-${currentDate.getDate()}`
            const DateTo = item.DateTo === 'null' ? formattedDateNow : item.DateTo;
            return {
                ...item,
                DateTo
            }
        })

        onChangeValue(resultObject)

        console.log(resultObject);

        return resultObject
    }
  })
};
