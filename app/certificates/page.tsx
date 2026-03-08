"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Award, Search, ShieldCheck, FileCheck2 } from "lucide-react";

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
        <div className="min-h-screen bg-gray-50 pt-16">
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-xl"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                            <ShieldCheck className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-5xl font-bold mb-6">
                            Certificate Verification
                        </h1>
                        <p className="text-xl max-w-3xl mx-auto opacity-90">
                            Verify the authenticity of certificates issued by Student
                            Technical Council, IIT Patna
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-gray-100 -mt-16 relative z-20">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Enter Certificate ID
                            </h2>
                            <p className="text-gray-600">
                                Enter the unique certificate ID to verify its authenticity
                            </p>
                        </div>

                        <form onSubmit={handleVerify} className="space-y-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                    id="certificate-id-input"
                                    type="text"
                                    placeholder="e.g. STC-A1B2-C3D4"
                                    value={certificateId}
                                    onChange={(e) => setCertificateId(e.target.value)}
                                    className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <ShieldCheck className="w-5 h-5 mr-2" />
                                Verify Certificate
                            </Button>
                        </form>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                        <div className="text-center p-6 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                                <ShieldCheck className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Instant Verification
                            </h3>
                            <p className="text-sm text-gray-600">
                                Verify any STC certificate in seconds with the unique ID
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
                                <FileCheck2 className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Authentic Records
                            </h3>
                            <p className="text-sm text-gray-600">
                                All certificates are securely stored and tamper-proof
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-4">
                                <Award className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Official Recognition
                            </h3>
                            <p className="text-sm text-gray-600">
                                Issued by Student Technical Council, IIT Patna
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}