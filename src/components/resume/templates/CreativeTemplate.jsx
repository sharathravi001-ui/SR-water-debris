import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

function fmt(dateStr) {
  if (!dateStr) return '';
  const [y, m] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(m, 10) - 1]} ${y}`;
}

function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <p className="text-xs font-bold uppercase tracking-widest text-purple-700">{children}</p>
      <div className="flex-1 h-px bg-purple-200" />
    </div>
  );
}

export default function CreativeTemplate({ resume }) {
  const { personalInfo: p, experience, education, skills, projects, certifications } = resume;

  return (
    <div className="bg-white text-gray-800" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Bold gradient header */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white px-8 py-8">
        <h1 className="text-3xl font-extrabold tracking-tight">{p.name || 'Your Name'}</h1>
        {p.title && <p className="text-purple-200 font-medium mt-1">{p.title}</p>}
        <div className="flex flex-wrap gap-4 mt-4">
          {p.email && <span className="flex items-center gap-1 text-xs text-purple-100"><Mail size={11} />{p.email}</span>}
          {p.phone && <span className="flex items-center gap-1 text-xs text-purple-100"><Phone size={11} />{p.phone}</span>}
          {p.location && <span className="flex items-center gap-1 text-xs text-purple-100"><MapPin size={11} />{p.location}</span>}
          {p.linkedin && <span className="flex items-center gap-1 text-xs text-purple-100"><Linkedin size={11} />{p.linkedin}</span>}
          {p.website && <span className="flex items-center gap-1 text-xs text-purple-100"><Globe size={11} />{p.website}</span>}
        </div>
      </div>

      {/* Two-column body */}
      <div className="flex gap-0">
        {/* Left col – 60% */}
        <div className="flex-[3] p-6 space-y-5">
          {p.summary && (
            <div>
              <SectionTitle>About Me</SectionTitle>
              <p className="text-xs leading-relaxed text-gray-700">{p.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div>
              <SectionTitle>Experience</SectionTitle>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-3 border-l-2 border-purple-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-bold text-gray-900">{exp.position}</p>
                        <p className="text-xs text-purple-600 font-semibold">{exp.company}</p>
                        {exp.location && <p className="text-xs text-gray-500">{exp.location}</p>}
                      </div>
                      <p className="text-xs bg-purple-100 text-purple-700 rounded-full px-2 py-0.5 whitespace-nowrap font-medium">
                        {fmt(exp.startDate)}{exp.current ? ' – Now' : exp.endDate ? ` – ${fmt(exp.endDate)}` : ''}
                      </p>
                    </div>
                    {exp.bullets?.filter(Boolean).length > 0 && (
                      <ul className="mt-2 space-y-1 list-disc list-outside ml-3">
                        {exp.bullets.filter(Boolean).map((b, i) => <li key={i} className="text-xs text-gray-700">{b}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <SectionTitle>Projects</SectionTitle>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-purple-50 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-bold text-gray-900">{proj.name}</p>
                      {proj.link && <span className="text-xs text-indigo-600">{proj.link}</span>}
                    </div>
                    {proj.description && <p className="text-xs text-gray-700 mt-1">{proj.description}</p>}
                    {proj.technologies && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {proj.technologies.split(',').map((t, i) => (
                          <span key={i} className="text-[10px] bg-indigo-100 text-indigo-700 rounded-full px-2 py-0.5">{t.trim()}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right col – 40% */}
        <div className="flex-[2] bg-gray-50 p-5 space-y-5">
          {education.length > 0 && (
            <div>
              <SectionTitle>Education</SectionTitle>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-xs font-bold text-gray-900">{edu.school}</p>
                    <p className="text-xs text-gray-600">{edu.degree}</p>
                    {(edu.gpa || edu.honors) && <p className="text-[10px] text-purple-600 mt-0.5">{edu.honors}{edu.gpa ? ` · GPA ${edu.gpa}` : ''}</p>}
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {fmt(edu.startDate)}{edu.endDate ? ` – ${fmt(edu.endDate)}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <SectionTitle>Skills</SectionTitle>
              <div className="space-y-3">
                {skills.map((s) => (
                  <div key={s.id}>
                    {s.category && <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">{s.category}</p>}
                    <div className="flex flex-wrap gap-1">
                      {s.items.split(',').map((item, i) => (
                        <span key={i} className="text-[10px] bg-purple-100 text-purple-800 rounded-full px-2 py-0.5 font-medium">{item.trim()}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <SectionTitle>Certifications</SectionTitle>
              <div className="space-y-2">
                {certifications.map((c) => (
                  <div key={c.id} className="bg-white border border-purple-100 rounded p-2">
                    <p className="text-xs font-bold text-gray-900">{c.name}</p>
                    <p className="text-[10px] text-gray-500">{c.issuer}{c.date ? ` · ${fmt(c.date)}` : ''}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
