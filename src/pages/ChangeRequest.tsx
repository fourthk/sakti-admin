import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MoreVertical, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const mockData = [
  {
    id: "CR-001",
    dinas: "Infrastructure",
    title: "Update Server Configuration",
    asset: "Server Dell PowerEdge R740",
    status: "Approved",
    score: 87,
    type: "Standard",
    receivedDate: "2025-01-15",
  },
  {
    id: "CR-002",
    dinas: "Network",
    title: "Network Switch Upgrade",
    asset: "Switch Cisco Catalyst",
    status: "Scheduled",
    score: 75,
    type: "Normal",
    receivedDate: "2025-01-18",
  },
  {
    id: "CR-003",
    dinas: "Application",
    title: "Deploy New Application",
    asset: "Web Service",
    status: "Implementing",
    score: 92,
    type: "Emergency",
    receivedDate: "2025-01-20",
  },
  {
    id: "CR-004",
    dinas: "Database",
    title: "Database Migration & Optimization",
    asset: "PostgreSQL",
    status: "Submitted",
    score: 65,
    type: "Standard",
    receivedDate: "2025-01-22",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-700 border-green-200";
    case "Scheduled":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "Implementing":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "Submitted":
      return "bg-teal-100 text-teal-700 border-teal-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const ChangeRequest = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = mockData.filter((item) => {
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dinas.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.asset.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="hover:bg-muted p-1 rounded transition-colors"
        >
          <ArrowLeft size={24} style={{ color: "#384E66" }} />
        </button>
        <h1 className="text-2xl font-semibold" style={{ color: "#384E66" }}>
          Change Request
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-gray-200"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger
            className="w-[180px] text-white border-0"
            style={{ backgroundColor: "#384E66" }}
          >
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Submitted">Submitted</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
            <SelectItem value="Implementing">Implementing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow style={{ backgroundColor: "#384E66" }}>
              <TableHead className="text-white font-medium">CR ID</TableHead>
              <TableHead className="text-white font-medium">Dinas</TableHead>
              <TableHead className="text-white font-medium">Title</TableHead>
              <TableHead className="text-white font-medium">Asset</TableHead>
              <TableHead className="text-white font-medium">Status</TableHead>
              <TableHead className="text-white font-medium">Score</TableHead>
              <TableHead className="text-white font-medium">Type</TableHead>
              <TableHead className="text-white font-medium">Received Date</TableHead>
              <TableHead className="text-white font-medium">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell className="font-medium" style={{ color: "#384E66" }}>
                  {item.id}
                </TableCell>
                <TableCell>{item.dinas}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.asset}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="text-teal-600 font-medium">
                  {item.score}
                </TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.receivedDate}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical size={18} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                      <DropdownMenuItem
                        onClick={() => navigate(`/change-request/${item.id}`)}
                      >
                        Detail
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ChangeRequest;
