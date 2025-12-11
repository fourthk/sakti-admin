import { useEffect, useState, useCallback } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card } from "@/components/ui/card";
import {
  FileText,
  Clock,
  CheckCircle,
  Calendar as CalendarIcon,
} from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_BASE = "https://sakti-backend-674826252080.asia-southeast2.run.app";

interface SummaryData {
  total_today: number;
  pending_inspection: number;
  approved_waiting_schedule: number;
  today_schedules: number;
}

interface WeeklyTrendItem {
  date: string;
  day: string;
  submitted: number;
  inspected: number;
  implemented: number;
}

const getMondayOfCurrentWeek = (): string => {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(today.setDate(diff));
  return monday.toISOString().split("T")[0];
};

const Dashboard = () => {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [weeklyTrend, setWeeklyTrend] = useState<WeeklyTrendItem[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const weekStart = getMondayOfCurrentWeek();

  const fetchSummary = useCallback(async () => {
    if (!token) return;

    const res = await fetch(`${API_BASE}/dashboard/summary`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();
    if (json.success) setSummary(json.data);
  }, [token]);

  const fetchWeeklyTrend = useCallback(async () => {
    if (!token) return;

    const res = await fetch(
      `${API_BASE}/dashboard/weekly-trend?week_start=${weekStart}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const json = await res.json();
    if (json.success) setWeeklyTrend(json.data);
  }, [token, weekStart]);

  useEffect(() => {
    (async () => {
      await Promise.all([fetchSummary(), fetchWeeklyTrend()]);
      setLoading(false);
    })();
  }, [fetchSummary, fetchWeeklyTrend]);

  if (loading) {
    return (
      <h1 className="text-xl font-semibold" style={{ color: "#253040" }}>
        Loading dashboard...
      </h1>
    );
  }

  if (!summary) {
    return (
      <h1 className="text-xl font-semibold text-red-600">
        Gagal memuat dashboard
      </h1>
    );
  }

  const weeklyData = {
    labels: weeklyTrend.map((d) => d.day),
    datasets: [
      {
        label: "Diajukan",
        data: weeklyTrend.map((d) => d.submitted),
        backgroundColor: "#46617E",
        borderRadius: 6,
      },
      {
        label: "Diperiksa",
        data: weeklyTrend.map((d) => d.inspected),
        backgroundColor: "#6E8EAC",
        borderRadius: 6,
      },
      {
        label: "Diimplementasi",
        data: weeklyTrend.map((d) => d.implemented),
        backgroundColor: "#A6BDD3",
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { usePointStyle: true, padding: 15 },
      },
    },
    scales: { y: { beginAtZero: true } },
  };

  const kpiData = [
    {
      label: "Total Laporan Hari Ini",
      value: summary.total_today,
      icon: FileText,
      color: "#384E66",
    },
    {
      label: "Pending Inspeksi",
      value: summary.pending_inspection,
      icon: Clock,
      color: "#384E66",
    },
    {
      label: "Disetujui (Menunggu Jadwal)",
      value: summary.approved_waiting_schedule,
      icon: CheckCircle,
      color: "#384E66",
    },
    {
      label: "Jadwal Hari Ini",
      value: summary.today_schedules,
      icon: CalendarIcon,
      color: "#384E66",
    },
  ];

  return (
    <div className="animate-fadeIn">
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card
              key={index}
              className="p-6 bg-white rounded-lg border border-gray-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-2">{kpi.label}</p>
                  <p className="text-4xl font-bold" style={{ color: kpi.color }}>
                    {kpi.value}
                  </p>
                </div>

                <div
                  className="p-3 rounded-lg"
                  style={{
                    backgroundColor: `${kpi.color}15`,
                  }}
                >
                  <Icon size={26} style={{ color: kpi.color }} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* WEEKLY TREND CARD */}
      <Card className="p-6 bg-white rounded-lg border border-gray-200">
        <div className="mb-4">
          <h2 className="text-xl font-bold" style={{ color: "#253040" }}>
            Weekly Trend
          </h2>
          <p className="text-sm text-gray-500">
            Reports Submitted / Approved / Implemented
          </p>
        </div>

        <div className="w-full h-[330px]">
          <Bar data={weeklyData} options={chartOptions} />
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;