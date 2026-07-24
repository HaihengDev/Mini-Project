export const studentInput = [
  {
    id: 'student_id',
    label: 'Student Id: ',
    type: 'text',
    placeholder: 'Enter Student Id',
  },
  {
    id: 'first_name',
    label: 'First Name: ',
    type: 'text',
    placeholder: 'Enter First Name',
  },
  {
    id: 'last_name',
    label: 'Last Name: ',
    type: 'text',
    placeholder: 'Enter Last Name',
  },
  {
    id: 'dob',
    label: 'Date Of Birth',
    type: 'date',
  },
  {
    id: 'gender',
    label: 'Gender: ',
    type: 'radio',
    options: [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' },
    ]
  },
  {
    id: 'class_id',
    label: 'Class: ',
    type: 'select',
    options: [],
  },
]

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

export const teacherInput = [
  {
    id: 'employee_no',
    label: 'Teacher Id: ',
    type: 'text',
    placeholder: 'Enter Teacher Id: ',
  },
  {
    id: 'first_name',
    label: 'First Name: ',
    type: 'text',
    placeholder: 'Enter First Name',
  },
  {
    id: 'last_name',
    label: 'Last Name: ',
    type: 'text',
    placeholder: 'Enter Last Name',
  },
  {
    id: 'gender',
    label: 'Gender: ',
    type: 'radio',
    options: [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' },
    ],
  },
  {
    id: 'phone',
    label: 'Phone: ',
    type: 'text',
    placeholder: 'Enter Phone Number',
  },
  {
    id: 'joining_date',
    label: 'Joining Date: ',
    type: 'date',
  },
];

export const courseInput = [
  {
    id: 'course_name',
    label: 'Course Name: ',
    type: 'text',
    placeholder: 'Enter Course Name',
  },
  {
    id: 'course_code',
    label: 'Course Code: ',
    type: 'text',
    placeholder: 'Enter Course Code',
  },
  {
    id: 'class_id',
    label: 'Class: ',
    type: 'select',
    options: [],
  },
];
