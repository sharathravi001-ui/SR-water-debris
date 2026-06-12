import { Link } from 'react-router-dom';
import { Sparkles, FileText } from 'lucide-react';
import ResumeEditor from '../components/resume/ResumeEditor';
import ResumePreview from '../components/resume/ResumePreview';

export default function ResumeBuilderPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      {/* Top navigation */}
      <header className="bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <FileText size={20} className="text-indigo-600" />
          <span className="font-bold text-gray-900 text-lg">ResumeAI</span>
          <span className="text-gray-300 mx-1">|</span>
          <span className="text-sm text-gray-500">Builder</span>
        </div>
        <Link
          to="/resume/cover-letter"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <Sparkles size={15} />
          Generate Cover Letter
        </Link>
      </header>

      {/* Split layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor panel */}
        <div className="w-[420px] flex-shrink-0 border-r border-gray-200 overflow-hidden">
          <ResumeEditor />
        </div>

        {/* Preview panel */}
        <div className="flex-1 overflow-hidden">
          <ResumePreview />
        </div>
      </div>
    </div>
  );
}
