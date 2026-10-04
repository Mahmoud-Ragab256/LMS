import type { IAssessment, IVideo } from "../../../interfaces/index.js";
import type { AssessmentType } from "../../../types/index.js";
import Assessment from "../assessmentModel.js";
import CourseCounter from "../courseCounterModel.js";
import Video from "../videoModel.js";


export async function getNextOrder(courseId: number) {
  const counter = await CourseCounter.findOneAndUpdate(
    { courseId },
    { $inc: { lastOrder: 1 } },
    { new: true, upsert: true }
  );
  return counter.lastOrder;
}

export async function addVideo(courseId: number, videoData: IVideo) {
  const order = await getNextOrder(courseId);
  return Video.create({ ...videoData, courseId, order });
}

export async function addAssessment(courseId: number, assessmentType: AssessmentType, assessmentData: IAssessment) {
  const order = await getNextOrder(courseId);
  return Assessment.create({ ...assessmentData, courseId, order, assessmentType });
}

export async function getCourseContent(courseId: number) {
  const [videos, assessments] = await Promise.all([
    Video.find({ courseId }).lean<IVideo[]>(),
    Assessment.find({ courseId }).lean<IAssessment[]>()
  ]);

  const fullContent = [
    ...videos.map(v => ({ ...v, type: 'video' })),
    ...assessments.map(a => ({ ...a, type: a.assessmentType }))
  ];

  fullContent.sort((a, b) => a.order - b.order);

  return fullContent;
}
