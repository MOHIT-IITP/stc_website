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
} from "lucide-react";

interface CertificateData {
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

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
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

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-lg text-gray-600">Verifying certificate...</p>
                </div>
            </div>
        );
    }

    if (error || !certificate) {
        return (
            <div className="min-h-screen bg-gray-50 pt-16">
                <section className="bg-linear-to-r from-red-500 to-red-700 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <AlertCircle className="w-16 h-16 mx-auto mb-4 opacity-90" />
                        <h1 className="text-4xl font-bold mb-4">
                            Certificate Not Found
                        </h1>
                        <p className="text-xl opacity-90 max-w-2xl mx-auto">
                            {error || "No certificate found with this ID."}
                        </p>
                    </div>
                </section>

                <div className="max-w-3xl mx-auto px-4 py-12 text-center">
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 -mt-8 relative z-10">
                        <p className="text-gray-600 mb-2">Certificate ID searched:</p>
                        <p className="text-lg font-mono font-bold text-gray-900 mb-6 bg-gray-50 py-3 px-4 rounded-lg inline-block">
                            {decodeURIComponent(id)}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/certificates">
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Try Another ID
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <section className="bg-linear-to-r from-green-600 to-emerald-700 text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-xl"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold mb-2">Certificate Verified</h1>
                    <p className="text-lg opacity-90">
                        This certificate has been successfully verified as authentic
                    </p>
                </div>
            </section>

            <div className="max-w-3xl mx-auto px-4 py-12">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden -mt-8 relative z-10">
                    <div className="bg-linear-to-r from-[#0f2a4d] to-[#1a4b8c] p-8 text-white text-center">
                        <div className="flex justify-center mb-4">
                            <img
                                src="/images/stc-logo.jpg"
                                alt="STC Logo"
                                className="w-16 h-16 rounded-xl shadow-lg border-2 border-white/30"
                            />
                        </div>
                        <h2 className="text-sm font-medium uppercase tracking-widest opacity-80 mb-1">
                            Student Technical Council
                        </h2>
                        <p className="text-xs opacity-60 tracking-wider">
                            Indian Institute of Technology Patna
                        </p>
                    </div>

                    <div className="p-8 sm:p-10">
                        <div className="flex justify-center mb-8">
                            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-full text-sm font-semibold">
                                <ShieldCheck className="w-4 h-4" />
                                Verified Certificate
                            </div>
                        </div>

                        <div className="text-center mb-8">
                            <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                                Certificate ID
                            </p>
                            <p className="text-xl font-mono font-bold text-[#0f2a4d] bg-blue-50 py-2 px-4 rounded-lg inline-block">
                                {certificate.CertificateId}
                            </p>
                        </div>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                            <Award className="w-5 h-5 text-[#1a4b8c]" />
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                        </div>

                        <div className="space-y-5">
                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <User className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-0.5">
                                        Certificate Holder
                                    </p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {certificate.name}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Briefcase className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-0.5">
                                        Position
                                    </p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {certificate.position}
                                    </p>
                                </div>
                            </div>

                            {certificate.club && (
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <Building2 className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-gray-500 mb-0.5">
                                            Club / Wing
                                        </p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {certificate.club}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {certificate.description && (
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                        <Award className="w-5 h-5 text-yellow-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-gray-500 mb-0.5">
                                            Description
                                        </p>
                                        <p className="text-lg font-semibold text-gray-900 whitespace-pre-line">
                                            {certificate.description}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {(certificate.joinedFrom || certificate.joinedTo) && (
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <CalendarDays className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-gray-500 mb-0.5">
                                            Tenure
                                        </p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {certificate.joinedFrom
                                                ? formatDate(certificate.joinedFrom)
                                                : "—"}{" "}
                                            →{" "}
                                            {certificate.joinedTo
                                                ? formatDate(certificate.joinedTo)
                                                : "Present"}
                                        </p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                    <div className="bg-gray-50 border-t border-gray-100 px-8 py-4 text-center">
                        <p className="text-xs text-gray-500">
                            This certificate was issued by the Student Technical Council, IIT
                            Patna and is verified authentic.
                        </p>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <Link href="/certificates">
                        <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Verify Another Certificate
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
