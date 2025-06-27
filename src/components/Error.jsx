export default function Error({ title, error }) {
    return (
        <div className="error">
            <h2>{title}</h2>
            <p>{error}</p>
        </div>

    );
}