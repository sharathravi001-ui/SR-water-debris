import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

function Field({ label, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3, placeholder = '' }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200 resize-none"
      />
    </div>
  );
}

function SectionBlock({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <span className="text-sm font-semibold text-gray-800">{title}</span>
        {open ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
      </button>
      {open && <div className="p-4 space-y-3 bg-white">{children}</div>}
    </div>
  );
}

function AddButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 border border-dashed border-indigo-300 hover:border-indigo-500 rounded px-3 py-1.5 w-full justify-center transition-colors"
    >
      <Plus size={14} /> {label}
    </button>
  );
}

function RemoveButton({ onClick }) {
  return (
    <button onClick={onClick} className="text-gray-400 hover:text-red-500 transition-colors">
      <Trash2 size={14} />
    </button>
  );
}

export default function ResumeEditor() {
  const {
    resume,
    updatePersonalInfo,
    addExperience, updateExperience, removeExperience,
    addEducation, updateEducation, removeEducation,
    addSkill, updateSkill, removeSkill,
    addProject, updateProject, removeProject,
    addCertification, updateCertification, removeCertification,
    resetResume,
  } = useResume();

  const { personalInfo: p, experience, education, skills, projects, certifications } = resume;

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-4 space-y-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Resume Editor</h2>
          <button
            onClick={() => { if (confirm('Reset to sample resume?')) resetResume(); }}
            className="text-xs text-gray-400 hover:text-gray-600 underline"
          >
            Reset to sample
          </button>
        </div>

        {/* Personal Info */}
        <SectionBlock title="Personal Information">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Full Name" value={p.name} onChange={(v) => updatePersonalInfo('name', v)} placeholder="Alex Johnson" />
            <Field label="Job Title" value={p.title} onChange={(v) => updatePersonalInfo('title', v)} placeholder="Software Engineer" />
            <Field label="Email" value={p.email} onChange={(v) => updatePersonalInfo('email', v)} type="email" placeholder="alex@email.com" />
            <Field label="Phone" value={p.phone} onChange={(v) => updatePersonalInfo('phone', v)} placeholder="+1 (555) 000-0000" />
            <Field label="Location" value={p.location} onChange={(v) => updatePersonalInfo('location', v)} placeholder="New York, NY" />
            <Field label="LinkedIn" value={p.linkedin} onChange={(v) => updatePersonalInfo('linkedin', v)} placeholder="linkedin.com/in/you" />
            <Field label="Website" value={p.website} onChange={(v) => updatePersonalInfo('website', v)} placeholder="yoursite.com" />
          </div>
          <TextArea label="Professional Summary" value={p.summary} onChange={(v) => updatePersonalInfo('summary', v)} rows={4} placeholder="Brief overview of your experience and goals..." />
        </SectionBlock>

        {/* Experience */}
        <SectionBlock title={`Experience (${experience.length})`}>
          {experience.map((exp, idx) => (
            <div key={exp.id} className="border border-gray-100 rounded-lg p-3 space-y-2 bg-gray-50">
              <div className="flex justify-between items-center">
                <p className="text-xs font-semibold text-gray-700">Position {idx + 1}</p>
                <RemoveButton onClick={() => removeExperience(exp.id)} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Job Title" value={exp.position} onChange={(v) => updateExperience(exp.id, 'position', v)} placeholder="Software Engineer" />
                <Field label="Company" value={exp.company} onChange={(v) => updateExperience(exp.id, 'company', v)} placeholder="Acme Corp" />
                <Field label="Location" value={exp.location} onChange={(v) => updateExperience(exp.id, 'location', v)} placeholder="Remote" />
                <div />
                <Field label="Start Date" value={exp.startDate} onChange={(v) => updateExperience(exp.id, 'startDate', v)} type="month" />
                <div>
                  <Field label="End Date" value={exp.current ? '' : exp.endDate} onChange={(v) => updateExperience(exp.id, 'endDate', v)} type="month" />
                  <label className="flex items-center gap-1.5 mt-1 cursor-pointer">
                    <input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)} className="rounded" />
                    <span className="text-xs text-gray-600">Current role</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Bullet Points</label>
                <div className="space-y-1.5">
                  {(exp.bullets || ['']).map((bullet, bi) => (
                    <div key={bi} className="flex gap-1.5 items-start">
                      <textarea
                        value={bullet}
                        onChange={(e) => {
                          const newBullets = [...(exp.bullets || [''])];
                          newBullets[bi] = e.target.value;
                          updateExperience(exp.id, 'bullets', newBullets);
                        }}
                        rows={2}
                        placeholder="Achieved X by doing Y, resulting in Z..."
                        className="flex-1 border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:border-indigo-400 resize-none"
                      />
                      <button
                        onClick={() => {
                          const newBullets = exp.bullets.filter((_, i) => i !== bi);
                          updateExperience(exp.id, 'bullets', newBullets.length ? newBullets : ['']);
                        }}
                        className="text-gray-300 hover:text-red-400 mt-1"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => updateExperience(exp.id, 'bullets', [...(exp.bullets || []), ''])}
                  className="text-xs text-indigo-500 hover:text-indigo-700 mt-1.5 flex items-center gap-1"
                >
                  <Plus size={12} /> Add bullet
                </button>
              </div>
            </div>
          ))}
          <AddButton label="Add Experience" onClick={addExperience} />
        </SectionBlock>

        {/* Education */}
        <SectionBlock title={`Education (${education.length})`}>
          {education.map((edu, idx) => (
            <div key={edu.id} className="border border-gray-100 rounded-lg p-3 space-y-2 bg-gray-50">
              <div className="flex justify-between items-center">
                <p className="text-xs font-semibold text-gray-700">Entry {idx + 1}</p>
                <RemoveButton onClick={() => removeEducation(edu.id)} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Field label="School" value={edu.school} onChange={(v) => updateEducation(edu.id, 'school', v)} placeholder="MIT" />
                <Field label="Degree" value={edu.degree} onChange={(v) => updateEducation(edu.id, 'degree', v)} placeholder="B.S. Computer Science" />
                <Field label="Start Date" value={edu.startDate} onChange={(v) => updateEducation(edu.id, 'startDate', v)} type="month" />
                <Field label="End Date" value={edu.endDate} onChange={(v) => updateEducation(edu.id, 'endDate', v)} type="month" />
                <Field label="GPA" value={edu.gpa} onChange={(v) => updateEducation(edu.id, 'gpa', v)} placeholder="3.8" />
                <Field label="Honors" value={edu.honors} onChange={(v) => updateEducation(edu.id, 'honors', v)} placeholder="Cum Laude" />
              </div>
            </div>
          ))}
          <AddButton label="Add Education" onClick={addEducation} />
        </SectionBlock>

        {/* Skills */}
        <SectionBlock title={`Skills (${skills.length})`}>
          {skills.map((s, idx) => (
            <div key={s.id} className="flex gap-2 items-end">
              <div className="w-28">
                <Field label={idx === 0 ? 'Category' : ''} value={s.category} onChange={(v) => updateSkill(s.id, 'category', v)} placeholder="Languages" />
              </div>
              <div className="flex-1">
                <Field label={idx === 0 ? 'Skills (comma separated)' : ''} value={s.items} onChange={(v) => updateSkill(s.id, 'items', v)} placeholder="JavaScript, Python, Go" />
              </div>
              <RemoveButton onClick={() => removeSkill(s.id)} />
            </div>
          ))}
          <AddButton label="Add Skill Category" onClick={addSkill} />
        </SectionBlock>

        {/* Projects */}
        <SectionBlock title={`Projects (${projects.length})`} defaultOpen={false}>
          {projects.map((proj, idx) => (
            <div key={proj.id} className="border border-gray-100 rounded-lg p-3 space-y-2 bg-gray-50">
              <div className="flex justify-between items-center">
                <p className="text-xs font-semibold text-gray-700">Project {idx + 1}</p>
                <RemoveButton onClick={() => removeProject(proj.id)} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Project Name" value={proj.name} onChange={(v) => updateProject(proj.id, 'name', v)} placeholder="My Awesome Project" />
                <Field label="Link" value={proj.link} onChange={(v) => updateProject(proj.id, 'link', v)} placeholder="github.com/you/project" />
              </div>
              <TextArea label="Description" value={proj.description} onChange={(v) => updateProject(proj.id, 'description', v)} rows={2} placeholder="What the project does and its impact..." />
              <Field label="Technologies" value={proj.technologies} onChange={(v) => updateProject(proj.id, 'technologies', v)} placeholder="React, Node.js, PostgreSQL" />
            </div>
          ))}
          <AddButton label="Add Project" onClick={addProject} />
        </SectionBlock>

        {/* Certifications */}
        <SectionBlock title={`Certifications (${certifications.length})`} defaultOpen={false}>
          {certifications.map((c, idx) => (
            <div key={c.id} className="border border-gray-100 rounded-lg p-3 space-y-2 bg-gray-50">
              <div className="flex justify-between items-center">
                <p className="text-xs font-semibold text-gray-700">Cert {idx + 1}</p>
                <RemoveButton onClick={() => removeCertification(c.id)} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Certification Name" value={c.name} onChange={(v) => updateCertification(c.id, 'name', v)} placeholder="AWS Solutions Architect" />
                <Field label="Issuing Organization" value={c.issuer} onChange={(v) => updateCertification(c.id, 'issuer', v)} placeholder="Amazon Web Services" />
                <Field label="Date" value={c.date} onChange={(v) => updateCertification(c.id, 'date', v)} type="month" />
                <Field label="Link" value={c.link} onChange={(v) => updateCertification(c.id, 'link', v)} placeholder="verify.aws.com/..." />
              </div>
            </div>
          ))}
          <AddButton label="Add Certification" onClick={addCertification} />
        </SectionBlock>
      </div>
    </div>
  );
}
