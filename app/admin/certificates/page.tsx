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
    name?: string;
    position?: string;
    club?: string;
    joinedFrom?: string;
    joinedTo?: string;
    description?: string;
    createdAt: string;
    isHackathon?: boolean;
    isEvent?: boolean;
    teamName?: string;
    teamMembers?: { name: string; email: string }[];
    projectName?: string;
    eventName?: string;
    eventVenue?: string;
    organizedBy?: string;
    winnerEmail?: string;
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
        isHackathon: false,
        isEvent: false,
        teamName: "",
        teamMembers: [] as { name: string; email: string }[],
        projectName: "",
        eventName: "",
        eventVenue: "",
        organizedBy: "",
        winnerEmail: "",
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
                name: formData.isHackathon ? undefined : formData.name,
                position: formData.isHackathon ? "Participant" : formData.position,
                club: (formData.isHackathon || formData.isEvent) ? undefined : (formData.club || undefined),
                joinedFrom: (!formData.isHackathon && !formData.isEvent && formData.joinedFrom)
                    ? new Date(formData.joinedFrom).toISOString()
                    : undefined,
                joinedTo: (!formData.isHackathon && !formData.isEvent && formData.joinedTo)
                    ? new Date(formData.joinedTo).toISOString()
                    : undefined,
                createdAt: formData.certificateDate
                    ? new Date(formData.certificateDate).toISOString()
                    : undefined,
                description: formData.description || undefined,
                isHackathon: formData.isHackathon,
                isEvent: formData.isEvent,
                teamName: formData.isHackathon ? formData.teamName : undefined,
                teamMembers: formData.isHackathon ? formData.teamMembers : undefined,
                projectName: formData.isHackathon ? formData.projectName : undefined,
                eventName: (formData.isHackathon || formData.isEvent) ? formData.eventName : undefined,
                eventVenue: formData.isHackathon ? formData.eventVenue : undefined,
                organizedBy: formData.isHackathon ? formData.organizedBy : undefined,
                winnerEmail: formData.isEvent ? formData.winnerEmail : undefined,
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
            isHackathon: false,
            isEvent: false,
            teamName: "",
            teamMembers: [{ name: "", email: "" }] as { name: string; email: string }[],
            projectName: "",
            eventName: "",
            eventVenue: "",
            organizedBy: "",
            winnerEmail: "",
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
            isHackathon: certificate.isHackathon || false,
            isEvent: certificate.isEvent || false,
            teamName: certificate.teamName || "",
            teamMembers: Array.isArray(certificate.teamMembers)
                ? certificate.teamMembers.map((m: any) => ({
                    name: m.name || "",
                    email: m.email || ""
                }))
                : [{ name: "", email: "" }],
            projectName: certificate.projectName || "",
            eventName: certificate.eventName || "",
            eventVenue: certificate.eventVenue || "",
            organizedBy: certificate.organizedBy || "",
            winnerEmail: certificate.winnerEmail || "",
        });
        setDialogOpen(true);
    };

    const openCreateDialogWithType = (type: 'standard' | 'hackathon' | 'event') => {
        resetForm();
        setFormData({
            CertificateId: "",
            name: "",
            position: "",
            club: "",
            joinedFrom: "",
            joinedTo: "",
            description: "",
            certificateDate: "",
            isHackathon: type === 'hackathon',
            isEvent: type === 'event',
            teamName: "",
            teamMembers: [{ name: "", email: "" }] as { name: string; email: string }[],
            projectName: "",
            eventName: type === 'hackathon' ? "Hack N Tech 3.0" : "",
            eventVenue: type === 'hackathon' ? "Phoenix" : "",
            organizedBy: type === 'hackathon' ? "STC" : "",
            winnerEmail: "",
        });
        setDialogOpen(true);
    };

    const openCreateDialog = () => {
        openCreateDialogWithType('standard');
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
                        <div className="flex gap-2">
                            <Button
                                onClick={() => openCreateDialogWithType('standard')}
                                className="bg-[#0f2a4d] hover:bg-[#1a4b8c]"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Certificate
                            </Button>
                            <Button
                                onClick={() => openCreateDialogWithType('hackathon')}
                                className="bg-indigo-700 hover:bg-indigo-800"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Hackathon Cert
                            </Button>
                            <Button
                                onClick={() => openCreateDialogWithType('event')}
                                className="bg-amber-600 hover:bg-amber-700"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Event Cert
                            </Button>
                        </div>
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
                                        <TableRow className="bg-slate-50">
                                            <TableHead className="font-semibold text-[#0f2a4d]">
                                                Certificate
                                            </TableHead>
                                            <TableHead className="font-semibold text-[#0f2a4d]">
                                                Recipient
                                            </TableHead>
                                            <TableHead className="font-semibold text-[#0f2a4d]">
                                                Role / Position
                                            </TableHead>
                                            <TableHead className="font-semibold text-[#0f2a4d]">
                                                Club / Event
                                            </TableHead>
                                            <TableHead className="font-semibold text-[#0f2a4d]">
                                                Tenure / Venue
                                            </TableHead>
                                            <TableHead className="font-semibold text-[#0f2a4d]">
                                                Created
                                            </TableHead>
                                            <TableHead className="font-semibold text-[#0f2a4d] text-right">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {certificates.map((cert: Certificate) => (
                                            <TableRow key={cert._id} className="hover:bg-slate-50/50 transition-colors">
                                                {/* 1. Certificate Column */}
                                                <TableCell>
                                                    <div className="flex flex-col gap-1">
                                                        <div>
                                                            {cert.isHackathon ? (
                                                                <span className="px-2 py-0.5 text-[9px] font-semibold rounded bg-slate-100 text-slate-700 border border-slate-200/60 uppercase tracking-wider">
                                                                    Hackathon
                                                                </span>
                                                            ) : cert.isEvent ? (
                                                                <span className="px-2 py-0.5 text-[9px] font-semibold rounded bg-slate-100 text-slate-700 border border-slate-200/60 uppercase tracking-wider">
                                                                    Event Winner
                                                                </span>
                                                            ) : (
                                                                <span className="px-2 py-0.5 text-[9px] font-semibold rounded bg-slate-100 text-slate-700 border border-slate-200/60 uppercase tracking-wider">
                                                                    Council
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="font-mono text-xs font-semibold text-slate-600">
                                                                {cert.CertificateId}
                                                            </span>
                                                            <button
                                                                onClick={() =>
                                                                    copyToClipboard(cert.CertificateId)
                                                                }
                                                                className="text-slate-400 hover:text-slate-700 transition-colors p-0.5 rounded hover:bg-slate-100"
                                                                title="Copy ID"
                                                            >
                                                                {copiedId === cert.CertificateId ? (
                                                                    <Check className="w-3.5 h-3.5 text-green-600" />
                                                                ) : (
                                                                    <Copy className="w-3.5 h-3.5" />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                {/* 2. Recipient Column */}
                                                <TableCell className="max-w-[200px]">
                                                    {cert.isHackathon ? (
                                                        <div className="flex flex-col">
                                                            <span className="font-semibold text-slate-800 text-sm">
                                                                {cert.teamName}
                                                            </span>
                                                            <span className="text-xs text-slate-500 font-medium truncate" title={cert.teamMembers?.map(m => `${m.name} (${m.email})`).join(", ")}>
                                                                {cert.teamMembers?.map(m => m.name).join(", ")}
                                                            </span>
                                                        </div>
                                                    ) : cert.isEvent ? (
                                                        <div className="flex flex-col">
                                                            <span className="font-semibold text-slate-800 text-sm">
                                                                {cert.name}
                                                            </span>
                                                            <span className="text-xs text-slate-400 font-mono truncate">
                                                                {cert.winnerEmail}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="font-semibold text-slate-800 text-sm">
                                                            {cert.name}
                                                        </span>
                                                    )}
                                                </TableCell>

                                                {/* 3. Role / Position Column */}
                                                <TableCell>
                                                    {cert.isHackathon ? (
                                                        <span className="text-xs font-medium text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/80">
                                                            Participant
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs font-medium text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/80">
                                                            {cert.position}
                                                        </span>
                                                    )}
                                                </TableCell>

                                                {/* 4. Club / Event Column */}
                                                <TableCell>
                                                    {cert.isHackathon ? (
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-medium text-slate-700">
                                                                {cert.eventName}
                                                            </span>
                                                            {cert.projectName && (
                                                                <span className="text-xs text-slate-500 italic">
                                                                    Project: {cert.projectName}
                                                                </span>
                                                            )}
                                                        </div>
                                                    ) : cert.isEvent ? (
                                                        <span className="text-sm font-medium text-slate-700">
                                                            {cert.eventName}
                                                        </span>
                                                    ) : (
                                                        <span className="text-sm font-medium text-slate-700">
                                                            {cert.club || "—"}
                                                        </span>
                                                    )}
                                                </TableCell>

                                                {/* 5. Tenure / Venue Column */}
                                                <TableCell>
                                                    {cert.isHackathon ? (
                                                        <span className="text-xs font-medium text-slate-600">
                                                            {cert.eventVenue || "Phoenix"}
                                                        </span>
                                                    ) : cert.isEvent ? (
                                                        <span className="text-xs font-medium text-slate-600">
                                                            Online
                                                        </span>
                                                    ) : cert.joinedFrom || cert.joinedTo ? (
                                                        <span className="text-xs font-medium text-slate-600">
                                                            {cert.joinedFrom ? formatDate(cert.joinedFrom) : "—"}
                                                            {" → "}
                                                            {cert.joinedTo ? formatDate(cert.joinedTo) : "Present"}
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs font-medium text-slate-400">—</span>
                                                    )}
                                                </TableCell>

                                                {/* 6. Created Column */}
                                                <TableCell className="text-xs text-slate-500">
                                                    {formatDate(cert.createdAt)}
                                                </TableCell>

                                                {/* 7. Actions Column */}
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            onClick={() => handleEdit(cert)}
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 text-xs hover:bg-slate-50 border-slate-200"
                                                        >
                                                            <Pencil className="w-3.5 h-3.5 mr-1 text-slate-500" />
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleDelete(cert)}
                                                            variant="destructive"
                                                            size="sm"
                                                            className="h-8 text-xs bg-red-600 hover:bg-red-700 border-none"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5 mr-1" />
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
                onOpenChange={(open: boolean) => {
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
                            <Label htmlFor="certType">Certificate Type</Label>
                            <select
                                id="certType"
                                value={formData.isHackathon ? "hackathon" : formData.isEvent ? "event" : "standard"}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    const val = e.target.value;
                                    setFormData({
                                        ...formData,
                                        isHackathon: val === "hackathon",
                                        isEvent: val === "event",
                                        eventName: val === "hackathon" ? "Hack N Tech 3.0" : "",
                                        eventVenue: val === "hackathon" ? "Phoenix" : "",
                                        organizedBy: val === "hackathon" ? "STC" : "",
                                    });
                                }}
                                className="w-full mt-1 p-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="standard">Standard / Student Council Certificate</option>
                                <option value="hackathon">Hackathon / Team Certificate</option>
                                <option value="event">Event / Winner Certificate</option>
                            </select>
                        </div>

                        {/* Render Standard Fields */}
                        {!formData.isHackathon && !formData.isEvent && (
                            <>
                                <div>
                                    <Label htmlFor="name">Name *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        placeholder="Certificate holder's name"
                                        required={!formData.isHackathon && !formData.isEvent}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="position">Position *</Label>
                                    <Input
                                        id="position"
                                        value={formData.position}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setFormData({ ...formData, position: e.target.value })
                                        }
                                        placeholder="e.g. Coordinator, Secretary"
                                        required={!formData.isHackathon && !formData.isEvent}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="club">Club / Wing</Label>
                                    <Input
                                        id="club"
                                        value={formData.club}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setFormData({ ...formData, joinedTo: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Render Hackathon Fields */}
                        {formData.isHackathon && (
                            <>
                                <div>
                                    <Label htmlFor="teamName">Team Name *</Label>
                                    <Input
                                        id="teamName"
                                        value={formData.teamName}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setFormData({ ...formData, teamName: e.target.value })
                                        }
                                        placeholder="e.g. Tech Gladiators"
                                        required={formData.isHackathon}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Team Members *</Label>
                                    {formData.teamMembers.map((member, index) => (
                                        <div key={index} className="flex gap-2 items-center">
                                            <Input
                                                placeholder="Member Name"
                                                value={member.name}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    const updated = [...formData.teamMembers];
                                                    updated[index] = { ...updated[index], name: e.target.value };
                                                    setFormData({ ...formData, teamMembers: updated });
                                                }}
                                                required={formData.isHackathon}
                                                className="flex-1"
                                            />
                                            <Input
                                                placeholder="Member Email"
                                                type="email"
                                                value={member.email}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    const updated = [...formData.teamMembers];
                                                    updated[index] = { ...updated[index], email: e.target.value };
                                                    setFormData({ ...formData, teamMembers: updated });
                                                }}
                                                required={formData.isHackathon}
                                                className="flex-1"
                                            />
                                            {formData.teamMembers.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => {
                                                        const updated = formData.teamMembers.filter((_, i) => i !== index);
                                                        setFormData({ ...formData, teamMembers: updated });
                                                    }}
                                                    className="shrink-0 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 h-10 w-10 animate-fade-in"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setFormData({
                                                ...formData,
                                                teamMembers: [...formData.teamMembers, { name: "", email: "" }]
                                            });
                                        }}
                                        className="text-xs border-slate-200 hover:bg-slate-50 mt-1"
                                    >
                                        <Plus className="w-3.5 h-3.5 mr-1" /> Add Member
                                    </Button>
                                </div>

                                <div>
                                    <Label htmlFor="projectName">Project Name (optional)</Label>
                                    <Input
                                        id="projectName"
                                        value={formData.projectName}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setFormData({ ...formData, projectName: e.target.value })
                                        }
                                        placeholder="e.g. STC Portal Website"
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <Label htmlFor="eventName">Event Name</Label>
                                        <Input
                                            id="eventName"
                                            value={formData.eventName}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setFormData({ ...formData, eventName: e.target.value })
                                            }
                                            placeholder="e.g. Hack N Tech 3.0"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="eventVenue">Event Venue</Label>
                                        <Input
                                            id="eventVenue"
                                            value={formData.eventVenue}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setFormData({ ...formData, eventVenue: e.target.value })
                                            }
                                            placeholder="e.g. Phoenix"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="organizedBy">Organized By</Label>
                                        <Input
                                            id="organizedBy"
                                            value={formData.organizedBy}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setFormData({ ...formData, organizedBy: e.target.value })
                                            }
                                            placeholder="e.g. STC"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Render Event Winner Fields */}
                        {formData.isEvent && (
                            <>
                                <div>
                                    <Label htmlFor="winnerName">Winner Name *</Label>
                                    <Input
                                        id="winnerName"
                                        value={formData.name}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        placeholder="e.g. John Doe"
                                        required={formData.isEvent}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="winnerEmail">Mail ID *</Label>
                                    <Input
                                        id="winnerEmail"
                                        type="email"
                                        value={formData.winnerEmail}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setFormData({ ...formData, winnerEmail: e.target.value })
                                        }
                                        placeholder="e.g. john@example.com"
                                        required={formData.isEvent}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="eventName">Event Name *</Label>
                                    <Input
                                        id="eventName"
                                        value={formData.eventName}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setFormData({ ...formData, eventName: e.target.value })
                                        }
                                        placeholder="e.g. Code Clash 2026"
                                        required={formData.isEvent}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="position">Position *</Label>
                                    <Input
                                        id="position"
                                        value={formData.position}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setFormData({ ...formData, position: e.target.value })
                                        }
                                        placeholder="e.g. 1st Place, Runner Up"
                                        required={formData.isEvent}
                                    />
                                </div>
                            </>
                        )}

                        <div>
                            <Label htmlFor="description">Description / Achievement Remarks</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                placeholder="e.g. For outstanding contribution in organizing events"
                            />
                        </div>

                        <div>
                            <Label htmlFor="certificateDate">Certificate Date (optional)</Label>
                            <Input
                                id="certificateDate"
                                type="date"
                                value={formData.certificateDate}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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