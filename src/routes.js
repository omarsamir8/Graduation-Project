export const routes = {
  versions: {
    v1: '/v1',
    v2: '/v2',
    v3: '/v3'
  },
  student: {
    _id: '/Api/students',
    login: '/login',
    getInfo: '/get/information',
    createStudent: '/create/student',
    updateStudent: '/update/student',
    deleteStudent: '/delete/student',
    searchstudent: '/search/for/students',
    AddImgByAdmin: '/Add/image/to/student/by/Admin',
    AddImgByStu: '/Add/image/to/student/by/student',
    deleteImgByAdmin: '/delete/image/from/student/By/Admin',
    deleteImgBystu: '/delete/image/from/student/By/student',
    Availablecourses: '/get/available/courses'
  },
  Admin: {
    _id: '/Api/admins',
    login: '/login',
    getinfoAdmin: '/get/info/admin',
    getinfoSuper: '/get/info/super',
    createAdmin: '/create/admin',
    updateAdmin: '/update/admin',
    deleteAdmin: '/delete/admin',
    searchAdmin: '/search/admin',
    AddImgBySuper: '/add/image/to/admin/by/super',
    AddImgByAdmin: '/add/image/to/admin/by/admin',
    deleteImgBysuper: '/delete/image/from/admin/by/super',
    deleteImgByAdmin: '/delete/image/from/admin/by/admin',
    dashboardAdmin: '/information'
  },
  instructor: {
    _id: '/Api/instructors',
    login: '/login',
    InstructorInfo: '/info',
    createInstructor: '/create/instructor',
    updateInstructor: '/update/instructor',
    deleteInstructor: '/delete/instructor',
    searchInstructor: '/search/instructor',
    AddImgByInstructor: '/Add/image/to/instructor/By/instructor',
    AddImgByAdmin: '/Add/image/to/instructor/ByAdmin',
    deleteImgByInstructor: '/delete/image/to/instructor/by/instructor',
    deleteImgByAdmin: '/delete/image/to/instructor/by/Admin'
  },
  course: {
    _id: '/Api/courses',
    AddCourse: '/add/course',
    updateCourse: '/update/course',
    deleteCourse: '/delete/course',
    AddCourseImg: '/Add/images/to/course',
    deleteCourseImg: '/delete/images/to/course',
    searchCourseByStu: '/search/for/courses/by/student',
    searchCourseByInstructor: '/search/for/courses/by/instructor',
    searchCourseByAdmin: '/search/for/courses/by/Admin',
    GetsingleInfoByAdmin: '/Get/single/course/info/by/Admin',
    GetsingleInfoByStu: '/Get/single/course/info/by/student',
    GetsingleInfoByInstructor: '/Get/single/course/info/by/instructor'
  },
  courseRegister: {
    _id: '/Api/students/registers',
    addCourse: '/add/Course/to/register',
    deleteCourse: '/delete/Course/from/register',
    GetRegisterInfoByStudent: '/get/Register/info/by/student',
    GetRegisterInfoByAdmin: '/get/Register/info/by/Admin',
    searchRegisterByAdmin: '/search/about/courses/registered',
    searchRegisterByInstructor: '/information/about/single/course'
  },
  studentGrades: {
    _id: '/Api/students/Grades',
    AddGradeByAdmin: '/add/grade/by/admin',
    AddGradeByInstructor: '/add/grade/by/instructor',
    updateGradeByAdmin: '/update/grade/by/admin',
    updateGradeByInstructor: '/update/grade/by/instructor',
    deleteGradeByAdmin: '/delete/grade/by/admin',
    deleteGradeByInstructor: '/delete/grade/by/instructor',
    studentsGradesSearchByAdmin: '/search/by/admin',
    studentsGradesSearchByInstructor: '/search/by/instructor',
    GetSingleGradeAboutUserByAdmin: '/Get/Single/grade/about/student/by/admin',
    GetSingleGradeAboutUserByInstructor:
      '/Get/Single/grade/about/student/by/instructor',
    NewspaperBystudent: '/Get/Newspaper/By/student',
    NewspaperByAdmin: '/Get/Newspaper/By/Admin',
    GetMainsemsterGrade: '/Get/Main/semster/Grade/for/student'
  },
  semster: {
    _id: '/Api/semsters',
    addsemster: '/add/semster',
    updatesemster: '/update/semster',
    deletesemster: '/delete/semster',
    searchsemster: '/search/semster',
    MainSemsterInfoBystudent: '/get/main/semster/info/by/student',
    MainSemsterInfoByAdmin: '/get/main/semster/info/by/admin',
    MainSemsterInfoByInstructor: '/get/main/semster/info/by/instructor'
  },
  setting: {
    _id: '/Api/admin/setting',
    updateSetting: '/update',
    deleteSetting: '/delete',
    ViewSetting: '/View/setting',
    ViewSettingAdmin: '/view/setting/admin'
  },
  Training: {
    _id: '/Api/trainings',
    AddTraining: '/add/training',
    updateTraining: '/update/training',
    deleteTraining: '/delete/training',
    AddImages: '/Add/images/to/training',
    deleteImages: '/delete/images/from/training',
    singleTraininginfoByAdmin: '/get/single/training/info/by/admin',
    singleTraininginfoByinstructor:
      '/get/single/training/info/by/instructor',
    singleTraininginfoBystudent: '/get/single/training/info/by/student',
    allTrainingByAdmin: '/get/all/trainings/info/by/admin',
    allTrainingBystudent: '/get/all/trainings/info/by/student',
    allTrainingByinstructor: '/get/all/trainings/info/by/instructor'
  },
  RegisterTraining: {
    _id: '/Api/Trainings/Registers',
    addTraining: '/add/training/to/register',
    deleteTraining: '/delete/training/from/register',
    getTrainingRegisterdInfoTostu: '/get/trainings/registerd/info/to/student',
    searchTrainingsRegisterdByAdmin: '/search/for/trainings/registerd/by/admin',
    searchTrainingsRegisterdByInstructor:
      '/search/for/trainings/registerd/by/instructor'
    // searchTrainingsRegisterdBystudent:
    //   "/search/for/training/registerd/by/student",
  },
  TrainingResult: {
    _id: '/Api/Trainings/Results',
    uploadByAdmin: '/upload/result/by/admin',
    uploadByInstructor: '/upload/result/by/instructor',
    updateByAdmin: '/update/result/by/Admin',
    updateByInstructor: '/update/result/by/instructor',
    deleteByAdmin: '/delete/results/by/admin',
    deleteByInstructor: '/delete/result/by/instructor',
    getSingleTrainingResultByAdmin: '/get/single/training/result/by/admin',
    getSingleTrainingResultByStudent: '/get/single/training/result/by/student',
    getSingleTrainingResultByInstructor:
      '/get/single/training/result/by/instructor',
    SearchTrainingResultByAdmin: '/search/trainings/result/by/admin',
    SearchTrainingResultByStudent: '/search/trainings/result/by/student',
    SearchTrainingResultByInstructor: '/search/trainings/result/by/instructor'
  }
}

const routesAPIservies = {
  student: {
    StudentLogin: [routes.student.login, routes.student.getInfo],
    StudentRegister: [],
    StudentRegisterTraining: [],
    StudentViewGrates: [],
    StudentViewAvailablecourses: [routes.student.Availablecourses]
  },
  Admin: {
    AdminLogin: [routes.Admin.login],
    AdminEditStudent: [],
    AdminEditInstructor: [],
    AdminEditTraining: [],
    AdminEditSemster: [],
    AdminEditCourses: [],
    AdminEditRegister: [],
    AdminDashboard: [routes.Admin.dashboardAdmin]
  },
  Instructor: {
    InstructorLogin: [routes.instructor.login],
    InstructorUploadsGrates: [],
    InstructorViewGrates: [],
    InstructorInfo: [routes.instructor.InstructorInfo]
  }
}

// const studentAccessRoutes = [
//   ${routes.student._id}${routes.student.login},
//   ${routes.student._id}${routes.student.Availablecourses},
//   ${routes.course._id}${routes.course.GetsingleInfoByStu},
//   ${routes.course._id}${routes.course.searchCourseByStu},
//   ${routes.courseRegister._id}${routes.courseRegister.addCourse},
//   ${routes.courseRegister._id}${routes.courseRegister.deleteCourse},
//   ${routes.courseRegister._id}${routes.courseRegister.GetRegisterInfoByStudent},
//   ${routes.semster._id}${routes.semster.MainSemsterInfoBystudent},
//   ${routes.studentGrades._id}${routes.studentGrades.NewspaperBystudent},
//   ${routes.studentGrades._id}${routes.studentGrades.GetMainsemsterGrade},
//   ${routes.Training._id}${routes.Training.singleTraininginfoBystudent},
//   ${routes.Training._id}${routes.Training.allTrainingBystudent},
//   ${routes.RegisterTraining._id}${routes.RegisterTraining.addTraining},
//   ${routes.RegisterTraining._id}${routes.RegisterTraining.deleteTraining},
//   ${routes.RegisterTraining._id}${routes.RegisterTraining.getTrainingRegisterdInfoTostu},
//   ${routes.TrainingResult._id}${routes.TrainingResult.getSingleTrainingResultByStudent},
//   ${routes.TrainingResult._id}${routes.TrainingResult.SearchTrainingResultByStudent},
//   ${routes.TrainingResult._id}${routes.student.getInfo},
//   ${routes.student._id}${routes.student.AddImgByStu},
//   ${routes.student._id}${routes.student.deleteImgBystu},
// ];

// const adminAccessRoutes = [
//   ${routes.Admin._id}${routes.Admin.login},
//   ${routes.Admin._id}${routes.Admin.getinfoAdmin},
//   ${routes.Admin._id}${routes.Admin.AddImgByAdmin},
//   ${routes.Admin._id}${routes.Admin.deleteImgByAdmin},
//   ${routes.Admin._id}${routes.Admin.dashboardAdmin},
//   ${routes.course._id}${routes.course.AddCourse},
//   ${routes.course._id}${routes.course.updateCourse},
//   ${routes.course._id}${routes.course.deleteCourse},
//   ${routes.course._id}${routes.course.AddCourseImg},
//   ${routes.course._id}${routes.course.deleteCourseImg},
//   ${routes.course._id}${routes.course.searchCourseByAdmin},
//   ${routes.course._id}${routes.course.GetsingleInfoByAdmin},
//   ${routes.instructor._id}${routes.instructor.deleteImgByAdmin},
//   ${routes.instructor._id}${routes.instructor.AddImgByAdmin},
//   ${routes.instructor._id}${routes.instructor.searchInstructor},
//   ${routes.instructor._id}${routes.instructor.deleteInstructor},
//   ${routes.instructor._id}${routes.instructor.updateInstructor},
//   ${routes.instructor._id}${routes.instructor.createInstructor},
//   ${routes.courseRegister._id}${routes.courseRegister.searchRegisterByAdmin},
//   ${routes.courseRegister._id}${routes.courseRegister.GetRegisterInfoByAdmin},
//   ${routes.semster._id}${routes.semster.addsemster},
//   ${routes.semster._id}${routes.semster.updatesemster},
//   ${routes.semster._id}${routes.semster.deletesemster},
//   ${routes.semster._id}${routes.semster.searchsemster},
//   ${routes.semster._id}${routes.semster.MainSemsterInfoByAdmin},
//   ${routes.studentGrades._id}${routes.studentGrades.AddGradeByAdmin},
//   ${routes.studentGrades._id}${routes.studentGrades.updateGradeByAdmin},
//   ${routes.studentGrades._id}${routes.studentGrades.deleteGradeByAdmin},
//   ${routes.studentGrades._id}${routes.studentGrades.studentsGradesSearchByAdmin},
//   ${routes.studentGrades._id}${routes.studentGrades.GetSingleGradeAboutUserByAdmin},
//   ${routes.studentGrades._id}${routes.studentGrades.NewspaperByAdmin},
//   ${routes.Training._id}${routes.Training.AddTraining},
//   ${routes.Training._id}${routes.Training.updateTraining},
//   ${routes.Training._id}${routes.Training.deleteTraining},
//   ${routes.Training._id}${routes.Training.AddImages},
//   ${routes.Training._id}${routes.Training.deleteImages},
//   ${routes.Training._id}${routes.Training.singleTraininginfoByAdmin},
//   ${routes.Training._id}${routes.Training.allTrainingByAdmin},
//   ${routes.RegisterTraining._id}${routes.RegisterTraining.searchTrainingsRegisterdByAdmin},
//   ${routes.TrainingResult._id}${routes.TrainingResult.uploadByAdmin},
//   ${routes.TrainingResult._id}${routes.TrainingResult.deleteByAdmin},
//   ${routes.TrainingResult._id}${routes.TrainingResult.updateByAdmin},
//   ${routes.TrainingResult._id}${routes.TrainingResult.getSingleTrainingResultByAdmin},
//   ${routes.TrainingResult._id}${routes.TrainingResult.SearchTrainingResultByAdmin},
//   ${routes.student._id}${routes.student.createStudent},
//   ${routes.student._id}${routes.student.updateStudent},
//   ${routes.student._id}${routes.student.deleteStudent},
//   ${routes.student._id}${routes.student.searchstudent},
//   ${routes.student._id}${routes.student.AddImgByAdmin},
//   ${routes.student._id}${routes.student.deleteImgByAdmin},
//   ${routes.setting._id}${routes.setting.ViewSettingAdmin},
//   ${routes.setting._id}${routes.setting.ViewSetting},
// ];

// const instructorAccessRoutes = [
//   ${routes.instructor._id}${routes.instructor.login},
//   ${routes.course._id}${routes.course.searchCourseByInstructor},
//   ${routes.course._id}${routes.course.GetsingleInfoByInstructor},
//   ${routes.instructor._id}${routes.instructor.InstructorInfo},
//   ${routes.instructor._id}${routes.instructor.AddImgByInstructor},
//   ${routes.instructor._id}${routes.instructor.deleteImgByInstructor},
//   ${routes.courseRegister._id}${routes.courseRegister.searchRegisterByInstructor},
//   ${routes.semster._id}${routes.semster.MainSemsterInfoByInstructor},
//   ${routes.studentGrades._id}${routes.studentGrades.AddGradeByInstructor},
//   ${routes.studentGrades._id}${routes.studentGrades.updateGradeByInstructor},
//   ${routes.studentGrades._id}${routes.studentGrades.studentsGradesSearchByInstructor},
//   ${routes.studentGrades._id}${routes.studentGrades.GetSingleGradeAboutUserByInstructor},
//   ${routes.Training._id}${routes.Training.singleTraininginfoByinstructor},
//   ${routes.Training._id}${routes.Training.allTrainingByinstructor},
//   ${routes.RegisterTraining._id}${routes.RegisterTraining.searchTrainingsRegisterdByInstructor},
//   ${routes.TrainingResult._id}${routes.TrainingResult.uploadByInstructor},
//   ${routes.TrainingResult._id}${routes.TrainingResult.deleteByInstructor},
//   ${routes.TrainingResult._id}${routes.TrainingResult.updateByInstructor},
//   ${routes.TrainingResult._id}${routes.TrainingResult.getSingleTrainingResultByInstructor},
//   ${routes.TrainingResult._id}${routes.TrainingResult.SearchTrainingResultByInstructor},
// ];

// const superAdminAccessRoutes = [
//   ${routes.Admin._id}${routes.Admin.login},
//   ${routes.Admin._id}${routes.Admin.getinfoSuper},
//   ${routes.Admin._id}${routes.Admin.createAdmin},
//   ${routes.Admin._id}${routes.Admin.updateAdmin},
//   ${routes.Admin._id}${routes.Admin.deleteAdmin},
//   ${routes.Admin._id}${routes.Admin.searchAdmin},
//   ${routes.Admin._id}${routes.Admin.AddImgBySuper},
//   ${routes.setting._id}${routes.setting.updateSetting},
//   ${routes.setting._id}${routes.setting.deleteSetting},
//   ${routes.setting._id}${routes.setting.ViewSetting},
// ];

// export const AllRoutes = [
//   ...studentAccessRoutes,
//   ...adminAccessRoutes,
//   ...instructorAccessRoutes,
//   ${routes.Admin._id}${routes.Admin.createAdmin},
//   ${routes.Admin._id}${routes.Admin.updateAdmin},
//   ${routes.Admin._id}${routes.Admin.deleteAdmin},
//   ${routes.Admin._id}${routes.Admin.searchAdmin},
//   ${routes.Admin._id}${routes.Admin.AddImgBySuper},
// ];
// export const RoutesNotAllowTodenied = [
//   ${routes.Admin._id}${routes.Admin.login},
//   ${routes.Admin._id}${routes.Admin.getinfoSuper},
//   ${routes.setting._id}${routes.setting.updateSetting},
//   ${routes.setting._id}${routes.setting.deleteSetting},
//   ${routes.setting._id}${routes.setting.ViewSetting},
// ];

// console.log(AllRoutes);
