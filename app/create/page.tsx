import { TEMPLATES, TemplateType } from '@/components/templates';
import { Palette } from 'lucide-react';
import React, { useState } from 'react'

const CreatePage = () => {
    // 1. Central Data State
  const [formData, setFormData] = useState({
    names: "Maria & Juan",
    date: "October 24, 2026",
    location: "The Amalfi Coast, Italy",
  });

  // 2. Selected Template State
  const [activeTemplate, setActiveTemplate] = useState<TemplateType>("modern");

  // This dynamically picks the component based on our state
  const SelectedTemplate = TEMPLATES[activeTemplate];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-stone-100">
      
      {/* LEFT SIDE: THE FORM (Editor) */}
      <aside className="w-full lg:w-100 p-8 bg-white shadow-xl z-20 overflow-y-auto">
        <h2 className="text-2xl font-serif italic mb-8">Customize Your Invite</h2>
        
        <div className="space-y-6">
          {/* Template Picker */}
          <div>
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 mb-4">
              <Palette size={14} /> Select Design
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(TEMPLATES) as TemplateType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTemplate(t)}
                  className={`py-2 text-[10px] uppercase tracking-tighter border rounded-md transition-all ${
                    activeTemplate === t 
                    ? "bg-stone-800 text-white border-stone-800" 
                    : "bg-transparent text-stone-400 border-stone-200 hover:border-stone-400"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-stone-100" />

          {/* Text Inputs */}
          <div className="space-y-4">
            <InputField 
              label="Couple's Names" 
              value={formData.names} 
              onChange={(val) => setFormData({...formData, names: val})} 
            />
            <InputField 
              label="Wedding Date" 
              value={formData.date} 
              onChange={(val) => setFormData({...formData, date: val})} 
            />
          </div>
        </div>
      </aside>

      {/* RIGHT SIDE: THE PREVIEW */}
      <main className="flex-1 h-screen overflow-y-auto bg-stone-200 p-4 md:p-12">
        <div className="max-w-[800px] mx-auto bg-white shadow-2xl min-h-full rounded-lg overflow-hidden origin-top scale-[0.85] md:scale-100 transition-transform">
          {/* We pass the data into whichever template is currently selected */}
          <SelectedTemplate data={formData} />
        </div>
      </main>
    </div>
  );
 
}




export const InputField = ({label, value, onChange}:{label:string, value:string, 
    onChange:(v:string)=> void})=>{
        return (
    <div>
      <label className="block text-[10px] uppercase tracking-widest text-stone-400 mb-2">{label}</label>
      <input 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-stone-200 py-2 focus:border-stone-800 outline-none text-sm"
      />
    </div>
  );

    }

export default CreatePage