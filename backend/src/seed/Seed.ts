import Video from '../model/mongo/videoModel.js';
import Assessment from '../model/mongo/assessmentModel.js';
import CourseCounter from '../model/mongo/courseCounterModel.js';

const SEED_COURSE_ID = 1;

const seedVideos = [
  {
    courseId: SEED_COURSE_ID,
    order: 1,
    title: 'مقدمة الكورس',
    url: 'https://example.com/videos/intro.m3u8',
    duration: 600,
    resolution: '1080p'
  },
  {
    courseId: SEED_COURSE_ID,
    order: 3,
    title: 'الدرس الأول',
    url: 'https://example.com/videos/lesson1.m3u8',
    duration: 1200,
    resolution: '1080p'
  }
];

const seedAssessments = [
  {
    courseId: SEED_COURSE_ID,
    order: 2,
    assessmentType: 'quiz',
    title: 'كويز المقدمة',
    timeLimit: 600,
    passingScore: 60,
    questions: [
      {
        type: 'mcq',
        text: 'ما هو عاصمة مصر؟',
        options: ['الإسكندرية', 'القاهرة', 'الأقصر', 'أسوان'],
        correctAnswer: 'القاهرة',
        points: 5
      },
      {
        type: 'matching',
        text: 'وصل كل دولة بعاصمتها',
        pairs: [
          { left: 'مصر', right: 'القاهرة' },
          { left: 'فرنسا', right: 'باريس' }
        ],
        points: 3
      }
    ]
  },
  {
    courseId: SEED_COURSE_ID,
    order: 4,
    assessmentType: 'exam',
    title: 'الامتحان النهائي',
    timeLimit: 3600,
    passingScore: 70,
    questions: [
      {
        type: 'essay',
        text: 'اشرح الفرق بين SQL و NoSQL',
        modelAnswer: 'SQL قواعد بيانات علائقية ذات schema ثابت، بينما NoSQL أكثر مرونة...',
        points: 10
      }
    ]
  }
];

async function seedDatabase() {
  try {
    const existingVideo = await Video.findOne({ courseId: SEED_COURSE_ID });
    const existingAssessment = await Assessment.findOne({ courseId: SEED_COURSE_ID });

    if (existingVideo || existingAssessment) {
      console.log('Seed data already exists, skipping seeding.');
      return
    }

    await Video.insertMany(seedVideos);
    await Assessment.insertMany(seedAssessments);

    const maxOrder = Math.max(
      ...seedVideos.map(v => v.order),
      ...seedAssessments.map(a => a.order)
    );

    await CourseCounter.findOneAndUpdate(
      { courseId: SEED_COURSE_ID },
      { lastOrder: maxOrder },
      { upsert: true }
    );

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Seeding error:', error);
  }
}

export default seedDatabase;