import {Link} from 'react-router-dom'
import {BsStar, BsBag} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'

import './index.css'

const JobCard = props => {
  const {eachJobDetails} = props
  const {
    jobDescription,
    companyLogo,
    location,
    rating,
    title,
    packages,
    jobId,
    employmentType,
  } = eachJobDetails

  return (
    <Link to={`/jobs/${jobId}`} className="link1">
      <li className="job-card-item">
        <div className="title-rating-container">
          <img src={companyLogo} alt="company logo" className="company-logo" />
          <div className="title">
            <h1 className="title-name">{title}</h1>
            <div className="rating-container">
              <p className="rating">
                <BsStar className="star" />
                {rating}
              </p>
            </div>
          </div>
        </div>
        <div className="location-type-salary-container">
          <div className="location-type-card">
            <div>
              <p className="location">
                <GoLocation className="location-icon" />
                {location}
              </p>
            </div>
            <div>
              <p className="emp-type">
                <BsBag className="bg-bag" /> {employmentType}
              </p>
            </div>
          </div>
          <div className="package">{packages}</div>
        </div>
        <hr className="horizontal-line" />
        <h1 className="description-heading">Description</h1>
        <p className="description-paragraph">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
