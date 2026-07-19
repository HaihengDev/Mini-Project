export const studentInput = [
  {
    id: 'studnent-id',
    label: <label htmlFor="studentId">Student Id:</label>,
    element: (
      <input
        type="text"
        alt="Student Id"
        placeholder="Enter Student id: "
        id="studentId"
      />
    ),
  },
  {
    id: 'student-first-name',
    label: <label htmlFor="studentFirstName">Student First Name: </label>,
    element: (
      <input
        type="text"
        alt="Student Id"
        placeholder="Enter Student First Name: "
        id="studentFirstName"
      />
    ),
  },
  {
    id: 'student-last-name',
    label: <label htmlFor="studentLastName">Student Last Name: </label>,
    element: (
      <input
        type="text"
        alt="Student Last Name"
        placeholder="Enter Student Last Name: "
        id="studentLastName"
      />
    ),
  },
  {
    id: 'student-gender',
    label: <label htmlFor="StudentGender">Gender: </label>,
    element: (
      <input
        type="text"
        alt="Student Gender"
        placeholder="Enter Student Gender"
        id="StudentGender"
      />
    ),
  },
];
