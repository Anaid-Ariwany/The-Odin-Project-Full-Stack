import { useMemo, useState } from 'react';
import '../styles/section.css';

function buildDraft(fields, value) {
    return fields.reduce((draft, field) => {
        draft[field.key] = value[field.key] ?? '';
        return draft;
    }, {});
}

function EditableSection({ title, description, fields, value, onSave, renderSummary, validate }) {
    const [isEditing, setIsEditing] = useState(true);
    const [draft, setDraft] = useState(() => buildDraft(fields, value));
    const [errors, setErrors] = useState({});

    const summary = useMemo(() => renderSummary(value), [renderSummary, value]);

    function handleChange(event) {
        const { name, value: nextValue } = event.target;
        setDraft((current) => ({ ...current, [name]: nextValue }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        const nextErrors = validate(draft);

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        onSave(draft);
        setErrors({});
        setIsEditing(false);
    }

    function handleEdit() {
        setDraft(buildDraft(fields, value));
        setErrors({});
        setIsEditing(true);
    }

    return (
        <article className="section-card">
            <div className="section-card__heading">
                <div>
                    <p className="eyebrow">{title}</p>
                    <p className="section-card__description">{description}</p>
                </div>
                <button type="button" className="section-card__toggle" onClick={isEditing ? undefined : handleEdit}>
                    {isEditing ? 'Editing' : 'Edit'}
                </button>
            </div>

            {isEditing ? (
                <form className="section-form" onSubmit={handleSubmit} noValidate>
                    <div className="section-form__fields">
                        {fields.map((field) => (
                            <label className="field" key={field.key}>
                                <span className="field__label">
                                    {field.label}
                                    {field.required ? <span aria-hidden="true"> *</span> : null}
                                </span>
                                {field.type === 'textarea' ? (
                                    <textarea
                                        name={field.key}
                                        rows={field.rows ?? 4}
                                        placeholder={field.placeholder}
                                        value={draft[field.key]}
                                        onChange={handleChange}
                                        aria-invalid={Boolean(errors[field.key])}
                                        aria-describedby={errors[field.key] ? `${field.key}-error` : undefined}
                                    />
                                ) : (
                                    <input
                                        name={field.key}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        value={draft[field.key]}
                                        onChange={handleChange}
                                        aria-invalid={Boolean(errors[field.key])}
                                        aria-describedby={errors[field.key] ? `${field.key}-error` : undefined}
                                    />
                                )}
                                {errors[field.key] ? (
                                    <span className="field__error" id={`${field.key}-error`}>
                                        {errors[field.key]}
                                    </span>
                                ) : null}
                            </label>
                        ))}
                    </div>

                    <div className="section-form__actions">
                        <button type="submit" className="button button--primary">
                            Submit
                        </button>
                    </div>
                </form>
            ) : (
                <div className="section-summary">
                    {summary}
                    <button type="button" className="button button--secondary" onClick={handleEdit}>
                        Edit section
                    </button>
                </div>
            )}
        </article>
    );
}

export default EditableSection;