import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Button } from "@/components/ui/button";

interface ApprovalItem {
  id: string;
  crId: string;
  title: string;
  status: "NEED APPROVAL" | "APPROVED" | "REJECTED";
  type: "minor" | "standard" | "major";
}

const mockData: ApprovalItem[] = [
  { id: "1", crId: "TCK-STD-0006", title: "Check AC", status: "NEED APPROVAL", type: "minor" },
  { id: "2", crId: "TCK-MIN-0004", title: "Upgrade Inch Monitor", status: "NEED APPROVAL", type: "minor" },
  { id: "3", crId: "TCK-STD-0003", title: "Update Template Notifikasi Email", status: "APPROVED", type: "standard" },
  { id: "4", crId: "TCK-STD-0005", title: "Penyesuaian Batas Maksimal Lampiran Tiket", status: "APPROVED", type: "standard" },
  { id: "5", crId: "TCK-STD-0004", title: "Penambahan Kategori Layanan Baru di SILADAN", status: "APPROVED", type: "standard" },
  { id: "6", crId: "TCK-MAJ-0001", title: "Database Migration", status: "REJECTED", type: "major" },
];

const Approval = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredData = mockData.filter((item) => {
    const matchesSearch =
      item.crId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium border";
    switch (status) {
      case "NEED APPROVAL":
        return `${baseClasses} bg-orange-50 text-orange-600 border-orange-200`;
      case "APPROVED":
        return `${baseClasses} bg-green-50 text-green-600 border-green-200`;
      case "REJECTED":
        return `${baseClasses} bg-red-50 text-red-600 border-red-200`;
      default:
        return baseClasses;
    }
  };

  const getTypeBadge = (type: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium border";
    switch (type) {
      case "minor":
        return `${baseClasses} bg-yellow-50 text-yellow-600 border-yellow-200`;
      case "standard":
        return `${baseClasses} bg-blue-50 text-blue-600 border-blue-200`;
      case "major":
        return `${baseClasses} bg-purple-50 text-purple-600 border-purple-200`;
      default:
        return baseClasses;
    }
  };

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
          Approval
        </h1>
      </div>

      {/* Search and Filters */}
      <div className="bg-card rounded-lg p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari ticket ID atau judul..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]" style={{ borderColor: "#384E66" }}>
              <SelectValue placeholder="Semua Status" />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="NEED APPROVAL">Need Approval</SelectItem>
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-[180px]" style={{ borderColor: "#384E66" }}>
              <SelectValue placeholder="Semua Jenis" />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="all">Semua Jenis</SelectItem>
              <SelectItem value="minor">Minor</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="major">Major</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow style={{ backgroundColor: "#384E66" }}>
              <TableHead className="text-primary-foreground font-semibold">CR ID</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Title</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Status</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Type</TableHead>
              <TableHead className="text-primary-foreground font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{item.crId}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <span className={getStatusBadge(item.status)}>{item.status}</span>
                </TableCell>
                <TableCell>
                  <span className={getTypeBadge(item.type)}>{item.type}</span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card">
                      <DropdownMenuItem
                        onClick={() => navigate(`/approval/${item.id}`)}
                        className="cursor-pointer"
                      >
                        View Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Approval;
