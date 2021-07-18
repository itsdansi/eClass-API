// Map to module is a useful helper use to update any module data
// It works by updating new data if any, otherwise it will keep the existing data.

function mapToCourse(course, newCourse) {
  if (newCourse.title) {
    course.title = newCourse.title;
  }
  if (newCourse.course) {
    course.course = newCourse.course;
  }

  if (newCourse.user) {
    course.user = newCourse.user;
  }
  if (newCourse.isFeatured) {
    course.isFeatured = newCourse.isFeatured;
  }
  if (newCourse.status) {
    course.status = newCourse.status;
  }
}

function mapToAnswer(ans, newAns) {
  if (newAns.title) {
    ans.title = newAns.title;
  }
  if (newAns.course) {
    ans.course = newAns.course;
  }

  if (newAns.user) {
    ans.user = newAns.user;
  }

  if (newAns.status) {
    ans.status = newAns.status;
  }
}

function mapToSlider(slider, newSlider) {
  if (newSlider.title) {
    slider.title = newSlider.title;
  }
  if (newSlider.desc) {
    slider.desc = newSlider.desc;
  }
  if (newSlider.imageUrl) {
    slider.imageUrl = newSlider.imageUrl;
  }

  if (newSlider.status) {
    slider.status = newSlider.status;
  }
}

function mapToRating(rating, newRating) {
  if (newRating.rating) {
    rating.rating = newRating.rating;
  }
  if (newRating.comment) {
    rating.comment = newRating.comment;
  }
  if (newRating.user) {
    rating.user = newRating.user;
  }
  if (newRating.course) {
    rating.course = newRating.course;
  }
  if (newRating.status) {
    rating.stauts = newRating.status;
  }
}

function mapToSection(section, newSection) {
  if (newSection.title) {
    section.title = newSection.title;
  }
  if (newSection.course) {
    section.course = newSection.course;
  }
  if (newSection.lesson) {
    section.lesson = newSection.lesson;
  }
  if (newSection.lessonCompleted) {
    section.lessonCompleted = newSection.lessonCompleted;
  }
  if (newSection.lessonStartsAt) {
    section.lessonStartsAt = newSection.lessonStartsAt;
  }
  if (newSection.lessonEndsAt) {
    section.lessonEndsAt = newSection.lessonEndsAt;
  }
  if (newSection.duration) {
    section.duration = newSection.duration;
  }
  if (newSection.status) {
    section.status = newSection.status;
  }
}

function mapToUserDetail(ud, nud) {
  if (nud.user) {
    ud.user = nud.user;
  }
  if (nud.image) {
    ud.image = nud.image;
  }
  if (nud.gender) {
    ud.gender = nud.gender;
  }
  if (nud.name) {
    ud.name = nud.name;
  }
}

module.exports = {
  mapToCourse,
  mapToAnswer,
  mapToSlider,
  mapToRating,
  mapToSection,
  mapToUserDetail,
};
