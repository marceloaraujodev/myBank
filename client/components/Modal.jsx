

export default function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onClose(true);
  };

  const handleCancel = () => {
    onClose(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Before you go, please tell me how likely you were to call me for an interview?</h2>
        <div>
          {/* Render your slider or feedback form here */}
          <input type="range" min="1" max="10" />
        </div>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}