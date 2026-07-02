"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    ShieldCheck,
    User,
    Briefcase,
    Building2,
    CalendarDays,
    Award,
    ArrowLeft,
    AlertCircle,
    Loader2,
    Trophy,
    Users,
    Code2,
    MapPin,
    Sparkles,
} from "lucide-react";

interface CertificateData {
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

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

/** A clean label + value row used throughout the detail card */
function DetailRow({
    icon: Icon,
    label,
    value,
    mono = false,
    subtle = false,
}: {
    icon: React.ElementType;
    label: string;
    value: React.ReactNode;
    mono?: boolean;
    subtle?: boolean;
}) {
    return (
        <div className="flex items-start gap-3 py-4 border-b border-slate-100 last:border-0">
            <div className="mt-0.5 w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <Icon className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <div className="flex flex-col gap-0.5 flex-1">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                    {label}
                </span>
                <span
                    className={`text-sm font-medium leading-snug ${
                        mono ? "font-mono text-[#0f2a4d]" : ""
                    } ${subtle ? "text-slate-500" : "text-slate-800"}`}
                >
                    {value}
                </span>
            </div>
        </div>
    );
}

/** Shared card wrapper for all certificate types */
function CertCard({
    typeLabel,
    children,
    certId,
    issuedAt,
}: {
    typeLabel: string;
    children: React.ReactNode;
    certId: string;
    issuedAt: string;
}) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            {/* Brand accent top bar */}
            <div className="h-1 bg-[#0f2a4d]" />

            {/* Organization header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100">
                <img
                    src="/images/stc-logo.jpg"
                    alt="STC Logo"
                    className="w-8 h-8 rounded-lg object-cover border border-slate-200"
                />
                <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-700 leading-tight">
                        Student Technical Council
                    </span>
                    <span className="text-[10px] text-slate-400 leading-tight">
                        Indian Institute of Technology Patna
                    </span>
                </div>
                <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {typeLabel}
                </span>
            </div>

            {/* Certificate ID strip */}
            <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                    Certificate ID
                </span>
                <span className="text-sm font-mono font-bold text-[#0f2a4d] bg-white border border-slate-200 px-3 py-1 rounded-lg">
                    {certId}
                </span>
            </div>

            {/* Main detail rows */}
            <div className="px-6">{children}</div>

            {/* Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">
                    Issued on {formatDate(issuedAt)}
                </span>
                <div className="flex items-center gap-1 text-emerald-600">
                    <ShieldCheck className="w-3 h-3" />
                    <span className="text-[10px] font-semibold">Verified</span>
                </div>
            </div>
        </div>
    );
}

export default function CertificateDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const [certificate, setCertificate] = useState<CertificateData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (id) {
            fetchCertificate();
        }
    }, [id]);

    const fetchCertificate = async () => {
        try {
            const response = await fetch(
                `/api/certificates?id=${encodeURIComponent(id)}`
            );
            const data = await response.json();

            if (data.success && data.certificate) {
                setCertificate(data.certificate);
            } else {
                setError("Certificate not found. Please check the ID and try again.");
            }
        } catch {
            setError("Failed to verify certificate. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    /* ── Loading ── */
    if (loading) {
        return (
            <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-[#0f2a4d] mx-auto mb-3" />
                    <p className="text-sm text-slate-500">Verifying certificate…</p>
                </div>
            </div>
        );
    }

    /* ── Error ── */
    if (error || !certificate) {
        return (
            <div className="min-h-screen bg-[#f8fafc] pt-24 pb-16">
                <div className="max-w-md mx-auto px-4">
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                        <div className="h-1 bg-red-500" />
                        <div className="p-8 text-center">
                            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                                <AlertCircle className="w-6 h-6 text-red-500" />
                            </div>
                            <h1 className="text-lg font-semibold text-slate-800 mb-1">
                                Certificate Not Found
                            </h1>
                            <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                                {error || "No certificate found with this ID."}
                            </p>
                            <div className="text-xs text-slate-400 mb-6">
                                Searched for:{" "}
                                <span className="font-mono font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                                    {decodeURIComponent(id)}
                                </span>
                            </div>
                            <Link href="/certificates">
                                <Button className="bg-[#0f2a4d] hover:bg-[#1a4b8c] text-white rounded-xl text-sm h-10">
                                    <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                                    Try Another ID
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /* ── Shared page shell ── */
    const PageShell = ({ children }: { children: React.ReactNode }) => (
        <div className="min-h-screen bg-[#f8fafc] pt-24 pb-16">
            <div className="max-w-xl mx-auto px-4">
                {/* Verified banner */}
                <div className="flex items-center justify-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-full text-sm font-semibold">
                        <ShieldCheck className="w-4 h-4" />
                        Certificate Verified
                    </div>
                </div>

                {children}

                {/* Back link */}
                <div className="text-center mt-6">
                    <Link href="/certificates">
                        <Button
                            variant="outline"
                            className="border-slate-200 text-[#0f2a4d] hover:bg-slate-50 rounded-xl text-sm h-10"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                            Verify Another Certificate
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );

    /* ── Hackathon Certificate ── */
    if (certificate.isHackathon) {
        return (
            <PageShell>
                <CertCard
                    typeLabel="Hackathon"
                    certId={certificate.CertificateId}
                    issuedAt={certificate.createdAt}
                >
                    <DetailRow
                        icon={Sparkles}
                        label="Event"
                        value={certificate.eventName || "Hack N Tech 3.0"}
                    />
                    <DetailRow
                        icon={Trophy}
                        label="Team Name"
                        value={certificate.teamName || "—"}
                    />
                    {certificate.projectName && (
                        <DetailRow
                            icon={Code2}
                            label="Project"
                            value={certificate.projectName}
                        />
                    )}
                    {certificate.eventVenue && (
                        <DetailRow
                            icon={MapPin}
                            label="Venue"
                            value={certificate.eventVenue}
                        />
                    )}
                    {certificate.organizedBy && (
                        <DetailRow
                            icon={Building2}
                            label="Organised By"
                            value={certificate.organizedBy}
                        />
                    )}
                    {certificate.teamMembers && certificate.teamMembers.length > 0 && (
                        <div className="py-4 border-b border-slate-100 last:border-0">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                                    <Users className="w-3.5 h-3.5 text-slate-500" />
                                </div>
                                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                                    Team Members
                                </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-9">
                                {certificate.teamMembers.map(
                                    (member: { name: string; email: string }, idx: number) => (
                                        <div
                                            key={idx}
                                            className="bg-slate-50 border border-slate-100 rounded-xl p-3"
                                        >
                                            <p className="text-sm font-medium text-slate-800 leading-tight">
                                                {member.name}
                                            </p>
                                            <p className="text-[11px] text-slate-400 font-mono mt-0.5 leading-tight truncate">
                                                {member.email}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                    {certificate.description && (
                        <div className="py-4 last:border-0">
                            <p className="text-xs text-slate-400 italic leading-relaxed">
                                "{certificate.description}"
                            </p>
                        </div>
                    )}
                </CertCard>
            </PageShell>
        );
    }

    /* ── Event Certificate ── */
    if (certificate.isEvent) {
        return (
            <PageShell>
                <CertCard
                    typeLabel="Event Winner"
                    certId={certificate.CertificateId}
                    issuedAt={certificate.createdAt}
                >
                    <DetailRow
                        icon={Sparkles}
                        label="Event"
                        value={certificate.eventName || "—"}
                    />
                    <DetailRow
                        icon={User}
                        label="Winner"
                        value={
                            <span className="flex flex-col gap-0.5">
                                <span>{certificate.name}</span>
                                {certificate.winnerEmail && (
                                    <span className="text-[11px] font-mono text-slate-400">
                                        {certificate.winnerEmail}
                                    </span>
                                )}
                            </span>
                        }
                    />
                    <DetailRow
                        icon={Award}
                        label="Position / Standing"
                        value={
                            <span className="text-[#0f2a4d] font-semibold">
                                {certificate.position}
                            </span>
                        }
                    />
                    {certificate.eventVenue && (
                        <DetailRow
                            icon={MapPin}
                            label="Venue"
                            value={certificate.eventVenue}
                        />
                    )}
                    {certificate.organizedBy && (
                        <DetailRow
                            icon={Building2}
                            label="Organised By"
                            value={certificate.organizedBy}
                        />
                    )}
                    {certificate.description && (
                        <div className="py-4 last:border-0">
                            <p className="text-xs text-slate-400 italic leading-relaxed">
                                "{certificate.description}"
                            </p>
                        </div>
                    )}
                </CertCard>
            </PageShell>
        );
    }

    /* ── Standard / Membership Certificate ── */
    return (
        <PageShell>
            <CertCard
                typeLabel="STC Member"
                certId={certificate.CertificateId}
                issuedAt={certificate.createdAt}
            >
                {certificate.name && (
                    <DetailRow
                        icon={User}
                        label="Certificate Holder"
                        value={certificate.name}
                    />
                )}
                {certificate.position && (
                    <DetailRow
                        icon={Briefcase}
                        label="Position"
                        value={certificate.position}
                    />
                )}
                {certificate.club && (
                    <DetailRow
                        icon={Building2}
                        label="Club / Wing"
                        value={certificate.club}
                    />
                )}
                {(certificate.joinedFrom || certificate.joinedTo) && (
                    <DetailRow
                        icon={CalendarDays}
                        label="Tenure"
                        value={`${
                            certificate.joinedFrom
                                ? formatDate(certificate.joinedFrom)
                                : "—"
                        } → ${
                            certificate.joinedTo
                                ? formatDate(certificate.joinedTo)
                                : "Present"
                        }`}
                    />
                )}
                {certificate.description && (
                    <DetailRow
                        icon={Award}
                        label="Description"
                        value={certificate.description}
                        subtle
                    />
                )}
            </CertCard>
        </PageShell>
    );
}
