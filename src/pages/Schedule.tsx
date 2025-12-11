import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Schedule = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => navigate(-1)}
        className="hover:bg-muted p-1 rounded transition-colors"
      >
        <ArrowLeft size={24} style={{ color: "#384E66" }} />
      </button>
      <h1 className="text-2xl font-semibold" style={{ color: "#384E66" }}>
        Schedule
      </h1>
    </div>
  );
};

export default Schedule;
