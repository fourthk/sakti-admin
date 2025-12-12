import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockDetailData: Record<string, any> = {
  "CR-001": {
    id: "CR-001",
    catalog: "Infrastructure",
    subCatalog: "Server",
    bmdId: "BMD-001",
    name: "Update Server Configuration",
    notes: "Configuration changes to improve production server performance and security.",
    affectedAssets: [
      { bmdId: "BMD-001", assetName: "Server Dell PowerEdge R740" },
      { bmdId: "BMD-045", assetName: "Network Switch Cisco Catalyst" },
      { bmdId: "BMD-089", assetName: "Storage Array NetApp" },
    ],
    inspection: {
      inspectionId: "INS-2024-001",
      inspectionDate: "2024-01-16",
      inspectionResult: "OS update and security patches required",
      estimatedCost: "Rp 5,000,000",
      estimatedDuration: "4 hours",
      impactScore: 7,
      likelihoodScore: 6,
      exposureScore: 8,
      riskScore: 42,
    },
    approvalStatus: "Approved",
    implementationSchedule: {
      scheduledDate: "2025-01-25",
      scheduledTime: "22:00 - 02:00",
      implementer: "Tim Infrastruktur",
      backoutPlan: "Restore from snapshot if issues occur",
    },
    statusTracking: [
      { status: "Submitted", date: "2024-01-10", by: "John Doe" },
      { status: "Inspected", date: "2024-01-16", by: "Jane Smith" },
      { status: "Approved", date: "2024-01-20", by: "Manager A" },
      { status: "Scheduled", date: "2024-01-22", by: "System" },
    ],
  },
  "CR-002": {
    id: "CR-002",
    catalog: "Network",
    subCatalog: "Switch",
    bmdId: "BMD-045",
    name: "Network Switch Upgrade",
    notes: "Upgrade network switches to support higher bandwidth requirements.",
    affectedAssets: [
      { bmdId: "BMD-045", assetName: "Network Switch Cisco Catalyst" },
      { bmdId: "BMD-046", assetName: "Network Switch Cisco Catalyst 2" },
    ],
    inspection: {
      inspectionId: "INS-2024-002",
      inspectionDate: "2024-01-18",
      inspectionResult: "Firmware upgrade and configuration backup needed",
      estimatedCost: "Rp 3,500,000",
      estimatedDuration: "2 hours",
      impactScore: 5,
      likelihoodScore: 4,
      exposureScore: 6,
      riskScore: 30,
    },
    approvalStatus: "Scheduled",
    implementationSchedule: {
      scheduledDate: "2025-01-28",
      scheduledTime: "23:00 - 01:00",
      implementer: "Tim Network",
      backoutPlan: "Rollback to previous firmware",
    },
    statusTracking: [
      { status: "Submitted", date: "2024-01-12", by: "John Doe" },
      { status: "Inspected", date: "2024-01-18", by: "Jane Smith" },
      { status: "Scheduled", date: "2024-01-22", by: "System" },
    ],
  },
  "CR-003": {
    id: "CR-003",
    catalog: "Application",
    subCatalog: "Web Service",
    bmdId: "BMD-100",
    name: "Deploy New Application",
    notes: "Deploy new microservice application to production environment.",
    affectedAssets: [
      { bmdId: "BMD-100", assetName: "Application Server" },
      { bmdId: "BMD-101", assetName: "Load Balancer" },
    ],
    inspection: {
      inspectionId: "INS-2024-003",
      inspectionDate: "2024-01-20",
      inspectionResult: "Environment ready, dependencies verified",
      estimatedCost: "Rp 2,000,000",
      estimatedDuration: "1 hour",
      impactScore: 8,
      likelihoodScore: 3,
      exposureScore: 7,
      riskScore: 56,
    },
    approvalStatus: "Implementing",
    implementationSchedule: {
      scheduledDate: "2025-01-20",
      scheduledTime: "14:00 - 15:00",
      implementer: "Tim Development",
      backoutPlan: "Revert to previous version",
    },
    statusTracking: [
      { status: "Submitted", date: "2024-01-15", by: "Developer A" },
      { status: "Inspected", date: "2024-01-20", by: "QA Team" },
      { status: "Approved", date: "2024-01-20", by: "Manager B" },
      { status: "Implementing", date: "2024-01-20", by: "Tim Development" },
    ],
  },
  "CR-004": {
    id: "CR-004",
    catalog: "Database",
    subCatalog: "PostgreSQL",
    bmdId: "BMD-200",
    name: "Database Migration & Optimization",
    notes: "Migrate database to new cluster and optimize performance.",
    affectedAssets: [
      { bmdId: "BMD-200", assetName: "PostgreSQL Primary" },
      { bmdId: "BMD-201", assetName: "PostgreSQL Replica" },
    ],
    inspection: {
      inspectionId: "INS-2024-004",
      inspectionDate: "2024-01-22",
      inspectionResult: "Data backup required, index optimization recommended",
      estimatedCost: "Rp 8,000,000",
      estimatedDuration: "6 hours",
      impactScore: 9,
      likelihoodScore: 5,
      exposureScore: 8,
      riskScore: 72,
    },
    approvalStatus: "Submitted",
    implementationSchedule: null,
    statusTracking: [
      { status: "Submitted", date: "2024-01-22", by: "DBA Team" },
    ],
  },
};

const getApprovalStatusColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "bg-green-600 text-white";
    case "Scheduled":
      return "bg-orange-500 text-white";
    case "Implementing":
      return "bg-yellow-500 text-white";
    case "Submitted":
      return "bg-teal-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const ChangeRequestDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [assetsExpanded, setAssetsExpanded] = useState(true);

  const data = mockDetailData[id || "CR-001"] || mockDetailData["CR-001"];

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
          Change Request Detail
        </h1>
      </div>

      {/* Asset Information */}
      <Card className="bg-white shadow">
        <CardHeader className="pb-4">
          <CardTitle style={{ color: "#384E66" }}>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">CR ID</p>
              <p className="font-medium">{data.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Catalog</p>
              <p className="font-medium">{data.catalog}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sub Catalog</p>
              <p className="font-medium">{data.subCatalog}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">BMD ID</p>
              <p className="font-medium">{data.bmdId}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">{data.name}</p>
          </div>

          <div>
            <button
              onClick={() => setAssetsExpanded(!assetsExpanded)}
              className="flex items-center gap-2 text-sm font-medium"
            >
              Affected Assets ({data.affectedAssets.length})
              {assetsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {assetsExpanded && (
              <div className="mt-3 border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="font-medium">BMD ID</TableHead>
                      <TableHead className="font-medium">Asset Name</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.affectedAssets.map((asset: any) => (
                      <TableRow key={asset.bmdId}>
                        <TableCell>{asset.bmdId}</TableCell>
                        <TableCell>{asset.assetName}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Notes</p>
            <p>{data.notes}</p>
          </div>
        </CardContent>
      </Card>

      {/* Inspection Result */}
      <Card className="bg-white shadow">
        <CardHeader className="pb-4">
          <CardTitle style={{ color: "#384E66" }}>Inspection Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Inspection ID</p>
              <p className="font-medium">{data.inspection.inspectionId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Inspection Date</p>
              <p className="font-medium">{data.inspection.inspectionDate}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Inspection Result</p>
            <p className="font-medium">{data.inspection.inspectionResult}</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Estimated Cost</p>
              <p className="font-medium">{data.inspection.estimatedCost}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estimated Duration</p>
              <p className="font-medium">{data.inspection.estimatedDuration}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="border rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">Impact Score</p>
              <p className="text-2xl font-bold">{data.inspection.impactScore}</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">Likelihood Score</p>
              <p className="text-2xl font-bold">{data.inspection.likelihoodScore}</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">Exposure Score</p>
              <p className="text-2xl font-bold">{data.inspection.exposureScore}</p>
            </div>
            <div className="border rounded-lg p-4 text-center bg-red-50">
              <p className="text-sm text-red-600">Risk Score (Exposure)</p>
              <p className="text-2xl font-bold text-red-600">
                {data.inspection.riskScore}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Approval Status */}
      <Card className="bg-white shadow">
        <CardHeader className="pb-4">
          <CardTitle style={{ color: "#384E66" }}>Approval Status</CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={`px-4 py-2 rounded-md text-sm font-medium ${getApprovalStatusColor(
              data.approvalStatus
            )}`}
          >
            {data.approvalStatus}
          </span>
        </CardContent>
      </Card>

      {/* Implementation Schedule */}
      {data.implementationSchedule && (
        <Card className="bg-white shadow">
          <CardHeader className="pb-4">
            <CardTitle style={{ color: "#384E66" }}>Implementation Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Scheduled Date</p>
                <p className="font-medium">{data.implementationSchedule.scheduledDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Scheduled Time</p>
                <p className="font-medium">{data.implementationSchedule.scheduledTime}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Implementer</p>
                <p className="font-medium">{data.implementationSchedule.implementer}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Backout Plan</p>
                <p className="font-medium">{data.implementationSchedule.backoutPlan}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Status Tracking */}
      <Card className="bg-white shadow">
        <CardHeader className="pb-4">
          <CardTitle style={{ color: "#384E66" }}>Status Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">Date</TableHead>
                  <TableHead className="font-medium">By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.statusTracking.map((track: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{track.status}</TableCell>
                    <TableCell>{track.date}</TableCell>
                    <TableCell>{track.by}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangeRequestDetail;
