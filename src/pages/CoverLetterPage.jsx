import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Copy, CheckCheck, Key, X } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import Anthropic from '@anthropic-ai/sdk';

const TONES = [
  { id: 'professional', label: 'Professional', desc: 'Formal and polished' },
  { id: 'friendly', label: 'Friendly', desc: 'Warm and approachable' },
  { id: 'enthusiastic', label: 'Enthusiastic', desc: 'High energy and passionate' },
];

function ApiKeyModal({ onSave, onClose, currentKey }) {
  const [key, setKey] = useState(currentKey || '');
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">Enter Anthropic API Key</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Your API key is stored only in your browser's localStorage and never sent anywhere except directly to Anthropic's API.
        </p>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="sk-ant-..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 mb-4"
        />
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
          <button
            onClick={() => { onSave(key.trim()); onClose(); }}
            disabled={!key.trim()}
            className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            Save Key
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CoverLetterPage() {
  const { resume, apiKey, saveApiKey } = useResume();
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [tone, setTone] = useState('professional');
  const [letter, setLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);

  const buildPrompt = () => {
    const p = resume.personalInfo;
    const expSummary = resume.experience
      .slice(0, 3)
      .map((e) => `${e.position} at ${e.company}: ${e.bullets?.slice(0, 2).join('; ')}`)
      .join('\n');
    const skillsSummary = resume.skills.map((s) => s.items).join(', ');

    return `You are a professional cover letter writer. Write a compelling cover letter for the following candidate.

CANDIDATE PROFILE:
Name: ${p.name}
Current Title: ${p.title}
Summary: ${p.summary}
Key Experience:
${expSummary}
Top Skills: ${skillsSummary}

TARGET ROLE:
Job Title: ${jobTitle}
Company: ${company}
Job Description:
${jobDescription}

TONE: ${tone} (${TONES.find((t) => t.id === tone)?.desc})

Instructions:
- Write a complete, ready-to-send cover letter
- 3-4 paragraphs: opening hook, relevant experience, company-specific passion, call to action
- Match the specified tone throughout
- Reference specific details from both the resume and job description
- Do NOT include placeholders like [Your Name] — use the actual candidate data
- Start with "Dear Hiring Manager," unless company/role provides a better salutation
- End with a professional closing
- Keep it under 400 words`;
  };

  const generate = async () => {
    if (!apiKey) { setShowApiModal(true); return; }
    if (!jobTitle || !company || !jobDescription) {
      setError('Please fill in the job title, company, and job description.'); return;
    }
    setError('');
    setLoading(true);
    setLetter('');
    try {
      const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
      const stream = await client.messages.stream({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        messages: [{ role: 'user', content: buildPrompt() }],
      });
      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          setLetter((prev) => prev + chunk.delta.text);
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to generate cover letter. Check your API key.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showApiModal && <ApiKeyModal currentKey={apiKey} onSave={saveApiKey} onClose={() => setShowApiModal(false)} />}

      {/* Top nav */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/resume" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm">
            <ArrowLeft size={16} /> Back to Builder
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Cover Letter Generator</h1>
        </div>
        <button
          onClick={() => setShowApiModal(true)}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
            apiKey ? 'bg-green-50 border-green-200 text-green-700' : 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
          }`}
        >
          <Key size={12} />
          {apiKey ? 'API Key Set' : 'Set API Key'}
        </button>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left – input form */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Job Details</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Job Title *</label>
                <input
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Senior Software Engineer"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Company *</label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Corp"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Job Description *</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description here..."
                  rows={8}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-3">Tone</h2>
            <div className="grid grid-cols-3 gap-2">
              {TONES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    tone === t.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className={`text-xs font-semibold ${tone === t.id ? 'text-indigo-700' : 'text-gray-700'}`}>{t.label}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Resume preview summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-2">Using Resume Data</h2>
            <p className="text-xs text-gray-500">
              <span className="font-medium text-gray-700">{resume.personalInfo.name || 'Unnamed'}</span>
              {resume.personalInfo.title ? ` · ${resume.personalInfo.title}` : ''}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {resume.experience.length} experience · {resume.skills.length} skill categories
            </p>
            <Link to="/resume" className="text-xs text-indigo-500 hover:text-indigo-700 underline">Edit resume →</Link>
          </div>

          {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">{error}</p>}

          <button
            onClick={generate}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={16} /> Generate Cover Letter
              </>
            )}
          </button>
        </div>

        {/* Right – output */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-900">Generated Cover Letter</h2>
            {letter && (
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
              >
                {copied ? <CheckCheck size={13} className="text-green-600" /> : <Copy size={13} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>

          {letter ? (
            <textarea
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              className="flex-1 min-h-[500px] text-sm text-gray-800 leading-relaxed focus:outline-none resize-none"
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 py-16">
              <Sparkles size={40} className="mb-3 text-gray-200" />
              <p className="text-sm font-medium text-gray-500">Your cover letter will appear here</p>
              <p className="text-xs mt-1 text-gray-400">Fill in the job details and click Generate</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
