import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

function fmt(dateStr) {
  if (!dateStr) return '';
  const [y, m] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(m, 10) - 1]} ${y}`;
}

export default function ModernTemplate({ resume }) {
  const { personalInfo: p, experience, education, skills, projects, certifications } = resume;

  return (
    <div className="flex min-h-full font-sans text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <div className="w-[35%] bg-[#1a2e4a] text-white p-6 flex flex-col gap-6">
        {/* Name block */}
        <div>
          <h1 className="text-2xl font-bold leading-tight">{p.name || 'Your Name'}</h1>
          <p className="text-blue-300 font-medium mt-1">{p.title || 'Job Title'}</p>
        </div>

        {/* Contact */}
        <div className="space-y-2">
          <h2 className="text-xs uppercase tracking-widest text-blue-300 font-semibold border-b border-blue-700 pb-1">Contact</h2>
          {p.email && <div className="flex items-center gap-2 text-xs"><Mail size={12} className="text-blue-400 shrink-0" />{p.email}</div>}
          {p.phone && <div className="flex items-center gap-2 text-xs"><Phone size={12} className="text-blue-400 shrink-0" />{p.phone}</div>}
          {p.location && <div className="flex items-center gap-2 text-xs"><MapPin size={12} className="text-blue-400 shrink-0" />{p.location}</div>}
          {p.linkedin && <div className="flex items-center gap-2 text-xs"><Linkedin size={12} className="text-blue-400 shrink-0" />{p.linkedin}</div>}
          {p.website && <div className="flex items-center gap-2 text-xs"><Globe size={12} className="text-blue-400 shrink-0" />{p.website}</div>}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xs uppercase tracking-widest text-blue-300 font-semibold border-b border-blue-700 pb-1">Skills</h2>
            {skills.map((s) => (
              <div key={s.id}>
                {s.category && <p className="text-xs font-semibold text-blue-300">{s.category}</p>}
                <p className="text-xs text-blue-100">{s.items}</p>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xs uppercase tracking-widest text-blue-300 font-semibold border-b border-blue-700 pb-1">Certifications</h2>
            {certifications.map((c) => (
              <div key={c.id}>
                <p className="text-xs font-semibold">{c.name}</p>
                <p className="text-xs text-blue-300">{c.issuer}{c.date ? ` · ${fmt(c.date)}` : ''}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 p-7 space-y-5">
        {/* Summary */}
        {p.summary && (
          <div>
            <h2 className="text-xs uppercase tracking-widest font-bold text-[#1a2e4a] border-b border-[#1a2e4a] pb-1 mb-2">Summary</h2>
            <p className="text-xs leading-relaxed text-gray-700">{p.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-xs uppercase tracking-widest font-bold text-[#1a2e4a] border-b border-[#1a2e4a] pb-1 mb-3">Experience</h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-900">{exp.position}</p>
                      <p className="text-[#1a2e4a] font-medium text-xs">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                    </div>
                    <p className="text-xs text-gray-500 whitespace-nowrap">
                      {fmt(exp.startDate)}{exp.current ? ' – Present' : exp.endDate ? ` – ${fmt(exp.endDate)}` : ''}
                    </p>
                  </div>
                  {exp.bullets?.filter(Boolean).length > 0 && (
                    <ul className="mt-1 space-y-0.5 list-disc list-outside ml-4">
                      {exp.bullets.filter(Boolean).map((b, i) => (
                        <li key={i} className="text-xs text-gray-700">{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-xs uppercase tracking-widest font-bold text-[#1a2e4a] border-b border-[#1a2e4a] pb-1 mb-3">Education</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-900">{edu.school}</p>
                    <p className="text-xs text-gray-600">{edu.degree}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}{edu.honors ? ` · ${edu.honors}` : ''}</p>
                  </div>
                  <p className="text-xs text-gray-500 whitespace-nowrap">
                    {fmt(edu.startDate)}{edu.endDate ? ` – ${fmt(edu.endDate)}` : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-xs uppercase tracking-widest font-bold text-[#1a2e4a] border-b border-[#1a2e4a] pb-1 mb-3">Projects</h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-gray-900">{proj.name}</p>
                    {proj.link && <span className="text-xs text-blue-600">{proj.link}</span>}
                  </div>
                  {proj.description && <p className="text-xs text-gray-700 mt-0.5">{proj.description}</p>}
                  {proj.technologies && <p className="text-xs text-gray-500 mt-0.5"><span className="font-medium">Tech:</span> {proj.technologies}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
