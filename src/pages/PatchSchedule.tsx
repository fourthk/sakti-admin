import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PatchSchedule = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => navigate(-1)}
        className="p-1 rounded transition-colors"
        style={{ color: "#384E66" }}
      >
        <ArrowLeft size={24} />
      </button>
      <h1 className="text-2xl font-semibold" style={{ color: "#384E66" }}>
        Schedule
      </h1>
    </div>
  );
};

export default PatchSchedule;
