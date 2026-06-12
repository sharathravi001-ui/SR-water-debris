function fmt(dateStr) {
  if (!dateStr) return '';
  const [y, m] = dateStr.split('-');
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[parseInt(m, 10) - 1]} ${y}`;
}

export default function ClassicTemplate({ resume }) {
  const { personalInfo: p, experience, education, skills, projects, certifications } = resume;

  const contactParts = [p.email, p.phone, p.location, p.linkedin, p.website].filter(Boolean);

  return (
    <div className="p-10 font-serif bg-white text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold tracking-wide uppercase">{p.name || 'Your Name'}</h1>
        {p.title && <p className="text-sm text-gray-600 mt-1 tracking-widest uppercase">{p.title}</p>}
        {contactParts.length > 0 && (
          <p className="text-xs text-gray-600 mt-2">{contactParts.join(' | ')}</p>
        )}
      </div>

      <hr className="border-t-2 border-gray-900 mb-4" />

      {/* Summary */}
      {p.summary && (
        <div className="mb-5">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-900 mb-2">Professional Summary</h2>
          <hr className="border-gray-400 mb-2" />
          <p className="text-xs leading-relaxed">{p.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-900 mb-2">Experience</h2>
          <hr className="border-gray-400 mb-3" />
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <p className="font-bold">{exp.position}</p>
                  <p className="text-xs text-gray-600 italic">
                    {fmt(exp.startDate)}{exp.current ? ' – Present' : exp.endDate ? ` – ${fmt(exp.endDate)}` : ''}
                  </p>
                </div>
                <p className="text-xs text-gray-700 italic">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                {exp.bullets?.filter(Boolean).length > 0 && (
                  <ul className="mt-1 list-disc list-outside ml-5 space-y-0.5">
                    {exp.bullets.filter(Boolean).map((b, i) => <li key={i} className="text-xs">{b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-900 mb-2">Education</h2>
          <hr className="border-gray-400 mb-3" />
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <p className="font-bold">{edu.school}</p>
                  <p className="text-xs italic">{edu.degree}{edu.gpa ? ` — GPA: ${edu.gpa}` : ''}{edu.honors ? ` — ${edu.honors}` : ''}</p>
                </div>
                <p className="text-xs italic text-gray-600">
                  {fmt(edu.startDate)}{edu.endDate ? ` – ${fmt(edu.endDate)}` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-900 mb-2">Skills</h2>
          <hr className="border-gray-400 mb-3" />
          <div className="space-y-1">
            {skills.map((s) => (
              <p key={s.id} className="text-xs">
                <span className="font-bold">{s.category}{s.category ? ': ' : ''}</span>{s.items}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-900 mb-2">Projects</h2>
          <hr className="border-gray-400 mb-3" />
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <p className="font-bold">{proj.name}</p>
                  {proj.link && <span className="text-xs italic text-gray-600">{proj.link}</span>}
                </div>
                {proj.description && <p className="text-xs mt-0.5">{proj.description}</p>}
                {proj.technologies && <p className="text-xs italic text-gray-600 mt-0.5">Technologies: {proj.technologies}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-900 mb-2">Certifications</h2>
          <hr className="border-gray-400 mb-3" />
          <div className="space-y-1">
            {certifications.map((c) => (
              <p key={c.id} className="text-xs">
                <span className="font-bold">{c.name}</span>
                {c.issuer ? ` — ${c.issuer}` : ''}
                {c.date ? ` (${fmt(c.date)})` : ''}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
