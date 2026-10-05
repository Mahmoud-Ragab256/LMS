import { HiOutlineMail, HiOutlinePhone, HiOutlineCalendar } from 'react-icons/hi';
import type { ITeacherRes } from '../../interfaces';

interface TeacherAboutProps {
  teacher: ITeacherRes;
}

function InfoRow({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400 dark:text-gray-500">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
          {value || 'No information provided.'}
        </p>
      </div>
    </div>
  );
}

const About = ({ teacher }: TeacherAboutProps) => {
  const formattedDate = teacher.createdAt
    ? new Date(teacher.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    : undefined;

  return (
    <div className="m-5 rounded-xl bg-surface-light p-8 shadow-sm shadow-black/5 dark:bg-surface-dark">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          About
        </h1>

        {teacher.active !== undefined && (
          <span
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${teacher.active
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
              : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
              }`}
          >
            {teacher.active ? 'Active' : 'Inactive'}
          </span>
        )}
      </div>

      <div className="space-y-6">
        <InfoRow icon={<HiOutlineMail size={20} />} label="Email" value={teacher.email} />
        <InfoRow icon={<HiOutlinePhone size={20} />} label="Phone" value={teacher.phone} />
        <InfoRow icon={<HiOutlineCalendar size={20} />} label="Joined" value={formattedDate} />
      </div>
    </div>
  );
}

export default About;