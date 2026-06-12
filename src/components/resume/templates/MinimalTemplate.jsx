function fmt(dateStr) {
  if (!dateStr) return '';
  const [y, m] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(m, 10) - 1]} ${y}`;
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-semibold mb-3">{title}</p>
      {children}
    </div>
  );
}

export default function MinimalTemplate({ resume }) {
  const { personalInfo: p, experience, education, skills, projects, certifications } = resume;

  return (
    <div className="p-10 bg-white text-gray-800" style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-light text-gray-900 tracking-tight">{p.name || 'Your Name'}</h1>
        {p.title && <p className="text-base text-gray-500 mt-1 font-light">{p.title}</p>}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
          {p.email && <span className="text-xs text-gray-500">{p.email}</span>}
          {p.phone && <span className="text-xs text-gray-500">{p.phone}</span>}
          {p.location && <span className="text-xs text-gray-500">{p.location}</span>}
          {p.linkedin && <span className="text-xs text-gray-500">{p.linkedin}</span>}
          {p.website && <span className="text-xs text-gray-500">{p.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {p.summary && (
        <Section title="About">
          <p className="text-xs leading-relaxed text-gray-600 font-light">{p.summary}</p>
        </Section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Section title="Experience">
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-medium text-gray-900">{exp.position}</span>
                    <span className="text-xs text-gray-500"> · {exp.company}{exp.location ? `, ${exp.location}` : ''}</span>
                  </div>
                  <p className="text-xs text-gray-400 whitespace-nowrap">
                    {fmt(exp.startDate)}{exp.current ? ' – now' : exp.endDate ? ` – ${fmt(exp.endDate)}` : ''}
                  </p>
                </div>
                {exp.bullets?.filter(Boolean).length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {exp.bullets.filter(Boolean).map((b, i) => (
                      <li key={i} className="flex gap-2 text-xs text-gray-600">
                        <span className="text-gray-300 mt-0.5 shrink-0">–</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Section title="Education">
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm font-medium text-gray-900">{edu.school}</p>
                  <p className="text-xs text-gray-500 font-light">{edu.degree}{edu.gpa ? ` · ${edu.gpa} GPA` : ''}{edu.honors ? ` · ${edu.honors}` : ''}</p>
                </div>
                <p className="text-xs text-gray-400 whitespace-nowrap">
                  {fmt(edu.startDate)}{edu.endDate ? ` – ${fmt(edu.endDate)}` : ''}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Section title="Skills">
          <div className="space-y-1.5">
            {skills.map((s) => (
              <div key={s.id} className="flex gap-3 text-xs">
                {s.category && <span className="text-gray-400 w-20 shrink-0 font-light">{s.category}</span>}
                <span className="text-gray-700">{s.items}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <Section title="Projects">
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-medium text-gray-900">{proj.name}</p>
                  {proj.link && <span className="text-xs text-gray-400">{proj.link}</span>}
                </div>
                {proj.description && <p className="text-xs text-gray-600 font-light mt-0.5">{proj.description}</p>}
                {proj.technologies && <p className="text-xs text-gray-400 mt-0.5">{proj.technologies}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <Section title="Certifications">
          <div className="space-y-1">
            {certifications.map((c) => (
              <div key={c.id} className="flex justify-between text-xs">
                <span className="text-gray-700">{c.name}{c.issuer ? ` · ${c.issuer}` : ''}</span>
                {c.date && <span className="text-gray-400">{fmt(c.date)}</span>}
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
