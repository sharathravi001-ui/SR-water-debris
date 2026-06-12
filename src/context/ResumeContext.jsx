import { createContext, useContext, useState, useEffect } from 'react';
import { sampleResume, TEMPLATES } from '../data/resumeDefaults';

const ResumeContext = createContext(null);

const LS_KEY = 'resume_data';
const LS_TEMPLATE_KEY = 'resume_template';

export function ResumeProvider({ children }) {
  const [resume, setResume] = useState(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      return saved ? JSON.parse(saved) : sampleResume;
    } catch {
      return sampleResume;
    }
  });

  const [template, setTemplate] = useState(() => {
    return localStorage.getItem(LS_TEMPLATE_KEY) || 'modern';
  });

  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('anthropic_api_key') || '';
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(resume));
  }, [resume]);

  useEffect(() => {
    localStorage.setItem(LS_TEMPLATE_KEY, template);
  }, [template]);

  const updatePersonalInfo = (field, value) => {
    setResume((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      location: '',
      bullets: [''],
    };
    setResume((prev) => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const updateExperience = (id, field, value) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  };

  const removeExperience = (id) => {
    setResume((prev) => ({ ...prev, experience: prev.experience.filter((e) => e.id !== id) }));
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      startDate: '',
      endDate: '',
      gpa: '',
      honors: '',
    };
    setResume((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const updateEducation = (id, field, value) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  };

  const removeEducation = (id) => {
    setResume((prev) => ({ ...prev, education: prev.education.filter((e) => e.id !== id) }));
  };

  const addSkill = () => {
    const newSkill = { id: Date.now().toString(), category: '', items: '' };
    setResume((prev) => ({ ...prev, skills: [...prev.skills, newSkill] }));
  };

  const updateSkill = (id, field, value) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }));
  };

  const removeSkill = (id) => {
    setResume((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.id !== id) }));
  };

  const addProject = () => {
    const newProj = { id: Date.now().toString(), name: '', description: '', technologies: '', link: '' };
    setResume((prev) => ({ ...prev, projects: [...prev.projects, newProj] }));
  };

  const updateProject = (id, field, value) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }));
  };

  const removeProject = (id) => {
    setResume((prev) => ({ ...prev, projects: prev.projects.filter((p) => p.id !== id) }));
  };

  const addCertification = () => {
    const newCert = { id: Date.now().toString(), name: '', issuer: '', date: '', link: '' };
    setResume((prev) => ({ ...prev, certifications: [...prev.certifications, newCert] }));
  };

  const updateCertification = (id, field, value) => {
    setResume((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    }));
  };

  const removeCertification = (id) => {
    setResume((prev) => ({ ...prev, certifications: prev.certifications.filter((c) => c.id !== id) }));
  };

  const saveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('anthropic_api_key', key);
  };

  const resetResume = () => setResume(sampleResume);

  return (
    <ResumeContext.Provider
      value={{
        resume,
        template,
        setTemplate,
        apiKey,
        saveApiKey,
        updatePersonalInfo,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        updateSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject,
        addCertification,
        updateCertification,
        removeCertification,
        resetResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used inside ResumeProvider');
  return ctx;
}
