function mapToCourse(course,newCourse){
    if(newCourse.title){
        course.title =newCourse.title;
    }
    if(newCourse.course){
        course.course =newCourse.course;
    }
       
        if(newCourse.user){
            course.user =newCourse.user;
        }
       
        if(newCourse.status){
            course.status = newCourse.status;
        }
}

function mapToAnswer(ans, newAns){
    if(newAns.title){
        ans.title = newAns.title;
    }
    if(newAns.course){
        ans.course =newAns.course;
    }
       
        if(newAns.user){
            ans.user =newAns.user;
        }
       
        if(newAns.status){
            ans.status = newAns.status;
        }
}


module.exports = {
    mapToCourse,
    mapToAnswer
}