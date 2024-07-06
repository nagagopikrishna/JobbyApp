import './index.css'

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

const Filters = () => {
  const renderTypesOfEmployees = () => (
    <div>
      <h1 className="filter-heading"> Types of Employee</h1>
      <ul className="filtered-group-list">
        {employmentTypesList.map(each => (
          <li className="filtered-group-items" key={each.employmentTypeId}>
            <input
              type="checkbox"
              id={each.employmentTypeId}
              className="input-element"
            />
            <label
              htmlFor={each.employmentTypeId}
              className="label-description"
            >
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderSalaryRange = () => (
    <div>
      <h1 className="filter-heading"> Salary Range </h1>
      <ul className="filtered-group-list">
        {salaryRangesList.map(each => (
          <li className="filtered-group-items" key={each.salaryRangeId}>
            <input
              type="radio"
              id={each.salaryRangeId}
              className="input-element-checkbox"
            />
            <label htmlFor={each.salaryRangeId} className="label-description">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div>
      {renderTypesOfEmployees()}
      <hr className="line" />
      {renderSalaryRange()}
    </div>
  )
}

export default Filters
