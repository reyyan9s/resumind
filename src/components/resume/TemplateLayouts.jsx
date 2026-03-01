import React from 'react';

// Shared renderer for user-defined custom sections
const CustomSections = ({ data, headingClass = 'text-[11px] uppercase tracking-[0.3em] text-primary font-black mb-4' }) => {
    const sections = data.customSections || []
    if (!sections.length) return null
    return sections.map(cs => (
        <section key={cs.id} className="mt-8">
            <h3 className={headingClass}>{cs.title}</h3>
            <div className="space-y-4">
                {cs.entries.map((entry, i) => (
                    <div key={i}>
                        <div className="flex justify-between items-baseline">
                            <span className="font-bold text-slate-900 text-[15px]">{entry.title}</span>
                            {entry.period && <span className="text-[11px] text-slate-400 font-black uppercase tracking-widest">{entry.period}</span>}
                        </div>
                        {entry.subtitle && <div className="text-[12px] font-bold text-primary uppercase tracking-widest mt-0.5">{entry.subtitle}</div>}
                        {entry.description && <p className="text-[13px] text-slate-600 leading-relaxed mt-1">{entry.description}</p>}
                    </div>
                ))}
                {cs.entries.length === 0 && <p className="text-[12px] text-slate-400 italic">No entries yet.</p>}
            </div>
        </section>
    ))
}

export const MinimalistLayout = ({ data }) => (
    <div className="h-full">
        <header className="mb-10 pb-10 border-b-2 border-slate-900">
            <h1 className="text-6xl font-serif text-slate-950 mb-3 font-black tracking-tighter leading-none">{data.name || 'Your Name'}</h1>
            <h2 className="text-2xl text-slate-500 mb-8 font-medium tracking-tight uppercase tracking-[0.1em]">{data.role || 'Job Title'}</h2>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-[13px] text-slate-400 font-bold uppercase tracking-widest">
                <span className="flex items-center gap-2">E: {data.email || 'email@example.com'}</span>
                <span className="flex items-center gap-2">T: {data.phone || '(123) 456-7890'}</span>
                <span className="flex items-center gap-2">L: {data.location || 'City, State'}</span>
            </div>
        </header>

        <section className="mb-10">
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-primary font-black mb-6">Executive Summary</h3>
            <p className="text-[16px] leading-relaxed text-slate-800 font-medium italic serif">
                "{data.summary || 'Write a short summary about yourself here.'}"
            </p>
        </section>

        <section className="mb-10">
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-primary font-black mb-6">Professional Trajectory</h3>
            <div className="space-y-8">
                {data.experience.map((exp, i) => (
                    <div key={i} className="relative pl-6 border-l-2 border-slate-100">
                        <div className="absolute top-1.5 -left-[9px] w-4 h-4 rounded-full bg-white border-4 border-primary shadow-lg" />
                        <div className="flex justify-between items-baseline mb-2">
                            <h4 className="font-black text-slate-950 text-[18px] tracking-tight">{exp.role}</h4>
                            <span className="text-[11px] text-slate-400 font-black uppercase tracking-widest">{exp.period}</span>
                        </div>
                        <div className="text-[13px] font-black text-primary mb-3 uppercase tracking-widest">{exp.company}</div>
                        <p className="text-[14px] text-slate-600 leading-relaxed font-medium">{exp.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        <section className="mb-10">
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-primary font-black mb-6">Academic Excellence</h3>
            <div className="space-y-6">
                {data.education.map((edu, i) => (
                    <div key={i}>
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-bold text-slate-950 text-[17px] tracking-tight">{edu.school}</h4>
                            <span className="text-[11px] text-slate-400 font-black tracking-widest">{edu.period}</span>
                        </div>
                        <div className="text-[14px] text-slate-600 font-bold uppercase tracking-widest">{edu.degree}</div>
                    </div>
                ))}
            </div>
        </section>

        <section>
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-primary font-black mb-6">Strategic Arsenal</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
                {data.skills.map((skill, i) => (
                    <span key={skill} className="text-[13px] text-slate-800 font-bold uppercase tracking-wider bg-slate-50 px-3 py-1 rounded-lg">
                        {skill}
                    </span>
                ))}
            </div>
        </section>
        <CustomSections data={data} />
    </div>
);

export const CreativeLayout = ({ data }) => (
    <div className="flex flex-col h-full">
        <header className="text-center mb-16 px-10">
            <h1 className="text-7xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4 tracking-tighter leading-none">{data.name}</h1>
            <div className="h-1 w-24 bg-primary mx-auto mb-6" />
            <h2 className="text-xl text-slate-900 font-black uppercase tracking-[0.3em] mb-6">{data.role}</h2>
            <div className="flex justify-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-400">
                <span>{data.email}</span>
                <span>{data.phone}</span>
            </div>
        </header>
        <div className="grid grid-cols-12 gap-12">
            <div className="col-span-8">
                <section className="mb-12">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-8 border-b-2 border-primary/10 pb-2">Experience</h3>
                    <div className="space-y-10">
                        {data.experience.map((exp, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-2">
                                    <h4 className="font-black text-xl text-slate-900">{exp.role}</h4>
                                    <span className="text-[10px] font-black uppercase text-slate-400">{exp.period}</span>
                                </div>
                                <div className="text-sm font-black text-primary uppercase mb-4 tracking-wider">{exp.company}</div>
                                <p className="text-sm text-slate-600 leading-relaxed">{exp.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <div className="col-span-4 space-y-12">
                <section>
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-slate-50 border border-slate-100 text-[10px] font-black uppercase rounded-lg text-slate-600">{skill}</span>
                        ))}
                    </div>
                </section>
                <section>
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">Education</h3>
                    {data.education.map((edu, i) => (
                        <div key={i} className="mb-4">
                            <p className="font-black text-sm text-slate-900">{edu.school}</p>
                            <p className="text-xs text-slate-400 font-bold uppercase">{edu.degree}</p>
                        </div>
                    ))}
                </section>
            </div>
            <CustomSections data={data} headingClass="text-xs font-black uppercase tracking-[0.3em] text-primary mb-4 border-b-2 border-primary/10 pb-2" />
        </div>
    </div>
);

export const ExecutiveLayout = ({ data }) => (
    <div className="flex flex-col">
        <header className="border-l-[12px] border-primary pl-8 mb-16 py-4">
            <h1 className="text-5xl font-serif font-black text-slate-950 mb-2 tracking-tight leading-none">{data.name}</h1>
            <h2 className="text-2xl font-serif italic text-slate-600 mb-6">{data.role}</h2>
            <div className="flex gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest border-t border-slate-100 pt-6">
                <span>{data.email}</span>
                <span className="opacity-30">|</span>
                <span>{data.phone}</span>
            </div>
        </header>
        <section className="mb-14">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary mb-6 flex items-center gap-4">
                Executive Profile <div className="flex-1 h-px bg-slate-100" />
            </h3>
            <p className="text-lg font-serif leading-relaxed text-slate-800 italic">"{data.summary}"</p>
        </section>
        <section className="mb-14">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary mb-8 flex items-center gap-4">
                Professional Legacy <div className="flex-1 h-px bg-slate-100" />
            </h3>
            <div className="space-y-12">
                {data.experience.map((exp, i) => (
                    <div key={i} className="grid grid-cols-4 gap-8">
                        <div className="col-span-1 text-[11px] font-black text-slate-400 pt-1.5 uppercase tracking-widest">{exp.period}</div>
                        <div className="col-span-3">
                            <h4 className="text-xl font-serif font-black text-slate-900 mb-1">{exp.role}</h4>
                            <div className="text-sm font-black text-primary uppercase tracking-widest mb-4">{exp.company}</div>
                            <p className="text-sm text-slate-600 leading-relaxed font-serif">{exp.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
        <section className="grid grid-cols-2 gap-12">
            <div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary mb-6">Strategic Skills</h3>
                <div className="flex flex-wrap gap-3">
                    {data.skills.map(skill => (
                        <span key={skill} className="text-xs font-black uppercase tracking-widest text-slate-700 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-100">{skill}</span>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary mb-6">Education</h3>
                {data.education.map((edu, i) => (
                    <div key={i} className="mb-4">
                        <p className="font-serif font-black text-slate-900">{edu.school}</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{edu.degree}</p>
                    </div>
                ))}
            </div>
        </section>
        <CustomSections data={data} headingClass="text-[11px] font-black uppercase tracking-[0.4em] text-primary mb-4" />
    </div>
);

export const AcademicLayout = ({ data }) => (
    <div className="flex flex-col">
        <header className="text-center mb-16">
            <h1 className="text-4xl font-serif text-slate-900 mb-2">{data.name}</h1>
            <p className="text-sm text-slate-600 mb-6">{data.email} • {data.phone}{data.location ? ` • ${data.location}` : ''}</p>
            <div className="h-px w-full bg-slate-200" />
        </header>
        <section className="mb-10">
            <h3 className="text-lg font-serif italic border-b border-slate-200 mb-4 pb-1">Professional Summary</h3>
            <p className="text-sm leading-relaxed text-slate-700 font-serif">{data.summary}</p>
        </section>
        <section className="mb-10">
            <h3 className="text-lg font-serif italic border-b border-slate-200 mb-6 pb-1">Experience</h3>
            <div className="space-y-8">
                {data.experience.map((exp, i) => (
                    <div key={i}>
                        <div className="flex justify-between font-serif mb-1">
                            <span className="font-bold">{exp.company}</span>
                            <span>{exp.period}</span>
                        </div>
                        <p className="italic text-sm mb-3">{exp.role}</p>
                        <p className="text-sm text-slate-600 leading-relaxed font-serif pl-4">{exp.desc}</p>
                    </div>
                ))}
            </div>
        </section>
        <section className="mb-10">
            <h3 className="text-lg font-serif italic border-b border-slate-200 mb-6 pb-1">Education</h3>
            {data.education.map((edu, i) => (
                <div key={i} className="flex justify-between font-serif">
                    <span><span className="font-bold">{edu.school}</span>, {edu.degree}</span>
                    <span>{edu.period}</span>
                </div>
            ))}
        </section>
        <CustomSections data={data} headingClass="text-lg font-serif italic border-b border-slate-200 mb-4 pb-1 text-slate-700" />
    </div>
);

export const ResumeLayout = ({ templateId, data }) => {
    switch (templateId) {
        case 'creative':
        case 'designer':
        case 'startup':
            return <CreativeLayout data={data} />;
        case 'executive':
            return <ExecutiveLayout data={data} />;
        case 'academic':
            return <AcademicLayout data={data} />;
        case 'minimalist':
        case 'classic':
        case 'developer':
        default:
            return <MinimalistLayout data={data} />;
    }
};
