import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {vaccineAgeDetails} = props
  const {gender, count} = vaccineAgeDetails

  return (
    <div>
      <h1 className="vaccine-heading">Vaccination by age</h1>
      <PieChart width={1000} height={300}>
        <Pie
          data={vaccineAgeDetails}
          cx="50%"
          cy="50%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#2d87bb" />
          <Cell name="44-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#64C2A6" />
        </Pie>

        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
