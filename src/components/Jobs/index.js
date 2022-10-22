import Cookies from 'js-cookie'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'
import JobCard from '../JobCard'
import Filter from '../Filter'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const activeStatus = {
  initial: 'Initial',
  progress: 'progress',
  success: 'success',
  failure: 'failure',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobsList: '',
    status: 'initial',
    empList: [],
    salaryList: [],
    searchInput: '',
    empType: '',
    salary: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  onCheckEmp = Id => {
    const {empList} = this.state
    if (empList.includes(Id)) {
      const filteredList = empList.filter(each => each !== Id)
      const updatedList = filteredList.join(',')
      this.setState(
        {
          empType: updatedList,
          empList: filteredList,
        },
        this.getJobsList,
      )
    } else {
      empList.push(Id)
      const newList = empList.join(',')
      this.setState(
        {
          empType: newList,
          empList,
        },
        this.getJobsList,
      )
    }
  }

  onCheckSalary = Id => {
    const {salaryList} = this.state
    if (salaryList.includes(Id)) {
      const filteredList = salaryList.filter(each => each !== Id)
      const updatedList = filteredList.join(',')
      this.setState(
        {
          salary: updatedList,
          salaryList: filteredList,
        },
        this.getJobsList,
      )
    } else {
      salaryList.push(Id)
      const newList = salaryList.join(',')
      this.setState(
        {
          salary: newList,
          salaryList,
        },
        this.getJobsList,
      )
    }
  }

  getJobsList = async () => {
    this.setState({status: activeStatus.progress})
    const {searchInput, salary, empType} = this.state
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${salary}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachJob => ({
        jobDescription: eachJob.job_description,
        companyLogo: eachJob.company_logo_url,
        location: eachJob.location,
        packages: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
        employmentType: eachJob.employment_type,
        jobId: eachJob.id,
      }))
      this.setState({
        jobsList: updatedData,
        status: activeStatus.success,
      })
    } else {
      this.setState({status: activeStatus.failure})
    }
  }

  zeroList = () => (
    <div className="failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  onSuccess = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return this.zeroList()
    }

    return (
      <ul>
        {jobsList.map(eachJob => (
          <JobCard key={eachJob.id} eachJobDetails={eachJob} />
        ))}
      </ul>
    )
  }

  onProgress = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="blue" height={50} width={50} />
    </div>
  )

  retryButton = () => this.getJobsList()

  onFailure = () => (
    <div className="failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>we cannot seem to find the page you are looking for </p>
      <div className="retry">
        <button className="Retry" type="button" onClick={this.retryButton}>
          Retry
        </button>
      </div>
    </div>
  )

  LoadingContent = () => {
    const {status} = this.state
    switch (status) {
      case 'success':
        return this.onSuccess()
      case 'failure':
        return this.onFailure()
      case 'progress':
        return this.onProgress()
      default:
        return null
    }
  }

  searchButton = () => {
    this.getJobsList()
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchInput, salaryValue, eTypeValue} = this.state
    return (
      <>
        <div className="jobs-main-container">
          <Header />
          <div className="jobs-home-content">
            <div className="left-side-card">
              <div>
                <Profile />
                <hr />
              </div>
              <div>
                <Filter
                  eList={employmentTypesList}
                  salaryList={salaryRangesList}
                  onCheckEmp={this.onCheckEmp}
                  onCheckSalary={this.onCheckSalary}
                  eTypeValue={eTypeValue}
                  salaryValue={salaryValue}
                />
              </div>
            </div>
            <div className="right-side-card">
              <div className="search">
                <input
                  type="search"
                  placeholder="search"
                  className="search-input"
                  value={searchInput}
                  onChange={this.onSearch}
                />
                <button
                  type="button"
                  testid="searchButton"
                  className="search-but"
                  onClick={this.searchButton}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              <div className="job-cards">
                <div>{this.LoadingContent()}</div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
