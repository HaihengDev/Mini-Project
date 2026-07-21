export const studentInput = [
  {
    id: 'studentId',
    label: 'Student ID: ',
    type: 'text',
    placeholder: 'Enter Student ID',
  },
  {
    id: 'studentFirstName',
    label: 'Student First Name: ',
    type: 'text',
    placeholder: 'Enter Student First Name',
  },
  {
    id: 'studentLastName',
    label: 'Student Last Name: ',
    type: 'text',
    placeholder: 'Enter Student Last Name',
  },
  {
    id: 'studentGender',
    label: 'Gender: ',
    type: 'radio',
    options: [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' },
    ],
  },
];

export const classInput = [
  {
    id: 'class_name',
    label: 'Class Name: ',
    type: 'text',
    placeholder: 'Enter Class Name',
  },
  {
    id: 'academic_year',
    label: 'Academic Year: ',
    type: 'academic_year',
  },
];
