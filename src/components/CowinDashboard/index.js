import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

import './index.css'

const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    vaccineCoverageData: [],
    ageData: [],
    genderData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCovidData()
  }

  getCovidData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.status === 200) {
      const lastSevenDaysVaccinationData = data.last_7_days_vaccination.map(
        eachItem => ({
          doseOne: eachItem.dose_1,
          doseTwo: eachItem.dose_2,
          vaccineDate: eachItem.vaccine_date,
        }),
      )
      const vaccinationByAgeData = data.vaccination_by_age.map(eachItem => ({
        age: eachItem.age,
        count: eachItem.count,
      }))
      const vaccinationByGender = data.vaccination_by_gender.map(eachItem => ({
        count: eachItem.count,
        gender: eachItem.gender,
      }))

      this.setState({
        vaccineCoverageData: lastSevenDaysVaccinationData,
        ageData: vaccinationByAgeData,
        genderData: vaccinationByGender,
        apiStatus: apiStatusConstants.success,
      })
      // console.log(apiStatus)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderVaccinationGraphs = () => {
    const {vaccineCoverageData, ageData, genderData} = this.state

    return (
      <>
        <div className="vaccine-container">
          <h1 className="vaccine-heading">Vaccination Coverage</h1>
          <VaccinationCoverage vaccinationDetails={vaccineCoverageData} />
        </div>
        <div className="vaccine-container">
          <VaccinationByGender vaccineGenderDetails={ageData} />
        </div>
        <div className="vaccine-container">
          <VaccinationByAge vaccineAgeDetails={genderData} />
        </div>
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  displayCovidGraphs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVaccinationGraphs()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="covid-dashboard-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo-icon"
          />
          <h1 className="logo-name">Co-WIN</h1>
        </div>
        <h1 className="heading">CoWIN Vaccination in India</h1>
        {this.displayCovidGraphs()}
      </div>
    )
  }
}

export default CowinDashboard
