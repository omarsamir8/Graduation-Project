import React from 'react'
import { Table } from 'react-bootstrap'

export default function Report (props) {
  return (
    <div className='col-12'>
      <Table
        striped
        bordered
        hover
        size='md'
        className=' Head_table col-12'
      >
        <th className='col-12 Title_table'>
          <p> Level: {props.level}</p>
          <p>Academic year: {props.year}</p>
          <p>Total level number of hours: {props.totalHours}</p>
          <p>Total level gpa:3.2</p>
        </th>
      </Table>
      <Table
        striped
        bordered
        hover
        size='md'
        className=' Head_table_2 col-12'
      >
        <th className='col-12 Title_table_2'>
          <p>Semester ID : {props.number_semester}</p>

        </th>
      </Table>

      <Table striped bordered hover size='md' className='col-12'>
        <thead>
          <tr>
            <th>#</th>
            <th>Course Name</th>
            <th>Number Of Hours</th>
            <th>Grade</th>
            <th>Course grade</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>OOP</td>
            <td>3</td>
            <td>76</td>
            <td>+C</td>
            <td>2.70</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Datastructure</td>
            <td>3</td>
            <td>76</td>
            <td>+C</td>
            <td>2.70</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Information system</td>
            <td>3</td>
            <td>76</td>
            <td>+C</td>
            <td>2.70</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Information system</td>
            <td>3</td>
            <td>76</td>
            <td>+C</td>
            <td>2.70</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Information system</td>
            <td>3</td>
            <td>76</td>
            <td>+C</td>
            <td>2.70</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Information system</td>
            <td>3</td>
            <td>76</td>
            <td>+C</td>
            <td>2.70</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
