import loading from '../assets/loading_role.svg'

export default function Spinner() {
    return (
        <div style={overlayStyle}>
            <img src={loading} alt="loading..." style={{ width: 80, height: 80 }} />
        </div>
    );
}

const overlayStyle = {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0, 0, 0, 0.4)",

    zIndex: 9999,
};
