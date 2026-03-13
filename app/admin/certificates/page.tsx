"use client";

import { useState, useEffect } from "react";
import AdminNav from "@/components/adminNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Trash2, Loader2, Award, Copy, Check, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface Certificate {
    _id: string;
    CertificateId: string;
    name: string;
    position: string;
    club?: string;
    joinedFrom?: string;
    joinedTo?: string;
    description?: string;
    createdAt: string;
}

export default function AdminCertificatesPage() {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [editingCertificateId, setEditingCertificateId] = useState<string | null>(null);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        CertificateId: "",
        name: "",
        position: "",
        club: "",
        joinedFrom: "",
        joinedTo: "",
        description: "",
        certificateDate: "",
    });

    useEffect(() => {
        fetchCertificates();
    }, []);

    const isEditMode = Boolean(editingCertificateId);

    const fetchCertificates = async () => {
        try {
            const response = await fetch("/api/admin/certificates");
            if (response.ok) {
                const data = await response.json();
                setCertificates(data);
            }
        } catch (error) {
            console.error("Error fetching certificates:", error);
            toast({
                title: "Error",
                description: "Failed to fetch certificates",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const payload = {
                CertificateId: formData.CertificateId || undefined,
                name: formData.name,
                position: formData.position,
                club: formData.club || undefined,
                joinedFrom: formData.joinedFrom
                    ? new Date(formData.joinedFrom).toISOString()
                    : undefined,
                joinedTo: formData.joinedTo
                    ? new Date(formData.joinedTo).toISOString()
                    : undefined,
                createdAt: formData.certificateDate
                    ? new Date(formData.certificateDate).toISOString()
                    : undefined,
                description: formData.description || undefined,
            };

            const requestUrl = isEditMode
                ? `/api/admin/certificates?id=${editingCertificateId}`
                : "/api/admin/certificates";
            const requestMethod = isEditMode ? "PUT" : "POST";

            const response = await fetch(requestUrl, {
                method: requestMethod,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                toast({
                    title: "Success",
                    description: isEditMode
                        ? "Certificate updated successfully"
                        : "Certificate created successfully",
                });
                setDialogOpen(false);
                resetForm();
                fetchCertificates();
            } else {
                const errorData = await response.json();
                alert(
                    `Failed to ${isEditMode ? "update" : "create"} certificate: ${errorData.error || response.statusText}`
                );
            }
        } catch (error) {
            console.error("Error saving certificate:", error);
            toast({
                title: "Error",
                description: isEditMode
                    ? "Failed to update certificate"
                    : "Failed to create certificate",
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (certificate: Certificate) => {
        if (!confirm("Are you sure you want to delete this certificate?")) return;

        try {
            const response = await fetch(
                `/api/admin/certificates?id=${certificate._id}`,
                { method: "DELETE" }
            );

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Certificate deleted successfully",
                });
                fetchCertificates();
            } else {
                throw new Error("Failed to delete certificate");
            }
        } catch (error) {
            console.error("Error deleting certificate:", error);
            toast({
                title: "Error",
                description: "Failed to delete certificate",
                variant: "destructive",
            });
        }
    };

    const resetForm = () => {
        setEditingCertificateId(null);
        setFormData({
            CertificateId: "",
            name: "",
            position: "",
            club: "",
            joinedFrom: "",
            joinedTo: "",
            description: "",
            certificateDate: "",
        });
    };

    const formatDateForInput = (dateStr?: string) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        if (Number.isNaN(date.getTime())) return "";
        return date.toISOString().split("T")[0];
    };

    const handleEdit = (certificate: Certificate) => {
        setEditingCertificateId(certificate._id);
        setFormData({
            CertificateId: certificate.CertificateId || "",
            name: certificate.name || "",
            position: certificate.position || "",
            club: certificate.club || "",
            joinedFrom: formatDateForInput(certificate.joinedFrom),
            joinedTo: formatDateForInput(certificate.joinedTo),
            description: certificate.description || "",
            certificateDate: formatDateForInput(certificate.createdAt),
        });
        setDialogOpen(true);
    };

    const openCreateDialog = () => {
        resetForm();
        setDialogOpen(true);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(text);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <>
            <AdminNav />
            <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 pt-32 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-[#0f2a4d] mb-2">
                                Manage Certificates
                            </h1>
                            <p className="text-lg text-[#1a4b8c]">
                                Create and manage verification certificates
                            </p>
                        </div>
                        <Button
                            onClick={openCreateDialog}
                            className="bg-[#0f2a4d] hover:bg-[#1a4b8c]"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Certificate
                        </Button>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8">
                        {loading ? (
                            <div className="flex justify-center items-center py-12">
                                <Loader2 className="w-8 h-8 animate-spin text-[#1a4b8c]" />
                            </div>
                        ) : certificates.length === 0 ? (
                            <div className="text-center py-16">
                                <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                    No Certificates Yet
                                </h3>
                                <p className="text-gray-500 mb-6">
                                    Start by creating your first certificate
                                </p>
                                <Button
                                    onClick={openCreateDialog}
                                    className="bg-[#0f2a4d] hover:bg-[#1a4b8c]"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create Certificate
                                </Button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="font-semibold">
                                                Certificate ID
                                            </TableHead>
                                            <TableHead className="font-semibold">Name</TableHead>
                                            <TableHead className="font-semibold">Position</TableHead>
                                            <TableHead className="font-semibold">Club</TableHead>
                                            <TableHead className="font-semibold">Tenure</TableHead>
                                            <TableHead className="font-semibold">
                                                Created
                                            </TableHead>
                                            <TableHead className="font-semibold text-right">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {certificates.map((cert) => (
                                            <TableRow key={cert._id} className="hover:bg-blue-50/50">
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono text-sm font-semibold text-[#0f2a4d] bg-blue-50 px-2 py-1 rounded">
                                                            {cert.CertificateId}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                copyToClipboard(cert.CertificateId)
                                                            }
                                                            className="text-gray-400 hover:text-blue-600 transition-colors"
                                                            title="Copy ID"
                                                        >
                                                            {copiedId === cert.CertificateId ? (
                                                                <Check className="w-4 h-4 text-green-600" />
                                                            ) : (
                                                                <Copy className="w-4 h-4" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {cert.name}
                                                </TableCell>
                                                <TableCell>{cert.position}</TableCell>
                                                <TableCell>{cert.club || "—"}</TableCell>
                                                <TableCell className="text-sm">
                                                    {cert.joinedFrom || cert.joinedTo ? (
                                                        <>
                                                            {cert.joinedFrom
                                                                ? formatDate(cert.joinedFrom)
                                                                : "—"}
                                                            {" → "}
                                                            {cert.joinedTo
                                                                ? formatDate(cert.joinedTo)
                                                                : "Present"}
                                                        </>
                                                    ) : (
                                                        "—"
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-sm">
                                                    {formatDate(cert.createdAt)}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            onClick={() => handleEdit(cert)}
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            <Pencil className="w-4 h-4 mr-1" />
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleDelete(cert)}
                                                            variant="destructive"
                                                            size="sm"
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-1" />
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Dialog
                open={dialogOpen}
                onOpenChange={(open) => {
                    setDialogOpen(open);
                    if (!open) {
                        resetForm();
                    }
                }}
            >
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>
                            {isEditMode ? "Edit Certificate" : "Add New Certificate"}
                        </DialogTitle>
                        <DialogDescription>
                            {isEditMode
                                ? "Update the certificate details and save your changes."
                                : "Fill in the details to create a new certificate. Leave Certificate ID empty to auto-generate."}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 overflow-auto max-h-[70vh] pr-2">
                        <div>
                            <Label htmlFor="CertificateId">Certificate ID (optional)</Label>
                            <Input
                                id="CertificateId"
                                value={formData.CertificateId}
                                onChange={(e) =>
                                    setFormData({ ...formData, CertificateId: e.target.value })
                                }
                                placeholder="Leave empty to auto-generate"
                            />
                        </div>

                        <div>
                            <Label htmlFor="name">Name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                placeholder="Certificate holder's name"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="position">Position *</Label>
                            <Input
                                id="position"
                                value={formData.position}
                                onChange={(e) =>
                                    setFormData({ ...formData, position: e.target.value })
                                }
                                placeholder="e.g. Coordinator, Secretary"
                                required
                            />
                        </div>
                       
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                placeholder="e.g. For outstanding contribution in organizing events"
                            />
                        </div>

                        <div>
                            <Label htmlFor="club">Club / Wing</Label>
                            <Input
                                id="club"
                                value={formData.club}
                                onChange={(e) =>
                                    setFormData({ ...formData, club: e.target.value })
                                }
                                placeholder="e.g. DISHA, ARTHNITI, TATVA"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="joinedFrom">Joined From</Label>
                                <Input
                                    id="joinedFrom"
                                    type="date"
                                    value={formData.joinedFrom}
                                    onChange={(e) =>
                                        setFormData({ ...formData, joinedFrom: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="joinedTo">Joined To</Label>
                                <Input
                                    id="joinedTo"
                                    type="date"
                                    value={formData.joinedTo}
                                    onChange={(e) =>
                                        setFormData({ ...formData, joinedTo: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="certificateDate">Certificate Date (optional)</Label>
                            <Input
                                id="certificateDate"
                                type="date"
                                value={formData.certificateDate}
                                onChange={(e) =>
                                    setFormData({ ...formData, certificateDate: e.target.value })
                                }
                            />
                        </div>

                        <div className="flex gap-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setDialogOpen(false)}
                                className="flex-1"
                                disabled={submitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1 bg-[#0f2a4d] hover:bg-[#1a4b8c]"
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        {isEditMode ? "Saving..." : "Creating..."}
                                    </>
                                ) : (
                                    <>
                                        <Award className="w-4 h-4 mr-2" />
                                        {isEditMode ? "Save Changes" : "Create Certificate"}
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}