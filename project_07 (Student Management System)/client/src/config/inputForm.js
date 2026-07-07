export const courseForm = [
  {
    id: 'course-id',
    label: 'CourseId: ',
    htmlFor: 'course-id',
    type: 'text',
    placeholder: 'Enter Course Id',
  },
  {
    id: 'course-name',
    label: 'CourseName: ',
    htmlFor: 'course-name',
    type: 'text',
    placeholder: 'Enter Course Name',
  },
  {
    id: 'start-date',
    label: 'StartDate: ',
    htmlFor: 'start-date',
    type: 'date',
    placeholder: '',
  },
];

export const roomForm = [
  {
    id: 'room-id',
    label: 'RoomId: ',
    htmlFor: 'room-id',
    type: 'text',
    placeholder: 'Enter Room Id: ',
  },
];

export const studentForm = [
  {
    id: 'student-id',
    label: 'StudentId: ',
    htmlFor: 'student-id',
    type: 'text',
    placeholder: 'Enter Student Id:',
  },
  {
    id: 'student-first-name',
    label: 'FirstName: ',
    htmlFor: 'student-first-name',
    type: 'text',
    placeholder: 'Enter Student First Name: ',
  },
  {
    id: 'student-last-name',
    label: 'LastName: ',
    htmlFor: 'student-last-name',
    type: 'text',
    placeholder: 'Enter Student Last Name: ',
  },
  {
    id: 'student-gender',
    label: 'Gender: ',
    htmlFor: 'student-gender',
    type: 'radio',
    selection: [
      {
        label: 'Male',
        value: 'male',
      },
      {
        label: 'Female',
        value: 'female',
      },
    ],
  },
  {
    id: 'date-of-birth',
    label: 'DateOfBirth: ',
    htmlFor: 'date-of-birth',
    type: 'date',
    placeholder: '',
  },
];

export const teacherForm = [
  {
    id: 'teacher-id',
    label: 'TeacherId',
    htmlFor: 'teacher-id',
    type: 'text',
    placeholder: 'Enter Teacher Id',
  },
  {
    id: 'teacher-first-name',
    label: 'FirstName: ',
    htmlFor: 'teacher-first-name',
    type: 'text',
    placeholder: 'Enter Teacher First Name',
  },
  {
    id: 'teacher-last-name',
    label: 'LastName: ',
    htmlFor: 'teacher-last-name',
    type: 'text',
    placeholder: 'Enter Teacher Last Name',
  },
  {
    id: 'teacher-gender',
    label: 'Gender: ',
    htmlFor: 'teacher-gender',
    type: 'radio',
    selection: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
    ],
  },
  {
    id: 'role',
    label: 'Role: ',
    htmlFor: 'role',
    type: 'text',
    placeholder: 'Enter Role',
  },
  {
    id: 'salary',
    label: 'Salary: ',
    htmlFor: 'salary',
    type: 'number',
    placeholder: 'Enter Salary',
  },
];
