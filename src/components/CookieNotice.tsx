import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "tempest-gold-cookie-notice-v1";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(window.localStorage.getItem(STORAGE_KEY) !== "acknowledged");
  }, []);

  if (!visible) return null;

  return (
    <aside className="cookie-notice" aria-label="Cookie notice">
      <div>
        <h2>Essential website storage</h2>
        <p>
          This website currently uses only storage needed for core functions,
          including remembering that you have seen this notice. Analytics and
          advertising cookies are not active.
        </p>
      </div>
      <div className="cookie-actions">
        <Link to="/cookies" className="text-link">
          Read Cookie Notice
        </Link>
        <button
          type="button"
          className="button-gold"
          onClick={() => {
            window.localStorage.setItem(STORAGE_KEY, "acknowledged");
            setVisible(false);
          }}
        >
          Continue with essential storage
        </button>
      </div>
    </aside>
  );
}
