import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const VaccinationCoverage = props => {
  const {vaccinationDetails} = props
  const {doseOne, doseTwo, vaccineDate} = vaccinationDetails
  console.log('in vaccine')
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={vaccinationDetails}
          margin={{
            top: 5,
          }}
          width={1000}
          height={300}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: '##6c757d',
              strokeWidth: 1,
              fontSize: 15,
              fontFamily: 'Roboto',
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: '#6c757d',
              strokeWidth: 0.5,
              fontSize: 15,
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: 20,
              marginBottom: 10,
              textAlign: 'center',
              fontSize: 12,
              fontFamily: 'Roboto',
            }}
          />
          <Bar dataKey="doseOne" name="Dose 1" fill=" #5a8dee" barSize="20%" />
          <Bar dataKey="doseTwo" name="Dose 2" fill="#f54394" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default VaccinationCoverage
