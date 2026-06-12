import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

function fmt(dateStr) {
  if (!dateStr) return '';
  const [y, m] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(m, 10) - 1]} ${y}`;
}

function Section({ title, children }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-900">{title}</h2>
        <div className="flex-1 h-0.5 bg-amber-500" />
      </div>
      {children}
    </div>
  );
}

export default function ExecutiveTemplate({ resume }) {
  const { personalInfo: p, experience, education, skills, projects, certifications } = resume;

  return (
    <div className="bg-white" style={{ fontFamily: "'Georgia', serif" }}>
      {/* Dark executive header */}
      <div className="bg-gray-900 text-white px-8 py-7">
        <h1 className="text-3xl font-bold tracking-wide">{p.name || 'Your Name'}</h1>
        {p.title && <p className="text-amber-400 text-sm font-semibold mt-1 tracking-widest uppercase">{p.title}</p>}
        <div className="flex flex-wrap gap-x-5 gap-y-1 mt-4 border-t border-gray-700 pt-4">
          {p.email && <span className="flex items-center gap-1.5 text-xs text-gray-300"><Mail size={11} />{p.email}</span>}
          {p.phone && <span className="flex items-center gap-1.5 text-xs text-gray-300"><Phone size={11} />{p.phone}</span>}
          {p.location && <span className="flex items-center gap-1.5 text-xs text-gray-300"><MapPin size={11} />{p.location}</span>}
          {p.linkedin && <span className="flex items-center gap-1.5 text-xs text-gray-300"><Linkedin size={11} />{p.linkedin}</span>}
          {p.website && <span className="flex items-center gap-1.5 text-xs text-gray-300"><Globe size={11} />{p.website}</span>}
        </div>
      </div>

      {/* Body */}
      <div className="px-8 pt-6 pb-8">
        {/* Summary */}
        {p.summary && (
          <div className="mb-5 bg-amber-50 border-l-4 border-amber-500 px-4 py-3">
            <p className="text-xs leading-relaxed text-gray-700 italic">{p.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <Section title="Professional Experience">
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-sm text-gray-900">{exp.position}</p>
                      <p className="text-xs text-amber-700 font-semibold">{exp.company}{exp.location ? ` | ${exp.location}` : ''}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-gray-600 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded">
                        {fmt(exp.startDate)}{exp.current ? ' – Present' : exp.endDate ? ` – ${fmt(exp.endDate)}` : ''}
                      </p>
                    </div>
                  </div>
                  {exp.bullets?.filter(Boolean).length > 0 && (
                    <ul className="mt-2 space-y-1 list-disc list-outside ml-4">
                      {exp.bullets.filter(Boolean).map((b, i) => <li key={i} className="text-xs text-gray-700">{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Two-column grid for education + skills */}
        <div className="grid grid-cols-2 gap-6">
          {education.length > 0 && (
            <Section title="Education">
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-xs font-bold text-gray-900">{edu.school}</p>
                    <p className="text-xs text-gray-700">{edu.degree}</p>
                    {(edu.gpa || edu.honors) && <p className="text-[10px] text-amber-700">{edu.honors}{edu.gpa ? ` · GPA ${edu.gpa}` : ''}</p>}
                    <p className="text-[10px] text-gray-500">{fmt(edu.startDate)}{edu.endDate ? ` – ${fmt(edu.endDate)}` : ''}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {skills.length > 0 && (
            <Section title="Core Competencies">
              <div className="space-y-2">
                {skills.map((s) => (
                  <div key={s.id}>
                    {s.category && <p className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">{s.category}</p>}
                    <p className="text-xs text-gray-700">{s.items}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <Section title="Key Projects">
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <div>
                    <div className="flex gap-2 items-baseline">
                      <p className="text-xs font-bold text-gray-900">{proj.name}</p>
                      {proj.link && <span className="text-[10px] text-gray-400">{proj.link}</span>}
                    </div>
                    {proj.description && <p className="text-xs text-gray-700">{proj.description}</p>}
                    {proj.technologies && <p className="text-[10px] text-gray-500 mt-0.5 italic">{proj.technologies}</p>}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <Section title="Certifications & Credentials">
            <div className="grid grid-cols-2 gap-2">
              {certifications.map((c) => (
                <div key={c.id} className="border border-gray-200 rounded px-3 py-2">
                  <p className="text-xs font-bold text-gray-900">{c.name}</p>
                  <p className="text-[10px] text-gray-500">{c.issuer}{c.date ? ` · ${fmt(c.date)}` : ''}</p>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}
