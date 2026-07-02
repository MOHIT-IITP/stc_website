"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Search, FileCheck2, Award } from "lucide-react";

export default function CertificatesPage() {
    const [certificateId, setCertificateId] = useState("");
    const router = useRouter();

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = certificateId.trim();
        if (trimmed) {
            router.push(`/certificates/${encodeURIComponent(trimmed)}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-32 pb-20">
            {/* Page header */}
            <div className="max-w-lg mx-auto px-4 text-center mb-10">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#0f2a4d]/10 mb-5">
                    <ShieldCheck className="w-5 h-5 text-[#0f2a4d]" />
                </div>
                <h1 className="text-3xl font-semibold text-[#0f2a4d] tracking-tight mb-2">
                    Verify Certificate
                </h1>
                <p className="text-slate-500 text-sm leading-relaxed">
                    Enter the unique certificate ID to instantly verify its authenticity
                    and view the certificate details.
                </p>
            </div>

            {/* Search card */}
            <div className="max-w-lg mx-auto px-4">
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
                    <form onSubmit={handleVerify} className="space-y-4">
                        <div>
                            <label
                                htmlFor="certificate-id-input"
                                className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2"
                            >
                                Certificate ID
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-slate-400" />
                                </div>
                                <Input
                                    id="certificate-id-input"
                                    type="text"
                                    placeholder="e.g. STC-A1B2-C3D4"
                                    value={certificateId}
                                    onChange={(e) => setCertificateId(e.target.value)}
                                    className="pl-10 h-12 text-base border-slate-200 focus:border-[#1a4b8c] focus:ring-2 focus:ring-[#1a4b8c]/10 rounded-xl text-slate-800 placeholder:text-slate-400"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-base bg-[#0f2a4d] hover:bg-[#1a4b8c] text-white rounded-xl font-medium transition-colors duration-200 shadow-sm"
                        >
                            <ShieldCheck className="w-4 h-4 mr-2" />
                            Verify Certificate
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="border-t border-slate-100 mt-7 pt-5">
                        <p className="text-xs text-slate-400 text-center leading-relaxed">
                            Certificates are issued and verified by{" "}
                            <span className="font-medium text-slate-500">
                                Student Technical Council, IIT Patna
                            </span>
                        </p>
                    </div>
                </div>

                {/* Feature rows */}
                <div className="mt-8 grid grid-cols-3 gap-4">
                    {[
                        {
                            icon: ShieldCheck,
                            title: "Instant Verification",
                            desc: "Verify in seconds with the unique ID",
                        },
                        {
                            icon: FileCheck2,
                            title: "Tamper-Proof",
                            desc: "Securely stored, authentic records",
                        },
                        {
                            icon: Award,
                            title: "Official Records",
                            desc: "Issued by STC, IIT Patna",
                        },
                    ].map(({ icon: Icon, title, desc }) => (
                        <div
                            key={title}
                            className="flex flex-col items-center text-center p-4 rounded-xl border border-slate-150 bg-white"
                        >
                            <div className="w-8 h-8 rounded-lg bg-[#0f2a4d]/5 flex items-center justify-center mb-2.5">
                                <Icon className="w-4 h-4 text-[#0f2a4d]" />
                            </div>
                            <p className="text-xs font-semibold text-slate-700 mb-0.5">{title}</p>
                            <p className="text-[11px] text-slate-400 leading-snug">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}