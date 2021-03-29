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


function mapToSlider(slider, newSlider){
    if(newSlider.title){
        slider.title = newSlider.title;
    }
    if(newSlider.desc){
        slider.desc = newSlider.desc
    }
    if(newSlider.imageUrl){
        slider.imageUrl = newSlider.imageUrl
    }
       
    if(newSlider.status){
            slider.status = newSlider.status;
    }
}

function mapToRating(rating, newRating){
    if(newRating.rating){
        rating.rating = newRating.rating
    }
    if(newRating.comment){
        rating.comment = newRating.comment
    }
    if(newRating.user){
        rating.user = newRating.user
    }
    if(newRating.course){
        rating.course = newRating.course
    }
    if(newRating.status){
        rating.stauts = newRating.status
    }
}


module.exports = {
    mapToCourse,
    mapToAnswer,
    mapToSlider,
    mapToRating,
}