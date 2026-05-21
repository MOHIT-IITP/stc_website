"use client";

import AdminNav from "@/components/adminNav";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users } from "lucide-react";
import RegistrationBuilder from "@/components/admin/RegistrationBuilder";
import RegistrationSubmissionsViewer from "@/components/admin/SubmissionsViewer";

export default function AdminRegistrationPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [tab, setTab] = useState("form-builder");

  useEffect(() => {
    const tabFromUrl = new URLSearchParams(window.location.search).get("tab");

    if (tabFromUrl === "submissions" || tabFromUrl === "form-builder") {
      setTab(tabFromUrl);
      return;
    }

    setTab("form-builder");
  }, []);

  function handleTabChange(nextTab: string) {
    setTab(nextTab);

    const params = new URLSearchParams(window.location.search);
    params.set("tab", nextTab);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <AdminNav />
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#0f2a4d] mb-2">
              Manage Registration Forms
            </h1>
            <p className="text-lg text-[#1a4b8c]">
              Create and manage all registration forms and submissions
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <Tabs
              value={tab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
                <TabsTrigger value="form-builder">
                  <FileText className="w-4 h-4 mr-2" />
                  Form Builder
                </TabsTrigger>
                <TabsTrigger value="submissions">
                  <Users className="w-4 h-4 mr-2" />
                  Submissions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="form-builder">
                <RegistrationBuilder />
              </TabsContent>

              <TabsContent value="submissions">
                <RegistrationSubmissionsViewer />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
