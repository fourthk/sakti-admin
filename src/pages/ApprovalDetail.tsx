import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ApprovalItem {
  id: string;
  crId: string;
  title: string;
  status: "NEED APPROVAL" | "APPROVED" | "REJECTED";
  type: "minor" | "standard" | "major";
  description: string;
  requestedBy: string;
  requestedDate: string;
  department: string;
}

const mockData: ApprovalItem[] = [
  { id: "1", crId: "TCK-STD-0006", title: "Check AC", status: "NEED APPROVAL", type: "minor", description: "Pengecekan kondisi AC di ruang server untuk memastikan suhu optimal.", requestedBy: "John Doe", requestedDate: "2024-01-15", department: "IT Operations" },
  { id: "2", crId: "TCK-MIN-0004", title: "Upgrade Inch Monitor", status: "NEED APPROVAL", type: "minor", description: "Upgrade monitor dari 21 inch ke 27 inch untuk tim development.", requestedBy: "Jane Smith", requestedDate: "2024-01-14", department: "Development" },
  { id: "3", crId: "TCK-STD-0003", title: "Update Template Notifikasi Email", status: "APPROVED", type: "standard", description: "Memperbarui template email notifikasi sesuai branding terbaru.", requestedBy: "Admin", requestedDate: "2024-01-13", department: "Marketing" },
  { id: "4", crId: "TCK-STD-0005", title: "Penyesuaian Batas Maksimal Lampiran Tiket", status: "APPROVED", type: "standard", description: "Meningkatkan batas maksimal lampiran dari 5MB ke 10MB.", requestedBy: "Support Team", requestedDate: "2024-01-12", department: "Support" },
  { id: "5", crId: "TCK-STD-0004", title: "Penambahan Kategori Layanan Baru di SILADAN", status: "APPROVED", type: "standard", description: "Menambahkan kategori layanan baru untuk mempermudah klasifikasi tiket.", requestedBy: "Manager", requestedDate: "2024-01-11", department: "Operations" },
  { id: "6", crId: "TCK-MAJ-0001", title: "Database Migration", status: "REJECTED", type: "major", description: "Migrasi database dari MySQL ke PostgreSQL.", requestedBy: "DBA Team", requestedDate: "2024-01-10", department: "Database" },
];

const ApprovalDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const item = mockData.find((data) => data.id === id);

  if (!item) {
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
            Approval Detail
          </h1>
        </div>
        <p className="text-muted-foreground">Data not found</p>
      </div>
    );
  }

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
          Approval Detail
        </h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle style={{ color: "#384E66" }}>{item.crId}</CardTitle>
            <div className="flex gap-2">
              <span className={getStatusBadge(item.status)}>{item.status}</span>
              <span className={getTypeBadge(item.type)}>{item.type}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Title</h3>
            <p className="mt-1">{item.title}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
            <p className="mt-1">{item.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Requested By</h3>
              <p className="mt-1">{item.requestedBy}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Requested Date</h3>
              <p className="mt-1">{item.requestedDate}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
              <p className="mt-1">{item.department}</p>
            </div>
          </div>

          {item.status === "NEED APPROVAL" && (
            <div className="flex gap-3 pt-4 border-t">
              <Button style={{ backgroundColor: "#384E66" }} className="text-primary-foreground">
                Approve
              </Button>
              <Button variant="outline" style={{ borderColor: "#384E66", color: "#384E66" }}>
                Reject
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApprovalDetail;
