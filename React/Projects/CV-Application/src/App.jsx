import { useMemo, useState } from 'react';
import EditableSection from './components/EditableSection';
import './styles/app.css';

const createGeneralInfo = () => ({
    fullName: 'Jordan Ellis',
    email: 'jordan.ellis@email.com',
    phone: '+1 (555) 213-9842',
});

const createEducation = () => ({
    school: 'Northbridge University',
    studyTitle: 'B.S. in Computer Science',
    studyDate: '2018 - 2022',
});

const createExperience = () => ({
    company: 'Brightline Studio',
    position: 'Frontend Engineer',
    responsibilities:
        'Built accessible user interfaces, partnered with designers on component systems, and shipped product improvements iteratively.',
    startDate: 'Jan 2023',
    endDate: 'Present',
});

function App() {
    const [generalInfo, setGeneralInfo] = useState(createGeneralInfo);
    const [education, setEducation] = useState(createEducation);
    const [experience, setExperience] = useState(createExperience);

    const profileSummary = useMemo(() => {
        return [generalInfo.fullName, education.studyTitle, experience.position]
            .filter(Boolean)
            .join(' • ');
    }, [education.studyTitle, experience.position, generalInfo.fullName]);

    return (
        <main className="app-shell">
            <section className="hero">
                <div className="hero__copy">
                    <p className="eyebrow">CV Application</p>
                    <h1>Build, preview, and refine a professional CV in one place.</h1>
                    <p className="hero__text">
                        Each section behaves like a real product form: submit to lock it in, edit to restore the inputs, and
                        update again without losing the previous data.
                    </p>
                </div>
                <aside className="hero__card" aria-label="Profile summary">
                    <span className="hero__card-label">Current profile</span>
                    <strong>{generalInfo.fullName}</strong>
                    <span>{profileSummary}</span>
                </aside>
            </section>

            <div className="layout">
                <section className="editor-grid" aria-label="CV editor">
                    <EditableSection
                        title="General Information"
                        description="Capture your core contact details."
                        fields={[
                            { key: 'fullName', label: 'Full name', type: 'text', placeholder: 'Ada Lovelace', required: true },
                            { key: 'email', label: 'Email', type: 'email', placeholder: 'ada@example.com', required: true },
                            { key: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 (555) 000-0000', required: true },
                        ]}
                        value={generalInfo}
                        onSave={setGeneralInfo}
                        renderSummary={(data) => (
                            <>
                                <h3>{data.fullName}</h3>
                                <p>{data.email}</p>
                                <p>{data.phone}</p>
                            </>
                        )}
                        validate={(data) => {
                            const errors = {};
                            if (!data.fullName.trim()) errors.fullName = 'Full name is required.';
                            if (!/^\S+@\S+\.\S+$/.test(data.email)) errors.email = 'Enter a valid email address.';
                            if (data.phone.replace(/\D/g, '').length < 7) errors.phone = 'Enter a valid phone number.';
                            return errors;
                        }}
                    />

                    <EditableSection
                        title="Education"
                        description="Add your latest academic background."
                        fields={[
                            { key: 'school', label: 'School name', type: 'text', placeholder: 'University of Example', required: true },
                            { key: 'studyTitle', label: 'Title of study', type: 'text', placeholder: 'B.A. in Design', required: true },
                            { key: 'studyDate', label: 'Date of study', type: 'text', placeholder: '2019 - 2023', required: true },
                        ]}
                        value={education}
                        onSave={setEducation}
                        renderSummary={(data) => (
                            <>
                                <h3>{data.school}</h3>
                                <p>{data.studyTitle}</p>
                                <p>{data.studyDate}</p>
                            </>
                        )}
                        validate={(data) => {
                            const errors = {};
                            if (!data.school.trim()) errors.school = 'School name is required.';
                            if (!data.studyTitle.trim()) errors.studyTitle = 'Study title is required.';
                            if (!data.studyDate.trim()) errors.studyDate = 'Study date is required.';
                            return errors;
                        }}
                    />

                    <EditableSection
                        title="Practical Experience"
                        description="Document your most relevant role and responsibilities."
                        fields={[
                            { key: 'company', label: 'Company name', type: 'text', placeholder: 'Acme Corp', required: true },
                            { key: 'position', label: 'Position title', type: 'text', placeholder: 'Software Engineer', required: true },
                            {
                                key: 'responsibilities',
                                label: 'Main responsibilities',
                                type: 'textarea',
                                placeholder: 'Describe what you owned and delivered.',
                                required: true,
                                rows: 5,
                            },
                            { key: 'startDate', label: 'Date from', type: 'text', placeholder: 'Jan 2021', required: true },
                            { key: 'endDate', label: 'Until', type: 'text', placeholder: 'Present', required: true },
                        ]}
                        value={experience}
                        onSave={setExperience}
                        renderSummary={(data) => (
                            <>
                                <h3>{data.company}</h3>
                                <p className="section-card__meta">
                                    {data.position} • {data.startDate} to {data.endDate}
                                </p>
                                <p>{data.responsibilities}</p>
                            </>
                        )}
                        validate={(data) => {
                            const errors = {};
                            if (!data.company.trim()) errors.company = 'Company name is required.';
                            if (!data.position.trim()) errors.position = 'Position title is required.';
                            if (!data.responsibilities.trim()) errors.responsibilities = 'Responsibilities are required.';
                            if (!data.startDate.trim()) errors.startDate = 'Start date is required.';
                            if (!data.endDate.trim()) errors.endDate = 'End date is required.';
                            return errors;
                        }}
                    />
                </section>

                <aside className="preview-panel" aria-label="CV preview">
                    <div className="preview-panel__header">
                        <p className="eyebrow">Live preview</p>
                        <h2>Your CV, as employers will see it.</h2>
                    </div>

                    <article className="resume">
                        <header className="resume__header">
                            <h3>{generalInfo.fullName}</h3>
                            <p>{generalInfo.email}</p>
                            <p>{generalInfo.phone}</p>
                        </header>

                        <section className="resume__section">
                            <h4>Education</h4>
                            <p className="resume__primary">{education.school}</p>
                            <p>{education.studyTitle}</p>
                            <p>{education.studyDate}</p>
                        </section>

                        <section className="resume__section">
                            <h4>Experience</h4>
                            <p className="resume__primary">{experience.company}</p>
                            <p>
                                {experience.position} • {experience.startDate} to {experience.endDate}
                            </p>
                            <p>{experience.responsibilities}</p>
                        </section>
                    </article>
                </aside>
            </div>
        </main>
    );
}

export default App;