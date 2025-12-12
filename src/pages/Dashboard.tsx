import { FileText, Clock, CheckCircle, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const statsCards = [
  {
    title: "Change Reports This Month",
    value: 20,
    icon: FileText,
  },
  {
    title: "Inspection (In Progress)",
    value: 8,
    icon: Clock,
  },
  {
    title: "Change Schedule",
    value: 2,
    icon: CheckCircle,
  },
  {
    title: "Patch Schedule",
    value: 0,
    icon: Calendar,
  },
];

const weeklyData = [
  { day: "Senin", submitted: 5, approved: 3, implemented: 2 },
  { day: "Selasa", submitted: 6, approved: 4, implemented: 3 },
  { day: "Rabu", submitted: 4, approved: 3, implemented: 2 },
  { day: "Kamis", submitted: 7, approved: 5, implemented: 4 },
  { day: "Jumat", submitted: 8, approved: 6, implemented: 4 },
  { day: "Sabtu", submitted: 3, approved: 2, implemented: 2 },
  { day: "Minggu", submitted: 2, approved: 2, implemented: 2 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold" style={{ color: "#384E66" }}>
        Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => (
          <Card
            key={stat.title}
            className="border"
            style={{ borderColor: "#384E66" }}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#384E66" }}
                  >
                    {stat.title}
                  </p>
                  <p
                    className="text-4xl font-bold mt-2"
                    style={{ color: "#384E66" }}
                  >
                    {stat.value}
                  </p>
                </div>
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: "#F5F5F5" }}
                >
                  <stat.icon size={24} style={{ color: "#384E66" }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly Trend Chart */}
      <Card className="border" style={{ borderColor: "#384E66" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold" style={{ color: "#384E66" }}>
            Weekly Trend
          </CardTitle>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Reports Submitted / Approved / Implemented
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} barCategoryGap="20%">
                <XAxis
                  dataKey="day"
                  tick={{ fill: "#384E66", fontSize: 12 }}
                  axisLine={{ stroke: "#E5E7EB" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#384E66", fontSize: 12 }}
                  axisLine={{ stroke: "#E5E7EB" }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #384E66",
                    borderRadius: "8px",
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "20px" }}
                />
                <Bar
                  dataKey="submitted"
                  name="Submitted"
                  fill="#384E66"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="approved"
                  name="Approved"
                  fill="#6B8CAE"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="implemented"
                  name="Implemented"
                  fill="#A8C5DA"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
